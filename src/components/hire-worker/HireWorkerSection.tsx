import { useState, useMemo } from "react";
import {
  Search,
  Star,
  MapPin,
  Briefcase,
  Clock,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- Types ---
interface Worker {
  id: string;
  name: string;
  role: string;
  category: string;
  rating: number;
  reviews: number;
  rate: number;
  location: string;
  avatar?: string;
  skills: string[];
}

type Step = "browse" | "book" | "success";

// --- Mock Data ---
const CATEGORIES = [
  "All",
  "Engineering",
  "Design",
  "Consulting",
  "Maintenance",
];

const WORKERS: Worker[] = [
  {
    id: "W01",
    name: "Vikram Singh",
    role: "Full Stack Architect",
    category: "Engineering",
    rating: 4.9,
    reviews: 124,
    rate: 1200,
    location: "Remote",
    skills: ["React", "Node.js", "AWS"],
  },
  {
    id: "W02",
    name: "Ananya Desai",
    role: "UI/UX Designer",
    category: "Design",
    rating: 4.8,
    reviews: 89,
    rate: 900,
    location: "Delhi, India",
    skills: ["Figma", "Prototyping", "Research"],
  },
  {
    id: "W03",
    name: "Rahul Verma",
    role: "Financial Advisor",
    category: "Consulting",
    rating: 4.7,
    reviews: 56,
    rate: 1500,
    location: "Mumbai, India",
    skills: ["Taxation", "Audit", "Planning"],
  },
  {
    id: "W04",
    name: "Karan Patel",
    role: "Network Engineer",
    category: "Engineering",
    rating: 4.9,
    reviews: 210,
    rate: 1100,
    location: "Remote",
    skills: ["Cisco", "Security", "Cloud"],
  },
  {
    id: "W05",
    name: "Suresh Kumar",
    role: "HVAC Specialist",
    category: "Maintenance",
    rating: 4.6,
    reviews: 340,
    rate: 500,
    location: "Patna, India",
    skills: ["AC Repair", "Wiring", "Plumbing"],
  },
];

export default function HireWorkerSection() {
  const [step, setStep] = useState<Step>("browse");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  // Booking Form State
  const [taskDesc, setTaskDesc] = useState("");
  const [hours, setHours] = useState("2");
  const [isProcessing, setIsProcessing] = useState(false);

  // 🔹 FIX: Added State for Booking ID
  const [bookingId, setBookingId] = useState("");

  // Filter Logic
  const filteredWorkers = useMemo(() => {
    return WORKERS.filter((worker) => {
      const matchCategory =
        activeCategory === "All" || worker.category === activeCategory;
      const matchSearch =
        worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        worker.role.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleBookClick = (worker: Worker) => {
    setSelectedWorker(worker);
    setStep("book");
  };

  const confirmBooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // 🔹 FIX: Generate ID here, not in the render method!
      // (Using .substring instead of deprecated .substr)
      const newBookingId = `HW-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setBookingId(newBookingId);

      setIsProcessing(false);
      setStep("success");
    }, 1500);
  };

  const resetFlow = () => {
    setSelectedWorker(null);
    setTaskDesc("");
    setHours("2");
    setBookingId(""); // 🔹 Reset the ID too
    setStep("browse");
  };

  return (
    <div className="w-full min-h-full bg-background flex flex-col">
      {/* ==========================================
          STEP 1: BROWSE & FILTER WORKERS
      ========================================== */}
      {step === "browse" && (
        <div className="space-y-8">
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-card p-8 rounded-3xl border border-border shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <Briefcase size={20} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  Talent Network
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                Hire Elite <span className="text-primary">Professionals</span>
              </h2>
            </div>
            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <Input
                placeholder="Search skills or names..."
                className="h-14 pl-12 rounded-2xl bg-background border-border font-bold shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all border",
                  activeCategory === cat
                    ? "bg-slate-900 dark:bg-primary text-white dark:text-black border-transparent shadow-md"
                    : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Workers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredWorkers.length > 0 ? (
              filteredWorkers.map((worker) => (
                <div
                  key={worker.id}
                  className="bg-card rounded-3xl p-6 border border-border hover:border-primary/50 transition-all shadow-sm hover:shadow-xl flex flex-col justify-between h-full group"
                >
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                          {worker.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary border-none font-bold text-sm px-3 py-1 flex items-center gap-1"
                      >
                        <Star size={14} className="fill-primary" />{" "}
                        {worker.rating}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold tracking-tight">
                        {worker.name}
                      </h3>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">
                        {worker.role}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {worker.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-muted rounded-lg text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground pt-4 border-t border-border">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {worker.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 size={14} /> {worker.reviews} Jobs
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Hourly Rate
                      </p>
                      <p className="text-xl font-black">₹{worker.rate}</p>
                    </div>
                    <Button
                      onClick={() => handleBookClick(worker)}
                      className="h-12 rounded-xl font-bold uppercase tracking-wider px-6 group-hover:bg-primary group-hover:text-background transition-colors"
                    >
                      Hire Now
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-3xl bg-card">
                <Zap
                  size={40}
                  className="text-muted-foreground opacity-20 mb-4"
                />
                <p className="font-bold uppercase tracking-widest text-muted-foreground">
                  No professionals found
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==========================================
          STEP 2: BOOKING DETAILS
      ========================================== */}
      {step === "book" && selectedWorker && (
        <div className="w-full max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setStep("browse")}
            className="mb-6 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-muted"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Search
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Worker Profile Card */}
            <div className="lg:col-span-2 bg-card rounded-3xl p-8 border border-border shadow-sm h-fit space-y-6">
              <Avatar className="h-24 w-24 border-4 border-background shadow-md mx-auto">
                <AvatarFallback className="bg-primary/10 text-primary font-black text-3xl">
                  {selectedWorker.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-2xl font-bold">{selectedWorker.name}</h2>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mt-1">
                  {selectedWorker.role}
                </p>
              </div>
              <div className="bg-muted/50 rounded-2xl p-4 space-y-3 border border-border">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-muted-foreground uppercase tracking-widest">
                    Rate
                  </span>
                  <span className="text-sm">₹{selectedWorker.rate} / hr</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-muted-foreground uppercase tracking-widest">
                    Rating
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={14} className="fill-primary text-primary" />{" "}
                    {selectedWorker.rating}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-green-600 dark:text-green-400 bg-green-500/10 py-2 rounded-xl">
                <ShieldCheck size={16} /> Background Verified
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-3 bg-card rounded-3xl p-8 border border-border shadow-sm space-y-8">
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">
                  Requirement Details
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Fill in the task details to confirm booking
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Task Description
                  </label>
                  <textarea
                    placeholder="Describe the work you need done..."
                    className="w-full min-h-[120px] p-4 rounded-2xl bg-background border border-border focus:outline-none focus:border-primary/50 resize-none font-medium"
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Estimated Hours
                    </label>
                    <div className="relative">
                      <Clock
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                        size={16}
                      />
                      <Input
                        type="number"
                        className="h-14 pl-12 rounded-2xl bg-background border-border font-bold text-lg"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Start Date
                    </label>
                    <div className="relative">
                      <Calendar
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                        size={16}
                      />
                      <Input
                        type="date"
                        className="h-14 pl-12 rounded-2xl bg-background border-border font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    Total Estimate
                  </span>
                  <span className="text-3xl font-black">
                    ₹{selectedWorker.rate * (Number(hours) || 0)}
                  </span>
                </div>
                <Button
                  onClick={confirmBooking}
                  disabled={!taskDesc || !hours || isProcessing}
                  className="w-full h-16 rounded-2xl bg-slate-900 dark:bg-primary text-white dark:text-black font-bold uppercase tracking-widest text-sm shadow-xl hover:shadow-primary/20 transition-all"
                >
                  {isProcessing ? "Processing Request..." : "Confirm & Pay"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          STEP 3: SUCCESS SCREEN
      ========================================== */}
      {step === "success" && selectedWorker && (
        <div className="w-full max-w-md mx-auto bg-card rounded-[2.5rem] p-10 shadow-2xl text-center space-y-8 border-t-8 border-green-500">
          <div className="space-y-4">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.4)]">
              <CheckCircle2 size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              Booking Confirmed
            </h2>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Your talent is ready
            </p>
          </div>

          <div className="bg-muted/30 rounded-2xl p-6 space-y-4 text-left border border-border">
            <div className="flex justify-between items-center text-xs font-bold uppercase">
              <span className="text-muted-foreground tracking-widest">
                Professional
              </span>
              <span>{selectedWorker.name}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold uppercase">
              <span className="text-muted-foreground tracking-widest">
                Booking ID
              </span>
              {/* 🔹 FIX: Using the state variable here */}
              <span className="text-primary">{bookingId}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold uppercase">
              <span className="text-muted-foreground tracking-widest">
                Total Paid
              </span>
              <span>₹{selectedWorker.rate * Number(hours)}</span>
            </div>
          </div>

          <Button
            onClick={resetFlow}
            className="w-full h-14 rounded-xl font-bold uppercase tracking-widest"
          >
            Back to Network
          </Button>
        </div>
      )}
    </div>
  );
}
