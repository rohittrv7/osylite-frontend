import React, { useState, useMemo } from "react";
import {
  FileText,
  PiggyBank,
  Calculator,
  Smartphone,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Info,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// --- Types ---
type Step = 1 | 2 | 3 | 4 | 5;
type Regime = "old" | "new";

interface TaxData {
  salary: string;
  otherIncome: string;
  tdsDeducted: string;
  sec80C: string;
  sec80D: string;
}

export default function TaxFilingSection() {
  const [step, setStep] = useState<Step>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ackNumber, setAckNumber] = useState("");
  const [selectedRegime, setSelectedRegime] = useState<Regime>("new");
  const [otp, setOtp] = useState("");

  // --- Form State ---
  const [taxData, setTaxData] = useState<TaxData>({
    salary: "",
    otherIncome: "",
    tdsDeducted: "",
    sec80C: "",
    sec80D: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    if (!/^\d*$/.test(e.target.value)) return;
    setTaxData({ ...taxData, [e.target.name]: e.target.value });
  };

  const nextStep = () =>
    setStep((prev) => (prev < 5 ? ((prev + 1) as Step) : prev));
  const prevStep = () =>
    setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev));

  const handleEfile = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // Safe ID generation inside handler
      const newAck = `ITR-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setAckNumber(newAck);
      setIsProcessing(false);
      setStep(5);
    }, 2000);
  };

  // --- Mock Tax Calculation Logic ---
  const calculations = useMemo(() => {
    const gross =
      (Number(taxData.salary) || 0) + (Number(taxData.otherIncome) || 0);
    const deductions =
      Math.min(Number(taxData.sec80C) || 0, 150000) +
      (Number(taxData.sec80D) || 0);
    const tds = Number(taxData.tdsDeducted) || 0;

    // Simplified Mock Tax Brackets for UI Demonstration
    // Old Regime: Allows deductions
    const taxableOld = Math.max(0, gross - deductions);
    const taxOld = taxableOld > 500000 ? taxableOld * 0.2 : 0;

    // New Regime: Lower rate, no deductions
    const taxNew = gross > 700000 ? gross * 0.15 : 0;

    return {
      gross,
      deductions,
      taxOld,
      taxNew,
      payableOld: Math.max(0, taxOld - tds),
      payableNew: Math.max(0, taxNew - tds),
      refundOld: Math.max(0, tds - taxOld),
      refundNew: Math.max(0, tds - taxNew),
    };
  }, [taxData]);

  // Format currency
  const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="w-full min-h-screen bg-background flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* --- Header & Stepper --- */}
        {step < 5 && (
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-primary bg-primary/10 px-3 py-1 rounded-lg">
                  <ShieldCheck size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                    Govt. Authorized Portal
                  </span>
                </div>
                <h1 className="text-3xl font-black uppercase tracking-tight">
                  E-File Income Tax
                </h1>
              </div>
              <div className="bg-muted p-4 rounded-2xl border border-border flex items-center gap-4">
                <Building2 size={24} className="text-muted-foreground" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Assessment Year
                  </p>
                  <p className="font-black">2026-27</p>
                </div>
              </div>
            </div>

            {/* Stepper UI */}
            <div className="flex items-center justify-between relative px-2 sm:px-8 mt-4">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted rounded-full -z-10 px-8">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${((step - 1) / 3) * 100}%` }}
                />
              </div>

              {[
                { num: 1, icon: FileText, label: "Income" },
                { num: 2, icon: PiggyBank, label: "Deductions" },
                { num: 3, icon: Calculator, label: "Summary" },
                { num: 4, icon: Smartphone, label: "E-Verify" },
              ].map((s) => (
                <div
                  key={s.num}
                  className="flex flex-col items-center gap-2 bg-card px-2"
                >
                  <div
                    className={cn(
                      "w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-4 font-bold transition-colors shadow-sm",
                      step >= s.num
                        ? "border-primary bg-primary text-background"
                        : "border-muted bg-background text-muted-foreground",
                    )}
                  >
                    {step > s.num ? (
                      <CheckCircle2 size={24} />
                    ) : (
                      <s.icon size={20} className="sm:w-6 sm:h-6" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-[9px] sm:text-[10px] font-bold uppercase tracking-widest hidden sm:block",
                      step >= s.num
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- Step 1: Income Sources --- */}
        {step === 1 && (
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                1. Income Sources
              </h2>
              <Button
                variant="outline"
                className="h-12 rounded-xl font-bold uppercase text-[10px] tracking-widest border-primary/20 text-primary hover:bg-primary/10"
              >
                <UploadCloud size={16} className="mr-2" /> Upload Form 16
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Gross Salary Income
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-muted-foreground">
                    ₹
                  </span>
                  <Input
                    name="salary"
                    placeholder="0"
                    className="h-16 pl-10 rounded-2xl font-black text-xl bg-background border-border shadow-sm"
                    value={taxData.salary}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Other Income (Freelance, Interest)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-muted-foreground">
                    ₹
                  </span>
                  <Input
                    name="otherIncome"
                    placeholder="0"
                    className="h-16 pl-10 rounded-2xl font-black text-xl bg-background border-border shadow-sm"
                    value={taxData.otherIncome}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  TDS Already Deducted <Info size={14} />
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-muted-foreground">
                    ₹
                  </span>
                  <Input
                    name="tdsDeducted"
                    placeholder="0"
                    className="h-16 pl-10 rounded-2xl font-black text-xl bg-background border-border shadow-sm"
                    value={taxData.tdsDeducted}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border flex justify-end">
              <Button
                onClick={nextStep}
                className="h-14 px-8 rounded-2xl font-bold uppercase tracking-widest shadow-lg"
              >
                Save Income & Next <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* --- Step 2: Tax Deductions --- */}
        {step === 2 && (
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="space-y-2">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                2. Tax Deductions
              </h2>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Declare investments to save tax under Old Regime
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Section 80C
                  </label>
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
                    Max 1.5L
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-muted-foreground">
                    ₹
                  </span>
                  <Input
                    name="sec80C"
                    placeholder="0"
                    className="h-16 pl-10 rounded-2xl font-black text-xl bg-background border-border shadow-sm"
                    value={taxData.sec80C}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-[10px] font-bold text-muted-foreground">
                  PPF, ELSS, LIC, Home Loan Principal
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Section 80D
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-muted-foreground">
                    ₹
                  </span>
                  <Input
                    name="sec80D"
                    placeholder="0"
                    className="h-16 pl-10 rounded-2xl font-black text-xl bg-background border-border shadow-sm"
                    value={taxData.sec80D}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-[10px] font-bold text-muted-foreground">
                  Medical/Health Insurance Premium
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-border flex justify-between">
              <Button
                variant="ghost"
                onClick={prevStep}
                className="h-14 px-6 rounded-2xl font-bold uppercase tracking-widest hover:bg-muted"
              >
                <ArrowLeft size={18} className="mr-2" /> Back
              </Button>
              <Button
                onClick={nextStep}
                className="h-14 px-8 rounded-2xl font-bold uppercase tracking-widest shadow-lg"
              >
                Save Deductions <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* --- Step 3: Tax Summary & Regime Selection --- */}
        {step === 3 && (
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <h2 className="text-2xl font-black uppercase tracking-tight">
              3. Tax Summary & Regime
            </h2>

            <div className="bg-background rounded-2xl p-6 border border-border flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Total Gross Income
                </p>
                <p className="text-3xl font-black">
                  {formatINR(calculations.gross)}
                </p>
              </div>
              <div className="hidden md:block w-px h-12 bg-border" />
              <div className="text-center md:text-left">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Total Deductions
                </p>
                <p className="text-3xl font-black text-green-600 dark:text-green-400">
                  {formatINR(calculations.deductions)}
                </p>
              </div>
              <div className="hidden md:block w-px h-12 bg-border" />
              <div className="text-center md:text-left">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  TDS Paid
                </p>
                <p className="text-3xl font-black">
                  {formatINR(Number(taxData.tdsDeducted) || 0)}
                </p>
              </div>
            </div>

            {/* Regime Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div
                onClick={() => setSelectedRegime("new")}
                className={cn(
                  "p-6 rounded-3xl border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-4",
                  selectedRegime === "new"
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-background hover:border-primary/30",
                )}
              >
                {selectedRegime === "new" && (
                  <Badge className="bg-primary text-background font-bold uppercase tracking-widest text-[9px] mb-2">
                    Recommended
                  </Badge>
                )}
                <h3 className="text-xl font-bold uppercase tracking-tight">
                  New Tax Regime
                </h3>
                <p className="text-xs font-bold text-muted-foreground">
                  Lower rates, no deductions
                </p>
                <div className="mt-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Final Tax Payable
                  </p>
                  <p className="text-4xl font-black text-red-500">
                    {formatINR(calculations.payableNew)}
                  </p>
                </div>
              </div>

              <div
                onClick={() => setSelectedRegime("old")}
                className={cn(
                  "p-6 rounded-3xl border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-4",
                  selectedRegime === "old"
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-background hover:border-primary/30",
                )}
              >
                <h3 className="text-xl font-bold uppercase tracking-tight">
                  Old Tax Regime
                </h3>
                <p className="text-xs font-bold text-muted-foreground">
                  Higher rates, claims deductions
                </p>
                <div className="mt-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Final Tax Payable
                  </p>
                  <p className="text-4xl font-black text-red-500">
                    {formatINR(calculations.payableOld)}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={prevStep}
                className="h-14 px-6 rounded-2xl font-bold uppercase tracking-widest hover:bg-muted"
              >
                <ArrowLeft size={18} className="mr-2" /> Back
              </Button>
              <Button
                onClick={nextStep}
                className="h-14 px-8 rounded-2xl bg-slate-900 dark:bg-primary text-white dark:text-black font-bold uppercase tracking-widest shadow-xl"
              >
                Proceed to E-Verify <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* --- Step 4: E-Verify & File --- */}
        {step === 4 && (
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black uppercase tracking-tight">
                4. E-Verify Your Return
              </h2>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Verify using Aadhaar OTP to complete filing
              </p>
            </div>

            <div className="max-w-sm mx-auto space-y-6 bg-background p-8 rounded-3xl border border-border">
              <div className="text-center space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Net Tax Payable
                </p>
                <p className="text-4xl font-black text-primary">
                  {formatINR(
                    selectedRegime === "new"
                      ? calculations.payableNew
                      : calculations.payableOld,
                  )}
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-border">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground text-center block">
                  Enter 6-Digit Aadhaar OTP
                </label>
                <Input
                  placeholder="• • • • • •"
                  maxLength={6}
                  className="h-16 rounded-2xl font-black text-2xl tracking-[0.5em] text-center bg-card border-border shadow-inner"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                />
                <div className="flex justify-end">
                  <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">
                    Resend OTP
                  </button>
                </div>
              </div>

              <Button
                onClick={handleEfile}
                disabled={otp.length !== 6 || isProcessing}
                className="w-full h-16 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold uppercase tracking-widest shadow-xl shadow-green-600/20"
              >
                {isProcessing ? "Verifying & Filing..." : "E-Verify & File ITR"}
              </Button>
            </div>

            <div className="flex justify-center">
              <Button
                variant="ghost"
                onClick={prevStep}
                className="h-12 px-6 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-muted"
              >
                <ArrowLeft size={16} className="mr-2" /> Back to Summary
              </Button>
            </div>
          </div>
        )}

        {/* --- Step 5: Success --- */}
        {step === 5 && (
          <div className="bg-card p-12 rounded-[2.5rem] border-t-8 border-green-500 shadow-2xl text-center space-y-8 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.4)]">
              <CheckCircle2 size={48} className="text-white" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight">
                ITR Filed Successfully!
              </h2>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Your Income Tax Return has been E-verified
              </p>
            </div>

            <div className="bg-muted/30 rounded-2xl p-8 space-y-4 text-left border border-border inline-block min-w-[300px] w-full max-w-md">
              <div className="flex justify-between items-center text-xs font-bold uppercase border-b border-border pb-4">
                <span className="text-muted-foreground tracking-widest">
                  Acknowledgment No.
                </span>
                <span className="text-primary font-black tracking-wider">
                  {ackNumber}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold uppercase">
                <span className="text-muted-foreground tracking-widest">
                  Selected Regime
                </span>
                <span>
                  {selectedRegime === "new" ? "New Regime" : "Old Regime"}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold uppercase">
                <span className="text-muted-foreground tracking-widest">
                  Net Tax Paid
                </span>
                <span>
                  {formatINR(
                    selectedRegime === "new"
                      ? calculations.payableNew
                      : calculations.payableOld,
                  )}
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-4">
              <Button
                variant="outline"
                className="w-full max-w-md mx-auto h-14 rounded-xl font-bold uppercase tracking-widest border-border"
              >
                <FileText size={18} className="mr-2" /> Download ITR-V Receipt
              </Button>
              <Button
                onClick={() => window.location.reload()}
                className="w-full max-w-md mx-auto h-14 rounded-xl font-bold uppercase tracking-widest"
              >
                Return to Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
