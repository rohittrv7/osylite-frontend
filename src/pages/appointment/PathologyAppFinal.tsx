import { useState, useMemo, useEffect } from "react";
import {
  MapPin,
  ChevronDown,
  User,
  Search,
  Clock,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  HeartPulse,
  Activity,
  Microscope,
  Droplet,
  FileText,
  FlaskConical,
  CalendarDays,
  Home,
  Briefcase,
  Wallet,
  CreditCard,
  Banknote,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ==========================================
// TYPES & MOCK DATA
// ==========================================
type Screen = "home" | "tests" | "checkout" | "success";

interface TestPackage {
  id: string;
  name: string;
  parameters: number;
  includes: string[];
  price: number;
  originalPrice: number;
  reportTime: string;
  fastingRequired: boolean;
  category: string;
  bestseller?: boolean;
}

const CATEGORIES = [
  {
    name: "Full Body",
    icon: Activity,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    name: "Diabetes",
    icon: Droplet,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    name: "Thyroid",
    icon: HeartPulse,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    name: "Vitamins",
    icon: FlaskConical,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    name: "Fever",
    icon: Microscope,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
];

const TESTS: TestPackage[] = [
  {
    id: "T1",
    name: "Comprehensive Full Body Checkup",
    parameters: 75,
    includes: [
      "CBC",
      "Lipid Profile",
      "Thyroid",
      "Liver Function",
      "Kidney Function",
    ],
    price: 999,
    originalPrice: 2499,
    reportTime: "12 Hours",
    fastingRequired: true,
    category: "Full Body",
    bestseller: true,
  },
  {
    id: "T2",
    name: "Advanced Diabetes Screening",
    parameters: 15,
    includes: ["HbA1c", "Fasting Blood Sugar", "Cholesterol", "Creatinine"],
    price: 499,
    originalPrice: 999,
    reportTime: "8 Hours",
    fastingRequired: true,
    category: "Diabetes",
  },
  {
    id: "T3",
    name: "Vitamin D & B12 Profile",
    parameters: 2,
    includes: ["Vitamin D Total", "Vitamin B12"],
    price: 699,
    originalPrice: 1500,
    reportTime: "24 Hours",
    fastingRequired: false,
    category: "Vitamins",
    bestseller: true,
  },
  {
    id: "T4",
    name: "Thyroid Profile (T3, T4, TSH)",
    parameters: 3,
    includes: ["Total T3", "Total T4", "TSH"],
    price: 299,
    originalPrice: 600,
    reportTime: "12 Hours",
    fastingRequired: false,
    category: "Thyroid",
  },
  {
    id: "T5",
    name: "Basic Fever Panel",
    parameters: 12,
    includes: ["CBC", "Malaria Antigen", "Widal", "Urine Routine"],
    price: 599,
    originalPrice: 1100,
    reportTime: "8 Hours",
    fastingRequired: false,
    category: "Fever",
  },
];

const PATIENTS = [
  { id: "P1", name: "Rohit Kumar", relation: "Self", age: 28, gender: "Male" },
  {
    id: "P2",
    name: "Sunita Kumar",
    relation: "Mother",
    age: 54,
    gender: "Female",
  },
];

const ADDRESSES = [
  {
    id: "A1",
    type: "Home",
    icon: Home,
    text: "Flat 402, Seawoods Grand, Sector 4, Pune, 411014",
  },
  {
    id: "A2",
    type: "Work",
    icon: Briefcase,
    text: "WeWork Hub, Koregaon Park, Pune, 411001",
  },
];

const TIME_SLOTS = [
  "06:00 AM - 07:00 AM",
  "07:00 AM - 08:00 AM",
  "08:00 AM - 09:00 AM",
  "09:00 AM - 10:00 AM",
];

export default function PathologyAppFinal() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");

  // Discover State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Cart State (Test ID -> Quantity)
  const [cart, setCart] = useState<Record<string, number>>({});

  // Checkout State
  const [selectedPatient, setSelectedPatient] = useState(PATIENTS[0].id);
  const [selectedAddress, setSelectedAddress] = useState(ADDRESSES[0].id);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Date Logic
  const [availableDates, setAvailableDates] = useState<Date[]>([]);

  // Processing State
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      // Start from tomorrow usually for fasting tests
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    setAvailableDates(dates);
    setSelectedDate(dates[0]);
  }, []);

  // Filter Logic
  const filteredTests = useMemo(() => {
    return TESTS.filter((t) => {
      const matchSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.includes.some((i) =>
          i.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      const matchCat = activeCategory ? t.category === activeCategory : true;
      return matchSearch && matchCat;
    });
  }, [searchQuery, activeCategory]);

  // Cart Calculations
  const { itemTotal, cartCount, hasFasting } = useMemo(() => {
    let total = 0,
      count = 0;
    let fasting = false;
    Object.entries(cart).forEach(([id, qty]) => {
      const test = TESTS.find((t) => t.id === id);
      if (test) {
        total += test.price * qty;
        count += qty;
        if (test.fastingRequired) fasting = true;
      }
    });
    return { itemTotal: total, cartCount: count, hasFasting: fasting };
  }, [cart]);

  const homeCollectionFee = itemTotal > 1000 ? 0 : 100;
  const grandTotal = itemTotal > 0 ? itemTotal + homeCollectionFee : 0;

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
        `LAB${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      );
      setIsProcessing(false);
      setCurrentScreen("success");
    }, 1500);
  };

  const resetFlow = () => {
    setCart({});
    setSelectedTime("");
    setBookingId("");
    setCurrentScreen("home");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-foreground pb-24 md:pb-0 relative">
      {/* ==========================================
          GLOBAL HEADER
      ========================================== */}
      <header className="sticky top-0 z-40 bg-background border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <h1
              className="text-3xl font-black tracking-tighter text-primary cursor-pointer"
              onClick={() => {
                setCurrentScreen("home");
                setActiveCategory(null);
              }}
            >
              ANG Labs
            </h1>
            <div className="hidden md:flex items-center gap-2 hover:text-primary cursor-pointer transition-colors">
              <MapPin size={20} className="text-primary" />
              <div className="flex flex-col">
                <span className="text-sm font-bold flex items-center gap-1">
                  Pune, MH <ChevronDown size={14} />
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-2xl relative shadow-sm rounded-xl">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              placeholder="Search for tests (e.g. CBC, HbA1c)"
              className="h-14 pl-12 rounded-xl bg-card border-border font-bold text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* ==========================================
            SCREEN 1: HOME (DISCOVER)
        ========================================== */}
        {currentScreen === "home" && (
          <div className="space-y-10 animate-in fade-in duration-500">
            {/* Mobile Search */}
            <div className="md:hidden relative shadow-sm rounded-xl">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
                size={20}
              />
              <Input
                placeholder="Search tests or profiles"
                className="h-14 pl-10 rounded-xl bg-card border-border font-bold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Health Categories */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black tracking-tight">
                  Shop by Health Concern
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
                      setCurrentScreen("tests");
                    }}
                    className="flex flex-col items-center gap-3 shrink-0 cursor-pointer group w-24"
                  >
                    <div
                      className={cn(
                        "w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-300 shadow-sm border",
                        activeCategory === cat.name
                          ? "bg-primary text-primary-foreground border-primary scale-105"
                          : cn(
                              cat.bg,
                              cat.color,
                              "border-border hover:border-primary/50 hover:scale-105",
                            ),
                      )}
                    >
                      <cat.icon size={32} />
                    </div>
                    <span
                      className={cn(
                        "text-[11px] font-bold uppercase tracking-widest text-center",
                        activeCategory === cat.name
                          ? "text-primary"
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
                Most Booked Health Checks
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TESTS.map((test) => (
                  <div
                    key={test.id}
                    className="bg-card p-6 rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          {test.bestseller && (
                            <Badge className="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 border-none font-bold text-[10px] uppercase tracking-widest px-2 py-0.5 rounded mb-2">
                              Bestseller
                            </Badge>
                          )}
                          <h3 className="font-black text-xl leading-tight">
                            {test.name}
                          </h3>
                          <p className="text-xs font-bold text-primary flex items-center gap-1">
                            <Activity size={14} /> Includes {test.parameters}{" "}
                            Parameters
                          </p>
                        </div>
                      </div>

                      <div className="bg-muted/30 p-3 rounded-xl border border-border space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          What's included:
                        </p>
                        <p className="text-sm font-medium text-foreground truncate">
                          {test.includes.join(", ")}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs font-bold text-muted-foreground pt-2">
                        <span className="flex items-center gap-1 bg-background border border-border px-2 py-1 rounded-md">
                          <Clock size={12} /> Reports in {test.reportTime}
                        </span>
                        {test.fastingRequired && (
                          <span className="flex items-center gap-1 bg-background border border-border px-2 py-1 rounded-md">
                            <AlertCircle size={12} /> Fasting Required
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-end pt-6 mt-4 border-t border-border">
                      <div>
                        <p className="text-xs font-bold text-muted-foreground line-through">
                          ₹{test.originalPrice}
                        </p>
                        <p className="font-black text-2xl">₹{test.price}</p>
                      </div>

                      {cart[test.id] ? (
                        <div className="flex items-center justify-between bg-primary text-primary-foreground font-black rounded-xl shadow-md border border-primary h-10 w-24 px-1">
                          <button
                            onClick={() => updateCart(test.id, -1)}
                            className="w-1/3 text-lg hover:bg-black/10 rounded-l-lg"
                          >
                            -
                          </button>
                          <span className="text-sm">{cart[test.id]}</span>
                          <button
                            onClick={() => updateCart(test.id, 1)}
                            className="w-1/3 text-lg hover:bg-black/10 rounded-r-lg"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => updateCart(test.id, 1)}
                          className="h-10 px-6 rounded-xl font-black uppercase text-xs tracking-widest bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors"
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
            SCREEN 2: TESTS LIST (Filter by Category)
        ========================================== */}
        {currentScreen === "tests" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative animate-in fade-in duration-300">
            {/* Left: Test List */}
            <div className="lg:col-span-2 space-y-6 pb-10">
              <div
                className="flex items-center gap-4 cursor-pointer hover:text-primary w-fit mb-4"
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
                {activeCategory ? `${activeCategory} Tests` : "All Tests"}
              </h2>

              <div className="space-y-4">
                {filteredTests.map((test) => (
                  <div
                    key={test.id}
                    className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row justify-between gap-6"
                  >
                    <div className="space-y-3 flex-1">
                      {test.bestseller && (
                        <Badge className="bg-orange-100 text-orange-600 border-none font-bold text-[10px] uppercase tracking-widest px-2 py-0.5 rounded">
                          Bestseller
                        </Badge>
                      )}
                      <h3 className="font-black text-lg leading-tight">
                        {test.name}
                      </h3>
                      <p className="text-xs font-bold text-primary flex items-center gap-1">
                        <Activity size={14} /> {test.parameters} Parameters
                        included
                      </p>

                      <div className="flex gap-4 text-xs font-bold text-muted-foreground pt-2">
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {test.reportTime}
                        </span>
                        {test.fastingRequired && (
                          <span className="flex items-center gap-1 text-orange-600">
                            <AlertCircle size={14} /> Fasting Required
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex md:flex-col justify-between items-end gap-4 shrink-0 md:w-32 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                      <div className="text-left md:text-right">
                        <p className="text-xs font-bold text-muted-foreground line-through">
                          ₹{test.originalPrice}
                        </p>
                        <p className="font-black text-xl text-foreground">
                          ₹{test.price}
                        </p>
                      </div>
                      {cart[test.id] ? (
                        <div className="flex items-center justify-between bg-primary text-primary-foreground font-black rounded-xl shadow-md border border-primary h-10 w-full px-1">
                          <button
                            onClick={() => updateCart(test.id, -1)}
                            className="w-1/3 text-lg hover:bg-black/10 rounded-l-lg"
                          >
                            -
                          </button>
                          <span className="text-sm">{cart[test.id]}</span>
                          <button
                            onClick={() => updateCart(test.id, 1)}
                            className="w-1/3 text-lg hover:bg-black/10 rounded-r-lg"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => updateCart(test.id, 1)}
                          className="w-full h-10 rounded-xl font-black uppercase text-xs tracking-widest bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          ADD
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Desktop Cart (Hidden on mobile) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-28 bg-card rounded-3xl border border-border shadow-sm p-6 space-y-6">
                <h3 className="text-2xl font-black">Your Cart</h3>
                {cartCount === 0 ? (
                  <div className="text-center py-10 opacity-50 space-y-4">
                    <Microscope size={48} className="mx-auto" />
                    <p className="font-bold text-sm uppercase tracking-widest">
                      Cart is empty
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                      {Object.entries(cart).map(([id, qty]) => {
                        const test = TESTS.find((t) => t.id === id);
                        if (!test) return null;
                        return (
                          <div
                            key={id}
                            className="flex justify-between items-center gap-2 text-sm font-bold pb-2 border-b border-border last:border-0"
                          >
                            <div className="w-[60%] space-y-1">
                              <p className="truncate leading-tight">
                                {test.name}
                              </p>
                              <p className="text-[10px] text-muted-foreground uppercase">
                                {qty} Patient{qty > 1 ? "s" : ""}
                              </p>
                            </div>
                            <span className="w-16 text-right">
                              ₹{test.price * qty}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="pt-4 border-t border-border flex justify-between items-center font-black text-lg">
                      <span>Total</span>
                      <span>₹{itemTotal}</span>
                    </div>
                    <Button
                      onClick={() => setCurrentScreen("checkout")}
                      className="w-full h-14 rounded-xl font-bold uppercase tracking-widest text-sm bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Schedule Home Visit{" "}
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 3: CHECKOUT (Address, Slots & Pay)
        ========================================== */}
        {currentScreen === "checkout" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-right-8 duration-300">
            {/* Left: Forms */}
            <div className="lg:col-span-2 space-y-8">
              <div
                className="flex items-center gap-4 cursor-pointer hover:text-primary w-fit"
                onClick={() => setCurrentScreen("home")}
              >
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                  <ArrowLeft size={20} />
                </div>
                <span className="font-bold uppercase text-xs tracking-widest">
                  Back to Tests
                </span>
              </div>

              {/* 1. Patient & Address */}
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-border pb-2">
                    <User size={20} className="text-primary" />
                    <h2 className="text-lg font-black uppercase tracking-tight">
                      Select Patient
                    </h2>
                  </div>
                  <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                    {PATIENTS.map((patient) => (
                      <div
                        key={patient.id}
                        onClick={() => setSelectedPatient(patient.id)}
                        className={cn(
                          "p-4 rounded-2xl border-2 cursor-pointer transition-all min-w-[160px] relative",
                          selectedPatient === patient.id
                            ? "border-primary bg-primary/5"
                            : "border-border bg-background hover:border-primary/30",
                        )}
                      >
                        {selectedPatient === patient.id && (
                          <div className="absolute top-0 right-0 bg-primary text-background p-1 rounded-bl-lg">
                            <CheckCircle2 size={12} />
                          </div>
                        )}
                        <p className="font-bold text-sm truncate">
                          {patient.name}
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
                          {patient.relation} • {patient.gender}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-border pb-2">
                    <MapPin size={20} className="text-primary" />
                    <h2 className="text-lg font-black uppercase tracking-tight">
                      Home Collection Address
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
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50 bg-background",
                        )}
                      >
                        {selectedAddress === addr.id && (
                          <div className="absolute top-0 right-0 bg-primary text-background p-1 rounded-bl-lg">
                            <CheckCircle2 size={14} />
                          </div>
                        )}
                        <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                          <addr.icon
                            size={16}
                            className="text-muted-foreground"
                          />{" "}
                          {addr.type}
                        </div>
                        <p className="text-xs text-muted-foreground font-medium leading-relaxed flex-1">
                          {addr.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. Date & Time Slot */}
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-border pb-2">
                  <Clock size={20} className="text-primary" />
                  <h2 className="text-lg font-black uppercase tracking-tight">
                    Sample Collection Slot
                  </h2>
                </div>

                {hasFasting && (
                  <div className="flex items-center gap-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-900 p-4 rounded-xl text-orange-800 dark:text-orange-400 text-xs font-bold">
                    <AlertCircle size={20} className="shrink-0" />
                    <p>
                      Fasting of 10-12 hours is required for your selected
                      tests. Please book an early morning slot.
                    </p>
                  </div>
                )}

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
                              ? "border-primary bg-primary text-primary-foreground shadow-md"
                              : "border-border bg-background hover:border-primary/50",
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
                            ? "border-primary bg-primary/10 text-primary shadow-sm"
                            : "border-border bg-background hover:border-primary/50 text-muted-foreground",
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Payment Method */}
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-border pb-2">
                  <Wallet size={20} className="text-primary" />
                  <h2 className="text-lg font-black uppercase tracking-tight">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-3">
                  {[
                    { id: "upi", icon: Wallet, title: "Pay Now via UPI" },
                    {
                      id: "card",
                      icon: CreditCard,
                      title: "Credit / Debit Card",
                    },
                    {
                      id: "cod",
                      icon: Banknote,
                      title: "Cash on Sample Collection",
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
                        <span className="font-bold text-sm">
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
              <div className="sticky top-24 bg-card rounded-3xl border border-border shadow-sm p-6 md:p-8 space-y-6">
                <h3 className="text-2xl font-black">Order Summary</h3>

                <div className="bg-background rounded-2xl p-4 border border-border space-y-3 max-h-[30vh] overflow-y-auto">
                  {Object.entries(cart).map(([id, qty]) => {
                    const test = TESTS.find((m) => m.id === id);
                    if (!test) return null;
                    return (
                      <div
                        key={id}
                        className="flex justify-between items-start text-xs font-bold border-b border-border pb-2 last:border-0 last:pb-0"
                      >
                        <span className="w-[70%] text-muted-foreground leading-tight">
                          {qty}x {test.name}
                        </span>
                        <span>₹{test.price * qty}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-3 pt-2 text-xs font-bold text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Tests Total</span>
                    <span className="text-foreground">₹{itemTotal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Home Collection Fee</span>
                    {homeCollectionFee === 0 ? (
                      <Badge className="bg-green-500/10 text-green-600 border-none px-2 py-0 uppercase">
                        Free
                      </Badge>
                    ) : (
                      <span className="text-foreground">
                        ₹{homeCollectionFee}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border font-black text-2xl">
                  <span>To Pay</span>
                  <span className="text-primary">₹{grandTotal}</span>
                </div>

                <Button
                  onClick={handleConfirmBooking}
                  disabled={!selectedDate || !selectedTime || isProcessing}
                  className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-sm bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 mt-4"
                >
                  {isProcessing ? "Processing..." : `Pay ₹${grandTotal} & Book`}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 4: SUCCESS TICKET
        ========================================== */}
        {currentScreen === "success" && selectedDate && (
          <div className="max-w-lg mx-auto w-full bg-card rounded-[2.5rem] border border-border shadow-2xl p-8 md:p-10 text-center space-y-8 mt-4 animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(34,197,94,0.4)]">
              <CheckCircle2 size={48} className="text-white" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight">
                Booking Confirmed!
              </h2>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Your Home Sample Collection is Scheduled
              </p>
            </div>

            <div className="bg-background rounded-3xl p-6 text-left border border-border space-y-5 shadow-inner">
              <div className="flex justify-between items-center text-xs font-bold uppercase border-b border-border pb-4">
                <span className="text-muted-foreground tracking-widest">
                  Booking ID
                </span>
                <span className="text-primary font-black text-sm tracking-wider">
                  {bookingId}
                </span>
              </div>

              <div className="space-y-4 pt-1">
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
                <div className="flex justify-between items-center text-xs font-bold uppercase">
                  <span className="text-muted-foreground tracking-widest flex items-center gap-2">
                    <Home size={14} /> Location
                  </span>
                  <span className="text-foreground">Home</span>
                </div>
              </div>
            </div>

            {hasFasting && (
              <div className="flex items-start gap-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-900 p-4 rounded-2xl text-left">
                <AlertCircle
                  size={24}
                  className="text-orange-600 shrink-0 mt-0.5"
                />
                <div className="space-y-1">
                  <p className="font-bold text-sm text-orange-800 dark:text-orange-400">
                    Important: Fasting Required
                  </p>
                  <p className="text-xs font-medium text-orange-700/80 dark:text-orange-400/80">
                    Please do not consume food or beverages (except water) for
                    10-12 hours before your sample collection.
                  </p>
                </div>
              </div>
            )}

            <div className="pt-4 flex flex-col gap-3">
              <Button className="w-full h-14 rounded-xl font-black uppercase tracking-widest bg-slate-900 dark:bg-white text-white dark:text-black border-none shadow-xl hover:scale-[1.02] transition-transform">
                <FileText size={18} className="mr-2" /> View Booking Details
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

      {/* ==========================================
          GLOBAL FLOATING CART (Mobile & Desktop)
      ========================================== */}
      {cartCount > 0 &&
        (currentScreen === "home" || currentScreen === "tests") && (
          <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-96 z-50 animate-in slide-in-from-bottom-5">
            <div
              onClick={() => setCurrentScreen("checkout")}
              className="bg-primary text-primary-foreground p-4 rounded-2xl flex justify-between items-center cursor-pointer shadow-2xl hover:bg-primary/90 transition-all border border-primary/20"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/80 mb-1">
                  {cartCount} Test{cartCount > 1 ? "s" : ""} Added
                </p>
                <p className="text-xl font-black">₹{itemTotal}</p>
              </div>
              <div className="flex items-center gap-1 font-black text-sm uppercase tracking-widest">
                Checkout <ChevronRight size={18} />
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
