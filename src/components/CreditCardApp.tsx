import { useState } from "react";
import {
  ShieldCheck,
  Wallet,
  ChevronRight,
  CheckCircle2,
  Loader2,
  Info,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type AppStep = "INFO" | "INCOME" | "VERIFY" | "SUCCESS";

export default function CreditCardApp() {
  const [step, setStep] = useState<AppStep>("INFO");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    panCard: "",
    income: "",
    occupation: "Salaried",
  });

  const handleNext = () => {
    if (step === "INFO") setStep("INCOME");
    else if (step === "INCOME") setStep("VERIFY");
    else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep("SUCCESS");
      }, 2000);
    }
  };

  if (step === "SUCCESS")
    return <SuccessScreen onDone={() => setStep("INFO")} />;

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
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "w-8 h-1 rounded-full transition-all",
                (step === "INFO" && s === 1) ||
                  (step === "INCOME" && s <= 2) ||
                  (step === "VERIFY" && s <= 3)
                  ? "bg-primary"
                  : "bg-muted",
              )}
            />
          ))}
        </div>
      </div>

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
                <p className="text-2xl font-mono text-white/80 tracking-[0.15em]">
                  **** **** **** 8847
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
        <div className="lg:col-span-7">
          <Card className="border-2 rounded-[2.5rem] shadow-xl overflow-hidden border-border/50">
            <CardContent className="p-8 md:p-12 space-y-8">
              {step === "INFO" && (
                <div className="space-y-6 animate-in slide-in-from-right duration-500">
                  <FormHeader
                    title="Personal Details"
                    sub="Tell us who you are"
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
                          : "bg-muted/20 border-transparent",
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
                          : "bg-muted/20 border-transparent",
                      )}
                    >
                      Business
                    </button>
                  </div>
                  <CustomInput
                    label="Monthly Take-home Income"
                    type="number"
                    placeholder="₹ 50,000"
                  />
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
                      By clicking submit, you authorize ANG Network to fetch
                      your CIBIL score from authorized bureaus.
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-6">
                <Button
                  onClick={handleNext}
                  disabled={loading}
                  className="w-full h-16 rounded-2xl font-black uppercase italic tracking-widest bg-primary text-primary-foreground shadow-2xl active:scale-95 transition-all"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : step === "VERIFY" ? (
                    "Complete Application"
                  ) : (
                    "Continue"
                  )}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                {step !== "INFO" && (
                  <Button
                    variant="ghost"
                    onClick={() =>
                      setStep(step === "INCOME" ? "INFO" : "INCOME")
                    }
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

const BenefitBadge = ({ icon, label }: { icon: any; label: string }) => (
  <div className="flex items-center gap-3 bg-muted/10 p-4 rounded-2xl border-2 border-dashed border-border/50">
    <div className="text-primary">{icon}</div>
    <span className="text-[9px] font-black uppercase tracking-widest">
      {label}
    </span>
  </div>
);

const SuccessScreen = ({ onDone }: { onDone: () => void }) => (
  <div className="max-w-md mx-auto py-20 text-center space-y-8 animate-in zoom-in-95 duration-500">
    <div className="w-24 h-24 bg-green-500/20 rounded-[2.5rem] flex items-center justify-center text-green-500 mx-auto">
      <CheckCircle2 size={50} />
    </div>
    <div className="space-y-2">
      <h2 className="text-3xl font-black uppercase italic">
        Application <span className="text-primary">Sent!</span>
      </h2>
      <p className="text-muted-foreground font-medium uppercase text-xs tracking-widest">
        Reference: #ANG-CRD-9921
      </p>
    </div>
    <Card className="border-2 rounded-3xl p-6 bg-muted/10">
      <p className="text-[11px] font-bold text-muted-foreground uppercase leading-loose">
        Our agents will contact you within{" "}
        <span className="text-primary">24 Hours</span> for physical KYC. Your
        virtual card will be activated post-approval.
      </p>
    </Card>
    <Button
      onClick={onDone}
      className="w-full h-14 rounded-2xl font-black uppercase italic"
    >
      Back to Home
    </Button>
  </div>
);
