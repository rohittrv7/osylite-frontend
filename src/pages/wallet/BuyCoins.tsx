import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Copy,
  Upload,
  Coins,
  Loader2,
  Clock, // Import Clock icon for pending state
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { Plan } from "@/types/wallet";
import {
  useGetPlansQuery,
  useGetAdminQrQuery,
  useRequestRechargeMutation,
  useGetWalletBalanceQuery, // Import this hook
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
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  // Payment Proof State
  const [utrNumber, setUtrNumber] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // UI State
  const [copied, setCopied] = useState(false);

  // RTK Queries
  const { data: balanceData, isLoading: isBalanceLoading } =
    useGetWalletBalanceQuery(); // Fetch balance to check pending status
  const { data: plans = [], isLoading: loadingPlans } = useGetPlansQuery();
  const { data: adminQr } = useGetAdminQrQuery();
  const [requestRecharge, { isLoading: isSubmitting }] =
    useRequestRechargeMutation();
  const [getSignatureTrigger] = useLazyGetUploadSignatureQuery();

  // Calculations
  const finalAmount = selectedPlan
    ? selectedPlan.priceINR
    : Number(customAmount) || 0;

  // 1 Coin = ₹2 (Example Logic)
  const estimatedCoins = selectedPlan
    ? selectedPlan.coins
    : Math.floor(finalAmount / 2);

  const handleCopyUPI = () => {
    if (adminQr?.upiId) {
      navigator.clipboard.writeText(adminQr.upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("UPI ID copied!");
    }
  };

  const getSignature = async ({ folder }: { folder: string }) => {
    return await getSignatureTrigger({ folder }).unwrap();
  };

  const handleSubmit = async () => {
    // 1. Validation
    if (!utrNumber.trim()) {
      toast.error("Please enter UTR / Transaction ID");
      return;
    }
    if (!screenshot) {
      toast.error("Please upload payment screenshot");
      return;
    }

    try {
      setUploading(true);

      // 2. Upload Image to Cloudinary First
      const uploadRes = await uploadToCloudinary({
        file: screenshot,
        postType: "payment_proofs",
        getSignature,
        onProgress: (p) => setUploadProgress(p),
      });

      if (!uploadRes?.secure_url) {
        throw new Error("Failed to upload screenshot");
      }

      setUploading(false);

      const payload = {
        amountInINR: Number(finalAmount),
        utrNumber: utrNumber,
        screenshotUrl: uploadRes.secure_url,
        planId: selectedPlan?.id || undefined,
      };

      await requestRecharge(payload).unwrap();
      setStep(4); // Move to success screen
    } catch (error) {
      setUploading(false);
      apiErrorToastHandler(error);
    }
  };

  // 1. Loading State
  if (isBalanceLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // 2. PENDING STATE CHECK
  // If user already has a pending recharge, show pending screen
  if (balanceData?.hasPendingRecharge) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-4 animate-slide-up">
          <div className="w-16 h-16 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center">
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
          <h2 className="text-xl font-display font-bold">Recharge Pending</h2>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            You already have a recharge request in process. Please wait for the
            admin to verify it before making another one.
          </p>
          <Button
            onClick={() => navigate("/wallet")}
            className="w-full cursor-pointer h-12 text-lg font-semibold gradient-coin mt-4"
          >
            Back to Wallet
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex px-6 justify-center">
      <div className="w-full px-4 py-6 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              step > 1 && step < 4 ? setStep(step - 1) : navigate("/wallet")
            }
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-display font-bold">Buy Ang Coins</h1>
        </div>

        {/* Step Progress Bar */}
        {step < 4 && (
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-all duration-300",
                  s <= step ? "bg-primary gradient-coin" : "bg-muted",
                )}
              />
            ))}
          </div>
        )}

        {/* --- STEP 1: SELECT PLAN --- */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold">Select a Plan</h2>
              <p className="text-sm text-muted-foreground">
                Choose a bundle or enter amount
              </p>
            </div>

            {loadingPlans ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {plans.map((plan) => (
                  <Card
                    key={plan.id}
                    onClick={() => {
                      setSelectedPlan(plan);
                      setCustomAmount("");
                    }}
                    className={cn(
                      "cursor-pointer transition-all border-2 hover:border-primary/50",
                      selectedPlan?.id === plan.id
                        ? "border-primary bg-primary/5"
                        : "border-border",
                    )}
                  >
                    <CardContent className="p-4 flex flex-col items-start gap-1">
                      <div className="flex items-center gap-1.5">
                        <Coins className="h-4 w-4 text-yellow-500" />
                        <span className="text-xl font-bold">{plan.coins}</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium">
                        {plan.name}
                      </p>
                      <BadgePrice price={plan.priceINR} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or Custom Amount
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Enter Amount (INR)</Label>
              <Input
                type="number"
                min="1"
                placeholder="₹ 100"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedPlan(null);
                }}
                className="text-lg font-semibold"
              />
              {customAmount && Number(customAmount) > 0 && (
                <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                  <Coins className="h-3 w-3" /> You will receive approx{" "}
                  {Math.floor(Number(customAmount) / 2)} coins
                </p>
              )}
            </div>

            <Button
              onClick={() => finalAmount > 0 && setStep(2)}
              disabled={finalAmount <= 0}
              className="w-full h-12 text-lg font-semibold gradient-coin"
            >
              Pay ₹{finalAmount}
            </Button>
          </div>
        )}

        {/* --- STEP 2: SCAN & PAY --- */}
        {step === 2 && (
          <div className="space-y-6 text-center">
            <div>
              <h2 className="text-lg font-semibold">Scan QR to Pay</h2>
              <p className="text-sm text-muted-foreground">
                Use any UPI app to complete payment
              </p>
            </div>

            <Card className="overflow-hidden border-2 border-primary/20">
              <CardContent className="p-6 flex flex-col items-center gap-4">
                <div className="w-56 h-56 bg-white p-2 rounded-xl shadow-sm border flex items-center justify-center">
                  {adminQr?.qrCodeUrl ? (
                    <img
                      src={adminQr.qrCodeUrl}
                      alt="Payment QR"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground flex flex-col items-center">
                      <Loader2 className="h-6 w-6 animate-spin mb-2" />
                      Loading QR...
                    </div>
                  )}
                </div>

                <div className="w-full bg-secondary/50 p-3 rounded-lg flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">UPI ID</p>
                    <p className="text-sm font-mono font-medium">
                      {adminQr?.upiId || "Loading..."}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleCopyUPI}>
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <p className="text-sm">
                  Amount to Pay:{" "}
                  <span className="font-bold text-xl text-primary">
                    ₹{finalAmount}
                  </span>
                </p>
              </CardContent>
            </Card>

            <Button
              onClick={() => setStep(3)}
              className="w-full h-12 text-lg font-semibold gradient-coin"
            >
              I have made the payment
            </Button>
          </div>
        )}

        {/* --- STEP 3: SUBMIT PROOF --- */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold">Verify Payment</h2>
              <p className="text-sm text-muted-foreground">
                Provide details to credit your coins
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>UTR / Transaction ID Reference No.</Label>
                <Input
                  placeholder="e.g. 3245xxxxxxxx"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Upload Payment Screenshot</Label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    id="screenshot-upload"
                    className="hidden"
                    onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                  />
                  <label
                    htmlFor="screenshot-upload"
                    className={cn(
                      "flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors bg-muted/20",
                      screenshot
                        ? "border-green-500/50 bg-green-500/5"
                        : "border-muted-foreground/25 hover:border-primary/50",
                    )}
                  >
                    {screenshot ? (
                      <div className="text-center text-green-600">
                        <Check className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm font-medium truncate max-w-[200px]">
                          {screenshot.name}
                        </p>
                        <p className="text-xs opacity-70">Click to change</p>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <Upload className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm font-medium">Click to upload</p>
                        <p className="text-xs opacity-70">JPG, PNG, PDF</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Progress Bar for Upload */}
              {uploading && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span>Uploading proof...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || uploading}
              className="w-full h-12 text-lg font-semibold gradient-coin"
            >
              {isSubmitting || uploading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />{" "}
                  Processing...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </div>
        )}

        {/* --- STEP 4: SUCCESS --- */}
        {step === 4 && (
          <div className="flex flex-col items-center justify-center py-10 space-y-6 text-center animate-in zoom-in duration-300">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-12 w-12 text-green-600" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Request Submitted!</h2>
              <p className="text-muted-foreground max-w-xs mx-auto">
                Your request for{" "}
                <strong className="text-foreground">
                  {estimatedCoins} Coins
                </strong>{" "}
                is under review. Balance will be updated within 24 hours.
              </p>
            </div>

            <div className="w-full p-4 bg-muted/30 rounded-xl border border-border text-sm">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-mono">{utrNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-semibold text-green-600">
                  ₹{finalAmount}
                </span>
              </div>
            </div>

            <Button
              onClick={() => navigate("/wallet")}
              className="w-full h-12 text-lg font-semibold gradient-coin"
            >
              Back to Wallet
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Component for Price Badge
const BadgePrice = ({ price }: { price: number }) => (
  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mt-1">
    ₹{price}
  </span>
);

export default BuyCoins;
