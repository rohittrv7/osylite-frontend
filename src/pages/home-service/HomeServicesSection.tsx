import React, { useState, useMemo } from "react";
import {
  Search,
  Wind,
  Sparkles,
  Zap,
  Droplets,
  Wrench,
  ArrowLeft,
  Plus,
  Minus,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- Interfaces ---
interface SubItem {
  id: string;
  name: string;
  price: number;
  time: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  rating: number;
  reviews: string;
  colorClass: string;
  bgClass: string;
  subItems: SubItem[];
}

type Step = "services" | "details" | "schedule" | "success";

// --- Mock Data ---
const SERVICES: ServiceCategory[] = [
  {
    id: "ac",
    title: "AC Repair & Service",
    icon: Wind,
    rating: 4.8,
    reviews: "12k",
    colorClass: "text-blue-500",
    bgClass: "bg-blue-500/10",
    subItems: [
      {
        id: "ac1",
        name: "Split AC Regular Service",
        price: 599,
        time: "45 mins",
      },
      {
        id: "ac2",
        name: "Window AC Regular Service",
        price: 499,
        time: "45 mins",
      },
      {
        id: "ac3",
        name: "AC Gas Leak Fix & Refill",
        price: 2499,
        time: "2 hrs",
      },
    ],
  },
  {
    id: "clean",
    title: "Deep Home Cleaning",
    icon: Sparkles,
    rating: 4.9,
    reviews: "34k",
    colorClass: "text-purple-500",
    bgClass: "bg-purple-500/10",
    subItems: [
      { id: "cl1", name: "1 BHK Deep Cleaning", price: 1999, time: "4-5 hrs" },
      { id: "cl2", name: "2 BHK Deep Cleaning", price: 2599, time: "5-6 hrs" },
      { id: "cl3", name: "Bathroom Deep Cleaning", price: 499, time: "1 hr" },
    ],
  },
  {
    id: "electric",
    title: "Electrician",
    icon: Zap,
    rating: 4.7,
    reviews: "8k",
    colorClass: "text-yellow-500",
    bgClass: "bg-yellow-500/10",
    subItems: [
      { id: "el1", name: "Switchboard Repair", price: 149, time: "30 mins" },
      {
        id: "el2",
        name: "Fan Installation/Repair",
        price: 199,
        time: "45 mins",
      },
      { id: "el3", name: "MCB/Fuse Replacement", price: 299, time: "1 hr" },
    ],
  },
  {
    id: "plumb",
    title: "Plumber",
    icon: Droplets,
    rating: 4.8,
    reviews: "15k",
    colorClass: "text-cyan-500",
    bgClass: "bg-cyan-500/10",
    subItems: [
      {
        id: "pl1",
        name: "Tap Repair/Replacement",
        price: 149,
        time: "30 mins",
      },
      { id: "pl2", name: "Washbasin Blockage", price: 249, time: "45 mins" },
      { id: "pl3", name: "Toilet Fixing", price: 399, time: "1 hr" },
    ],
  },
];

const TIME_SLOTS = [
  "09:00 AM - 11:00 AM",
  "12:00 PM - 02:00 PM",
  "03:00 PM - 05:00 PM",
  "06:00 PM - 08:00 PM",
];

export default function HomeServicesSection() {
  const [step, setStep] = useState<Step>("services");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeService, setActiveService] = useState<ServiceCategory | null>(
    null,
  );

  // Cart State: { [subItemId]: quantity }
  const [cart, setCart] = useState<Record<string, number>>({});

  // Scheduling State
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  // Processing & Success State
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingId, setBookingId] = useState("");

  // 🔹 Filter Services based on Search
  const filteredServices = useMemo(() => {
    return SERVICES.filter((s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  // 🔹 Cart Logic
  const updateCart = (id: string, increment: boolean) => {
    setCart((prev) => {
      const currentQty = prev[id] || 0;
      const newQty = increment ? currentQty + 1 : currentQty - 1;
      if (newQty <= 0) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const cartTotal = useMemo(() => {
    if (!activeService) return 0;
    let total = 0;
    activeService.subItems.forEach((item) => {
      if (cart[item.id]) {
        total += item.price * cart[item.id];
      }
    });
    return total;
  }, [cart, activeService]);

  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0);

  // 🔹 Navigation Handlers
  const handleServiceSelect = (service: ServiceCategory) => {
    setActiveService(service);
    setCart({}); // Reset cart when changing category
    setStep("details");
  };

  const handleProceedToSchedule = () => {
    if (cartItemCount > 0) setStep("schedule");
  };

  const handleConfirmBooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newId = `HS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setBookingId(newId);
      setIsProcessing(false);
      setStep("success");
    }, 1500);
  };

  const resetFlow = () => {
    setActiveService(null);
    setCart({});
    setAddress("");
    setDate("");
    setTimeSlot("");
    setBookingId("");
    setStep("services");
  };

  return (
    <div className="w-full min-h-screen bg-background flex flex-col py-8 px-4 md:px-8">
      {/* ==========================================
          STEP 1: BROWSE CATEGORIES
      ========================================== */}
      {step === "services" && (
        <div className="w-full max-w-6xl mx-auto space-y-10">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-card p-8 rounded-3xl border border-border shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <ShieldCheck size={20} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  Verified Professionals
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                ANG <span className="text-primary">Home Services</span>
              </h2>
            </div>
            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <Input
                placeholder="Search for a service..."
                className="h-14 pl-12 rounded-2xl bg-background border-border font-bold shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Service Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                className="bg-card rounded-3xl p-6 border border-border hover:border-primary/50 transition-all shadow-sm hover:shadow-xl cursor-pointer group flex flex-col items-start gap-6"
              >
                <div
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                    service.bgClass,
                  )}
                >
                  <service.icon size={28} className={service.colorClass} />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold tracking-tight">
                    {service.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <span className="flex items-center gap-1 text-primary">
                      <Star size={12} className="fill-primary" />{" "}
                      {service.rating}
                    </span>
                    <span>• {service.reviews} Bookings</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          STEP 2: SERVICE DETAILS & CART
      ========================================== */}
      {step === "details" && activeService && (
        <div className="w-full max-w-5xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setStep("services")}
            className="mb-6 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-muted"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Categories
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Sub Items List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-3xl p-8 border border-border shadow-sm flex items-center gap-6">
                <div
                  className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center",
                    activeService.bgClass,
                  )}
                >
                  <activeService.icon
                    size={36}
                    className={activeService.colorClass}
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight">
                    {activeService.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="secondary"
                      className="bg-green-500/10 text-green-600 border-none font-bold text-xs uppercase px-3 py-1"
                    >
                      <ShieldCheck size={14} className="mr-1" /> ANG Safe
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-3xl p-6 border border-border shadow-sm space-y-2">
                {activeService.subItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-border last:border-0 gap-4"
                  >
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold">{item.name}</h4>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                        <Clock size={12} /> {item.time}
                      </p>
                      <p className="text-lg font-black mt-2">₹{item.price}</p>
                    </div>

                    {/* Add to Cart Controls */}
                    <div className="flex items-center gap-4 bg-background border border-border rounded-xl p-1 shadow-sm">
                      {cart[item.id] ? (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateCart(item.id, false)}
                            className="h-8 w-8 rounded-lg text-primary hover:bg-primary/10"
                          >
                            <Minus size={16} />
                          </Button>
                          <span className="font-bold w-4 text-center">
                            {cart[item.id]}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateCart(item.id, true)}
                            className="h-8 w-8 rounded-lg text-primary hover:bg-primary/10"
                          >
                            <Plus size={16} />
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="ghost"
                          onClick={() => updateCart(item.id, true)}
                          className="h-10 px-6 rounded-lg font-bold uppercase text-xs text-primary hover:bg-primary/10"
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-3xl p-6 border border-border shadow-sm sticky top-6 space-y-6">
                <h3 className="text-xl font-bold uppercase tracking-tight">
                  Service Summary
                </h3>

                {cartItemCount === 0 ? (
                  <div className="py-10 text-center flex flex-col items-center opacity-40">
                    <Wrench size={40} className="mb-4" />
                    <p className="font-bold uppercase tracking-widest text-xs">
                      No items added
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {activeService.subItems.map((item) => {
                        if (!cart[item.id]) return null;
                        return (
                          <div
                            key={item.id}
                            className="flex justify-between items-start text-sm font-bold"
                          >
                            <span className="w-2/3 text-muted-foreground">
                              {cart[item.id]}x {item.name}
                            </span>
                            <span>₹{item.price * cart[item.id]}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-4 border-t border-border flex justify-between items-center text-xl">
                      <span className="font-bold uppercase tracking-widest text-xs text-muted-foreground">
                        Total
                      </span>
                      <span className="font-black">₹{cartTotal}</span>
                    </div>

                    <Button
                      onClick={handleProceedToSchedule}
                      className="w-full h-14 rounded-2xl bg-slate-900 dark:bg-primary text-white dark:text-black font-bold uppercase tracking-widest text-sm shadow-xl"
                    >
                      Proceed to Schedule
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          STEP 3: SCHEDULE & ADDRESS
      ========================================== */}
      {step === "schedule" && activeService && (
        <div className="w-full max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setStep("details")}
            className="mb-6 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-muted"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Cart
          </Button>

          <div className="bg-card rounded-3xl p-8 border border-border shadow-sm space-y-8">
            <div>
              <h3 className="text-3xl font-black uppercase tracking-tight mb-2">
                Schedule Service
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Select a convenient time and location
              </p>
            </div>

            <div className="space-y-6">
              {/* Address Input */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Service Location
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-4 top-4 text-muted-foreground"
                    size={18}
                  />
                  <textarea
                    placeholder="Enter complete address, landmark, pin code..."
                    className="w-full min-h-[100px] p-4 pl-12 rounded-2xl bg-background border border-border focus:outline-none focus:border-primary/50 resize-none font-medium shadow-sm"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                      size={16}
                    />
                    <Input
                      type="date"
                      className="h-14 pl-12 rounded-2xl bg-background border-border font-bold shadow-sm"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Preferred Time
                  </label>
                  <div className="relative">
                    <Clock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                      size={16}
                    />
                    <select
                      className="w-full h-14 pl-12 pr-4 rounded-2xl bg-background border border-border focus:outline-none font-bold shadow-sm appearance-none"
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Time Slot
                      </option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border space-y-6">
              <div className="flex justify-between items-center bg-muted/50 p-4 rounded-2xl border border-border">
                <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  Total Payable
                </span>
                <span className="text-3xl font-black text-primary">
                  ₹{cartTotal}
                </span>
              </div>
              <Button
                onClick={handleConfirmBooking}
                disabled={!address || !date || !timeSlot || isProcessing}
                className="w-full h-16 rounded-2xl bg-slate-900 dark:bg-primary text-white dark:text-black font-bold uppercase tracking-widest text-sm shadow-xl hover:shadow-primary/20 transition-all"
              >
                {isProcessing ? "Confirming Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          STEP 4: SUCCESS SCREEN
      ========================================== */}
      {step === "success" && (
        <div className="w-full max-w-md mx-auto bg-card rounded-[2.5rem] p-10 shadow-2xl text-center space-y-8 border-t-8 border-green-500">
          <div className="space-y-4">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.4)]">
              <CheckCircle2 size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              Booking Confirmed
            </h2>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              A professional will be assigned soon
            </p>
          </div>

          <div className="bg-muted/30 rounded-2xl p-6 space-y-4 text-left border border-border">
            <div className="flex justify-between items-center text-xs font-bold uppercase">
              <span className="text-muted-foreground tracking-widest">
                Service
              </span>
              <span>{activeService?.title}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold uppercase">
              <span className="text-muted-foreground tracking-widest">
                Booking ID
              </span>
              <span className="text-primary">{bookingId}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold uppercase">
              <span className="text-muted-foreground tracking-widest">
                Date & Time
              </span>
              <span>
                {date} | {timeSlot.split(" - ")[0]}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold uppercase">
              <span className="text-muted-foreground tracking-widest">
                Total Paid
              </span>
              <span>₹{cartTotal}</span>
            </div>
          </div>

          <Button
            onClick={resetFlow}
            className="w-full h-14 rounded-xl font-bold uppercase tracking-widest"
          >
            Back to Home
          </Button>
        </div>
      )}
    </div>
  );
}
