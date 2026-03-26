import { useState, useMemo, useEffect } from "react";
import {
  Search,
  ArrowLeft,
  CheckCircle2,
  CalendarDays,
  Briefcase,
  Wallet,
  CreditCard,
  ShieldCheck,
  PhoneCall,
  Scale,
  Landmark,
  FileText,
  Lock,
  Video,
  Phone,
  Building2,
  FileSignature,
  Building,
  Users,
  Star,
  ArrowRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// ==========================================
// TYPES & MOCK DATA
// ==========================================
type Screen = "home" | "profile" | "checkout" | "success";
type ConsultMode = "Video Call" | "Phone Call" | "Office Visit";

interface Lawyer {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  reviews: number;
  consultationFee: number;
  courts: string[];
  modes: ConsultMode[];
  image: string;
  languages: string[];
  verified: boolean;
}

const CATEGORIES = [
  {
    name: "Corporate",
    icon: Building,
    color: "text-slate-700",
    bg: "bg-slate-700/10",
  },
  {
    name: "Property",
    icon: Building2,
    color: "text-emerald-700",
    bg: "bg-emerald-700/10",
  },
  {
    name: "Family Law",
    icon: Users,
    color: "text-rose-700",
    bg: "bg-rose-700/10",
  },
  { name: "Criminal", icon: Scale, color: "text-red-700", bg: "bg-red-700/10" },
  {
    name: "Contracts",
    icon: FileSignature,
    color: "text-blue-700",
    bg: "bg-blue-700/10",
  },
];

const LAWYERS: Lawyer[] = [
  {
    id: "L1",
    name: "Adv. Vikram Desai",
    specialty: "Corporate & Startup Law",
    experience: 15,
    rating: 4.9,
    reviews: 342,
    consultationFee: 2500,
    courts: ["High Court", "Supreme Court"],
    modes: ["Video Call", "Phone Call", "Office Visit"],
    languages: ["English", "Hindi"],
    verified: true,
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80",
  },
  {
    id: "L2",
    name: "Adv. Priya Sharma",
    specialty: "Family & Divorce Law",
    experience: 12,
    rating: 4.8,
    reviews: 512,
    consultationFee: 1500,
    courts: ["Family Court", "High Court"],
    modes: ["Video Call", "Office Visit"],
    languages: ["English", "Hindi", "Marathi"],
    verified: true,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80",
  },
  {
    id: "L3",
    name: "Adv. Rohan Mehta",
    specialty: "Property & Real Estate",
    experience: 20,
    rating: 4.7,
    reviews: 890,
    consultationFee: 3000,
    courts: ["Civil Court", "High Court"],
    modes: ["Phone Call", "Office Visit"],
    languages: ["English", "Hindi", "Gujarati"],
    verified: true,
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=500&q=80",
  },
  {
    id: "L4",
    name: "Adv. Sarah Khan",
    specialty: "Criminal Defense",
    experience: 18,
    rating: 4.9,
    reviews: 420,
    consultationFee: 5000,
    courts: ["Sessions Court", "High Court", "Supreme Court"],
    modes: ["Video Call", "Office Visit"],
    languages: ["English", "Urdu", "Hindi"],
    verified: true,
    image:
      "https://images.unsplash.com/photo-1580820267616-f45038f830cd?w=500&q=80",
  },
];

const TIME_SLOTS = ["10:30 AM", "12:00 PM", "02:30 PM", "04:00 PM", "06:00 PM"];

export default function LegalAppFinal() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");

  // Discover State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Booking State
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [consultMode, setConsultMode] = useState<ConsultMode>("Video Call");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [availableDates, setAvailableDates] = useState<Date[]>([]);

  // Checkout State
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [caseBrief, setCaseBrief] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Processing State
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const PLATFORM_FEE = 99;

  // Initialize Dates
  useEffect(() => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    setAvailableDates(dates);
    setSelectedDate(dates[0]);
  }, []);

  // Filter Logic
  const filteredLawyers = useMemo(() => {
    return LAWYERS.filter((l) => {
      const matchSearch =
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = activeCategory
        ? l.specialty.includes(activeCategory) ||
          (activeCategory === "Contracts" && l.specialty.includes("Corporate"))
        : true;
      return matchSearch && matchCat;
    });
  }, [searchQuery, activeCategory]);

  const totalPayable = selectedLawyer
    ? selectedLawyer.consultationFee + PLATFORM_FEE
    : 0;

  // Handlers
  const handleLawyerSelect = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setConsultMode(lawyer.modes[0]);
    setSelectedDate(availableDates[0]);
    setSelectedTime("");
    setCurrentScreen("profile");
  };

  const handleConfirmBooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setBookingId(
        `LGL${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      );
      setIsProcessing(false);
      setCurrentScreen("success");
    }, 1500);
  };

  const resetFlow = () => {
    setSelectedLawyer(null);
    setSelectedTime("");
    setCaseBrief("");
    setClientName("");
    setClientPhone("");
    setBookingId("");
    setCurrentScreen("home");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-foreground pb-24 md:pb-0 relative">
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* ==========================================
            SCREEN 1: HOME (DISCOVER)
        ========================================== */}
        {currentScreen === "home" && (
          <div className="space-y-10 animate-in fade-in duration-500">
            {/* Mobile Search */}
            <div className="md:hidden relative shadow-sm rounded-xl">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                size={20}
              />
              <Input
                placeholder="Search lawyers or legal issues"
                className="h-14 pl-10 rounded-xl bg-card border-border font-bold focus-visible:ring-slate-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Trust Banner */}
            <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden">
              <div className="absolute -right-20 -top-20 opacity-10 rotate-12 pointer-events-none">
                <Scale size={300} />
              </div>
              <div className="space-y-4 relative z-10">
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 uppercase tracking-widest font-bold px-3 py-1">
                  100% Confidential
                </Badge>
                <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
                  Find the right legal counsel,
                  <br />{" "}
                  <span className="text-amber-500">without the hassle.</span>
                </h2>
                <p className="text-slate-300 font-medium max-w-xl text-lg">
                  Book highly experienced advocates for consultation via Video
                  Call, Phone, or In-Person visits.
                </p>
              </div>
              <div className="hidden lg:flex gap-4 shrink-0 relative z-10">
                <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-4 rounded-2xl text-center">
                  <p className="text-3xl font-black text-amber-500">500+</p>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">
                    Verified Lawyers
                  </p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-4 rounded-2xl text-center">
                  <p className="text-3xl font-black text-amber-500">24/7</p>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">
                    Legal Support
                  </p>
                </div>
              </div>
            </div>

            {/* Legal Categories */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black tracking-tight">
                  Browse by Legal Issue
                </h2>
                {activeCategory && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setActiveCategory(null)}
                    className="text-xs font-bold uppercase text-red-500"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={cn(
                      "flex items-center gap-3 px-5 py-3.5 rounded-2xl border-2 cursor-pointer transition-all shrink-0",
                      activeCategory === cat.name
                        ? "border-slate-900 bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900 dark:border-white"
                        : "border-border bg-card hover:border-slate-900/50",
                    )}
                  >
                    <cat.icon
                      size={20}
                      className={
                        activeCategory === cat.name
                          ? "text-amber-500"
                          : "text-muted-foreground"
                      }
                    />
                    <span className="font-bold text-sm whitespace-nowrap">
                      {cat.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lawyers Grid */}
            <div className="space-y-6 pb-10">
              <h2 className="text-2xl font-black tracking-tight">
                {activeCategory
                  ? `Top ${activeCategory} Lawyers`
                  : "Top Rated Advocates"}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredLawyers.length > 0 ? (
                  filteredLawyers.map((lawyer) => (
                    <div
                      key={lawyer.id}
                      onClick={() => handleLawyerSelect(lawyer)}
                      className="bg-card p-6 rounded-3xl border border-border shadow-sm hover:shadow-xl hover:border-slate-900/30 transition-all cursor-pointer flex flex-col md:flex-row gap-6"
                    >
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-muted overflow-hidden shrink-0 shadow-inner">
                        <img
                          src={lawyer.image}
                          alt={lawyer.name}
                          className="w-full h-full object-cover grayscale-[20%]"
                        />
                      </div>

                      <div className="space-y-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-black text-xl leading-tight">
                                  {lawyer.name}
                                </h3>
                                {lawyer.verified && (
                                  <CheckCircle2
                                    size={16}
                                    className="text-blue-600 fill-blue-100"
                                  />
                                )}
                              </div>
                              <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
                                {lawyer.specialty}
                              </p>
                            </div>
                            <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500 border-none font-bold text-[11px] px-2 py-0.5 rounded flex items-center gap-1">
                              {lawyer.rating}{" "}
                              <Star size={10} className="fill-current" />
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-3">
                            <span className="flex items-center gap-1">
                              <Briefcase size={12} /> {lawyer.experience} Yrs
                              Exp.
                            </span>
                            <span className="flex items-center gap-1">
                              <Landmark size={12} /> {lawyer.courts[0]}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-end pt-4 border-t border-border mt-auto">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                              Consultation Fee
                            </p>
                            <p className="font-black text-xl">
                              ₹{lawyer.consultationFee}
                            </p>
                          </div>
                          <Button className="h-10 px-6 rounded-xl font-bold uppercase text-[10px] tracking-widest bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800">
                            Book Slot
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-20 flex flex-col items-center text-center border-2 border-dashed border-border rounded-3xl">
                    <Scale
                      size={48}
                      className="text-muted-foreground opacity-20 mb-4"
                    />
                    <p className="font-bold uppercase tracking-widest">
                      No counsel found for this category
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 2: LAWYER PROFILE & SCHEDULING
        ========================================== */}
        {currentScreen === "profile" && selectedLawyer && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
            {/* Left: Lawyer Details */}
            <div className="lg:col-span-2 space-y-6">
              <div
                className="flex items-center gap-4 cursor-pointer hover:text-slate-900 dark:hover:text-white w-fit mb-2"
                onClick={() => setCurrentScreen("home")}
              >
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                  <ArrowLeft size={20} />
                </div>
                <span className="font-bold uppercase text-xs tracking-widest">
                  Back to Directory
                </span>
              </div>

              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row gap-8">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-muted overflow-hidden shrink-0 shadow-inner">
                  <img
                    src={selectedLawyer.image}
                    alt={selectedLawyer.name}
                    className="w-full h-full object-cover grayscale-[10%]"
                  />
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                          {selectedLawyer.name}
                        </h1>
                        {selectedLawyer.verified && (
                          <ShieldCheck size={24} className="text-blue-600" />
                        )}
                      </div>
                      <Badge className="bg-amber-500 text-white font-bold text-sm px-2 py-1 rounded-lg border-none flex items-center gap-1">
                        {selectedLawyer.rating}{" "}
                        <Star size={14} className="fill-white" />
                      </Badge>
                    </div>
                    <p className="text-lg font-bold text-slate-600 dark:text-slate-400 mt-1">
                      {selectedLawyer.specialty}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Experience
                      </p>
                      <p className="font-black text-sm">
                        {selectedLawyer.experience} Years
                      </p>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Languages
                      </p>
                      <p className="font-black text-sm">
                        {selectedLawyer.languages.join(", ")}
                      </p>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Consultations
                      </p>
                      <p className="font-black text-sm">
                        {selectedLawyer.reviews}+
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-zinc-900 p-3 rounded-xl border border-border flex items-center gap-2">
                    <Landmark size={16} className="text-slate-500 shrink-0" />
                    <p className="text-xs font-bold text-muted-foreground">
                      Practices in:{" "}
                      <span className="text-foreground">
                        {selectedLawyer.courts.join(", ")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Notice */}
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900 p-4 rounded-2xl flex items-start gap-3">
                <ShieldCheck size={24} className="text-blue-600 shrink-0" />
                <div className="space-y-1">
                  <p className="font-bold text-sm text-blue-800 dark:text-blue-400">
                    Bar Council Verified
                  </p>
                  <p className="text-xs font-medium text-blue-700/80 dark:text-blue-400/80">
                    This advocate's credentials and Bar Council enrollment have
                    been strictly verified by our legal team.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Sticky Scheduler */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-3xl border border-border shadow-sm p-6 md:p-8 space-y-8">
                <h3 className="text-2xl font-black">Book Consultation</h3>

                {/* Consult Mode Selection */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Mode of Consultation
                  </label>
                  <div className="flex gap-3">
                    {selectedLawyer.modes.map((mode) => (
                      <div
                        key={mode}
                        onClick={() => setConsultMode(mode)}
                        className={cn(
                          "flex-1 p-3 rounded-2xl border-2 cursor-pointer flex flex-col items-center justify-center gap-2 transition-all",
                          consultMode === mode
                            ? "border-slate-900 bg-slate-900 text-white dark:bg-white dark:text-slate-900 dark:border-white shadow-md"
                            : "border-border bg-background hover:border-slate-900/30 text-muted-foreground",
                        )}
                      >
                        {mode === "Video Call" && <Video size={20} />}
                        {mode === "Phone Call" && <PhoneCall size={20} />}
                        {mode === "Office Visit" && <Building2 size={20} />}
                        <span className="font-bold text-[10px] uppercase tracking-widest text-center leading-tight">
                          {mode}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Horizontal Date Picker */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Select Date
                  </label>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {availableDates.map((date, i) => {
                      const isSelected =
                        selectedDate?.toDateString() === date.toDateString();
                      return (
                        <div
                          key={i}
                          onClick={() => setSelectedDate(date)}
                          className={cn(
                            "flex flex-col items-center justify-center min-w-[70px] h-[85px] rounded-2xl border-2 cursor-pointer transition-all shrink-0",
                            isSelected
                              ? "border-slate-900 bg-slate-900 text-white dark:bg-white dark:text-slate-900 dark:border-white shadow-md"
                              : "border-border bg-background hover:border-slate-900/30",
                          )}
                        >
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                            {date.toLocaleDateString("en-IN", {
                              weekday: "short",
                            })}
                          </span>
                          <span className="text-2xl font-black">
                            {date.getDate()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {TIME_SLOTS.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          "h-12 rounded-xl border-2 font-bold text-xs transition-all",
                          selectedTime === time
                            ? "border-slate-900 bg-slate-900/5 text-slate-900 dark:border-white dark:bg-white/10 dark:text-white shadow-sm"
                            : "border-border bg-background hover:border-slate-900/30 text-muted-foreground",
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => setCurrentScreen("checkout")}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-sm bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl hover:bg-slate-800"
                >
                  Continue to Brief <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 3: CHECKOUT (Case Brief & Pay)
        ========================================== */}
        {currentScreen === "checkout" && selectedLawyer && selectedDate && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-right-8 duration-300">
            {/* Left: Forms */}
            <div className="lg:col-span-2 space-y-8">
              <div
                className="flex items-center gap-4 cursor-pointer hover:text-slate-900 w-fit"
                onClick={() => setCurrentScreen("profile")}
              >
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                  <ArrowLeft size={20} />
                </div>
                <span className="font-bold uppercase text-xs tracking-widest">
                  Back to Scheduler
                </span>
              </div>

              {/* 1. Case Details (Confidential) */}
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-2">
                    <FileText
                      size={24}
                      className="text-slate-900 dark:text-white"
                    />
                    <h2 className="text-xl font-black uppercase tracking-tight">
                      Case Brief
                    </h2>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700 border-none font-bold text-[10px] uppercase tracking-widest px-2 py-1 flex items-center gap-1">
                    <Lock size={12} /> Confidential
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Client Name
                    </label>
                    <Input
                      placeholder="Your Full Name"
                      className="h-14 rounded-2xl bg-background border-border font-bold"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Phone Number
                    </label>
                    <Input
                      placeholder="For communication"
                      className="h-14 rounded-2xl bg-background border-border font-bold"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                    Brief description of your legal issue
                    <span className="text-muted-foreground/50 lowercase normal-case font-medium">
                      Shared securely with counsel
                    </span>
                  </label>
                  <div className="relative">
                    <textarea
                      placeholder="E.g. I need advice regarding a property dispute in civil court..."
                      className="w-full bg-background border border-border rounded-2xl p-4 focus:outline-none focus:border-slate-900 font-medium resize-none min-h-[120px]"
                      value={caseBrief}
                      onChange={(e) => setCaseBrief(e.target.value)}
                    />
                    <Lock
                      size={16}
                      className="absolute bottom-4 right-4 text-muted-foreground/30 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Payment Method */}
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-border pb-4">
                  <Wallet
                    size={24}
                    className="text-slate-900 dark:text-white"
                  />
                  <h2 className="text-xl font-black uppercase tracking-tight">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-3">
                  {[
                    { id: "upi", icon: Wallet, title: "Pay via UPI" },
                    {
                      id: "card",
                      icon: CreditCard,
                      title: "Credit / Debit Card",
                    },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={cn(
                        "flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all bg-background",
                        paymentMethod === method.id
                          ? "border-slate-900 bg-slate-900/5 dark:bg-white/10 dark:border-white"
                          : "border-border hover:border-slate-900/30",
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <method.icon
                          size={24}
                          className={
                            paymentMethod === method.id
                              ? "text-slate-900 dark:text-white"
                              : "text-muted-foreground"
                          }
                        />
                        <span className="font-bold text-base">
                          {method.title}
                        </span>
                      </div>
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="w-5 h-5 accent-slate-900 dark:accent-white"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Bill Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-3xl border border-border shadow-sm p-6 md:p-8 space-y-6">
                <h3 className="text-2xl font-black">Summary</h3>

                <div className="bg-background rounded-2xl p-4 border border-border space-y-3">
                  <div className="flex items-center gap-3 border-b border-border pb-3">
                    <Avatar className="w-12 h-12">
                      <img
                        src={selectedLawyer.image}
                        alt={selectedLawyer.name}
                      />
                    </Avatar>
                    <div className="truncate">
                      <p className="font-bold text-sm truncate">
                        {selectedLawyer.name}
                      </p>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest truncate">
                        {selectedLawyer.specialty}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-xs font-bold text-muted-foreground pt-1">
                    <div className="flex justify-between items-center bg-muted/50 p-2 rounded-lg">
                      <span className="flex items-center gap-1">
                        <CalendarDays size={14} /> Date
                      </span>
                      <span className="text-foreground">
                        {selectedDate.toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-muted/50 p-2 rounded-lg">
                      <span className="flex items-center gap-1">
                        {consultMode === "Video Call" ? (
                          <Video size={14} />
                        ) : consultMode === "Phone Call" ? (
                          <Phone size={14} />
                        ) : (
                          <Building2 size={14} />
                        )}
                        Mode
                      </span>
                      <span className="text-foreground">{consultMode}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-sm font-bold text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Consultation Fee (Up to 45 mins)</span>
                    <span className="text-foreground">
                      ₹{selectedLawyer.consultationFee}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee & GST</span>
                    <span className="text-foreground">₹{PLATFORM_FEE}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border font-black text-2xl">
                  <span>To Pay</span>
                  <span className="text-slate-900 dark:text-white">
                    ₹{totalPayable}
                  </span>
                </div>

                <Button
                  onClick={handleConfirmBooking}
                  disabled={!clientName || !caseBrief || isProcessing}
                  className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-sm bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl hover:bg-slate-800 mt-4"
                >
                  {isProcessing
                    ? "Securing Slot..."
                    : `Pay ₹${totalPayable} Securely`}
                </Button>

                <div className="flex items-center justify-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-muted-foreground pt-2">
                  <Lock size={12} /> Payment is securely encrypted
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 4: SUCCESS TICKET
        ========================================== */}
        {currentScreen === "success" && selectedLawyer && selectedDate && (
          <div className="max-w-lg mx-auto w-full bg-card rounded-[2.5rem] border border-border shadow-2xl p-8 md:p-10 text-center space-y-8 mt-4 animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(34,197,94,0.4)]">
              <CheckCircle2 size={48} className="text-white" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight">
                Consultation Confirmed
              </h2>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Your slot with the counsel is secured
              </p>
            </div>

            <div className="bg-background rounded-3xl p-6 text-left border border-border space-y-5 shadow-inner">
              <div className="flex justify-between items-center text-xs font-bold uppercase border-b border-border pb-4">
                <span className="text-muted-foreground tracking-widest">
                  Booking ID
                </span>
                <span className="text-slate-900 dark:text-white font-black text-sm tracking-wider">
                  {bookingId}
                </span>
              </div>

              <div className="space-y-4 pt-1">
                <div className="flex justify-between items-center text-xs font-bold uppercase">
                  <span className="text-muted-foreground tracking-widest flex items-center gap-2">
                    <Briefcase size={14} /> Counsel
                  </span>
                  <span className="text-foreground">{selectedLawyer.name}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold uppercase">
                  <span className="text-muted-foreground tracking-widest flex items-center gap-2">
                    <CalendarDays size={14} /> Date
                  </span>
                  <span className="text-foreground">
                    {selectedDate.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold uppercase">
                  <span className="text-muted-foreground tracking-widest flex items-center gap-2">
                    <Clock size={14} /> Time
                  </span>
                  <span className="text-foreground">{selectedTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900 p-4 rounded-2xl text-left">
              <Lock size={24} className="text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-sm text-amber-800 dark:text-amber-400">
                  100% Attorney-Client Privilege
                </p>
                <p className="text-xs font-medium text-amber-700/80 dark:text-amber-400/80">
                  Your case brief has been securely transmitted. All discussions
                  during the consultation are strictly confidential under law.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              {consultMode === "Video Call" ? (
                <Button className="w-full h-14 rounded-xl font-black uppercase tracking-widest bg-blue-600 hover:bg-blue-700 text-white border-none shadow-xl">
                  <Video size={18} className="mr-2" /> Join Secure Meeting
                </Button>
              ) : consultMode === "Phone Call" ? (
                <Button className="w-full h-14 rounded-xl font-black uppercase tracking-widest bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl">
                  <Phone size={18} className="mr-2" /> Request Call Now
                </Button>
              ) : (
                <Button className="w-full h-14 rounded-xl font-black uppercase tracking-widest bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl">
                  <Building2 size={18} className="mr-2" /> View Office Location
                </Button>
              )}

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
