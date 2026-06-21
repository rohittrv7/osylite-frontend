import { useState, useMemo } from "react";
import {
  ArrowLeft,
  Check,
  Copy,
  Upload,
  Coins,
  Loader2,
  Clock,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useGetPlansQuery,
  useGetAdminQrQuery,
  useRequestRechargeMutation,
  useGetMyPlanStatusQuery,
} from "@/store/api/walletApi";
import { useLazyGetUploadSignatureQuery } from "@/store/api/cloudinaryApi";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";

const BuyCoins = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);

  const queryParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const paramAmount = queryParams.get("amount") || "";
  const [customAmount, setCustomAmount] = useState(paramAmount);

  // Payment Proof State
  const [utrNumber, setUtrNumber] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // RTK Queries
  const {
    data: planStatus,
    isLoading: loadingStatus,
    refetch,
  } = useGetMyPlanStatusQuery();

  const { data: plans = [], isLoading: loadingPlans } = useGetPlansQuery();
  const { data: paymentConfig, isLoading: loadingConfig } =
    useGetAdminQrQuery();
  const [requestRecharge, { isLoading: isSubmitting }] =
    useRequestRechargeMutation();
  const [getSignatureTrigger] = useLazyGetUploadSignatureQuery();

  // Rate logic: 1 Coin = ₹2
  const finalAmount = selectedPlan
    ? selectedPlan.price
    : Number(customAmount) || 0;

  const estimatedCoins = selectedPlan
    ? selectedPlan.coins
    : Math.floor(finalAmount / 2);

  const dynamicQrUrl = useMemo(() => {
    if (!paymentConfig?.upiId || finalAmount <= 0)
      return paymentConfig?.qrCodeUrl;
    const upiLink = `upi://pay?pa=${paymentConfig.upiId}&pn=ParcelX&am=${finalAmount}&cu=INR&tn=Recharge_${estimatedCoins}_Coins`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiLink)}`;
  }, [paymentConfig, finalAmount, estimatedCoins]);

  const handleCopyUPI = () => {
    if (paymentConfig?.upiId) {
      navigator.clipboard.writeText(paymentConfig.upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("UPI ID copied!");
    }
  };

  const getSignature = async ({ folder }: { folder: string }) => {
    return await getSignatureTrigger({ folder }).unwrap();
  };

  const handleSubmit = async () => {
    if (!utrNumber.trim()) return toast.error("Please enter UTR Number");
    if (!screenshot) return toast.error("Please upload screenshot");

    try {
      setUploading(true);
      const uploadRes = await uploadToCloudinary({
        file: screenshot,
        postType: "payment_proofs",
        getSignature,
        onProgress: (p) => setUploadProgress(p),
      });

      if (!uploadRes?.secure_url) throw new Error("Upload failed");

      // Payload Logic based on Selection
      const payload: any = {
        utrNumber: utrNumber,
        screenshotUrl: uploadRes.secure_url,
      };

      if (selectedPlan) {
        payload.planId = selectedPlan.id; // Scenario A: Plan selected
      } else {
        payload.amount = Number(customAmount); // Scenario B: Custom Amount
      }

      await requestRecharge(payload).unwrap();
      await refetch();
      toast.success("Request submitted successfully!");
      const redirectUrl = new URLSearchParams(window.location.search).get("redirect");
      if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        navigate("/settings");
      }
    } catch (error) {
      setUploading(false);
      apiErrorToastHandler(error);
    } finally {
      setUploading(false);
    }
  };

  if (loadingStatus || loadingPlans || loadingConfig)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );

  // --- SCENARIO 1: PENDING SCREEN ---
  if (planStatus?.state === "PENDING") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-300">
        <Clock className="h-16 w-16 text-yellow-600 mb-4 animate-pulse" />
        <h2 className="text-2xl font-bold mb-2 text-foreground">
          Thanks for your payment!
        </h2>
        <p className="text-muted-foreground mb-8 text-sm">
          We are verifying your request for <b>{planStatus.planName} Plan</b>.
          This usually takes 2-4 hours.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="w-full max-w-xs gradient-coin h-12 font-bold"
        >
          Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-10 text-foreground">
      <div className="bg-background border-b px-4 py-4 sticky top-0 z-30 shadow-sm">
        <div className="container max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                step > 1 ? setStep(step - 1) : navigate("/wallet")
              }
              className="rounded-full h-10 w-10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-bold">Upgrade Plan</h1>
          </div>
          <div className="text-xs font-bold uppercase tracking-widest">
            Step {step}/3
          </div>
        </div>
        <div className="container max-w-4xl mx-auto mt-3 px-2">
          <Progress value={step * 33.3} className="h-1.5 rounded-full" />
        </div>
      </div>

      <main className="container max-w-4xl mx-auto px-4 mt-6">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-1 px-1">
              <h2 className="text-2xl font-black tracking-tight text-foreground">
                Select your Plan
              </h2>
              <p className="text-sm text-muted-foreground font-medium">
                Choose a plan that fits your needs
              </p>
            </div>

            {/* Plans List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plans.map((plan: any) => {
                const isActive =
                  planStatus?.state === "ACTIVE" &&
                  (planStatus?.planName?.toLowerCase() ===
                    plan.name?.toLowerCase() ||
                    planStatus?.planName === plan.id);
                const isAnyPlanActive = planStatus?.state === "ACTIVE";

                return (
                  <Card
                    key={plan.id}
                    onClick={() =>
                      !isActive &&
                      !isAnyPlanActive &&
                      plan.price > 0 &&
                      setSelectedPlan(plan)
                    }
                    className={cn(
                      "relative overflow-hidden cursor-pointer transition-all border-2 group",
                      selectedPlan?.id === plan.id
                        ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                        : "border-foreground/10 bg-background hover:border-foreground shadow-sm",
                      isActive &&
                        "border-green-500 bg-green-50/10 cursor-default ring-0 opacity-100",
                      ((plan.price === 0 && !isActive) ||
                        (isAnyPlanActive && !isActive)) &&
                        "opacity-50 grayscale pointer-events-none",
                    )}
                  >
                    {isActive && (
                      <div className="absolute top-0 right-0 bg-green-600 text-white text-[10px] px-3 py-1 font-black rounded-bl-xl shadow-lg uppercase tracking-widest">
                        CURRENT PLAN
                      </div>
                    )}
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "h-4 w-4 rounded-full",
                              plan.colorTheme === "blue"
                                ? "bg-blue-500"
                                : "bg-yellow-500",
                            )}
                          />
                          <h3 className="text-xl font-black">{plan.name}</h3>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-black text-foreground">
                            ₹{plan.price.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
                        <div className="flex items-center gap-1.5 text-primary bg-primary/10 px-2.5 py-1 rounded-full text-sm font-bold">
                          <Coins className="h-4 w-4" />{" "}
                          {plan.coins.toLocaleString()} Coins
                        </div>
                        {isActive && (
                          <div className="flex items-center gap-1.5 text-green-600 font-bold text-xs bg-green-100 px-2.5 py-1 rounded-full">
                            <Clock className="h-3.5 w-3.5" />
                            Valid till:{" "}
                            {planStatus.expiryDate
                              ? new Date(
                                  planStatus.expiryDate,
                                ).toLocaleDateString("en-GB")
                              : "Lifetime"}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        {plan.features.map((f: string, i: number) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-xs font-medium text-muted-foreground"
                          >
                            <Check className="h-3 w-3 text-green-600 shrink-0 mt-0.5" />{" "}
                            {f}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* RESTORED: CUSTOM RECHARGE SECTION */}
            <div className="max-w-xl mx-auto w-full pt-4 space-y-4">
              <div className="flex items-center gap-2 px-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Or Custom recharge
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedPlan(null);
                    }}
                    className="h-14 pl-12 text-lg font-bold rounded-2xl border-2 focus-visible:ring-primary shadow-sm"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">
                    ₹
                  </div>
                </div>

                {/* Coin Calculator */}
                {Number(customAmount) > 0 && (
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 flex items-center justify-between animate-in slide-in-from-top-1">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-1.5 rounded-full">
                        <Coins className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-semibold">
                        Estimated Coins
                      </span>
                    </div>
                    <span className="text-lg font-black text-primary">
                      {estimatedCoins.toLocaleString()}{" "}
                      <span className="text-[10px] uppercase opacity-60">
                        ANG
                      </span>
                    </span>
                  </div>
                )}
              </div>

              <Button
                disabled={finalAmount <= 0}
                onClick={() => setStep(2)}
                className="w-full h-16 text-xl font-black gradient-coin rounded-2xl shadow-xl shadow-orange-500/20 active:scale-95 transition-all"
              >
                Pay ₹{finalAmount.toLocaleString()}{" "}
                <ChevronRight className="ml-2" />
              </Button>
            </div>

            {finalAmount > 0 && (
              <div className="border border-border bg-card rounded-3xl p-6 mt-6 space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="text-left">
                    <h3 className="text-lg font-black italic uppercase text-foreground">
                      ⚡ Quick Scan & Pay (Step 1 of 1)
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium">
                      Scan QR and pay instantly without leaving this screen.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <div className="relative bg-white p-4 rounded-[28px] border-2 border-slate-100 flex items-center justify-center aspect-square max-w-[200px] mx-auto shadow-inner">
                      <img
                        src={dynamicQrUrl}
                        className="w-full h-full object-contain mix-blend-multiply"
                        alt="QR"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Payable Amount
                      </p>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">
                        ₹{finalAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div
                      className="bg-slate-50 dark:bg-zinc-900 rounded-2xl p-4 flex items-center justify-between group active:scale-95 transition-all cursor-pointer border border-border"
                      onClick={handleCopyUPI}
                    >
                      <div className="text-left text-slate-900 dark:text-white">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                          Copy UPI ID
                        </p>
                        <p className="text-xs font-mono font-black truncate max-w-[150px]">
                          {paymentConfig?.upiId || "Fetching..."}
                        </p>
                      </div>
                      <div className="h-8 w-8 bg-white dark:bg-zinc-800 rounded-xl shadow-sm flex items-center justify-center text-foreground">
                        {copied ? (
                          <Check className="text-green-500 h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                        UTR / Transaction ID
                      </Label>
                      <Input
                        placeholder="Enter 12 Digit UTR"
                        className="h-10 text-sm font-bold rounded-xl border border-border shadow-sm"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                        Screenshot
                      </Label>
                      <label className="flex items-center justify-center w-full h-12 border border-dashed rounded-xl cursor-pointer bg-background hover:bg-slate-50 dark:hover:bg-zinc-800 border-border text-xs font-bold transition-all">
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                        />
                        {screenshot ? (
                          <span className="text-green-600 truncate max-w-[200px] flex items-center gap-1">
                            <Check size={14} className="text-green-500" /> {screenshot.name}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">Upload Screenshot</span>
                        )}
                      </label>
                    </div>

                    {uploading && (
                      <div className="space-y-1 px-1">
                        <div className="flex justify-between text-[8px] font-black uppercase text-primary">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-1.5 rounded-full" />
                      </div>
                    )}

                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting || uploading || !utrNumber.trim() || !screenshot}
                      className="w-full h-11 text-xs font-black uppercase tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg"
                    >
                      {isSubmitting || uploading ? "Submitting..." : "Submit Verification"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: SCAN & PAY (Aapka Original UI) */}
        {step === 2 && (
          <div className="max-w-xl mx-auto space-y-6 animate-in slide-in-from-right-4 duration-500 text-center">
            <div className="bg-blue-600 rounded-3xl p-6 text-white text-left space-y-2 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck size={100} />
              </div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <ShieldCheck size={20} /> Payment Security
              </h2>
              <p className="text-xs text-blue-100 leading-relaxed font-medium">
                Scan QR and pay exact amount to verify instantly.
              </p>
            </div>

            <Card className="rounded-[40px] shadow-2xl border-none overflow-hidden bg-white p-8">
              <div className="space-y-6">
                <div className="relative bg-white p-4 rounded-[28px] border-2 border-slate-50 flex items-center justify-center aspect-square max-w-[280px] mx-auto">
                  <img
                    src={dynamicQrUrl}
                    className="w-full h-full object-contain mix-blend-multiply"
                    alt="QR"
                  />
                </div>
                <div className="space-y-4">
                  <div
                    className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between group active:scale-95 transition-all cursor-pointer border border-slate-100"
                    onClick={handleCopyUPI}
                  >
                    <div className="text-left text-slate-900">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                        Copy UPI ID
                      </p>
                      <p className="text-sm font-mono font-black text-slate-700">
                        {paymentConfig?.upiId || "Fetching..."}
                      </p>
                    </div>
                    <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-foreground">
                      {copied ? (
                        <Check className="text-green-500 h-5 w-5" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Payable Amount
                    </p>
                    <p className="text-5xl font-black text-slate-900 tracking-tight">
                      ₹{finalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            <Button
              onClick={() => setStep(3)}
              className="w-full h-16 text-lg font-black gradient-coin rounded-2xl shadow-xl"
            >
              I have Paid ₹{finalAmount.toLocaleString()}
            </Button>
          </div>
        )}

        {/* STEP 3: SUBMIT PROOF (Aapka Original UI) */}
        {step === 3 && (
          <div className="max-w-xl mx-auto space-y-6 animate-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-black text-foreground tracking-tight px-1 text-center">
              Verify Transaction
            </h2>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-xs font-black text-slate-400 uppercase ml-1">
                  UTR / Transaction ID
                </Label>
                <Input
                  placeholder="Enter 12 Digit Number"
                  className="h-14 text-lg font-bold rounded-2xl border-2 shadow-sm"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2 text-foreground">
                <Label className="text-xs font-black text-slate-400 uppercase ml-1">
                  Screenshot
                </Label>
                <label
                  className={cn(
                    "flex flex-col items-center justify-center w-full h-52 border-2 border-dashed rounded-3xl cursor-pointer transition-all",
                    screenshot
                      ? "border-green-500 bg-green-50/50"
                      : "border-slate-200 bg-white hover:border-primary/50",
                  )}
                >
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                  />
                  {screenshot ? (
                    <div className="text-center p-6 space-y-2">
                      <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-sm">
                        <Check size={32} />
                      </div>
                      <p className="text-sm font-black text-slate-800 truncate max-w-[240px]">
                        {screenshot.name}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center p-6 space-y-3">
                      <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto border border-slate-100 shadow-sm text-slate-400">
                        <Upload size={28} />
                      </div>
                      <p className="text-sm font-black text-slate-700">
                        Click to upload screenshot
                      </p>
                    </div>
                  )}
                </label>
              </div>
              {uploading && (
                <div className="space-y-2 px-1">
                  <div className="flex justify-between text-[10px] font-black uppercase text-primary">
                    <span>Uploading Proof...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress
                    value={uploadProgress}
                    className="h-2 rounded-full"
                  />
                </div>
              )}
            </div>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || uploading}
              className="w-full h-16 text-lg font-black gradient-coin rounded-2xl shadow-xl active:scale-95 transition-all"
            >
              {isSubmitting || uploading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" /> Submitting...
                </span>
              ) : (
                "Submit Verification"
              )}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default BuyCoins;
