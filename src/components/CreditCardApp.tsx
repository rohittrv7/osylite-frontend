import { useState } from "react";
import {
  ShieldCheck,
  Wallet,
  ChevronRight,
  CheckCircle2,
  Loader2,
  Info,
  Cpu,
  MapPin,
  Landmark,
  FileText,
  AlertCircle,
  Clock,
  Check,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  useApplyForCreditCardMutation,
  useGetMyCreditCardsQuery,
} from "@/store/api/creditCardApi";
import { toast } from "sonner";

type AppStep = "INFO" | "INCOME" | "ADDRESS" | "VERIFY" | "SUCCESS";

const BANK_LIST = [
  "State Bank of India (SBI)",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Punjab National Bank (PNB)",
  "Bank of Baroda (BOB)",
  "IDFC First Bank",
  "Federal Bank",
  "Yes Bank",
  "IndusInd Bank",
];

export default function CreditCardApp() {
  const [step, setStep] = useState<AppStep>("INFO");
  const [activeTab, setActiveTab] = useState<"apply" | "status">("apply");
  const [applyCard, { isLoading: isSubmitting }] = useApplyForCreditCardMutation();
  const { data: myApplications = [], refetch } = useGetMyCreditCardsQuery();
  const [createdRef, setCreatedRef] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    panCard: "",
    bankName: BANK_LIST[0],
    income: "",
    occupation: "Salaried",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleNext = () => {
    if (step === "INFO") {
      if (!formData.fullName.trim() || !formData.panCard.trim() || !formData.bankName) {
        return toast.error("Please fill in all details");
      }
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(formData.panCard.toUpperCase())) {
        return toast.error("Invalid PAN Card format (e.g. ABCDE1234F)");
      }
      setStep("INCOME");
    } else if (step === "INCOME") {
      if (!formData.income || Number(formData.income) <= 0) {
        return toast.error("Please enter a valid monthly income");
      }
      setStep("ADDRESS");
    } else if (step === "ADDRESS") {
      if (
        !formData.addressLine1.trim() ||
        !formData.city.trim() ||
        !formData.state.trim() ||
        !formData.pincode.trim()
      ) {
        return toast.error("Please fill in all address details");
      }
      if (!/^[0-9]{6}$/.test(formData.pincode.trim())) {
        return toast.error("Pincode must be exactly 6 digits");
      }
      setStep("VERIFY");
    } else {
      submitApplication();
    }
  };

  const submitApplication = async () => {
    try {
      const payload = {
        fullName: formData.fullName.trim().toUpperCase(),
        panCard: formData.panCard.trim().toUpperCase(),
        bankName: formData.bankName,
        income: Number(formData.income),
        occupation: formData.occupation,
        addressLine1: formData.addressLine1.trim(),
        addressLine2: formData.addressLine2.trim() || undefined,
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
      };

      const res = await applyCard(payload).unwrap();
      setCreatedRef(res.id.slice(0, 8).toUpperCase());
      toast.success("Credit Card Application Submitted Successfully!");
      setStep("SUCCESS");
      refetch();
      // Reset form
      setFormData({
        fullName: "",
        panCard: "",
        bankName: BANK_LIST[0],
        income: "",
        occupation: "Salaried",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
      });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit credit card application");
    }
  };

  const getStepProgress = () => {
    switch (step) {
      case "INFO":
        return 25;
      case "INCOME":
        return 50;
      case "ADDRESS":
        return 75;
      case "VERIFY":
        return 100;
      default:
        return 100;
    }
  };

  if (step === "SUCCESS") {
    return (
      <SuccessScreen
        referenceId={createdRef}
        onDone={() => {
          setStep("INFO");
          setActiveTab("status");
        }}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10 space-y-10 animate-in fade-in duration-700">
      {/* 🔹 Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">
            ANG <span className="text-primary">Titanium</span> Card
          </h1>
          <p className="text-muted-foreground font-bold uppercase text-[10px] tracking-[0.2em] flex items-center gap-2">
            <ShieldCheck size={14} className="text-primary" /> Premium Credit
            Experience
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-muted/40 p-1 rounded-2xl border border-border/50">
          <button
            onClick={() => {
              setActiveTab("apply");
              setStep("INFO");
            }}
            className={cn(
              "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all",
              activeTab === "apply" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Apply Now
          </button>
          <button
            onClick={() => setActiveTab("status")}
            className={cn(
              "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all",
              activeTab === "status" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-foreground"
            )}
          >
            My Applications ({myApplications.length})
          </button>
        </div>
      </div>

      {activeTab === "apply" ? (
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* 🔹 LEFT: CARD PREVIEW (Sticky) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="relative group perspective-1000">
              <div className="w-full aspect-[1.58/1] bg-gradient-to-br from-zinc-900 via-zinc-800 to-black rounded-[2rem] p-8 shadow-2xl border border-white/10 relative overflow-hidden flex flex-col justify-between">
                {/* Background Patterns */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20" />

                <div className="flex justify-between items-start relative z-10">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                      ANG Network
                    </p>
                    <h3 className="text-xl font-black italic text-white/90 uppercase tracking-tighter">
                      Titanium
                    </h3>
                  </div>
                  <div className="w-12 h-10 bg-gradient-to-br from-yellow-500 to-yellow-200 rounded-lg opacity-80 flex items-center justify-center overflow-hidden">
                    <Cpu className="text-black/40 w-8 h-8" />
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <p className="text-2xl font-mono text-white/80 tracking-[0.15em] uppercase">
                    {formData.bankName ? formData.bankName.split(" (")[0].slice(0, 14) : "ANG BANK"}
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">
                        Card Holder
                      </p>
                      <p className="text-sm font-black text-white uppercase italic truncate max-w-[200px]">
                        {formData.fullName || "YOUR NAME HERE"}
                      </p>
                    </div>
                    <div className="flex -space-x-4">
                      <div className="w-10 h-10 rounded-full bg-red-500/80 mix-blend-screen" />
                      <div className="w-10 h-10 rounded-full bg-orange-500/80 mix-blend-screen" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <BenefitBadge icon={<Wallet size={14} />} label="No Joining Fee" />
              <BenefitBadge
                icon={<CheckCircle2 size={14} />}
                label="Instant Approval"
              />
            </div>
          </div>

          {/* 🔹 RIGHT: FORM FLOW */}
          <div className="lg:col-span-7 space-y-4">
            {/* Step Progress Bar */}
            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-500"
                style={{ width: `${getStepProgress()}%` }}
              />
            </div>

            <Card className="border-2 rounded-[2.5rem] shadow-xl overflow-hidden border-border/50">
              <CardContent className="p-8 md:p-12 space-y-8">
                {step === "INFO" && (
                  <div className="space-y-6 animate-in slide-in-from-right duration-500">
                    <FormHeader
                      title="Personal Details"
                      sub="Tell us who you are and select your bank"
                    />
                    <div className="space-y-4">
                      <CustomInput
                        label="Full Name (as per PAN)"
                        placeholder="ROHIT KUMAR"
                        value={formData.fullName}
                        onChange={(e: any) =>
                          setFormData({
                            ...formData,
                            fullName: e.target.value.toUpperCase(),
                          })
                        }
                      />
                      <CustomInput
                        label="PAN Card Number"
                        placeholder="ABCDE1234F"
                        value={formData.panCard}
                        onChange={(e: any) =>
                          setFormData({
                            ...formData,
                            panCard: e.target.value.toUpperCase(),
                          })
                        }
                        maxLength={10}
                      />
                      <CustomSelect
                        label="Select Target Bank"
                        value={formData.bankName}
                        options={BANK_LIST}
                        onChange={(e: any) =>
                          setFormData({
                            ...formData,
                            bankName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                )}

                {step === "INCOME" && (
                  <div className="space-y-6 animate-in slide-in-from-right duration-500">
                    <FormHeader
                      title="Income Profile"
                      sub="Help us decide your credit limit"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() =>
                          setFormData({ ...formData, occupation: "Salaried" })
                        }
                        className={cn(
                          "p-6 rounded-3xl border-2 transition-all font-black uppercase italic text-xs",
                          formData.occupation === "Salaried"
                            ? "bg-primary text-white border-primary shadow-lg"
                            : "bg-muted/20 border-transparent text-muted-foreground",
                        )}
                      >
                        Salaried
                      </button>
                      <button
                        onClick={() =>
                          setFormData({ ...formData, occupation: "Business" })
                        }
                        className={cn(
                          "p-6 rounded-3xl border-2 transition-all font-black uppercase italic text-xs",
                          formData.occupation === "Business"
                            ? "bg-primary text-white border-primary shadow-lg"
                            : "bg-muted/20 border-transparent text-muted-foreground",
                        )}
                      >
                        Business
                      </button>
                    </div>
                    <CustomInput
                      label="Monthly Take-home Income"
                      type="number"
                      placeholder="₹ 50,000"
                      value={formData.income}
                      onChange={(e: any) =>
                        setFormData({
                          ...formData,
                          income: e.target.value,
                        })
                      }
                    />
                  </div>
                )}

                {step === "ADDRESS" && (
                  <div className="space-y-6 animate-in slide-in-from-right duration-500">
                    <FormHeader
                      title="Address Details"
                      sub="Where should we deliver your physical card?"
                    />
                    <div className="space-y-4">
                      <CustomInput
                        label="Flat, House no., Building"
                        placeholder="Flat No 302, Green Glen Apartments"
                        value={formData.addressLine1}
                        onChange={(e: any) =>
                          setFormData({
                            ...formData,
                            addressLine1: e.target.value,
                          })
                        }
                      />
                      <CustomInput
                        label="Area, Colony, Street, Sector (Optional)"
                        placeholder="Outer Ring Road"
                        value={formData.addressLine2}
                        onChange={(e: any) =>
                          setFormData({
                            ...formData,
                            addressLine2: e.target.value,
                          })
                        }
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <CustomInput
                          label="City"
                          placeholder="Bengaluru"
                          value={formData.city}
                          onChange={(e: any) =>
                            setFormData({
                              ...formData,
                              city: e.target.value,
                            })
                          }
                        />
                        <CustomInput
                          label="State"
                          placeholder="Karnataka"
                          value={formData.state}
                          onChange={(e: any) =>
                            setFormData({
                              ...formData,
                              state: e.target.value,
                            })
                          }
                        />
                      </div>
                      <CustomInput
                        label="Pincode"
                        placeholder="560103"
                        maxLength={6}
                        value={formData.pincode}
                        onChange={(e: any) =>
                          setFormData({
                            ...formData,
                            pincode: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                )}

                {step === "VERIFY" && (
                  <div className="space-y-6 animate-in slide-in-from-right duration-500 text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShieldCheck size={40} className="text-primary" />
                    </div>
                    <FormHeader
                      title="Final Verification"
                      sub="Securely checking your credit score"
                    />
                    <div className="p-6 bg-muted/20 rounded-3xl border-2 border-dashed flex items-center gap-4 text-left">
                      <Info className="text-primary shrink-0" />
                      <p className="text-[10px] font-bold uppercase leading-relaxed text-muted-foreground">
                        By clicking submit, you authorize ANG Network and your chosen bank ({formData.bankName}) to fetch
                        your CIBIL score from authorized bureaus.
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-6">
                  <Button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="w-full h-16 rounded-2xl font-black uppercase italic tracking-widest bg-primary text-primary-foreground shadow-2xl active:scale-95 transition-all gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5" /> Submitting...
                      </>
                    ) : step === "VERIFY" ? (
                      "Complete Application"
                    ) : (
                      "Continue"
                    )}
                    {!isSubmitting && <ChevronRight className="w-5 h-5" />}
                  </Button>
                  {step !== "INFO" && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        if (step === "INCOME") setStep("INFO");
                        else if (step === "ADDRESS") setStep("INCOME");
                        else if (step === "VERIFY") setStep("ADDRESS");
                      }}
                      className="w-full mt-2 font-bold uppercase text-[10px]"
                    >
                      Back
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {myApplications.length === 0 ? (
            <div className="py-24 text-center border-4 border-dashed rounded-[3rem] border-border/50 bg-muted/5">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-20" />
              <p className="text-lg font-black uppercase italic tracking-[0.2em] text-muted-foreground">
                No Applications Yet
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setActiveTab("apply");
                  setStep("INFO");
                }}
                className="mt-2 text-primary font-bold uppercase text-xs"
              >
                Apply for one now
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {myApplications.map((app) => (
                <Card
                  key={app.id}
                  className="border-2 rounded-[2rem] overflow-hidden hover:border-primary/30 transition-all bg-card shadow-sm border-border/50"
                >
                  <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2.5 rounded-xl text-primary shrink-0">
                          <Landmark size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-wider">
                            Applied Bank
                          </p>
                          <h3 className="text-xl font-black italic uppercase tracking-tighter text-foreground">
                            {app.bankName}
                          </h3>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                        <div>
                          <p className="text-[9px] font-bold text-muted-foreground uppercase">Reference ID</p>
                          <p className="font-mono text-xs font-bold uppercase text-foreground">#{app.id.slice(0, 8)}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-muted-foreground uppercase">PAN Number</p>
                          <p className="text-xs font-bold text-foreground">{app.panCard}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-muted-foreground uppercase">Occupation</p>
                          <p className="text-xs font-bold text-foreground">{app.occupation}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-muted-foreground uppercase">Income</p>
                          <p className="text-xs font-bold text-foreground">₹{Number(app.income).toLocaleString()}/mo</p>
                        </div>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-2xl border border-border/40 text-left">
                        <p className="text-[9px] font-black uppercase text-primary mb-1 flex items-center gap-1">
                          <MapPin size={10} /> Delivery Address
                        </p>
                        <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                          {app.addressLine1}
                          {app.addressLine2 ? `, ${app.addressLine2}` : ""}, {app.city}, {app.state} - {app.pincode}
                        </p>
                      </div>

                      {app.rejectionReason && (
                        <div className="bg-destructive/5 p-4 rounded-2xl border border-destructive/10 text-left flex items-start gap-2">
                          <AlertCircle size={16} className="text-destructive shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[9px] font-black uppercase text-destructive">Rejection Remarks</p>
                            <p className="text-xs text-destructive/80 font-medium">{app.rejectionReason}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-start md:items-end justify-center shrink-0">
                      <span className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Status</span>
                      <Badge
                        className={cn(
                          "uppercase italic font-black text-xs px-5 py-1.5 rounded-full shadow-md text-white border-0",
                          app.status === "Approved" && "bg-green-600 shadow-green-500/20",
                          app.status === "Rejected" && "bg-red-600 shadow-red-500/20",
                          app.status === "Pending" && "bg-amber-500 shadow-amber-500/20"
                        )}
                      >
                        {app.status === "Pending" && <Clock size={12} className="inline mr-1 -mt-0.5" />}
                        {app.status === "Approved" && <Check size={12} className="inline mr-1 -mt-0.5" />}
                        {app.status === "Rejected" && <XCircle size={12} className="inline mr-1 -mt-0.5" />}
                        {app.status}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// --- Helpers ---

const FormHeader = ({ title, sub }: { title: string; sub: string }) => (
  <div className="space-y-1">
    <h3 className="text-2xl font-black uppercase italic tracking-tight">
      {title}
    </h3>
    <p className="text-xs font-bold text-muted-foreground uppercase opacity-60 tracking-wider">
      {sub}
    </p>
  </div>
);

const CustomInput = ({ label, ...props }: any) => (
  <div className="space-y-2 text-left">
    <label className="text-[10px] font-black uppercase opacity-60 ml-2">
      {label}
    </label>
    <Input
      {...props}
      className="h-14 rounded-2xl border-2 font-bold bg-background shadow-inner focus-visible:ring-primary"
    />
  </div>
);

const CustomSelect = ({ label, options, ...props }: any) => (
  <div className="space-y-2 text-left">
    <label className="text-[10px] font-black uppercase opacity-60 ml-2">
      {label}
    </label>
    <select
      {...props}
      className="w-full h-14 px-4 rounded-2xl border-2 font-bold bg-background shadow-inner focus-visible:ring-primary outline-none appearance-none cursor-pointer"
    >
      {options.map((opt: string) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const BenefitBadge = ({ icon, label }: { icon: any; label: string }) => (
  <div className="flex items-center gap-3 bg-muted/10 p-4 rounded-2xl border-2 border-dashed border-border/50">
    <div className="text-primary">{icon}</div>
    <span className="text-[9px] font-black uppercase tracking-widest">
      {label}
    </span>
  </div>
);

const SuccessScreen = ({ referenceId, onDone }: { referenceId: string; onDone: () => void }) => (
  <div className="max-w-md mx-auto py-20 text-center space-y-8 animate-in zoom-in-95 duration-500">
    <div className="w-24 h-24 bg-green-500/20 rounded-[2.5rem] flex items-center justify-center text-green-500 mx-auto">
      <CheckCircle2 size={50} />
    </div>
    <div className="space-y-2">
      <h2 className="text-3xl font-black uppercase italic">
        Application <span className="text-primary">Sent!</span>
      </h2>
      <p className="text-muted-foreground font-medium uppercase text-xs tracking-widest">
        Reference: #{referenceId || "ANG-CRD-9921"}
      </p>
    </div>
    <Card className="border-2 rounded-3xl p-6 bg-muted/10">
      <p className="text-[11px] font-bold text-muted-foreground uppercase leading-loose">
        Our agents will review your details and contact you within{" "}
        <span className="text-primary">24 Hours</span> for physical KYC. Your
        virtual card will be activated post-approval.
      </p>
    </Card>
    <Button
      onClick={onDone}
      className="w-full h-14 rounded-2xl font-black uppercase italic"
    >
      View Application Status
    </Button>
  </div>
);
