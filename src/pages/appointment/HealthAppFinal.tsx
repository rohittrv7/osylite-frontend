import { useState, useMemo, useEffect } from "react";
import {
  Search,
  MapPin,
  ChevronDown,
  User,
  Star,
  Clock,
  ArrowLeft,
  CheckCircle2,
  HeartPulse,
  Activity,
  Baby,
  Bone,
  Stethoscope,
  Video,
  Building2,
  CalendarDays,
  CreditCard,
  Wallet,
  AlertCircle,
  Navigation,
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
type Screen = "home" | "profile" | "checkout" | "success";
type ConsultMode = "In-Clinic" | "Video";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  degree: string;
  experience: number;
  rating: number;
  reviews: number;
  fee: number;
  location: string;
  distance: string;
  modes: ConsultMode[];
  image: string;
  nextAvailable: string;
}

const SPECIALTIES = [
  {
    name: "Physician",
    icon: Stethoscope,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    name: "Cardiologist",
    icon: HeartPulse,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    name: "Dentist",
    icon: Activity,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
  {
    name: "Pediatrician",
    icon: Baby,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    name: "Orthopedist",
    icon: Bone,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

const DOCTORS: Doctor[] = [
  {
    id: "D1",
    name: "Dr. Vikram Sharma",
    specialty: "Cardiologist",
    degree: "MBBS, MD, DM (Cardiology)",
    experience: 15,
    rating: 4.9,
    reviews: 1240,
    fee: 1500,
    location: "Apollo Heart Center",
    distance: "2.5 km",
    modes: ["In-Clinic", "Video"],
    nextAvailable: "Today, 4:00 PM",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&q=80",
  },
  {
    id: "D2",
    name: "Dr. Ananya Desai",
    specialty: "Dentist",
    degree: "BDS, MDS",
    experience: 8,
    rating: 4.8,
    reviews: 856,
    fee: 800,
    location: "SmileCare Clinic",
    distance: "1.2 km",
    modes: ["In-Clinic"],
    nextAvailable: "Tomorrow, 10:00 AM",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=80",
  },
  {
    id: "D3",
    name: "Dr. Rahul Verma",
    specialty: "Physician",
    degree: "MBBS, MD (General Medicine)",
    experience: 12,
    rating: 4.7,
    reviews: 3200,
    fee: 1000,
    location: "City Health Hospital",
    distance: "4.0 km",
    modes: ["In-Clinic", "Video"],
    nextAvailable: "Today, 6:30 PM",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&q=80",
  },
  {
    id: "D4",
    name: "Dr. Priya Patel",
    specialty: "Pediatrician",
    degree: "MBBS, MD (Pediatrics)",
    experience: 10,
    rating: 4.9,
    reviews: 2100,
    fee: 1200,
    location: "Little Steps Clinic",
    distance: "3.8 km",
    modes: ["In-Clinic", "Video"],
    nextAvailable: "Today, 5:00 PM",
    image:
      "https://images.unsplash.com/photo-1594824436998-dded47b2c58e?w=500&q=80",
  },
];

const TIME_SLOTS = [
  "10:00 AM",
  "10:30 AM",
  "11:30 AM",
  "02:00 PM",
  "04:30 PM",
  "06:00 PM",
];
const PATIENT_PROFILES = [
  { id: "P1", name: "Rahul Kumar", relation: "Self", age: 28, gender: "Male" },
  {
    id: "P2",
    name: "Sunita Kumar",
    relation: "Mother",
    age: 54,
    gender: "Female",
  },
];

export default function HealthAppFinal() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");

  // Home State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState<string | null>(null);

  // Booking State
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [consultMode, setConsultMode] = useState<ConsultMode>("In-Clinic");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [availableDates, setAvailableDates] = useState<Date[]>([]);

  // Checkout State
  const [selectedPatient, setSelectedPatient] = useState(
    PATIENT_PROFILES[0].id,
  );
  const [symptoms, setSymptoms] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("clinic");

  // Processing State
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingId, setBookingId] = useState("");

  // Initialize Dates
  useEffect(() => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    setAvailableDates(dates);
  }, []);

  // Filtering Logic
  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((d) => {
      const matchSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSpec = activeSpecialty
        ? d.specialty === activeSpecialty
        : true;
      return matchSearch && matchSpec;
    });
  }, [searchQuery, activeSpecialty]);

  // Billing Calculations
  const platformFee = 49;
  const totalPayable = selectedDoctor ? selectedDoctor.fee + platformFee : 0;

  // Handlers
  const handleDoctorSelect = (doc: Doctor) => {
    setSelectedDoctor(doc);
    setConsultMode(doc.modes[0]);
    setSelectedDate(availableDates[0]);
    setSelectedTime("");
    setCurrentScreen("profile");
  };

  const handleConfirmBooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setBookingId(
        `APT${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      );
      setIsProcessing(false);
      setCurrentScreen("success");
    }, 1500);
  };

  const resetFlow = () => {
    setSelectedDoctor(null);
    setSelectedTime("");
    setSymptoms("");
    setBookingId("");
    setCurrentScreen("home");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-foreground">
      {/* ==========================================
          GLOBAL HEADER
      ========================================== */}
      <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <h1
              className="text-3xl font-black tracking-tighter text-primary cursor-pointer"
              onClick={() => {
                setCurrentScreen("home");
                setActiveSpecialty(null);
              }}
            >
              ANG Health
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
              placeholder="Search doctors, specialties, or clinics"
              className="h-14 pl-12 rounded-xl bg-card border-border font-bold text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-6">
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
                placeholder="Search doctors or specialties"
                className="h-14 pl-10 rounded-xl bg-card border-border font-bold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Specialties Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black tracking-tight">
                  Top Specialties
                </h2>
                {activeSpecialty && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setActiveSpecialty(null)}
                    className="text-xs font-bold uppercase text-red-500"
                  >
                    Clear Filter
                  </Button>
                )}
              </div>
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                {SPECIALTIES.map((spec) => (
                  <div
                    key={spec.name}
                    onClick={() => setActiveSpecialty(spec.name)}
                    className="flex flex-col items-center gap-3 shrink-0 cursor-pointer group w-24"
                  >
                    <div
                      className={cn(
                        "w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-300",
                        activeSpecialty === spec.name
                          ? "bg-primary text-primary-foreground shadow-lg scale-105"
                          : cn(spec.bg, spec.color, "hover:scale-105"),
                      )}
                    >
                      <spec.icon size={32} />
                    </div>
                    <span
                      className={cn(
                        "text-[11px] font-bold uppercase tracking-widest text-center",
                        activeSpecialty === spec.name
                          ? "text-primary"
                          : "text-muted-foreground",
                      )}
                    >
                      {spec.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Doctors Grid */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black tracking-tight">
                {activeSpecialty
                  ? `${activeSpecialty}s near you`
                  : "Recommended Doctors"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => handleDoctorSelect(doc)}
                      className="bg-card p-6 rounded-3xl border border-border shadow-sm hover:shadow-xl hover:border-primary/50 transition-all cursor-pointer flex flex-col gap-6"
                    >
                      <div className="flex gap-5">
                        <div className="w-24 h-24 rounded-2xl bg-muted overflow-hidden shrink-0">
                          <img
                            src={doc.image}
                            alt={doc.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-black text-lg leading-tight">
                            {doc.name}
                          </h3>
                          <p className="text-sm font-bold text-primary">
                            {doc.specialty}
                          </p>
                          <p className="text-xs text-muted-foreground font-medium">
                            {doc.experience} Years Exp.
                          </p>
                          <div className="flex items-center gap-2 pt-1">
                            <Badge className="bg-green-600 text-white font-bold text-[10px] px-1.5 py-0.5 rounded border-none flex items-center gap-1">
                              {doc.rating}{" "}
                              <Star size={10} className="fill-white" />
                            </Badge>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                              {doc.reviews} Reviews
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground bg-muted/30 p-3 rounded-xl">
                        <Clock size={16} className="text-primary" /> Next
                        Available:{" "}
                        <span className="text-foreground">
                          {doc.nextAvailable}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-border">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            Consultation
                          </p>
                          <p className="font-black text-lg">₹{doc.fee}</p>
                        </div>
                        <Button className="h-10 px-6 rounded-xl font-bold uppercase text-[10px] tracking-widest bg-primary text-primary-foreground hover:bg-primary/90">
                          Book Visit
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-20 flex flex-col items-center text-center border-2 border-dashed border-border rounded-3xl">
                    <AlertCircle
                      size={48}
                      className="text-muted-foreground opacity-20 mb-4"
                    />
                    <p className="font-bold uppercase tracking-widest">
                      No doctors found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 2: DOCTOR PROFILE & SCHEDULING
        ========================================== */}
        {currentScreen === "profile" && selectedDoctor && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
            {/* Left: Doctor Details */}
            <div className="lg:col-span-2 space-y-8">
              <div
                className="flex items-center gap-4 cursor-pointer hover:text-primary w-fit"
                onClick={() => setCurrentScreen("home")}
              >
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                  <ArrowLeft size={20} />
                </div>
                <span className="font-bold uppercase text-xs tracking-widest">
                  Back to Search
                </span>
              </div>

              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row gap-8">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-muted overflow-hidden shrink-0 shadow-inner">
                  <img
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                        {selectedDoctor.name}
                      </h1>
                      <Badge className="bg-green-600 text-white font-bold text-sm px-2 py-1 rounded-lg border-none flex items-center gap-1">
                        {selectedDoctor.rating}{" "}
                        <Star size={14} className="fill-white" />
                      </Badge>
                    </div>
                    <p className="text-lg font-bold text-primary mt-1">
                      {selectedDoctor.specialty}
                    </p>
                    <p className="text-sm font-medium text-muted-foreground">
                      {selectedDoctor.degree}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Experience
                      </p>
                      <p className="font-black">
                        {selectedDoctor.experience}+ Years
                      </p>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Patients
                      </p>
                      <p className="font-black">{selectedDoctor.reviews}+</p>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Location
                      </p>
                      <p className="font-black text-sm flex items-center gap-1">
                        <MapPin size={14} className="text-primary" />{" "}
                        {selectedDoctor.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-4">
                <h3 className="text-xl font-black">About Doctor</h3>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                  {selectedDoctor.name} is a highly respected{" "}
                  {selectedDoctor.specialty} with over{" "}
                  {selectedDoctor.experience} years of clinical experience.
                  Known for accurate diagnosis and empathetic patient care at{" "}
                  {selectedDoctor.location}.
                </p>
              </div>
            </div>

            {/* Right: Sticky Scheduler */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-3xl border border-border shadow-sm p-6 md:p-8 space-y-8">
                <h3 className="text-2xl font-black">Book Appointment</h3>

                {/* Consult Mode Selection */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Consultation Mode
                  </label>
                  <div className="flex gap-4">
                    {selectedDoctor.modes.map((mode) => (
                      <div
                        key={mode}
                        onClick={() => setConsultMode(mode)}
                        className={cn(
                          "flex-1 p-4 rounded-2xl border-2 cursor-pointer flex flex-col items-center justify-center gap-2 transition-all",
                          consultMode === mode
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border bg-background hover:border-primary/50 text-muted-foreground",
                        )}
                      >
                        {mode === "Video" ? (
                          <Video size={24} />
                        ) : (
                          <Building2 size={24} />
                        )}
                        <span className="font-bold text-xs uppercase tracking-widest">
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

                {/* Time Slots */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Available Slots
                  </label>
                  <div className="grid grid-cols-3 gap-3">
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

                <Button
                  onClick={() => setCurrentScreen("checkout")}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full h-14 rounded-xl font-bold uppercase tracking-widest text-sm bg-primary text-primary-foreground shadow-xl hover:bg-primary/90"
                >
                  Continue <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 3: CHECKOUT (Patient Details & Pay)
        ========================================== */}
        {currentScreen === "checkout" && selectedDoctor && selectedDate && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-right-8 duration-300">
            <div className="lg:col-span-2 space-y-8">
              <div
                className="flex items-center gap-4 cursor-pointer hover:text-primary w-fit"
                onClick={() => setCurrentScreen("profile")}
              >
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                  <ArrowLeft size={20} />
                </div>
                <span className="font-bold uppercase text-xs tracking-widest">
                  Back to Slots
                </span>
              </div>

              {/* Patient Selection */}
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-border pb-4">
                  <User size={24} className="text-primary" />
                  <h2 className="text-xl font-black">1. Patient Details</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PATIENT_PROFILES.map((patient) => (
                    <div
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient.id)}
                      className={cn(
                        "p-5 rounded-2xl border-2 cursor-pointer transition-all relative",
                        selectedPatient === patient.id
                          ? "border-primary bg-primary/5"
                          : "border-border bg-background hover:border-primary/30",
                      )}
                    >
                      {selectedPatient === patient.id && (
                        <div className="absolute top-0 right-0 bg-primary text-background p-1 rounded-bl-lg">
                          <CheckCircle2 size={14} />
                        </div>
                      )}
                      <p className="font-bold text-lg">{patient.name}</p>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">
                        {patient.relation} • {patient.gender}, {patient.age}Y
                      </p>
                    </div>
                  ))}
                  <div className="p-5 rounded-2xl border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors text-primary font-bold text-sm">
                    + Add New Patient
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Add Symptoms / Notes for Doctor (Optional)
                  </label>
                  <textarea
                    placeholder="E.g. Fever since 2 days, mild headache..."
                    className="w-full bg-background border border-border rounded-2xl p-4 focus:outline-none focus:border-primary font-medium resize-none min-h-[100px]"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-border pb-4">
                  <Wallet size={24} className="text-primary" />
                  <h2 className="text-xl font-black">2. Payment Method</h2>
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
                      id: "clinic",
                      icon: Building2,
                      title:
                        consultMode === "In-Clinic"
                          ? "Pay at Clinic"
                          : "Pay Later",
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
                <h3 className="text-2xl font-black">Summary</h3>

                <div className="bg-background rounded-2xl p-4 border border-border space-y-3">
                  <div className="flex items-center gap-3 border-b border-border pb-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {selectedDoctor.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-sm">{selectedDoctor.name}</p>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                        {selectedDoctor.specialty}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-muted-foreground pt-1">
                    <span className="flex items-center gap-1">
                      <CalendarDays size={14} />{" "}
                      {selectedDate.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {selectedTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-muted-foreground pt-1">
                    <span className="flex items-center gap-1">
                      {consultMode === "Video" ? (
                        <Video size={14} />
                      ) : (
                        <Building2 size={14} />
                      )}{" "}
                      {consultMode}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-sm font-bold text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Consultation Fee</span>
                    <span className="text-foreground">
                      ₹{selectedDoctor.fee}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span className="text-foreground">₹{platformFee}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border font-black text-2xl">
                  <span>To Pay</span>
                  <span className="text-primary">₹{totalPayable}</span>
                </div>

                <Button
                  onClick={handleConfirmBooking}
                  disabled={isProcessing}
                  className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-sm bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 mt-4"
                >
                  {isProcessing ? "Processing..." : `Confirm Booking`}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 4: SUCCESS TICKET
        ========================================== */}
        {currentScreen === "success" && selectedDoctor && selectedDate && (
          <div className="max-w-md mx-auto w-full bg-card rounded-[2.5rem] border border-border shadow-2xl p-8 md:p-10 text-center space-y-8 mt-4 md:mt-10 animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(34,197,94,0.4)]">
              <CheckCircle2 size={48} className="text-white" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight">
                Appointment Confirmed!
              </h2>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Booking ID: <span className="text-foreground">{bookingId}</span>
              </p>
            </div>

            <div className="bg-background rounded-3xl p-6 text-left border border-border space-y-5 shadow-inner">
              <div className="flex items-center gap-4 border-b border-border pb-5">
                <Avatar className="w-14 h-14">
                  <img src={selectedDoctor.image} alt={selectedDoctor.name} />
                </Avatar>
                <div>
                  <p className="font-bold text-base">{selectedDoctor.name}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    {selectedDoctor.specialty}
                  </p>
                </div>
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
                    {consultMode === "Video" ? (
                      <Video size={14} />
                    ) : (
                      <Building2 size={14} />
                    )}{" "}
                    Mode
                  </span>
                  <span className="text-foreground">{consultMode}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              {consultMode === "Video" ? (
                <Button className="w-full h-14 rounded-xl font-black uppercase tracking-widest bg-blue-600 hover:bg-blue-700 text-white border-none shadow-xl">
                  <Video size={18} className="mr-2" /> Join Video Call
                </Button>
              ) : (
                <Button className="w-full h-14 rounded-xl font-black uppercase tracking-widest bg-slate-900 dark:bg-white text-white dark:text-black border-none shadow-xl hover:scale-[1.02] transition-transform">
                  <Navigation size={18} className="mr-2" /> Get Directions
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
