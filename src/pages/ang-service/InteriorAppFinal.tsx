import React, { useState, useMemo, useEffect } from "react";
import {
  MapPin,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  CalendarDays,
  Home,
  Sofa,
  PaintBucket,
  BedDouble,
  ChefHat,
  Ruler,
  Wallet,
  CreditCard,
  Banknote,
  Clock,
  Info,
  PhoneCall,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ==========================================
// TYPES & MOCK DATA
// ==========================================
type Screen = "home" | "scope" | "checkout" | "success";

interface RoomScope {
  id: string;
  name: string;
  icon: React.ElementType;
  minEstimate: number;
}

const PROPERTY_TYPES = [
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4+ BHK / Villa",
  "Independent House",
];

const DESIGN_STYLES = [
  {
    name: "Modern Minimalist",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&q=80",
  },
  {
    name: "Contemporary",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80",
  },
  {
    name: "Bohemian",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80",
  },
  {
    name: "Industrial",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500&q=80",
  },
];

const ROOM_OPTIONS: RoomScope[] = [
  { id: "RM1", name: "Modular Kitchen", icon: ChefHat, minEstimate: 150000 },
  { id: "RM2", name: "Living Room", icon: Sofa, minEstimate: 100000 },
  { id: "RM3", name: "Master Bedroom", icon: BedDouble, minEstimate: 120000 },
  { id: "RM4", name: "Guest Bedroom", icon: BedDouble, minEstimate: 90000 },
  {
    id: "RM5",
    name: "Painting & False Ceiling",
    icon: PaintBucket,
    minEstimate: 60000,
  },
];

const TIME_SLOTS = ["10:00 AM", "12:00 PM", "02:30 PM", "05:00 PM"];

export default function InteriorAppFinal() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");

  // Property Details (Home)
  const [propertyType, setPropertyType] = useState("2 BHK");
  const [selectedStyle, setSelectedStyle] = useState(DESIGN_STYLES[0].name);

  // Scope Selection (What to design)
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

  // Checkout & Consultation
  const [address, setAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Available Dates logic
  const [availableDates, setAvailableDates] = useState<Date[]>([]);

  // Processing
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const CONSULTATION_FEE = 999; // Booking fee for expert site visit

  // Generate next 7 days for Site Visit
  useEffect(() => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    setAvailableDates(dates);
    setSelectedDate(dates[0]); // Default to tomorrow
  }, []);

  // Calculations
  const estimatedCost = useMemo(() => {
    let total = 0;
    selectedRooms.forEach((roomId) => {
      const room = ROOM_OPTIONS.find((r) => r.id === roomId);
      if (room) total += room.minEstimate;
    });
    return total;
  }, [selectedRooms]);

  const toggleRoom = (id: string) => {
    setSelectedRooms((prev) =>
      prev.includes(id) ? prev.filter((rId) => rId !== id) : [...prev, id],
    );
  };

  const handleBookConsultation = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setBookingId(
        `INT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      );
      setIsProcessing(false);
      setCurrentScreen("success");
    }, 1500);
  };

  const resetFlow = () => {
    setSelectedRooms([]);
    setSelectedTime("");
    setBookingId("");
    setCurrentScreen("home");
  };

  // Helper to format currency
  const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-foreground pb-24 md:pb-0">
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* ==========================================
            SCREEN 1: HOME (PROPERTY & STYLE)
        ========================================== */}
        {currentScreen === "home" && (
          <div className="space-y-10 animate-in fade-in duration-500">
            {/* Hero Section */}
            <div className="bg-card rounded-md border border-border shadow-lg overflow-hidden relative">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80"
                  alt="Interior Background"
                  className="w-full h-full object-cover opacity-30 dark:opacity-10"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
              </div>

              <div className="relative z-10 p-8 md:p-12 md:w-2/3 space-y-8">
                <div>
                  <Badge className="bg-primary/10 text-primary border-none uppercase tracking-widest font-bold mb-4 px-3 py-1">
                    End-to-End Interiors
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                    Bring your dream home{" "}
                    <span className="text-primary">to life.</span>
                  </h2>
                  <p className="text-muted-foreground mt-3 font-medium text-lg">
                    Award-winning designers in Patna to personalize your space.
                  </p>
                </div>

                {/* Property Type Selection */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Select your property type
                  </label>
                  <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                    {PROPERTY_TYPES.map((type) => (
                      <div
                        key={type}
                        onClick={() => setPropertyType(type)}
                        className={cn(
                          "flex items-center justify-center px-6 py-3 rounded-2xl border-2 cursor-pointer transition-all shrink-0 font-bold text-sm",
                          propertyType === type
                            ? "border-primary bg-primary/5 text-primary shadow-sm"
                            : "border-border bg-background hover:border-primary/50 text-muted-foreground",
                        )}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => setCurrentScreen("scope")}
                  className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 hover:scale-[1.02] transition-all"
                >
                  Calculate Estimate <ChevronRight size={18} className="ml-2" />
                </Button>
              </div>
            </div>

            {/* Inspiration Gallery */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black tracking-tight">
                Discover your style
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {DESIGN_STYLES.map((style) => (
                  <div
                    key={style.name}
                    onClick={() => setSelectedStyle(style.name)}
                    className={cn(
                      "relative aspect-square rounded-3xl overflow-hidden cursor-pointer group border-4 transition-all",
                      selectedStyle === style.name
                        ? "border-primary"
                        : "border-transparent",
                    )}
                  >
                    <img
                      src={style.image}
                      alt={style.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                      <div className="w-full flex justify-between items-center">
                        <span className="text-white font-black text-lg">
                          {style.name}
                        </span>
                        {selectedStyle === style.name && (
                          <CheckCircle2
                            className="text-primary fill-background"
                            size={24}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 2: SCOPE OF WORK
        ========================================== */}
        {currentScreen === "scope" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative animate-in slide-in-from-right-8 duration-300">
            {/* Left: Scope Selection */}
            <div className="lg:col-span-2 space-y-6 pb-10">
              <div
                className="flex items-center gap-4 cursor-pointer hover:text-primary w-fit mb-4"
                onClick={() => setCurrentScreen("home")}
              >
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                  <ArrowLeft size={20} />
                </div>
                <span className="font-bold uppercase text-xs tracking-widest">
                  Back to Styles
                </span>
              </div>

              <div>
                <h2 className="text-3xl font-black tracking-tight">
                  What do you want to design?
                </h2>
                <p className="text-sm font-bold text-muted-foreground mt-1 flex items-center gap-2">
                  <Home size={16} className="text-primary" /> {propertyType} •{" "}
                  <PaintBucket size={16} className="text-primary" />{" "}
                  {selectedStyle} Theme
                </p>
              </div>

              {/* Multi-select Rooms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ROOM_OPTIONS.map((room) => {
                  const isSelected = selectedRooms.includes(room.id);
                  return (
                    <div
                      key={room.id}
                      onClick={() => toggleRoom(room.id)}
                      className={cn(
                        "bg-card p-6 rounded-3xl border-2 cursor-pointer transition-all flex flex-col gap-4 relative",
                        isSelected
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      {isSelected && (
                        <div className="absolute top-4 right-4 text-primary">
                          <CheckCircle2 size={24} />
                        </div>
                      )}
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        <room.icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-black text-lg">{room.name}</h3>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">
                          Starts at {formatINR(room.minEstimate)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Desktop Summary */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-28 bg-card rounded-3xl border border-border shadow-sm p-6 space-y-6">
                <h3 className="text-2xl font-black">Estimation</h3>

                {selectedRooms.length === 0 ? (
                  <div className="text-center py-10 opacity-50 space-y-4">
                    <Ruler size={48} className="mx-auto" />
                    <p className="font-bold text-sm uppercase tracking-widest">
                      Select rooms to see estimate
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 bg-background p-4 rounded-2xl border border-border max-h-[30vh] overflow-y-auto">
                      {selectedRooms.map((id) => {
                        const room = ROOM_OPTIONS.find((r) => r.id === id);
                        return room ? (
                          <div
                            key={id}
                            className="flex justify-between items-center text-xs font-bold border-b border-border pb-2 last:border-0 last:pb-0"
                          >
                            <span className="text-muted-foreground">
                              {room.name}
                            </span>
                            <span>{formatINR(room.minEstimate)}</span>
                          </div>
                        ) : null;
                      })}
                    </div>

                    <div className="pt-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                        Estimated Starting Cost
                      </p>
                      <p className="font-black text-3xl text-primary">
                        {formatINR(estimatedCost)}
                      </p>
                      <p className="text-[10px] font-medium text-muted-foreground mt-2 leading-relaxed">
                        This is a rough estimate. Final cost depends on
                        materials, finishes, and exact measurements during site
                        visit.
                      </p>
                    </div>

                    <Button
                      onClick={() => setCurrentScreen("checkout")}
                      className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg mt-4"
                    >
                      Book Expert Visit{" "}
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 3: CHECKOUT & CONSULTATION
        ========================================== */}
        {currentScreen === "checkout" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-right-8 duration-300">
            {/* Left: Scheduling Forms */}
            <div className="lg:col-span-2 space-y-8">
              <div
                className="flex items-center gap-4 cursor-pointer hover:text-primary w-fit"
                onClick={() => setCurrentScreen("scope")}
              >
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                  <ArrowLeft size={20} />
                </div>
                <span className="font-bold uppercase text-xs tracking-widest">
                  Back to Estimates
                </span>
              </div>

              {/* Site Address */}
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-border pb-4">
                  <MapPin size={24} className="text-primary" />
                  <h2 className="text-xl font-black uppercase tracking-tight">
                    Property Address
                  </h2>
                </div>
                <textarea
                  placeholder="Enter complete property address in Patna..."
                  className="w-full bg-background border border-border rounded-2xl p-4 focus:outline-none focus:border-primary font-medium resize-none min-h-[100px]"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/* Site Visit Slot */}
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-border pb-4">
                  <Clock size={24} className="text-primary" />
                  <h2 className="text-xl font-black uppercase tracking-tight">
                    Schedule Site Visit
                  </h2>
                </div>

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
                    Select Time Slot
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

              {/* Payment Method */}
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-border pb-4">
                  <Wallet size={24} className="text-primary" />
                  <h2 className="text-xl font-black uppercase tracking-tight">
                    Payment Method
                  </h2>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 p-4 rounded-2xl flex items-start gap-3 text-blue-800 dark:text-blue-400 mb-4">
                  <Info size={20} className="shrink-0 mt-0.5" />
                  <p className="text-xs font-bold leading-relaxed">
                    A nominal fee of {formatINR(CONSULTATION_FEE)} is charged to
                    assign a dedicated senior designer for a property visit.
                    This is 100% adjustable against your final project value.
                  </p>
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

                <div className="bg-background rounded-2xl p-4 border border-border space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">
                    <span className="flex items-center gap-1">
                      <Home size={14} /> {propertyType}
                    </span>
                    <span className="flex items-center gap-1">
                      <PaintBucket size={14} /> {selectedStyle}
                    </span>
                  </div>
                  <div className="space-y-1 py-1">
                    <p className="text-xs font-bold">Scope of Work:</p>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                      {selectedRooms
                        .map(
                          (id) => ROOM_OPTIONS.find((r) => r.id === id)?.name,
                        )
                        .join(", ")}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-sm font-bold text-muted-foreground">
                  <div className="flex justify-between items-center text-xs">
                    <span>Expert Consultation Fee</span>
                    <span className="text-foreground">
                      {formatINR(CONSULTATION_FEE)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>Taxes</span>
                    <span className="text-foreground">Inclusive</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border font-black text-2xl">
                  <span>To Pay</span>
                  <span className="text-primary">
                    {formatINR(CONSULTATION_FEE)}
                  </span>
                </div>

                <Button
                  onClick={handleBookConsultation}
                  disabled={!address || !selectedTime || isProcessing}
                  className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-sm bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 mt-4"
                >
                  {isProcessing ? "Processing..." : `Pay & Book Visit`}
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
                Visit Confirmed!
              </h2>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Your expert interior designer is assigned
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
                <div className="flex justify-between items-center text-xs font-bold uppercase border-t border-border pt-4">
                  <span className="text-muted-foreground tracking-widest flex items-center gap-2">
                    <Banknote size={14} /> Fee Paid
                  </span>
                  <span className="text-green-600 font-black text-base">
                    {formatINR(CONSULTATION_FEE)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 p-4 rounded-2xl text-left flex items-start gap-3">
              <PhoneCall size={24} className="text-blue-600 shrink-0" />
              <div>
                <p className="font-bold text-sm text-blue-800 dark:text-blue-400">
                  Designer is reviewing your scope
                </p>
                <p className="text-xs font-medium text-blue-700/80 dark:text-blue-400/80 mt-1">
                  Our designer will call you shortly to confirm the exact
                  property location in Patna before the visit.
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

      {/* Mobile Bottom Action Bar (Scope to Checkout) */}
      {selectedRooms.length > 0 && currentScreen === "scope" && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background p-4 border-t border-border shadow-[0_-4px_15px_rgba(0,0,0,0.05)] z-50 rounded-t-3xl animate-in slide-in-from-bottom-5">
          <div
            onClick={() => setCurrentScreen("checkout")}
            className="bg-primary text-primary-foreground p-4 rounded-xl flex justify-between items-center cursor-pointer shadow-lg"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest">
                Estimated Start Cost
              </p>
              <p className="text-xl font-black">{formatINR(estimatedCost)}</p>
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
