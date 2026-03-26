import React, { useState, useMemo } from "react";
import {
  Monitor,
  Smartphone,
  Rocket,
  Layers,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Wallet,
  Laptop,
  Zap,
  Settings,
  ShieldCheck,
  ChevronRight,
  Globe,
  Database,
  Cpu,
  MessageSquareCode,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ==========================================
// TYPES & MOCK DATA
// ==========================================
type Screen = "home" | "builder" | "checkout" | "success";

interface WebService {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  basePrice: number;
  baseTimeline: number; // in weeks
  category: string;
  popular?: boolean;
}

interface FeatureAddon {
  id: string;
  name: string;
  price: number;
  timelineAdded: number; // weeks added
  icon: React.ElementType;
}

const SERVICES: WebService[] = [
  {
    id: "W1",
    name: "Modern Landing Page",
    description:
      "High-converting, animated single-page websites for marketing.",
    icon: Monitor,
    basePrice: 25000,
    baseTimeline: 1,
    category: "Frontend",
  },
  {
    id: "W2",
    name: "Progressive Web App (PWA)",
    description:
      "App-like experience on the web. Fast, offline-capable, and installable.",
    icon: Smartphone,
    basePrice: 65000,
    baseTimeline: 3,
    category: "Full-Stack",
    popular: true,
  },
  {
    id: "W3",
    name: "SaaS Platform & Dashboard",
    description:
      "Complex custom portals with authentication, databases, and analytics.",
    icon: Database,
    basePrice: 120000,
    baseTimeline: 6,
    category: "MERN Stack",
  },
  {
    id: "W4",
    name: "E-Commerce Store",
    description:
      "Full-fledged online store with cart, checkout, and inventory management.",
    icon: Globe,
    basePrice: 85000,
    baseTimeline: 4,
    category: "Full-Stack",
  },
];

const ADDONS: FeatureAddon[] = [
  {
    id: "F1",
    name: "Custom Admin Panel",
    price: 30000,
    timelineAdded: 2,
    icon: Settings,
  },
  {
    id: "F2",
    name: "Payment Gateway Integration",
    price: 15000,
    timelineAdded: 1,
    icon: CreditCard,
  },
  {
    id: "F3",
    name: "Advanced UI Animations",
    price: 20000,
    timelineAdded: 1,
    icon: Zap,
  },
  {
    id: "F4",
    name: "SEO & Performance Setup",
    price: 10000,
    timelineAdded: 0,
    icon: Rocket,
  },
];

export default function WebDevAppFinal() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");

  // Project Scope State
  const [selectedService, setSelectedService] = useState<WebService | null>(
    null,
  );
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // Checkout State
  const [businessName, setBusinessName] = useState("");
  const [projectBrief, setProjectBrief] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Processing
  const [isProcessing, setIsProcessing] = useState(false);
  const [projectId, setProjectId] = useState("");

  // Calculations
  const { totalEstimatedCost, totalTimeline, advanceToken } = useMemo(() => {
    if (!selectedService)
      return { totalEstimatedCost: 0, totalTimeline: 0, advanceToken: 0 };

    let cost = selectedService.basePrice;
    let weeks = selectedService.baseTimeline;

    selectedFeatures.forEach((featId) => {
      const feat = ADDONS.find((f) => f.id === featId);
      if (feat) {
        cost += feat.price;
        weeks += feat.timelineAdded;
      }
    });

    const token = Math.round(cost * 0.1); // 10% Advance Token
    return {
      totalEstimatedCost: cost,
      totalTimeline: weeks,
      advanceToken: token,
    };
  }, [selectedService, selectedFeatures]);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const handleConfirmProject = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setProjectId(
        `PRJ-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      );
      setIsProcessing(false);
      setCurrentScreen("success");
    }, 2000);
  };

  const resetFlow = () => {
    setSelectedService(null);
    setSelectedFeatures([]);
    setBusinessName("");
    setProjectBrief("");
    setProjectId("");
    setCurrentScreen("home");
  };

  const formatINR = (num: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-24 md:pb-0">
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* ==========================================
            SCREEN 1: HOME (SERVICES)
        ========================================== */}
        {currentScreen === "home" && (
          <div className="space-y-16 animate-in fade-in duration-500">
            {/* Hero Section */}
            <div className="relative rounded-[2.5rem] bg-card border border-border p-8 md:p-16 overflow-hidden shadow-sm">
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none">
                <Cpu
                  size={400}
                  className="absolute -right-20 -top-20 text-foreground"
                />
              </div>

              <div className="relative z-10 max-w-2xl space-y-6">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-none uppercase tracking-widest font-black px-3 py-1"
                >
                  Scalable Web Solutions
                </Badge>
                <h2 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight text-foreground">
                  We build{" "}
                  <span className="text-primary">Digital Products</span> that
                  scale.
                </h2>
                <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                  From lightning-fast Progressive Web Apps (PWA) to complex MERN
                  Stack SaaS platforms, we turn your ideas into robust code.
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  {["React", "NestJS", "Tailwind CSS", "MongoDB"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 rounded-lg bg-muted border border-border text-xs font-bold text-muted-foreground flex items-center gap-2"
                      >
                        <Zap size={14} className="text-primary" /> {tech}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Service Selection */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-black tracking-tight text-foreground">
                  Select a Project Type
                </h2>
                <p className="text-muted-foreground font-medium">
                  Choose your base architecture to get an instant estimate.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SERVICES.map((svc) => (
                  <div
                    key={svc.id}
                    onClick={() => {
                      setSelectedService(svc);
                      setCurrentScreen("builder");
                    }}
                    className="group bg-card p-8 rounded-3xl border border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer flex flex-col gap-6 relative overflow-hidden"
                  >
                    {svc.popular && (
                      <div className="absolute top-6 right-6 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-primary/20">
                        Popular Choice
                      </div>
                    )}

                    <div className="w-16 h-16 rounded-2xl bg-muted border border-border flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                      <svc.icon size={32} className="text-primary" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-black text-2xl text-foreground">
                        {svc.name}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                        {svc.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-auto border-t border-border flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          Starts From
                        </p>
                        <p className="font-black text-xl text-foreground mt-1">
                          {formatINR(svc.basePrice)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-foreground bg-muted px-3 py-1.5 rounded-lg border border-border">
                        <Clock size={14} className="text-primary" /> ~
                        {svc.baseTimeline} Weeks
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 2: PROJECT SCOPE BUILDER
        ========================================== */}
        {currentScreen === "builder" && selectedService && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative animate-in slide-in-from-right-8 duration-300">
            {/* Left: Features Builder */}
            <div className="lg:col-span-2 space-y-8">
              <div
                className="flex items-center gap-3 cursor-pointer hover:text-primary w-fit transition-colors"
                onClick={() => setCurrentScreen("home")}
              >
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                  <ArrowLeft size={18} className="text-foreground" />
                </div>
                <span className="font-bold uppercase text-xs tracking-widest text-muted-foreground">
                  Back to Services
                </span>
              </div>

              <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
                <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] uppercase tracking-widest mb-3">
                  Base Architecture Selected
                </Badge>
                <h2 className="text-3xl font-black text-foreground">
                  {selectedService.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  {selectedService.description}
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-black text-foreground">
                  Add Features & Integrations
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ADDONS.map((addon) => {
                    const isSelected = selectedFeatures.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleFeature(addon.id)}
                        className={cn(
                          "p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col gap-4 relative",
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card hover:border-primary/30",
                        )}
                      >
                        {isSelected && (
                          <div className="absolute top-4 right-4">
                            <CheckCircle2 size={20} className="text-primary" />
                          </div>
                        )}

                        <div
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center border",
                            isSelected
                              ? "bg-background border-primary/20"
                              : "bg-muted border-border",
                          )}
                        >
                          <addon.icon
                            size={24}
                            className={
                              isSelected
                                ? "text-primary"
                                : "text-muted-foreground"
                            }
                          />
                        </div>

                        <div>
                          <h4 className="font-bold text-foreground text-lg leading-tight">
                            {addon.name}
                          </h4>
                          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-2">
                            + {formatINR(addon.price)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Desktop Live Estimate */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-28 bg-card rounded-3xl border border-border shadow-sm p-8 space-y-8">
                <h3 className="text-xl font-black text-foreground uppercase tracking-widest">
                  Project Estimate
                </h3>

                <div className="space-y-4">
                  <div className="bg-background rounded-2xl p-5 border border-border space-y-4">
                    <div className="flex justify-between items-start border-b border-border pb-4">
                      <div className="w-[65%]">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
                          Base App
                        </p>
                        <p className="font-bold text-sm text-foreground leading-tight">
                          {selectedService.name}
                        </p>
                      </div>
                      <span className="font-black text-foreground">
                        {formatINR(selectedService.basePrice)}
                      </span>
                    </div>

                    {selectedFeatures.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          Included Features
                        </p>
                        {selectedFeatures.map((id) => {
                          const addon = ADDONS.find((a) => a.id === id);
                          return addon ? (
                            <div
                              key={id}
                              className="flex justify-between items-center text-xs font-medium text-foreground"
                            >
                              <span className="truncate pr-4">
                                {addon.name}
                              </span>
                              <span className="shrink-0">
                                {formatINR(addon.price)}
                              </span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-muted-foreground">
                      Estimated Timeline
                    </span>
                    <span className="font-black text-primary text-lg">
                      {totalTimeline} Weeks
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-muted-foreground">
                      Total Project Value
                    </span>
                    <span className="font-black text-foreground text-2xl">
                      {formatINR(totalEstimatedCost)}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={() => setCurrentScreen("checkout")}
                    className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-sm bg-primary text-primary-foreground shadow-sm transition-all hover:opacity-90"
                  >
                    Proceed to Kickoff <ArrowRight size={18} className="ml-2" />
                  </Button>
                  <p className="text-[10px] text-center font-medium text-muted-foreground mt-4">
                    This is a rough estimate. Final scope will be discussed
                    during discovery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 3: CHECKOUT (Brief & Token Advance)
        ========================================== */}
        {currentScreen === "checkout" && selectedService && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-right-8 duration-300">
            {/* Left: Project Details Form */}
            <div className="lg:col-span-2 space-y-8">
              <div
                className="flex items-center gap-3 cursor-pointer hover:text-primary w-fit"
                onClick={() => setCurrentScreen("builder")}
              >
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                  <ArrowLeft size={18} className="text-foreground" />
                </div>
                <span className="font-bold uppercase text-xs tracking-widest text-muted-foreground">
                  Back to Estimate
                </span>
              </div>

              <div className="bg-card p-8 rounded-3xl border border-border shadow-sm space-y-8">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <MessageSquareCode size={24} className="text-primary" />
                  <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">
                    Project Brief
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Business / Project Name
                    </label>
                    <Input
                      placeholder="E.g. Ark Web Solutions"
                      className="h-14 rounded-2xl bg-background border-border text-foreground font-bold focus-visible:ring-primary"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Your Email
                    </label>
                    <Input
                      type="email"
                      placeholder="founder@startup.com"
                      className="h-14 rounded-2xl bg-background border-border text-foreground font-bold focus-visible:ring-primary"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Project Requirements (Optional)
                  </label>
                  <textarea
                    placeholder="Briefly describe what you want to build. Any specific tech stack preferences?"
                    className="w-full bg-background border border-border rounded-2xl p-5 focus:outline-none focus:ring-2 focus:ring-primary text-foreground font-medium resize-none min-h-[120px]"
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                  />
                </div>
              </div>

              {/* Payment (Token Advance) */}
              <div className="bg-card p-8 rounded-3xl border border-border shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <Wallet size={24} className="text-primary" />
                  <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">
                    Kickoff Payment
                  </h2>
                </div>

                <div className="bg-primary/5 border border-primary/20 p-5 rounded-2xl flex items-start gap-4">
                  <ShieldCheck
                    size={24}
                    className="text-primary shrink-0 mt-0.5"
                  />
                  <div className="space-y-2">
                    <p className="font-black text-sm text-primary uppercase tracking-widest">
                      10% Token Advance Required
                    </p>
                    <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                      To initiate the SRS (Software Requirements Specification)
                      and Wireframing phase, a 10% token advance of the
                      estimated value is required. The rest is divided into
                      milestones.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { id: "upi", icon: Wallet, title: "UPI / QR Code" },
                    {
                      id: "card",
                      icon: CreditCard,
                      title: "Credit / Debit Card (Stripe)",
                    },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={cn(
                        "flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all bg-background",
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30",
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <method.icon
                          size={24}
                          className={
                            paymentMethod === method.id
                              ? "text-primary"
                              : "text-muted-foreground"
                          }
                        />
                        <span className="font-bold text-foreground">
                          {method.title}
                        </span>
                      </div>
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="w-5 h-5 accent-primary"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Bill Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-3xl border border-border shadow-sm p-8 space-y-8">
                <h3 className="text-xl font-black text-foreground uppercase tracking-widest">
                  Payment Summary
                </h3>

                <div className="bg-background rounded-2xl p-5 border border-border space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold border-b border-border pb-3">
                    <span className="text-muted-foreground">
                      Total Project Value
                    </span>
                    <span className="text-foreground">
                      {formatINR(totalEstimatedCost)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground pt-1">
                    <span>Base Setup</span>
                    <span className="text-foreground">
                      {selectedService.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center font-black text-2xl border-b border-border pb-6">
                    <div className="flex flex-col">
                      <span className="text-foreground">Token Advance</span>
                      <span className="text-[10px] uppercase tracking-widest text-primary mt-1">
                        10% of Total Value
                      </span>
                    </div>
                    <span className="text-primary">
                      {formatINR(advanceToken)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleConfirmProject}
                  disabled={!businessName || !email || isProcessing}
                  className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-sm bg-primary hover:opacity-90 text-primary-foreground shadow-sm transition-all"
                >
                  {isProcessing
                    ? "Initializing Workspace..."
                    : `Pay ${formatINR(advanceToken)} securely`}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 4: SUCCESS TICKET
        ========================================== */}
        {currentScreen === "success" && selectedService && (
          <div className="max-w-xl mx-auto w-full bg-card rounded-[2.5rem] border border-border shadow-lg p-8 md:p-12 text-center space-y-10 mt-4 md:mt-10 animate-in zoom-in-95 duration-500 relative overflow-hidden">
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-sm relative z-10 rotate-3">
              <CheckCircle2 size={40} className="text-primary-foreground" />
            </div>

            <div className="space-y-3 relative z-10">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                Project Kicked Off!
              </h2>
              <p className="text-sm font-medium text-muted-foreground">
                Welcome aboard,{" "}
                <span className="text-foreground font-bold">
                  {businessName}
                </span>
                . Your workspace is ready.
              </p>
            </div>

            <div className="bg-background rounded-3xl p-6 text-left border border-border space-y-5 relative z-10">
              <div className="flex justify-between items-center text-xs font-bold uppercase border-b border-border pb-4">
                <span className="text-muted-foreground tracking-widest">
                  Project ID
                </span>
                <span className="text-primary font-black text-sm tracking-wider">
                  {projectId}
                </span>
              </div>

              <div className="space-y-4 pt-1">
                <div className="flex justify-between items-center text-xs font-bold uppercase">
                  <span className="text-muted-foreground tracking-widest flex items-center gap-2">
                    <Layers size={14} /> Stack
                  </span>
                  <span className="text-foreground">
                    {selectedService.category}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold uppercase">
                  <span className="text-muted-foreground tracking-widest flex items-center gap-2">
                    <Clock size={14} /> Est. Timeline
                  </span>
                  <span className="text-foreground">{totalTimeline} Weeks</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold uppercase border-t border-border pt-4">
                  <span className="text-muted-foreground tracking-widest flex items-center gap-2">
                    <CreditCard size={14} /> Advance Paid
                  </span>
                  <span className="text-primary font-black text-base">
                    {formatINR(advanceToken)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/10 p-5 rounded-2xl text-left flex items-start gap-4 relative z-10">
              <Laptop size={24} className="text-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-sm text-primary">
                  Discovery Call Scheduled
                </p>
                <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                  Our Lead Developer will reach out to{" "}
                  <span className="text-foreground">{email}</span> within 24
                  hours with the wireframing schedule and Slack channel invite.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-3 relative z-10">
              <Button
                onClick={resetFlow}
                className="w-full h-14 rounded-xl font-bold uppercase tracking-widest border border-border bg-background hover:bg-muted text-foreground transition-colors shadow-sm"
              >
                Return to Home
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Action Bar (Scope to Checkout) */}
      {selectedService && currentScreen === "builder" && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card p-4 border-t border-border shadow-[0_-10px_30px_rgba(0,0,0,0.1)] z-50 rounded-t-3xl animate-in slide-in-from-bottom-5">
          <div
            onClick={() => setCurrentScreen("checkout")}
            className="bg-primary text-primary-foreground p-4 rounded-2xl flex justify-between items-center cursor-pointer shadow-md"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/80">
                Total Estimate
              </p>
              <p className="text-xl font-black">
                {formatINR(totalEstimatedCost)}
              </p>
            </div>
            <div className="flex items-center gap-1 font-bold text-sm uppercase tracking-widest">
              Continue <ChevronRight size={18} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
