import { useState } from "react";
import {
  MapPin,
  AlertTriangle,
  Siren,
  PhoneCall,
  HeartPulse,
  Flame,
  ShieldAlert,
  ArrowLeft,
  Car,
  Activity,
  Share2,
  Info,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ==========================================
// TYPES & MOCK DATA
// ==========================================
type Screen = "home" | "context" | "tracking";
type EmergencyType = "Medical" | "Police" | "Fire" | null;

const MEDICAL_SITUATIONS = [
  {
    id: "heart",
    name: "Heart Attack / Chest Pain",
    icon: HeartPulse,
    color: "text-rose-600",
    bg: "bg-rose-100 dark:bg-rose-900/30",
  },
  {
    id: "accident",
    name: "Road Accident / Trauma",
    icon: AlertTriangle,
    color: "text-orange-600",
    bg: "bg-orange-100 dark:bg-orange-900/30",
  },
  {
    id: "breathing",
    name: "Breathing Difficulty",
    icon: Activity,
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    id: "other",
    name: "Other Medical Issue",
    icon: Info,
    color: "text-slate-600",
    bg: "bg-slate-100 dark:bg-slate-800",
  },
];

export default function EmergencyAppFinal() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");

  // Emergency State
  const [serviceType, setServiceType] = useState<EmergencyType>(null);
  const [situation, setSituation] = useState("");

  // Processing & Tracking State
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchId, setDispatchId] = useState("");

  const handleServiceSelect = (type: EmergencyType) => {
    setServiceType(type);
    if (type === "Medical") {
      setCurrentScreen("context");
    } else {
      // For Police/Fire, dispatch immediately without extra questions to save time
      handleDispatch();
    }
  };

  const handleDispatch = () => {
    setIsDispatching(true);
    // Simulate finding the nearest unit (Faster than other apps)
    setTimeout(() => {
      setDispatchId(
        `SOS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      );
      setIsDispatching(false);
      setCurrentScreen("tracking");
    }, 1200);
  };

  const resetFlow = () => {
    setServiceType(null);
    setSituation("");
    setDispatchId("");
    setCurrentScreen("home");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-foreground pb-24 md:pb-0 relative selection:bg-red-200">
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* ==========================================
            SCREEN 1: HOME (1-CLICK SOS)
        ========================================== */}
        {currentScreen === "home" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Auto-detected Location */}
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center shrink-0">
                <MapPin size={24} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Current GPS Location (Auto-Detected)
                </p>
                <h2 className="text-xl font-black mt-1 leading-tight">
                  Sector 4, Greater Noida
                </h2>
                <p className="text-sm font-medium text-muted-foreground mt-1">
                  Uttar Pradesh, 201310
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-black tracking-tight text-center md:text-left">
                What is your emergency?
              </h2>
              <p className="text-xs font-bold uppercase tracking-widest text-red-600 text-center md:text-left animate-pulse">
                Tap once to dispatch nearest unit
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                {/* Medical Emergency Button */}
                <div
                  onClick={() => handleServiceSelect("Medical")}
                  className="bg-rose-600 hover:bg-rose-700 transition-colors p-8 rounded-xl shadow-xl text-white cursor-pointer flex flex-col items-center justify-center text-center gap-4 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <HeartPulse size={40} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">
                      Medical
                    </h3>
                    <p className="text-sm font-bold opacity-90 mt-1 uppercase tracking-widest">
                      Call Ambulance
                    </p>
                  </div>
                </div>

                {/* Police Emergency Button */}
                <div
                  onClick={() => handleServiceSelect("Police")}
                  className="bg-blue-600 hover:bg-blue-700 transition-colors p-8 rounded-xl shadow-xl text-white cursor-pointer flex flex-col items-center justify-center text-center gap-4 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <ShieldAlert size={40} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">
                      Police
                    </h3>
                    <p className="text-sm font-bold opacity-90 mt-1 uppercase tracking-widest">
                      Request PCR Van
                    </p>
                  </div>
                </div>

                {/* Fire Emergency Button */}
                <div
                  onClick={() => handleServiceSelect("Fire")}
                  className="bg-orange-600 hover:bg-orange-700 transition-colors p-8 rounded-xl shadow-xl text-white cursor-pointer flex flex-col items-center justify-center text-center gap-4 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <Flame size={40} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">
                      Fire
                    </h3>
                    <p className="text-sm font-bold opacity-90 mt-1 uppercase tracking-widest">
                      Call Fire Brigade
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm mt-8">
              <h3 className="text-sm font-black uppercase tracking-widest mb-4">
                Emergency Contacts
              </h3>
              <div className="flex gap-4">
                <div className="flex-1 p-4 rounded-lg bg-muted/50 border border-border flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm">Sunita (Mother)</p>
                    <p className="text-xs font-medium text-muted-foreground">
                      +91 98765 43210
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
                    <PhoneCall size={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 2: MEDICAL CONTEXT
        ========================================== */}
        {currentScreen === "context" && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in slide-in-from-right-8 duration-300">
            {/* Added Clear Back Button */}
            <div
              className="flex items-center gap-3 cursor-pointer hover:opacity-70 w-fit mb-2"
              onClick={() => setCurrentScreen("home")}
            >
              <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center shadow-sm">
                <ArrowLeft size={20} className="text-foreground" />
              </div>
              <span className="font-black uppercase text-sm tracking-widest text-muted-foreground">
                Back to Home
              </span>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border shadow-xl space-y-8">
              <div>
                <h2 className="text-3xl font-black tracking-tight">
                  What is the medical situation?
                </h2>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-2">
                  Helps us dispatch the right Advanced Life Support (ALS)
                  Ambulance
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MEDICAL_SITUATIONS.map((sit) => (
                  <div
                    key={sit.id}
                    onClick={() => {
                      setSituation(sit.name);
                      handleDispatch();
                    }}
                    className="p-6 rounded-lg border-2 border-border hover:border-rose-600 bg-background hover:bg-rose-50 dark:hover:bg-rose-900/10 cursor-pointer transition-all flex flex-col gap-4"
                  >
                    <div
                      className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center",
                        sit.bg,
                      )}
                    >
                      <sit.icon size={24} className={sit.color} />
                    </div>
                    <h3 className="font-black text-lg leading-tight">
                      {sit.name}
                    </h3>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-border">
                <Button
                  onClick={handleDispatch}
                  disabled={isDispatching}
                  className="w-full h-14 rounded-lg font-black uppercase tracking-widest text-sm bg-red-600 text-white shadow-xl shadow-red-600/20 hover:bg-red-700"
                >
                  {isDispatching
                    ? "Dispatching Nearest Unit..."
                    : "Skip & Dispatch Ambulance"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 3: LIVE TRACKING (DISPATCH SUCCESS)
        ========================================== */}
        {currentScreen === "tracking" && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in zoom-in-95 duration-500">
            {/* Added Clear Back Button */}
            <div
              className="flex items-center gap-3 cursor-pointer hover:opacity-70 w-fit mb-2"
              onClick={resetFlow}
            >
              <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center shadow-sm">
                <ArrowLeft size={20} className="text-foreground" />
              </div>
              <span className="font-black uppercase text-sm tracking-widest text-muted-foreground">
                Back to Home
              </span>
            </div>

            <div className="w-full bg-card rounded-xl border border-border shadow-2xl overflow-hidden relative">
              {/* Live Map Mockup */}
              <div className="h-64 w-full bg-slate-900 relative flex items-center justify-center overflow-hidden">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(#475569 2px, transparent 2px)",
                    backgroundSize: "30px 30px",
                  }}
                />

                {/* Patient Location */}
                <div className="absolute right-1/4 top-1/3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full animate-ping absolute -inset-2" />
                  <div className="w-8 h-8 bg-blue-600 border-2 border-white rounded-lg flex items-center justify-center relative z-10 shadow-lg">
                    <User size={16} className="text-white" />
                  </div>
                </div>

                {/* Ambulance Location */}
                <div className="absolute left-1/4 bottom-1/3">
                  <div className="w-16 h-16 bg-red-500/30 rounded-full animate-pulse absolute -inset-4" />
                  <div className="w-10 h-10 bg-red-600 border-2 border-white rounded-lg flex items-center justify-center relative z-10 shadow-lg">
                    <Siren size={20} className="text-white" />
                  </div>
                </div>

                {/* Path Line */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 25% 66% Q 50% 50% 75% 33%"
                    stroke="white"
                    strokeWidth="4"
                    strokeDasharray="8 8"
                    fill="none"
                  />
                </svg>

                <Badge className="absolute top-4 left-4 bg-red-600 text-white font-black text-xs uppercase tracking-widest border-none px-3 py-1 shadow-lg animate-pulse rounded-lg">
                  Unit Dispatched
                </Badge>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                {/* ETA Alert */}
                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-900 rounded-xl p-6 text-center shadow-inner">
                  <h2 className="text-lg font-bold text-red-800 dark:text-red-400 uppercase tracking-widest mb-1">
                    Ambulance arriving in
                  </h2>
                  <p className="text-5xl font-black text-red-600 tracking-tighter">
                    04<span className="text-2xl ml-1 text-red-600/70">MIN</span>
                  </p>
                  <p className="text-xs font-bold text-red-800/70 dark:text-red-400/70 mt-2">
                    Please keep your phone accessible and stay calm.
                  </p>
                </div>

                {/* Driver/Unit Info */}
                <div className="bg-background rounded-xl p-5 border border-border shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-muted rounded-lg flex items-center justify-center border border-border">
                      <Car size={28} className="text-slate-500" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg">ALS Ambulance</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        UP 16 BX 1080
                      </p>
                      <p className="text-xs font-medium text-foreground mt-1">
                        Paramedic: Rajesh Kumar
                      </p>
                    </div>
                  </div>

                  <div className="w-12 h-12 bg-green-500 hover:bg-green-600 transition-colors rounded-lg flex items-center justify-center text-white shadow-lg cursor-pointer shadow-green-500/30">
                    <PhoneCall size={20} />
                  </div>
                </div>

                <div className="bg-background rounded-xl p-5 border border-border space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold uppercase border-b border-border pb-3">
                    <span className="text-muted-foreground tracking-widest">
                      Dispatch ID
                    </span>
                    <span className="text-red-600 font-black tracking-wider">
                      {dispatchId}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold uppercase border-b border-border pb-3">
                    <span className="text-muted-foreground tracking-widest">
                      Emergency
                    </span>
                    <span className="text-foreground">
                      {situation || serviceType}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold uppercase">
                    <span className="text-muted-foreground tracking-widest">
                      Destination
                    </span>
                    <span className="text-foreground">
                      Kailash Hospital, Gr. Noida
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-12 rounded-lg font-bold uppercase tracking-widest bg-blue-600 hover:bg-blue-700 text-white text-xs shadow-md">
                    <Share2 size={16} className="mr-2" /> Share Status
                  </Button>
                  <Button
                    onClick={resetFlow}
                    variant="outline"
                    className="h-12 rounded-lg font-bold uppercase tracking-widest text-xs border-border text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Cancel Request
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
