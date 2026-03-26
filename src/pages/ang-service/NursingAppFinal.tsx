import { useState, useMemo, useEffect } from "react";
import {
  MapPin,
  User,
  Search,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  HeartPulse,
  Activity,
  CalendarDays,
  Home,
  Wallet,
  CreditCard,
  AlertCircle,
  PhoneCall,
  Syringe,
  Baby,
  Accessibility,
  Stethoscope,
  Clock,
  Sunrise,
  Moon,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ==========================================
// TYPES & MOCK DATA
// ==========================================
type Screen = "home" | "services" | "checkout" | "success";

interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  shift: "12 Hours" | "24 Hours" | "Per Visit";
  category: string;
  bestseller?: boolean;
}

const CATEGORIES = [
  {
    name: "Elderly Care",
    icon: Accessibility,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    name: "Post-Surgery",
    icon: Activity,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    name: "Physiotherapy",
    icon: HeartPulse,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
  {
    name: "Mother & Baby",
    icon: Baby,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    name: "Nursing Care",
    icon: Syringe,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

const SERVICES: ServicePackage[] = [
  {
    id: "S1",
    name: "Trained Attendant (7 Days)",
    description:
      "Assistance with daily living activities, feeding, and mobility for elders.",
    price: 6500,
    duration: "7 Days",
    shift: "12 Hours",
    category: "Elderly Care",
    bestseller: true,
  },
  {
    id: "S2",
    name: "Trained Attendant (30 Days)",
    description:
      "Complete monthly care plan for bedridden or elderly patients.",
    price: 26000,
    duration: "30 Days",
    shift: "12 Hours",
    category: "Elderly Care",
  },
  {
    id: "S3",
    name: "Registered Nurse - Post Surgery",
    description:
      "Wound dressing, vitals monitoring, and medication administration.",
    price: 12000,
    duration: "7 Days",
    shift: "12 Hours",
    category: "Post-Surgery",
    bestseller: true,
  },
  {
    id: "S4",
    name: "ICU Trained Nurse (24x7)",
    description: "Critical care at home with advanced life support monitoring.",
    price: 45000,
    duration: "10 Days",
    shift: "24 Hours",
    category: "Post-Surgery",
  },
  {
    id: "S5",
    name: "Expert Physiotherapist Visit",
    description: "Post-operative rehab, stroke recovery, and pain management.",
    price: 799,
    duration: "Per Session",
    shift: "Per Visit",
    category: "Physiotherapy",
    bestseller: true,
  },
  {
    id: "S6",
    name: "Newborn Baby & Mother Care",
    description:
      "Professional japa maid for newborn massage, bathing, and mother's recovery.",
    price: 18000,
    duration: "15 Days",
    shift: "12 Hours",
    category: "Mother & Baby",
  },
];

const PATIENTS = [
  {
    id: "P1",
    name: "Ramesh Sharma",
    relation: "Father",
    age: 68,
    gender: "Male",
    condition: "Post Knee Replacement",
  },
  {
    id: "P2",
    name: "Sunita Sharma",
    relation: "Mother",
    age: 64,
    gender: "Female",
    condition: "General Weakness",
  },
];

const ADDRESSES = [
  {
    id: "A1",
    type: "Home",
    icon: Home,
    text: "Flat 402, Seawoods Grand, Sector 4, New Delhi, 110001",
  },
];

export default function NursingAppFinal() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");

  // Discover State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Cart State (Service ID -> Quantity)
  const [cart, setCart] = useState<Record<string, number>>({});

  // Checkout State
  const [selectedPatient, setSelectedPatient] = useState(PATIENTS[0].id);
  const [selectedAddress, setSelectedAddress] = useState(ADDRESSES[0].id);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [shiftPreference, setShiftPreference] = useState<
    "Day" | "Night" | "Flexible"
  >("Day");
  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Date Logic
  const [availableDates, setAvailableDates] = useState<Date[]>([]);

  // Processing State
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const CLINICAL_ASSESSMENT_FEE = 499;

  useEffect(() => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      // Need at least 24hr notice for nursing
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    setAvailableDates(dates);
    setStartDate(dates[0]);
  }, []);

  // Filter Logic
  const filteredServices = useMemo(() => {
    return SERVICES.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = activeCategory ? s.category === activeCategory : true;
      return matchSearch && matchCat;
    });
  }, [searchQuery, activeCategory]);

  // Cart Calculations
  const { itemTotal, cartCount } = useMemo(() => {
    let total = 0,
      count = 0;
    Object.entries(cart).forEach(([id, qty]) => {
      const service = SERVICES.find((s) => s.id === id);
      if (service) {
        total += service.price * qty;
        count += qty;
      }
    });
    return { itemTotal: total, cartCount: count };
  }, [cart]);

  const grandTotal = itemTotal > 0 ? itemTotal + CLINICAL_ASSESSMENT_FEE : 0;
  // In healthcare, usually a token advance is paid online
  const advanceToPay = Math.min(grandTotal, 2000); // Max 2000 advance

  const updateCart = (id: string, delta: number) => {
    setCart((prev) => {
      const next = (prev[id] || 0) + delta;
      if (next <= 0) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      return { ...prev, [id]: next };
    });
  };

  const handleConfirmBooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setBookingId(
        `CARE${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      );
      setIsProcessing(false);
      setCurrentScreen("success");
    }, 1500);
  };

  const resetFlow = () => {
    setCart({});
    setBookingId("");
    setCurrentScreen("home");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-foreground pb-24 md:pb-0 relative selection:bg-blue-200">
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* ==========================================
            SCREEN 1: HOME (DISCOVER)
        ========================================== */}
        {currentScreen === "home" && (
          <div className="space-y-10 animate-in fade-in duration-500">
            {/* Mobile Search */}
            <div className="md:hidden relative shadow-sm rounded-xl">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600"
                size={20}
              />
              <Input
                placeholder="Search care services"
                className="h-14 pl-10 rounded-xl bg-card border-border font-bold focus-visible:ring-blue-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Health Categories */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black tracking-tight">
                  What care do you need?
                </h2>
                {activeCategory && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setActiveCategory(null)}
                    className="text-xs font-bold uppercase text-red-500"
                  >
                    Clear
                  </Button>
                )}
              </div>
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.name}
                    onClick={() => {
                      setActiveCategory(cat.name);
                      setCurrentScreen("services");
                    }}
                    className="flex flex-col items-center gap-3 shrink-0 cursor-pointer group w-24"
                  >
                    <div
                      className={cn(
                        "w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-300 shadow-sm border",
                        activeCategory === cat.name
                          ? "bg-blue-600 text-white border-blue-600 scale-105"
                          : cn(
                              cat.bg,
                              cat.color,
                              "border-border hover:border-blue-600/50 hover:scale-105",
                            ),
                      )}
                    >
                      <cat.icon size={32} />
                    </div>
                    <span
                      className={cn(
                        "text-[11px] font-bold uppercase tracking-widest text-center",
                        activeCategory === cat.name
                          ? "text-blue-600"
                          : "text-muted-foreground",
                      )}
                    >
                      {cat.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Booked Packages */}
            <div className="space-y-6 pb-10">
              <h2 className="text-2xl font-black tracking-tight">
                Most Requested Services
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SERVICES.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-card p-6 rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          {pkg.bestseller && (
                            <Badge className="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 border-none font-bold text-[10px] uppercase tracking-widest px-2 py-0.5 rounded mb-2">
                              Bestseller
                            </Badge>
                          )}
                          <h3 className="font-black text-xl leading-tight">
                            {pkg.name}
                          </h3>
                          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest pt-1">
                            {pkg.category}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm font-medium text-muted-foreground line-clamp-2">
                        {pkg.description}
                      </p>

                      <div className="flex flex-wrap gap-2 text-xs font-bold text-muted-foreground pt-2 border-t border-border">
                        <span className="flex items-center gap-1 bg-background border border-border px-2 py-1 rounded-md">
                          <CalendarDays size={12} /> {pkg.duration}
                        </span>
                        <span className="flex items-center gap-1 bg-background border border-border px-2 py-1 rounded-md">
                          <Clock size={12} /> {pkg.shift}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-end pt-6 mt-4">
                      <div>
                        <p className="font-black text-2xl text-blue-600">
                          ₹{pkg.price}
                        </p>
                      </div>

                      {cart[pkg.id] ? (
                        <div className="flex items-center justify-between bg-blue-600 text-white font-black rounded-xl shadow-md border border-blue-600 h-10 w-24 px-1">
                          <button
                            onClick={() => updateCart(pkg.id, -1)}
                            className="w-1/3 text-lg hover:bg-black/10 rounded-l-lg"
                          >
                            -
                          </button>
                          <span className="text-sm">{cart[pkg.id]}</span>
                          <button
                            onClick={() => updateCart(pkg.id, 1)}
                            className="w-1/3 text-lg hover:bg-black/10 rounded-r-lg"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => updateCart(pkg.id, 1)}
                          className="h-10 px-6 rounded-xl font-black uppercase text-xs tracking-widest bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-600 hover:text-white transition-colors"
                        >
                          ADD
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 2: SERVICES LIST
        ========================================== */}
        {currentScreen === "services" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative animate-in fade-in duration-300">
            {/* Left: Test List */}
            <div className="lg:col-span-2 space-y-6 pb-10">
              <div
                className="flex items-center gap-4 cursor-pointer hover:text-blue-600 w-fit mb-4"
                onClick={() => setCurrentScreen("home")}
              >
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                  <ArrowLeft size={20} />
                </div>
                <span className="font-bold uppercase text-xs tracking-widest">
                  Back to Categories
                </span>
              </div>

              <h2 className="text-3xl font-black tracking-tight">
                {activeCategory
                  ? `${activeCategory} Services`
                  : "All Care Plans"}
              </h2>

              <div className="space-y-4">
                {filteredServices.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row justify-between gap-6"
                  >
                    <div className="space-y-3 flex-1">
                      {pkg.bestseller && (
                        <Badge className="bg-orange-100 text-orange-600 border-none font-bold text-[10px] uppercase tracking-widest px-2 py-0.5 rounded">
                          Bestseller
                        </Badge>
                      )}
                      <h3 className="font-black text-xl leading-tight">
                        {pkg.name}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground">
                        {pkg.description}
                      </p>

                      <div className="flex gap-3 text-xs font-bold text-muted-foreground pt-2">
                        <span className="flex items-center gap-1 bg-background border border-border px-2 py-1 rounded-md">
                          <CalendarDays size={14} /> {pkg.duration}
                        </span>
                        <span className="flex items-center gap-1 bg-background border border-border px-2 py-1 rounded-md">
                          <Clock size={14} /> {pkg.shift}
                        </span>
                      </div>
                    </div>

                    <div className="flex md:flex-col justify-between items-end gap-4 shrink-0 md:w-32 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                      <div className="text-left md:text-right">
                        <p className="font-black text-2xl text-blue-600">
                          ₹{pkg.price}
                        </p>
                      </div>
                      {cart[pkg.id] ? (
                        <div className="flex items-center justify-between bg-blue-600 text-white font-black rounded-xl shadow-md border border-blue-600 h-10 w-full px-1">
                          <button
                            onClick={() => updateCart(pkg.id, -1)}
                            className="w-1/3 text-lg hover:bg-black/10 rounded-l-lg"
                          >
                            -
                          </button>
                          <span className="text-sm">{cart[pkg.id]}</span>
                          <button
                            onClick={() => updateCart(pkg.id, 1)}
                            className="w-1/3 text-lg hover:bg-black/10 rounded-r-lg"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => updateCart(pkg.id, 1)}
                          className="w-full h-10 rounded-xl font-black uppercase text-xs tracking-widest bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-600 hover:text-white transition-colors"
                        >
                          ADD
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Desktop Cart */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-28 bg-card rounded-3xl border border-border shadow-sm p-6 space-y-6">
                <h3 className="text-2xl font-black">Care Plan</h3>
                {cartCount === 0 ? (
                  <div className="text-center py-10 opacity-50 space-y-4">
                    <Stethoscope size={48} className="mx-auto" />
                    <p className="font-bold text-sm uppercase tracking-widest">
                      No plans added
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                      {Object.entries(cart).map(([id, qty]) => {
                        const pkg = SERVICES.find((t) => t.id === id);
                        if (!pkg) return null;
                        return (
                          <div
                            key={id}
                            className="flex justify-between items-center gap-2 text-sm font-bold pb-2 border-b border-border last:border-0"
                          >
                            <div className="w-[60%] space-y-1">
                              <p className="truncate leading-tight">
                                {pkg.name}
                              </p>
                              <p className="text-[10px] text-muted-foreground uppercase">
                                Qty: {qty}
                              </p>
                            </div>
                            <span className="w-16 text-right">
                              ₹{pkg.price * qty}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="pt-4 border-t border-border flex justify-between items-center font-black text-lg">
                      <span>Total Plan Cost</span>
                      <span>₹{itemTotal}</span>
                    </div>
                    <Button
                      onClick={() => setCurrentScreen("checkout")}
                      className="w-full h-14 rounded-xl font-bold uppercase tracking-widest text-sm bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Proceed to Setup <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 3: CHECKOUT (Patient, Schedule & Pay)
        ========================================== */}
        {currentScreen === "checkout" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-right-8 duration-300">
            {/* Left: Forms */}
            <div className="lg:col-span-2 space-y-8">
              <div
                className="flex items-center gap-4 cursor-pointer hover:text-blue-600 w-fit"
                onClick={() => setCurrentScreen("services")}
              >
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                  <ArrowLeft size={20} />
                </div>
                <span className="font-bold uppercase text-xs tracking-widest">
                  Back to Plans
                </span>
              </div>

              {/* 1. Patient Details */}
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-border pb-2">
                    <User size={20} className="text-blue-600" />
                    <h2 className="text-lg font-black uppercase tracking-tight">
                      Patient Details
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {PATIENTS.map((patient) => (
                      <div
                        key={patient.id}
                        onClick={() => setSelectedPatient(patient.id)}
                        className={cn(
                          "p-5 rounded-2xl border-2 cursor-pointer transition-all relative",
                          selectedPatient === patient.id
                            ? "border-blue-600 bg-blue-50 dark:bg-blue-900/10"
                            : "border-border bg-background hover:border-blue-600/30",
                        )}
                      >
                        {selectedPatient === patient.id && (
                          <div className="absolute top-0 right-0 bg-blue-600 text-white p-1 rounded-bl-lg">
                            <CheckCircle2 size={12} />
                          </div>
                        )}
                        <p className="font-bold text-lg">{patient.name}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
                          {patient.relation} • {patient.gender}, {patient.age}Y
                        </p>
                        <p className="text-xs font-bold text-rose-600 mt-2">
                          Cond: {patient.condition}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-border pb-2">
                    <MapPin size={20} className="text-blue-600" />
                    <h2 className="text-lg font-black uppercase tracking-tight">
                      Service Address
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ADDRESSES.map((addr) => (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddress(addr.id)}
                        className={cn(
                          "p-4 rounded-2xl border-2 cursor-pointer transition-all relative flex flex-col",
                          selectedAddress === addr.id
                            ? "border-blue-600 bg-blue-50 dark:bg-blue-900/10"
                            : "border-border hover:border-blue-600/50 bg-background",
                        )}
                      >
                        {selectedAddress === addr.id && (
                          <div className="absolute top-0 right-0 bg-blue-600 text-white p-1 rounded-bl-lg">
                            <CheckCircle2 size={14} />
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground font-medium leading-relaxed flex-1">
                          {addr.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. Schedule */}
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-border pb-2">
                  <CalendarDays size={20} className="text-blue-600" />
                  <h2 className="text-lg font-black uppercase tracking-tight">
                    Schedule Start
                  </h2>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Select Start Date
                  </label>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {availableDates.map((date, i) => {
                      const isSelected =
                        startDate?.toDateString() === date.toDateString();
                      return (
                        <div
                          key={i}
                          onClick={() => setStartDate(date)}
                          className={cn(
                            "flex flex-col items-center justify-center min-w-[70px] h-[85px] rounded-2xl border-2 cursor-pointer transition-all shrink-0",
                            isSelected
                              ? "border-blue-600 bg-blue-600 text-white shadow-md"
                              : "border-border bg-background hover:border-blue-600/50",
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

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Shift Preference
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { id: "Day", icon: Sunrise, time: "8AM - 8PM" },
                      { id: "Night", icon: Moon, time: "8PM - 8AM" },
                      { id: "Flexible", icon: Clock, time: "Any Shift" },
                    ].map((shift) => (
                      <div
                        key={shift.id}
                        onClick={() => setShiftPreference(shift.id as any)}
                        className={cn(
                          "p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center gap-2",
                          shiftPreference === shift.id
                            ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 shadow-sm"
                            : "border-border bg-background hover:border-blue-600/50 text-muted-foreground",
                        )}
                      >
                        <shift.icon size={24} />
                        <div className="text-center">
                          <p className="font-bold text-sm leading-tight">
                            {shift.id}
                          </p>
                          <p className="text-[10px] font-medium opacity-70">
                            {shift.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Payment Method */}
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-border pb-2">
                  <Wallet size={20} className="text-blue-600" />
                  <h2 className="text-lg font-black uppercase tracking-tight">
                    Payment Details
                  </h2>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 p-4 rounded-2xl flex items-start gap-3 text-blue-800 dark:text-blue-400 mb-4">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <p className="text-xs font-bold leading-relaxed">
                    To confirm the booking and assign a clinical supervisor, a
                    nominal advance of ₹{advanceToPay} is required. The balance
                    will be billed after the service begins.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { id: "upi", icon: Wallet, title: "Pay Advance via UPI" },
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
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-900/10"
                          : "border-border hover:border-blue-600/30",
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <method.icon
                          size={24}
                          className={
                            paymentMethod === method.id
                              ? "text-blue-600"
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
                        className="w-5 h-5 accent-blue-600"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Bill Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-3xl border border-border shadow-sm p-6 md:p-8 space-y-6">
                <h3 className="text-2xl font-black">Plan Summary</h3>

                <div className="bg-background rounded-2xl p-4 border border-border space-y-3 max-h-[30vh] overflow-y-auto">
                  {Object.entries(cart).map(([id, qty]) => {
                    const pkg = SERVICES.find((m) => m.id === id);
                    if (!pkg) return null;
                    return (
                      <div
                        key={id}
                        className="flex justify-between items-start text-xs font-bold border-b border-border pb-3 last:border-0 last:pb-0"
                      >
                        <div className="w-[70%]">
                          <p className="text-sm font-black">{pkg.name}</p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                            Shift: {pkg.shift}
                          </p>
                        </div>
                        <span className="text-sm">₹{pkg.price * qty}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-3 pt-2 text-xs font-bold text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Plan Total</span>
                    <span className="text-foreground">₹{itemTotal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Clinical Assessment Fee</span>
                    <span className="text-foreground">
                      ₹{CLINICAL_ASSESSMENT_FEE}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border font-black text-2xl">
                  <div className="flex flex-col">
                    <span>Advance Pay</span>
                    <span className="text-[10px] uppercase tracking-widest text-blue-600 font-bold">
                      Booking Token
                    </span>
                  </div>
                  <span className="text-blue-600">₹{advanceToPay}</span>
                </div>

                <Button
                  onClick={handleConfirmBooking}
                  disabled={!startDate || isProcessing}
                  className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-sm bg-blue-600 text-white shadow-xl hover:bg-blue-700 mt-4"
                >
                  {isProcessing
                    ? "Processing..."
                    : `Pay ₹${advanceToPay} Securely`}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 4: SUCCESS TICKET
        ========================================== */}
        {currentScreen === "success" && startDate && (
          <div className="max-w-lg mx-auto w-full bg-card rounded-[2.5rem] border border-border shadow-2xl p-8 md:p-10 text-center space-y-8 mt-4 animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(34,197,94,0.4)]">
              <CheckCircle2 size={48} className="text-white" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight">
                Care Plan Initiated
              </h2>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Your request is successfully registered
              </p>
            </div>

            <div className="bg-background rounded-3xl p-6 text-left border border-border space-y-5 shadow-inner">
              <div className="flex justify-between items-center text-xs font-bold uppercase border-b border-border pb-4">
                <span className="text-muted-foreground tracking-widest">
                  Booking ID
                </span>
                <span className="text-blue-600 font-black text-sm tracking-wider">
                  {bookingId}
                </span>
              </div>

              <div className="space-y-4 pt-1">
                <div className="flex justify-between items-center text-xs font-bold uppercase">
                  <span className="text-muted-foreground tracking-widest flex items-center gap-2">
                    <User size={14} /> Patient
                  </span>
                  <span className="text-foreground">
                    {PATIENTS.find((p) => p.id === selectedPatient)?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold uppercase">
                  <span className="text-muted-foreground tracking-widest flex items-center gap-2">
                    <CalendarDays size={14} /> Start Date
                  </span>
                  <span className="text-foreground">
                    {startDate.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold uppercase">
                  <span className="text-muted-foreground tracking-widest flex items-center gap-2">
                    <Clock size={14} /> Shift
                  </span>
                  <span className="text-foreground">{shiftPreference}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 p-4 rounded-2xl text-left">
              <PhoneCall size={24} className="text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-sm text-blue-800 dark:text-blue-400">
                  Clinical Assessment Call
                </p>
                <p className="text-xs font-medium text-blue-700/80 dark:text-blue-400/80">
                  A Care Coordinator will call you shortly to assess the exact
                  medical condition and assign the best staff for your needs.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <Button
                onClick={resetFlow}
                className="w-full h-14 rounded-xl font-black uppercase tracking-widest bg-slate-900 dark:bg-white text-white dark:text-black border-none shadow-xl hover:scale-[1.02] transition-transform"
              >
                Return to Dashboard
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* ==========================================
          GLOBAL FLOATING CART (Mobile & Desktop)
      ========================================== */}
      {cartCount > 0 &&
        (currentScreen === "home" || currentScreen === "services") && (
          <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-96 z-50 animate-in slide-in-from-bottom-5">
            <div
              onClick={() => setCurrentScreen("checkout")}
              className="bg-blue-600 text-white p-4 rounded-2xl flex justify-between items-center cursor-pointer shadow-2xl hover:bg-blue-700 transition-all border border-blue-500"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-100 mb-1">
                  {cartCount} Plan{cartCount > 1 ? "s" : ""} Selected
                </p>
                <p className="text-xl font-black">₹{itemTotal}</p>
              </div>
              <div className="flex items-center gap-1 font-black text-sm uppercase tracking-widest">
                Set Up Care <ChevronRight size={18} />
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
