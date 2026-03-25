import { useState, useMemo } from "react";
import {
  MapPin,
  ChevronDown,
  User,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  CalendarDays,
  Users,
  ChefHat,
  PartyPopper,
  UtensilsCrossed,
  GlassWater,
  Info,
  Wallet,
  CreditCard,
  Cake,
  Briefcase,
  Home,
  PhoneCall,
  ReceiptText,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// ==========================================
// TYPES & MOCK DATA
// ==========================================
type Screen = "home" | "packages" | "checkout" | "success";

interface CateringPackage {
  id: string;
  name: string;
  description: string;
  pricePerPlate: number;
  minGuests: number;
  popular?: boolean;
  includes: {
    welcomeDrinks: number;
    starters: number;
    mainCourse: number;
    breadsRice: number;
    desserts: number;
    liveCounters?: number;
  };
  image: string;
}

const EVENT_TYPES = [
  {
    name: "Wedding",
    icon: PartyPopper,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    name: "Birthday",
    icon: Cake,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    name: "Corporate",
    icon: Briefcase,
    color: "text-slate-500",
    bg: "bg-slate-500/10",
  },
  {
    name: "House Party",
    icon: Home,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
];

const PACKAGES: CateringPackage[] = [
  {
    id: "PKG1",
    name: "Classic Silver Plate",
    description:
      "Perfect for small gatherings and house parties with standard Indian cuisine.",
    pricePerPlate: 399,
    minGuests: 20,
    includes: {
      welcomeDrinks: 1,
      starters: 2,
      mainCourse: 3,
      breadsRice: 2,
      desserts: 1,
    },
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80",
  },
  {
    id: "PKG2",
    name: "Royal Gold Feast",
    description:
      "Our most booked package! Features live counters and premium North Indian dishes.",
    pricePerPlate: 699,
    minGuests: 50,
    popular: true,
    includes: {
      welcomeDrinks: 2,
      starters: 4,
      mainCourse: 5,
      breadsRice: 3,
      desserts: 2,
      liveCounters: 1,
    },
    image:
      "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80",
  },
  {
    id: "PKG3",
    name: "Platinum Grandeur",
    description:
      "The ultimate luxury dining experience for weddings. Multi-cuisine with exotic desserts.",
    pricePerPlate: 1299,
    minGuests: 100,
    includes: {
      welcomeDrinks: 4,
      starters: 6,
      mainCourse: 8,
      breadsRice: 4,
      desserts: 4,
      liveCounters: 3,
    },
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  },
];

// const ADD_ONS = [
//   {
//     id: "ADD1",
//     name: "Professional Waiter Staff",
//     price: 1200,
//     unit: "per staff",
//   },
//   { id: "ADD2", name: "Premium Ceramic Cutlery", price: 50, unit: "per guest" },
// ];

export default function CateringAppFinal() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");

  // Event Details State
  const [eventType, setEventType] = useState("Wedding");
  const [guestCount, setGuestCount] = useState(50);
  const [eventDate, setEventDate] = useState("");

  // Package Selection
  const [selectedPackage, setSelectedPackage] =
    useState<CateringPackage | null>(null);

  // Checkout State
  const [address, setAddress] = useState("");
  const [waitersCount, setWaitersCount] = useState(0);
  const [premiumCutlery, setPremiumCutlery] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Processing
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingId, setBookingId] = useState("");

  // Calculate Bills
  const { plateTotal, addOnsTotal, grandTotal, advanceAmount } = useMemo(() => {
    if (!selectedPackage)
      return { plateTotal: 0, addOnsTotal: 0, grandTotal: 0, advanceAmount: 0 };

    const plates = selectedPackage.pricePerPlate * guestCount;
    let addons = 0;

    addons += waitersCount * 1200; // Waiter cost
    if (premiumCutlery) addons += guestCount * 50; // Cutlery cost

    const total = plates + addons;
    const advance = Math.round(total * 0.2); // 20% Advance Token

    return {
      plateTotal: plates,
      addOnsTotal: addons,
      grandTotal: total,
      advanceAmount: advance,
    };
  }, [selectedPackage, guestCount, waitersCount, premiumCutlery]);

  const handleFindPackages = () => {
    if (!eventDate || guestCount < 20)
      return alert("Please select a date and minimum 20 guests.");
    setCurrentScreen("packages");
  };

  const handleConfirmBooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setBookingId(
        `EVT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      );
      setIsProcessing(false);
      setCurrentScreen("success");
    }, 2000);
  };

  const resetFlow = () => {
    setSelectedPackage(null);
    setWaitersCount(0);
    setPremiumCutlery(false);
    setBookingId("");
    setCurrentScreen("home");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-foreground pb-24 md:pb-0">
      {/* ==========================================
          GLOBAL HEADER
      ========================================== */}
      <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCurrentScreen("home")}
            >
              <ChefHat size={28} className="text-primary" />
              <h1 className="text-2xl font-black tracking-tighter text-primary">
                ANG Catering
              </h1>
            </div>
            <div className="hidden md:flex items-center gap-2 hover:text-primary cursor-pointer transition-colors">
              <MapPin size={20} className="text-primary" />
              <div className="flex flex-col">
                <span className="text-sm font-bold flex items-center gap-1">
                  Delhi NCR <ChevronDown size={14} />
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              className="hidden md:flex font-bold text-base hover:text-primary"
            >
              My Events
            </Button>
            <Avatar className="w-12 h-12 border-2 border-border cursor-pointer">
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                <User size={24} />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* ==========================================
            SCREEN 1: HOME (EVENT DETAILS)
        ========================================== */}
        {currentScreen === "home" && (
          <div className="space-y-10 animate-in fade-in duration-500">
            {/* Hero Section */}
            <div className="bg-card rounded-md border border-border shadow-lg overflow-hidden relative">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80"
                  alt="Catering Background"
                  className="w-full h-full object-cover opacity-20 dark:opacity-10"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
              </div>

              <div className="relative z-10 p-8 md:p-12 md:w-2/3 space-y-6">
                <div>
                  <Badge className="bg-primary/10 text-primary border-none uppercase tracking-widest font-bold mb-4">
                    Premium Catering Services
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                    Make your special events{" "}
                    <span className="text-primary">unforgettable.</span>
                  </h2>
                  <p className="text-muted-foreground mt-2 font-medium">
                    Book top-rated caterers for weddings, corporate events, and
                    house parties.
                  </p>
                </div>

                {/* Event Setup Form */}
                <div className="bg-background p-6 rounded-3xl shadow-xl border border-border space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      What's the occasion?
                    </label>
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                      {EVENT_TYPES.map((type) => (
                        <div
                          key={type.name}
                          onClick={() => setEventType(type.name)}
                          className={cn(
                            "flex items-center gap-2 px-4 py-3 rounded-2xl border-2 cursor-pointer transition-all shrink-0",
                            eventType === type.name
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "border-border hover:border-primary/50",
                          )}
                        >
                          <type.icon
                            size={18}
                            className={
                              eventType === type.name
                                ? "text-primary"
                                : "text-muted-foreground"
                            }
                          />
                          <span className="font-bold text-sm">{type.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Event Date
                      </label>
                      <div className="relative">
                        <CalendarDays
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                          size={18}
                        />
                        <Input
                          type="date"
                          className="h-14 pl-12 rounded-2xl bg-muted/50 border-border font-bold"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Number of Guests (Min 20)
                      </label>
                      <div className="flex items-center justify-between bg-muted/50 border border-border rounded-2xl h-14 px-2 shadow-sm">
                        <Button
                          variant="ghost"
                          onClick={() =>
                            setGuestCount(Math.max(20, guestCount - 10))
                          }
                          className="h-10 w-12 rounded-xl text-lg hover:bg-background"
                        >
                          -
                        </Button>
                        <div className="flex items-center gap-2 font-black text-lg">
                          <Users size={18} className="text-primary" />{" "}
                          {guestCount}
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => setGuestCount(guestCount + 10)}
                          className="h-10 w-12 rounded-xl text-lg hover:bg-background"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleFindPackages}
                    className="w-full h-14 rounded-2xl font-black uppercase tracking-widest bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 hover:scale-[1.01] transition-all"
                  >
                    Find Menus & Packages{" "}
                    <ChevronRight size={18} className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 2: PACKAGES LIST
        ========================================== */}
        {currentScreen === "packages" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative animate-in slide-in-from-right-8 duration-300">
            {/* Left: Package List */}
            <div className="lg:col-span-2 space-y-6 pb-10">
              <div
                className="flex items-center gap-4 cursor-pointer hover:text-primary w-fit mb-4"
                onClick={() => setCurrentScreen("home")}
              >
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                  <ArrowLeft size={20} />
                </div>
                <span className="font-bold uppercase text-xs tracking-widest">
                  Edit Event Details
                </span>
              </div>

              <div>
                <h2 className="text-3xl font-black tracking-tight">
                  Select a Menu Package
                </h2>
                <p className="text-sm font-bold text-muted-foreground mt-1 flex items-center gap-2">
                  <PartyPopper size={16} className="text-primary" /> {eventType}{" "}
                  Event • <Users size={16} className="text-primary" />{" "}
                  {guestCount} Guests •{" "}
                  <CalendarDays size={16} className="text-primary" />{" "}
                  {eventDate}
                </p>
              </div>

              <div className="space-y-6">
                {PACKAGES.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={cn(
                      "bg-card rounded-3xl border shadow-sm transition-all overflow-hidden flex flex-col md:flex-row relative group",
                      selectedPackage?.id === pkg.id
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50",
                    )}
                  >
                    {pkg.popular && (
                      <Badge className="absolute top-4 left-4 bg-orange-500 text-white border-none font-bold text-[10px] uppercase tracking-widest px-2 py-0.5 rounded shadow-lg z-10">
                        Most Popular
                      </Badge>
                    )}

                    <div className="w-full md:w-48 h-48 md:h-auto bg-muted shrink-0 relative overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-black text-2xl leading-tight">
                            {pkg.name}
                          </h3>
                          <div className="text-right shrink-0">
                            <p className="font-black text-2xl text-primary">
                              ₹{pkg.pricePerPlate}
                            </p>
                            <p className="text-[10px] font-bold uppercase text-muted-foreground">
                              Per Plate
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground font-medium mt-2">
                          {pkg.description}
                        </p>
                      </div>

                      <div className="bg-muted/30 rounded-xl p-3 flex flex-wrap gap-x-4 gap-y-2 border border-border">
                        <span className="text-[11px] font-bold flex items-center gap-1">
                          <GlassWater size={12} className="text-blue-500" />{" "}
                          {pkg.includes.welcomeDrinks} Drinks
                        </span>
                        <span className="text-[11px] font-bold flex items-center gap-1">
                          <UtensilsCrossed
                            size={12}
                            className="text-orange-500"
                          />{" "}
                          {pkg.includes.starters} Starters
                        </span>
                        <span className="text-[11px] font-bold flex items-center gap-1">
                          <ChefHat size={12} className="text-green-500" />{" "}
                          {pkg.includes.mainCourse} Mains
                        </span>
                        <span className="text-[11px] font-bold flex items-center gap-1">
                          <Cake size={12} className="text-purple-500" />{" "}
                          {pkg.includes.desserts} Desserts
                        </span>
                        {pkg.includes.liveCounters && (
                          <span className="text-[11px] font-bold flex items-center gap-1 text-primary">
                            <PartyPopper size={12} />{" "}
                            {pkg.includes.liveCounters} Live Counters
                          </span>
                        )}
                      </div>

                      <div className="pt-2 flex justify-end">
                        <Button
                          onClick={() => setSelectedPackage(pkg)}
                          variant={
                            selectedPackage?.id === pkg.id
                              ? "default"
                              : "outline"
                          }
                          className={cn(
                            "rounded-xl font-bold uppercase tracking-widest text-xs h-10 px-6",
                            selectedPackage?.id === pkg.id &&
                              "bg-primary text-primary-foreground",
                          )}
                        >
                          {selectedPackage?.id === pkg.id
                            ? "Selected"
                            : "Select Package"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Desktop Summary */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-28 bg-card rounded-3xl border border-border shadow-sm p-6 space-y-6">
                <h3 className="text-2xl font-black">Event Estimate</h3>
                {!selectedPackage ? (
                  <div className="text-center py-10 opacity-50 space-y-4">
                    <ChefHat size={48} className="mx-auto" />
                    <p className="font-bold text-sm uppercase tracking-widest">
                      Select a package to view estimate
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 bg-background p-4 rounded-2xl border border-border">
                      <div className="flex justify-between items-center text-sm font-bold border-b border-border pb-3">
                        <span className="text-muted-foreground">
                          {selectedPackage.name}
                        </span>
                        <span>₹{selectedPackage.pricePerPlate}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-bold pb-1">
                        <span className="text-muted-foreground">
                          Guaranteed Guests
                        </span>
                        <span className="bg-muted px-2 py-0.5 rounded-md">
                          x {guestCount}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 font-black text-xl">
                      <span>Total Plates Cost</span>
                      <span className="text-primary">
                        ₹{selectedPackage.pricePerPlate * guestCount}
                      </span>
                    </div>

                    <Button
                      onClick={() => setCurrentScreen("checkout")}
                      className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                    >
                      Proceed to Add-ons{" "}
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 3: CHECKOUT & ADD-ONS
        ========================================== */}
        {currentScreen === "checkout" && selectedPackage && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-right-8 duration-300">
            {/* Left: Forms & Addons */}
            <div className="lg:col-span-2 space-y-8">
              <div
                className="flex items-center gap-4 cursor-pointer hover:text-primary w-fit"
                onClick={() => setCurrentScreen("packages")}
              >
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                  <ArrowLeft size={20} />
                </div>
                <span className="font-bold uppercase text-xs tracking-widest">
                  Back to Packages
                </span>
              </div>

              {/* Add-ons Section */}
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-border pb-4">
                  <PartyPopper size={24} className="text-primary" />
                  <h2 className="text-xl font-black uppercase tracking-tight">
                    Enhance Your Event (Add-ons)
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Waiters Add-on */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border-2 border-border bg-background">
                    <div className="space-y-1">
                      <h4 className="font-bold text-base">
                        Professional Waiter Staff
                      </h4>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        ₹1200 per staff member
                      </p>
                    </div>
                    <div className="flex items-center justify-between bg-muted border border-border rounded-xl h-12 w-32 px-1 shrink-0">
                      <button
                        onClick={() =>
                          setWaitersCount(Math.max(0, waitersCount - 1))
                        }
                        className="w-1/3 text-xl font-bold"
                      >
                        -
                      </button>
                      <span className="font-black text-sm">{waitersCount}</span>
                      <button
                        onClick={() => setWaitersCount(waitersCount + 1)}
                        className="w-1/3 text-xl font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Cutlery Add-on */}
                  <label
                    className={cn(
                      "flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all",
                      premiumCutlery
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background",
                    )}
                  >
                    <div className="space-y-1">
                      <h4 className="font-bold text-base">
                        Premium Ceramic Cutlery Setup
                      </h4>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        ₹50 per guest (Total: ₹{50 * guestCount})
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={premiumCutlery}
                      onChange={(e) => setPremiumCutlery(e.target.checked)}
                      className="w-6 h-6 accent-primary shrink-0"
                    />
                  </label>
                </div>
              </div>

              {/* Event Address */}
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-border pb-4">
                  <MapPin size={24} className="text-primary" />
                  <h2 className="text-xl font-black uppercase tracking-tight">
                    Event Venue Details
                  </h2>
                </div>
                <textarea
                  placeholder="Enter complete venue address, hall name, landmark..."
                  className="w-full bg-background border border-border rounded-2xl p-4 focus:outline-none focus:border-primary font-medium resize-none min-h-[100px]"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/* Payment Method */}
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-border pb-4">
                  <Wallet size={24} className="text-primary" />
                  <h2 className="text-xl font-black uppercase tracking-tight">
                    Advance Payment Method
                  </h2>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-900 p-4 rounded-2xl flex items-start gap-3 text-orange-800 dark:text-orange-400 mb-4">
                  <Info size={20} className="shrink-0 mt-0.5" />
                  <p className="text-xs font-bold leading-relaxed">
                    Catering bookings require a 20% token advance to block the
                    date and arrange logistics. The remaining 80% is payable on
                    the event day.
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
                <h3 className="text-2xl font-black">Booking Summary</h3>

                <div className="space-y-4">
                  <div className="bg-background rounded-2xl p-4 border border-border space-y-3">
                    <div className="flex items-center justify-between text-sm font-bold border-b border-border pb-3">
                      <span className="text-muted-foreground w-2/3 truncate">
                        {selectedPackage.name}
                      </span>
                      <span>₹{plateTotal}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground pt-1">
                      <span className="flex items-center gap-1">
                        <Users size={14} /> {guestCount} Guests
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays size={14} /> {eventDate}
                      </span>
                    </div>
                  </div>

                  {addOnsTotal > 0 && (
                    <div className="space-y-2 pt-2 text-xs font-bold text-muted-foreground">
                      <p className="uppercase tracking-widest mb-2 border-b border-border pb-2">
                        Add-ons
                      </p>
                      {waitersCount > 0 && (
                        <div className="flex justify-between">
                          <span>{waitersCount}x Waiter Staff</span>
                          <span className="text-foreground">
                            ₹{waitersCount * 1200}
                          </span>
                        </div>
                      )}
                      {premiumCutlery && (
                        <div className="flex justify-between">
                          <span>Premium Cutlery</span>
                          <span className="text-foreground">
                            ₹{guestCount * 50}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex justify-between items-center text-sm font-bold text-muted-foreground">
                    <span>Total Event Value</span>
                    <span>₹{grandTotal}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 font-black text-2xl">
                    <div className="flex flex-col">
                      <span>Advance to Pay</span>
                      <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
                        20% Token Amount
                      </span>
                    </div>
                    <span className="text-primary">₹{advanceAmount}</span>
                  </div>
                </div>

                <Button
                  onClick={handleConfirmBooking}
                  disabled={!address || isProcessing}
                  className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-sm bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 mt-4"
                >
                  {isProcessing
                    ? "Processing..."
                    : `Pay Advance ₹${advanceAmount}`}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 4: SUCCESS TICKET
        ========================================== */}
        {currentScreen === "success" && selectedPackage && (
          <div className="max-w-lg mx-auto w-full bg-card rounded-[2.5rem] border border-border shadow-2xl p-8 md:p-10 text-center space-y-8 mt-4 animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(34,197,94,0.4)]">
              <CheckCircle2 size={48} className="text-white" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight">
                Booking Confirmed!
              </h2>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Your Catering Event is Locked
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
                    <PartyPopper size={14} /> Event
                  </span>
                  <span className="text-foreground">{eventType}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold uppercase">
                  <span className="text-muted-foreground tracking-widest flex items-center gap-2">
                    <CalendarDays size={14} /> Date
                  </span>
                  <span className="text-foreground">{eventDate}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold uppercase">
                  <span className="text-muted-foreground tracking-widest flex items-center gap-2">
                    <Users size={14} /> Guests
                  </span>
                  <span className="text-foreground">{guestCount} Pax</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold uppercase border-t border-border pt-4">
                  <span className="text-muted-foreground tracking-widest flex items-center gap-2">
                    <ReceiptText size={14} /> Advance Paid
                  </span>
                  <span className="text-green-600 font-black text-base">
                    ₹{advanceAmount}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 p-4 rounded-2xl text-left flex items-start gap-3">
              <PhoneCall size={24} className="text-blue-600 shrink-0" />
              <div>
                <p className="font-bold text-sm text-blue-800 dark:text-blue-400">
                  Event Manager Assigned
                </p>
                <p className="text-xs font-medium text-blue-700/80 dark:text-blue-400/80 mt-1">
                  Our team will call you within 24 hours to discuss menu
                  customization and venue recce.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <Button
                onClick={resetFlow}
                className="w-full h-14 rounded-xl font-black uppercase tracking-widest bg-slate-900 dark:bg-white text-white dark:text-black border-none shadow-xl hover:scale-[1.02] transition-transform"
              >
                Return to Home
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Action Bar (Checkout Trigger) */}
      {selectedPackage && currentScreen === "packages" && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background p-4 border-t border-border shadow-[0_-4px_15px_rgba(0,0,0,0.05)] z-50 rounded-t-3xl animate-in slide-in-from-bottom-5">
          <div
            onClick={() => setCurrentScreen("checkout")}
            className="bg-primary text-primary-foreground p-4 rounded-xl flex justify-between items-center cursor-pointer shadow-lg"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest">
                {guestCount} Plates • Total ₹
                {selectedPackage.pricePerPlate * guestCount}
              </p>
              <p className="text-lg font-black">Customize Add-ons</p>
            </div>
            <div className="flex items-center gap-1 font-bold text-sm uppercase tracking-widest">
              Next <ChevronRight size={18} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
