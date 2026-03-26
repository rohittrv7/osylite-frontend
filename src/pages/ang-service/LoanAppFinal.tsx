import { useState, useMemo } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Landmark,
  Wallet,
  Banknote,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Car,
  Building2,
  Calculator,
  Clock,
  Percent,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ==========================================
// TYPES & MOCK DATA
// ==========================================
type Screen = "home" | "calculator" | "application" | "success";
type EmploymentType = "Salaried" | "Self-Employed" | "Business";

const LOAN_PRODUCTS = [
  {
    id: "personal",
    name: "Personal Loan",
    icon: Wallet,
    color: "text-indigo-600",
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    rate: "10.49%",
    max: "₹20 Lakhs",
    time: "10 Mins",
  },
  {
    id: "home",
    name: "Home Loan",
    icon: HomeIcon,
    color: "text-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    rate: "8.50%",
    max: "₹5 Crores",
    time: "2 Days",
  },
  {
    id: "business",
    name: "Business Loan",
    icon: Briefcase,
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    rate: "12.50%",
    max: "₹50 Lakhs",
    time: "24 Hours",
  },
  {
    id: "car",
    name: "Car Loan",
    icon: Car,
    color: "text-orange-600",
    bg: "bg-orange-100 dark:bg-orange-900/30",
    rate: "8.99%",
    max: "₹25 Lakhs",
    time: "4 Hours",
  },
  {
    id: "education",
    name: "Education Loan",
    icon: GraduationCap,
    color: "text-purple-600",
    bg: "bg-purple-100 dark:bg-purple-900/30",
    rate: "9.50%",
    max: "₹1 Crore",
    time: "3 Days",
  },
];

const FEATURES = [
  { icon: ShieldCheck, title: "100% Paperless", desc: "Digital KYC process" },
  { icon: Clock, title: "Instant Disbursal", desc: "Money in bank in 10 mins" },
  { icon: Percent, title: "Lowest Rates", desc: "Starting at 10.49% p.a." },
];

function HomeIcon(props: any) {
  return <Building2 {...props} />;
}

export default function LoanAppFinal() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [selectedProduct, setSelectedProduct] = useState(LOAN_PRODUCTS[0]);

  // Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [tenureMonths, setTenureMonths] = useState<number>(36);

  // Application State
  const [panCard, setPanCard] = useState("");
  const [fullName, setFullName] = useState("");
  const [employmentType, setEmploymentType] =
    useState<EmploymentType>("Salaried");
  const [monthlyIncome, setMonthlyIncome] = useState("");

  // Processing State
  const [isProcessing, setIsProcessing] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  // EMI Calculation Logic
  const { emi, totalInterest, totalPayment } = useMemo(() => {
    // EMI Formula: P * R * (1+R)^N / ((1+R)^N - 1)
    const P = loanAmount;
    const R = 10.49 / 12 / 100; // Monthly interest rate (using 10.49% p.a.)
    const N = tenureMonths;

    if (P > 0 && N > 0) {
      const emiCalc = Math.round(
        (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1),
      );
      const totalPay = emiCalc * N;
      const interest = totalPay - P;
      return { emi: emiCalc, totalInterest: interest, totalPayment: totalPay };
    }
    return { emi: 0, totalInterest: 0, totalPayment: 0 };
  }, [loanAmount, tenureMonths]);

  // Formatter
  const formatINR = (num: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);

  const handleProductSelect = (product: (typeof LOAN_PRODUCTS)[0]) => {
    setSelectedProduct(product);
    setCurrentScreen("calculator");
  };

  const handleApply = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setApplicationId(
        `APP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      );
      setIsProcessing(false);
      setCurrentScreen("success");
    }, 2000);
  };

  const resetFlow = () => {
    setPanCard("");
    setFullName("");
    setMonthlyIncome("");
    setApplicationId("");
    setCurrentScreen("home");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-foreground pb-24 md:pb-0 relative selection:bg-indigo-200">
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* ==========================================
            SCREEN 1: HOME (DISCOVER)
        ========================================== */}
        {currentScreen === "home" && (
          <div className="space-y-10 animate-in fade-in duration-500">
            {/* Hero Banner */}
            <div className="bg-indigo-900 rounded-[2rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                <Banknote size={300} />
              </div>
              <div className="space-y-5 relative z-10 w-full md:w-1/2">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 uppercase tracking-widest font-bold px-3 py-1">
                  Pre-Approved Offers
                </Badge>
                <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
                  Get Instant Funds up to{" "}
                  <span className="text-emerald-400">₹20 Lakhs</span>
                </h2>
                <p className="text-indigo-200 font-medium text-lg">
                  Zero hidden charges. 100% paperless process. Money transferred
                  to your bank account in minutes.
                </p>
                <Button
                  onClick={() => handleProductSelect(LOAN_PRODUCTS[0])}
                  className="h-14 px-8 rounded-xl font-black uppercase tracking-widest bg-emerald-500 hover:bg-emerald-600 text-indigo-950 shadow-xl mt-2 w-full sm:w-auto"
                >
                  Check Eligibility <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto relative z-10 mt-6 md:mt-0">
                {FEATURES.map((feat, i) => (
                  <div
                    key={i}
                    className="bg-indigo-800/50 backdrop-blur-md border border-indigo-700 p-5 rounded-2xl flex flex-col items-center text-center gap-2"
                  >
                    <feat.icon size={28} className="text-emerald-400" />
                    <p className="font-bold text-sm">{feat.title}</p>
                    <p className="text-[10px] uppercase tracking-widest font-medium text-indigo-300">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Loan Products Grid */}
            <div className="space-y-6 pb-10">
              <h2 className="text-2xl font-black tracking-tight">
                Explore Loan Products
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {LOAN_PRODUCTS.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className="bg-card p-6 rounded-3xl border border-border shadow-sm hover:shadow-xl hover:border-indigo-600/30 transition-all cursor-pointer flex flex-col gap-4 group"
                  >
                    <div
                      className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                        product.bg,
                      )}
                    >
                      <product.icon size={28} className={product.color} />
                    </div>

                    <div>
                      <h3 className="font-black text-xl leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">
                        Up to {product.max}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border mt-auto space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-muted-foreground">Starts @</span>
                        <span className="text-foreground">
                          {product.rate} p.a.
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-muted-foreground">
                          Disbursal in
                        </span>
                        <span className="text-foreground">{product.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 2: EMI CALCULATOR
        ========================================== */}
        {currentScreen === "calculator" && (
          <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
            <div
              className="flex items-center gap-4 cursor-pointer hover:text-indigo-600 w-fit"
              onClick={() => setCurrentScreen("home")}
            >
              <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                <ArrowLeft size={20} />
              </div>
              <span className="font-bold uppercase text-xs tracking-widest">
                Back to Products
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Interactive Sliders */}
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-8">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <Calculator size={28} className="text-indigo-600" />
                  <h2 className="text-2xl font-black tracking-tight">
                    {selectedProduct.name} Calculator
                  </h2>
                </div>

                {/* Amount Slider */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Loan Amount
                    </label>
                    <div className="text-2xl font-black text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-xl border border-indigo-200 dark:border-indigo-900">
                      {formatINR(loanAmount)}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="2000000"
                    step="10000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                    <span>₹50,000</span>
                    <span>₹20 Lakhs</span>
                  </div>
                </div>

                {/* Tenure Slider */}
                <div className="space-y-6 pt-4 border-t border-border">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Tenure (Months)
                    </label>
                    <div className="text-2xl font-black text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-xl border border-indigo-200 dark:border-indigo-900">
                      {tenureMonths} Mos
                    </div>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="60"
                    step="6"
                    value={tenureMonths}
                    onChange={(e) => setTenureMonths(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                    <span>6 Months</span>
                    <span>60 Months</span>
                  </div>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900 p-4 rounded-xl flex items-start gap-3">
                  <Percent
                    size={20}
                    className="text-emerald-600 shrink-0 mt-0.5"
                  />
                  <p className="text-xs font-bold text-emerald-800 dark:text-emerald-400">
                    Interest rate assumed at 10.49% p.a. Final rate depends on
                    your credit profile.
                  </p>
                </div>
              </div>

              {/* Right: EMI Summary */}
              <div className="bg-indigo-900 text-white p-6 md:p-10 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-10 -top-10 opacity-10 pointer-events-none">
                  <Landmark size={250} />
                </div>

                <div className="space-y-8 relative z-10">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-2">
                      Estimated Monthly EMI
                    </p>
                    <p className="text-5xl md:text-6xl font-black text-emerald-400">
                      {formatINR(emi)}
                    </p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-indigo-700/50">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span className="text-indigo-200">Principal Amount</span>
                      <span className="font-bold">{formatINR(loanAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span className="text-indigo-200">
                        Total Interest Payable
                      </span>
                      <span className="font-bold">
                        {formatINR(totalInterest)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-base font-bold pt-4 border-t border-indigo-700/50">
                      <span className="text-white">Total Amount Payable</span>
                      <span className="text-white">
                        {formatINR(totalPayment)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 pt-8 mt-auto">
                  <Button
                    onClick={() => setCurrentScreen("application")}
                    className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-base bg-emerald-500 hover:bg-emerald-600 text-indigo-950 shadow-xl"
                  >
                    Proceed to Apply <ArrowRight size={20} className="ml-2" />
                  </Button>
                  <p className="text-[10px] text-center mt-4 font-medium text-indigo-300">
                    Checking eligibility will not affect your CIBIL score.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 3: KYC & APPLICATION
        ========================================== */}
        {currentScreen === "application" && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-300">
            <div
              className="flex items-center gap-4 cursor-pointer hover:text-indigo-600 w-fit"
              onClick={() => setCurrentScreen("calculator")}
            >
              <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                <ArrowLeft size={20} />
              </div>
              <span className="font-bold uppercase text-xs tracking-widest">
                Back to Calculator
              </span>
            </div>

            <div className="bg-card p-6 md:p-10 rounded-3xl border border-border shadow-xl space-y-8">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">
                    Check Eligibility
                  </h2>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">
                    Takes less than 2 minutes
                  </p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600">
                  <ShieldCheck size={24} />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Permanent Account Number (PAN)
                  </label>
                  <Input
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    className="h-14 rounded-2xl font-black text-lg tracking-widest uppercase bg-background border-border focus-visible:ring-indigo-600"
                    value={panCard}
                    onChange={(e) => setPanCard(e.target.value.toUpperCase())}
                  />
                  <p className="text-[10px] font-bold text-muted-foreground">
                    Required to fetch your credit profile securely.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Full Name (As per PAN)
                  </label>
                  <Input
                    placeholder="e.g. Rahul Sharma"
                    className="h-14 rounded-2xl font-bold text-base bg-background border-border focus-visible:ring-indigo-600"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Employment Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(
                      [
                        "Salaried",
                        "Self-Employed",
                        "Business",
                      ] as EmploymentType[]
                    ).map((type) => (
                      <div
                        key={type}
                        onClick={() => setEmploymentType(type)}
                        className={cn(
                          "p-4 rounded-2xl border-2 cursor-pointer transition-all text-center",
                          employmentType === type
                            ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 font-black shadow-sm"
                            : "border-border bg-background hover:border-indigo-600/30 font-bold text-muted-foreground",
                        )}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Monthly Net Income
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-muted-foreground text-lg">
                      ₹
                    </span>
                    <Input
                      type="number"
                      placeholder="50000"
                      className="h-14 pl-10 rounded-2xl font-black text-lg bg-background border-border focus-visible:ring-indigo-600"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <Button
                  onClick={handleApply}
                  disabled={
                    panCard.length !== 10 ||
                    !fullName ||
                    !monthlyIncome ||
                    isProcessing
                  }
                  className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/20"
                >
                  {isProcessing ? "Verifying Profile..." : "View Final Offer"}
                </Button>
                <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-4">
                  <ShieldCheck size={14} className="text-emerald-500" /> 256-bit
                  Secure Encryption
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 4: SUCCESS TICKET
        ========================================== */}
        {currentScreen === "success" && (
          <div className="max-w-lg mx-auto w-full bg-card rounded-[2.5rem] border border-border shadow-2xl p-8 md:p-10 text-center space-y-8 mt-4 animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(16,185,129,0.4)]">
              <CheckCircle2 size={48} className="text-white" />
            </div>

            <div className="space-y-2">
              <Badge className="bg-emerald-100 text-emerald-700 border-none uppercase tracking-widest font-black mb-2 px-3 py-1">
                Pre-Approved
              </Badge>
              <h2 className="text-3xl font-black tracking-tight">
                Congratulations!
              </h2>
              <p className="text-sm font-bold text-muted-foreground">
                {fullName}, your loan application is approved.
              </p>
            </div>

            <div className="bg-indigo-900 text-white rounded-3xl p-6 text-left border border-indigo-800 shadow-inner relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-10">
                <Banknote size={150} />
              </div>

              <div className="relative z-10 space-y-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">
                    Approved Loan Amount
                  </p>
                  <p className="text-4xl font-black text-emerald-400 mt-1">
                    {formatINR(loanAmount)}
                  </p>
                </div>

                <div className="flex justify-between items-center bg-indigo-800/50 p-3 rounded-xl border border-indigo-700/50">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">
                      Final EMI
                    </p>
                    <p className="font-black text-lg">
                      {formatINR(emi)}{" "}
                      <span className="text-[10px] font-medium text-indigo-200">
                        /mo
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">
                      Tenure
                    </p>
                    <p className="font-black text-lg">
                      {tenureMonths}{" "}
                      <span className="text-[10px] font-medium text-indigo-200">
                        Mos
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs font-bold uppercase pt-2 border-t border-indigo-700/50">
                  <span className="text-indigo-300 tracking-widest">
                    Application ID
                  </span>
                  <span className="text-white tracking-wider">
                    {applicationId}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 p-4 rounded-2xl text-left flex items-start gap-3">
              <FileText size={24} className="text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-sm text-blue-800 dark:text-blue-400">
                  Next Step: e-Mandate
                </p>
                <p className="text-xs font-medium text-blue-700/80 dark:text-blue-400/80">
                  Set up auto-pay with your bank account to get instant
                  disbursal within 10 minutes.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <Button className="w-full h-14 rounded-xl font-black uppercase tracking-widest bg-emerald-500 hover:bg-emerald-600 text-indigo-950 shadow-xl transition-transform hover:scale-[1.02]">
                Setup Auto-Pay & Get Money
              </Button>
              <Button
                onClick={resetFlow}
                variant="outline"
                className="w-full h-14 rounded-xl font-bold uppercase tracking-widest border-border hover:bg-muted"
              >
                Return to Dashboard
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
