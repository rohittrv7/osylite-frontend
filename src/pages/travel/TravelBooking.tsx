import { useState } from "react";
import {
  Bus,
  Train,
  Plane,
  MapPin,
  Calendar as CalendarIcon,
  Search,
  ArrowRightLeft,
  ShieldCheck,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// --- Components Import ---
import { PassengerDetails } from "@/components/travel/PassengerDetails";
import { PaymentGateway } from "@/components/travel/PaymentGateway";
import { SeatSelection } from "@/components/travel/SeatSelection";

// --- Interfaces ---
export type Mode = "bus" | "train" | "flight";
export type Step = "SEAT" | "DETAILS" | "PAYMENT";

export interface TravelItem {
  id: number;
  name: string;
  time: string;
  duration: string;
  price: number;
  type: string;
}

const MOCK_RESULTS: Record<Mode, TravelItem[]> = {
  bus: [
    {
      id: 1,
      name: "IntrCity SmartBus",
      time: "10:00 PM",
      duration: "8h 00m",
      price: 850,
      type: "AC Sleeper",
    },
  ],
  train: [
    {
      id: 2,
      name: "Rajdhani Exp",
      time: "05:30 PM",
      duration: "12h 15m",
      price: 2400,
      type: "3A, 2A, 1A",
    },
  ],
  flight: [
    {
      id: 3,
      name: "IndiGo 6E-201",
      time: "08:00 AM",
      duration: "2h 10m",
      price: 4500,
      type: "Economy",
    },
  ],
};

export default function TravelSystem() {
  const [activeMode, setActiveMode] = useState<Mode>("bus");
  const [currentStep, setCurrentStep] = useState<Step>("SEAT");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<TravelItem | null>(null);
  const [searchDone, setSearchDone] = useState(false);

  const toggleSeat = (id: string) => {
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleReset = () => {
    setSelectedItem(null);
    setSearchDone(false);
    setSelectedSeats([]);
    setCurrentStep("SEAT");
  };

  // --- 1. FLOW SCREEN (Selection -> Details -> Payment) ---
  if (selectedItem) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 animate-in slide-in-from-right duration-500">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setSelectedItem(null)}
            className="font-black uppercase text-xs gap-2"
          >
            <ArrowRightLeft className="rotate-180 w-4 h-4" /> Change Trip
          </Button>
          <Badge className="font-black uppercase italic border-2">
            {activeMode} FLOW
          </Badge>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {currentStep === "SEAT" && (
              <SeatSelection
                mode={activeMode}
                selectedSeats={selectedSeats}
                onToggle={toggleSeat}
              />
            )}
            {currentStep === "DETAILS" && (
              <PassengerDetails selectedSeats={selectedSeats} />
            )}
            {currentStep === "PAYMENT" && <PaymentGateway />}
          </div>

          <div className="lg:col-span-4">
            <SummaryCard
              item={selectedItem}
              selectedSeats={selectedSeats}
              currentStep={currentStep}
              onNext={(s: any) => setCurrentStep(s)}
              onFinal={handleReset}
            />
          </div>
        </div>
      </div>
    );
  }

  // --- 2. SEARCH & RESULTS SCREEN ---
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      <div className="space-y-2">
        <h1 className="text-4xl font-black uppercase tracking-tighter italic">
          ANG <span className="text-primary">Travels</span>
        </h1>
        <p className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
          <ShieldCheck size={14} className="text-primary" /> Verified Booking
          Partner
        </p>
      </div>

      <Card className="border-2 rounded-[2rem] shadow-2xl overflow-hidden bg-card border-border/50">
        <Tabs
          defaultValue="bus"
          onValueChange={(v) => setActiveMode(v as Mode)}
          className="w-full"
        >
          <TabsList className="w-full h-20 bg-muted/20 border-b rounded-none flex justify-start px-8 gap-8">
            <TabsTrigger
              value="bus"
              className="gap-2 data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-full font-black uppercase italic text-xs"
            >
              <Bus size={20} /> Bus
            </TabsTrigger>
            <TabsTrigger
              value="train"
              className="gap-2 data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-full font-black uppercase italic text-xs"
            >
              <Train size={20} /> Train
            </TabsTrigger>
            <TabsTrigger
              value="flight"
              className="gap-2 data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-full font-black uppercase italic text-xs"
            >
              <Plane size={20} /> Flight
            </TabsTrigger>
          </TabsList>

          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <SearchInput label="From" placeholder="Source City" />
              <div className="hidden md:flex justify-center pb-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border-2"
                >
                  <ArrowRightLeft size={16} />
                </Button>
              </div>
              <SearchInput label="To" placeholder="Destination City" />
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase opacity-60">
                  Date
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-3 text-primary w-4 h-4" />
                  <Input
                    type="date"
                    className="pl-10 h-12 rounded-xl border-2 font-bold"
                  />
                </div>
              </div>
            </div>
            <Button
              onClick={() => setSearchDone(true)}
              className="w-full mt-8 h-14 rounded-2xl font-black uppercase italic tracking-widest bg-primary text-primary-foreground shadow-xl"
            >
              <Search className="mr-2 w-5 h-5" /> Search {activeMode}es
            </Button>
          </CardContent>
        </Tabs>
      </Card>

      {searchDone && (
        <div className="space-y-4 animate-in slide-in-from-bottom-10">
          <h3 className="font-black italic uppercase text-lg px-2">
            Available {activeMode}s
          </h3>
          <div className="grid gap-4">
            {MOCK_RESULTS[activeMode].map((item) => (
              <ResultCard
                key={item.id}
                item={item}
                mode={activeMode}
                onBook={() => setSelectedItem(item)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// --- Helper Components ---

function SearchInput({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase opacity-60">
        {label}
      </label>
      <div className="relative">
        <MapPin className="absolute left-3 top-3 text-primary w-4 h-4" />
        <Input
          className="pl-10 h-12 rounded-xl border-2 font-bold"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

function ResultCard({
  item,
  mode,
  onBook,
}: {
  item: TravelItem;
  mode: Mode;
  onBook: () => void;
}) {
  return (
    <Card className="border-2 rounded-2xl hover:border-primary/50 transition-colors group">
      <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center text-primary border-2">
            {mode === "bus" ? (
              <Bus size={30} />
            ) : mode === "train" ? (
              <Train size={30} />
            ) : (
              <Plane size={30} />
            )}
          </div>
          <div>
            <h4 className="font-black uppercase text-base">{item.name}</h4>
            <Badge className="text-[9px] font-black uppercase mt-1">
              {item.type}
            </Badge>
          </div>
        </div>
        <div className="flex flex-1 justify-around items-center w-full max-w-sm font-black italic">
          <div className="text-center">
            <p className="text-xl">{item.time}</p>
            <p className="text-[9px] font-bold opacity-60 uppercase not-italic">
              Departs
            </p>
          </div>
          <div className="flex flex-col items-center flex-1 px-4 not-italic">
            <p className="text-[9px] font-black text-primary uppercase">
              {item.duration}
            </p>
            <div className="w-full h-[2px] bg-muted relative my-1">
              <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-muted-foreground" />
              <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-primary" />
            </div>
          </div>
          <div className="text-center text-muted-foreground">
            <p className="text-xl">TBD</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-2xl font-black text-primary italic">
              ₹{item.price}
            </p>
          </div>
          <Button
            onClick={onBook}
            className="rounded-xl font-black uppercase italic text-xs h-12 px-8 shadow-lg"
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SummaryCard({
  item,
  selectedSeats,
  currentStep,
  onNext,
  onFinal,
}: any) {
  const [loading, setLoading] = useState(false);

  const handleAction = () => {
    if (currentStep === "SEAT") onNext("DETAILS");
    else if (currentStep === "DETAILS") onNext("PAYMENT");
    else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert("Booking Confirmed!");
        onFinal();
      }, 1500);
    }
  };

  return (
    <Card className="border-2 rounded-[2.5rem] bg-card shadow-2xl sticky top-24 overflow-hidden border-border/50">
      <div className="p-8 space-y-6">
        <h3 className="font-black italic uppercase tracking-tighter text-2xl border-b pb-4">
          Trip <span className="text-primary">Summary</span>
        </h3>
        <div className="space-y-4 font-bold">
          <div className="flex justify-between text-[10px] uppercase opacity-60">
            <span>Seats ({selectedSeats.length})</span>
            <span className="truncate max-w-[100px] text-right">
              {selectedSeats.join(", ") || "---"}
            </span>
          </div>
          <div className="flex justify-between items-center text-lg font-black italic">
            <span className="uppercase text-xs not-italic">Grand Total</span>
            <span className="text-primary text-2xl">
              ₹{item.price * (selectedSeats.length || 1)}
            </span>
          </div>
        </div>
        <Separator />
        <Button
          disabled={selectedSeats.length === 0 || loading}
          onClick={handleAction}
          className="w-full h-14 rounded-2xl font-black uppercase italic text-xs tracking-widest bg-primary shadow-xl shadow-primary/20"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : currentStep === "SEAT" ? (
            "Confirm Seats"
          ) : currentStep === "DETAILS" ? (
            "Proceed to Pay"
          ) : (
            "Pay with ANG Wallet"
          )}
          {currentStep !== "PAYMENT" && !loading && (
            <ChevronRight className="ml-2 w-4 h-4" />
          )}
        </Button>
      </div>
    </Card>
  );
}
