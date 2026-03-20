import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Star,
  FileText,
  ShieldCheck,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- Types ---
interface Expert {
  id: string;
  name: string;
  role: string;
  experience: string;
  rating: number;
  fee: number;
  type: "Video" | "In-Person";
}

type Step = 1 | 2 | 3 | 4;

// --- Mock Data ---
const EXPERTS: Expert[] = [
  {
    id: "EXP01",
    name: "Dr. Ananya Sharma",
    role: "Corporate Lawyer",
    experience: "12 Yrs",
    rating: 4.9,
    fee: 2500,
    type: "Video",
  },
  {
    id: "EXP02",
    name: "Rahul Verma",
    role: "Tax Consultant",
    experience: "8 Yrs",
    rating: 4.8,
    fee: 1500,
    type: "Video",
  },
  {
    id: "EXP03",
    name: "Vikram Singh",
    role: "Business Strategist",
    experience: "15 Yrs",
    rating: 4.9,
    fee: 5000,
    type: "In-Person",
  },
  {
    id: "EXP04",
    name: "Priya Desai",
    role: "Financial Planner",
    experience: "10 Yrs",
    rating: 4.7,
    fee: 2000,
    type: "Video",
  },
];

const TIME_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:30 PM",
  "02:00 PM",
  "04:00 PM",
  "05:30 PM",
];

export default function AppointmentBooking() {
  const [step, setStep] = useState<Step>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingId, setBookingId] = useState("");

  // --- Booking State ---
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    reason: "",
  });

  // --- Dynamic Dates (Next 7 Days) ---
  const [availableDates, setAvailableDates] = useState<Date[]>([]);

  useEffect(() => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    setAvailableDates(dates);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () =>
    setStep((prev) => (prev < 4 ? ((prev + 1) as Step) : prev));
  const prevStep = () =>
    setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev));

  const handleBookAppointment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // Safe ID generation
      const newId = `APT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setBookingId(newId);
      setIsProcessing(false);
      setStep(4);
    }, 1500);
  };

  const resetFlow = () => {
    setSelectedExpert(null);
    setSelectedDate(null);
    setSelectedTime("");
    setFormData({ name: "", phone: "", reason: "" });
    setBookingId("");
    setStep(1);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="w-full min-h-screen bg-background flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* --- Header & Stepper --- */}
        {step < 4 && (
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-black uppercase tracking-tight">
                Book Appointment
              </h1>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Consult with our elite specialists
              </p>
            </div>

            {/* Stepper UI */}
            <div className="flex items-center justify-between relative px-2 sm:px-12 mt-4">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted rounded-full -z-10 px-8">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${((step - 1) / 2) * 100}%` }}
                />
              </div>

              {[
                { num: 1, icon: User, label: "Specialist" },
                { num: 2, icon: Calendar, label: "Schedule" },
                { num: 3, icon: FileText, label: "Details" },
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

        {/* --- Step 1: Select Specialist --- */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {EXPERTS.map((expert) => (
                <div
                  key={expert.id}
                  onClick={() => {
                    setSelectedExpert(expert);
                    nextStep();
                  }}
                  className="bg-card p-6 rounded-3xl border border-border hover:border-primary/50 transition-all shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between gap-6 group"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                      <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl uppercase">
                          {expert.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold tracking-tight">
                          {expert.name}
                        </h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
                          {expert.role}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-none font-bold text-xs px-2 py-1 flex items-center gap-1"
                    >
                      <Star size={12} className="fill-primary" />{" "}
                      {expert.rating}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Consultation Fee
                      </p>
                      <p className="text-lg font-black">₹{expert.fee}</p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {expert.type === "Video" ? (
                        <Video size={14} className="text-blue-500" />
                      ) : (
                        <Briefcase size={14} className="text-orange-500" />
                      )}
                      {expert.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- Step 2: Schedule Date & Time --- */}
        {step === 2 && selectedExpert && (
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm space-y-8">
            <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-2xl border border-border">
              <Avatar className="h-12 w-12 border border-background">
                <AvatarFallback className="bg-primary/10 text-primary font-bold uppercase">
                  {selectedExpert.name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold">{selectedExpert.name}</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {selectedExpert.role}
                </p>
              </div>
            </div>

            {/* Date Selection (Horizontal Scroll) */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Select Date
              </label>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {availableDates.map((date, i) => {
                  const isSelected =
                    selectedDate?.toDateString() === date.toDateString();
                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedDate(date)}
                      className={cn(
                        "flex flex-col items-center justify-center min-w-[80px] h-[100px] rounded-2xl border cursor-pointer transition-all",
                        isSelected
                          ? "bg-primary border-primary text-background shadow-md transform scale-105"
                          : "bg-background border-border text-foreground hover:border-primary/50",
                      )}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80">
                        {date.toLocaleDateString("en-IN", { weekday: "short" })}
                      </span>
                      <span className="text-2xl font-black">
                        {date.getDate()}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-80">
                        {date.toLocaleDateString("en-IN", { month: "short" })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Select Time Slot
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {TIME_SLOTS.map((time, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "h-14 rounded-xl border font-bold text-sm transition-all flex items-center justify-center gap-2",
                      selectedTime === time
                        ? "bg-primary/10 border-primary text-primary shadow-sm"
                        : "bg-background border-border text-muted-foreground hover:border-primary/50",
                    )}
                  >
                    <Clock size={16} /> {time}
                  </button>
                ))}
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
                disabled={!selectedDate || !selectedTime}
                className="h-14 px-8 rounded-2xl font-bold uppercase tracking-widest shadow-lg"
              >
                Proceed to Details <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* --- Step 3: Client Details --- */}
        {step === 3 && selectedExpert && selectedDate && (
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm space-y-8">
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Booking Details
            </h2>

            {/* Appointment Summary Card */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Appointment With
                </p>
                <p className="font-bold">{selectedExpert.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Date & Time
                </p>
                <p className="font-bold text-primary">
                  {formatDate(selectedDate)} at {selectedTime}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Consultation Fee
                </p>
                <p className="font-bold">₹{selectedExpert.fee}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Your Full Name
                </label>
                <Input
                  name="name"
                  placeholder="John Doe"
                  className="h-14 rounded-2xl font-bold bg-background"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Phone Number
                </label>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  className="h-14 rounded-2xl font-bold bg-background"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Reason for Appointment
                </label>
                <textarea
                  name="reason"
                  placeholder="Briefly describe your requirements..."
                  className="w-full min-h-[100px] p-4 rounded-2xl bg-background border border-border focus:outline-none focus:border-primary/50 font-bold resize-none"
                  value={formData.reason}
                  onChange={handleInputChange}
                />
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
                onClick={handleBookAppointment}
                disabled={!formData.name || !formData.phone || isProcessing}
                className="h-14 px-8 rounded-2xl bg-slate-900 dark:bg-primary text-white dark:text-black font-bold uppercase tracking-widest shadow-xl"
              >
                {isProcessing ? "Confirming..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        )}

        {/* --- Step 4: Success --- */}
        {step === 4 && selectedExpert && selectedDate && (
          <div className="bg-card p-10 rounded-[2.5rem] border-t-8 border-green-500 shadow-2xl text-center space-y-8">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.4)]">
              <CheckCircle2 size={48} className="text-white" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight">
                Appointment Confirmed!
              </h2>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Your consultation has been scheduled
              </p>
            </div>

            <div className="bg-muted/30 rounded-2xl p-6 space-y-4 text-left border border-border inline-block min-w-[300px] w-full max-w-md">
              <div className="flex justify-between items-center text-xs font-bold uppercase border-b border-border pb-4">
                <span className="text-muted-foreground tracking-widest">
                  Booking ID
                </span>
                <span className="text-primary font-black tracking-wider">
                  {bookingId}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold uppercase">
                <span className="text-muted-foreground tracking-widest">
                  Specialist
                </span>
                <span>{selectedExpert.name}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold uppercase">
                <span className="text-muted-foreground tracking-widest">
                  Date & Time
                </span>
                <span className="text-primary">
                  {formatDate(selectedDate)} | {selectedTime}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold uppercase">
                <span className="text-muted-foreground tracking-widest">
                  Mode
                </span>
                <span className="flex items-center gap-1">
                  {selectedExpert.type === "Video" ? (
                    <Video size={14} className="text-blue-500" />
                  ) : (
                    <Briefcase size={14} className="text-orange-500" />
                  )}
                  {selectedExpert.type}
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-4">
              <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-green-600 dark:text-green-400 mb-2">
                <ShieldCheck size={16} /> Meeting link will be sent to your
                phone
              </div>
              <Button
                onClick={resetFlow}
                className="w-full max-w-md mx-auto h-14 rounded-xl font-bold uppercase tracking-widest"
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
