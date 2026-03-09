import { Armchair } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Mode } from "@/types/travel";


interface SeatProps {
  mode: Mode;
  selectedSeats: string[];
  onToggle: (id: string) => void;
}

export const SeatSelection = ({ mode, selectedSeats, onToggle }: SeatProps) => {
  // Helper for Seat Button
  const SeatBtn = ({
    id,
    label,
    className,
  }: {
    id: string;
    label?: string;
    className?: string;
  }) => {
    const isSelected = selectedSeats.includes(id);
    const isBooked = Math.random() < 0.15; // Mock booking data
    return (
      <button
        disabled={isBooked}
        onClick={() => onToggle(id)}
        className={cn(
          "w-10 h-10 rounded-lg border-2 flex flex-col items-center justify-center transition-all text-[9px] font-black",
          isBooked
            ? "bg-muted opacity-30 cursor-not-allowed"
            : isSelected
              ? "bg-primary border-primary text-white scale-110 shadow-lg"
              : "bg-background border-border hover:border-primary/50",
          className,
        )}
      >
        {label || id}
      </button>
    );
  };

  const renderBus = () => (
    <div className="flex flex-col items-center gap-4 bg-muted/20 p-8 rounded-[2rem] border-2 border-dashed">
      <div className="w-full max-w-[180px] h-8 bg-muted rounded-t-2xl border-2 flex items-center justify-center text-[8px] font-black uppercase opacity-40">
        Driver Section
      </div>
      <div className="grid grid-cols-5 gap-3">
        {Array.from({ length: 25 }).map((_, i) => {
          if (i % 5 === 2) return <div key={i} className="w-6" />; // Aisle
          return <SeatBtn key={i} id={`B${i}`} label={`${i + 1}`} />;
        })}
      </div>
    </div>
  );

  const renderTrain = () => (
    <div className="space-y-4 max-w-sm mx-auto">
      {["LB", "MB", "UB", "LB", "MB", "UB", "SL", "SU"].map((type, i) => (
        <div
          key={i}
          className="flex gap-2 items-center bg-muted/10 p-3 rounded-xl border"
        >
          <SeatBtn id={`T${i}`} label={type} className="w-16" />
          <span className="text-[10px] font-bold uppercase opacity-60">
            {type === "SL"
              ? "Side Lower"
              : type === "SU"
                ? "Side Upper"
                : "Cabin Berth"}
          </span>
        </div>
      ))}
    </div>
  );

  const renderFlight = () => (
    <div className="bg-slate-50 p-6 rounded-[3rem] border-x-8 border-slate-200">
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }).map((_, i) => {
          if (i % 7 === 3)
            return (
              <div
                key={i}
                className="flex items-center justify-center text-[10px] font-black opacity-20"
              >
                {Math.floor(i / 7) + 1}
              </div>
            );
          const id = `${Math.floor(i / 7) + 1}${["A", "B", "C", "", "D", "E", "F"][i % 7]}`;
          return <SeatBtn key={id} id={id} />;
        })}
      </div>
    </div>
  );

  return (
    <Card className="border-2 rounded-[2rem] overflow-hidden">
      <CardHeader className="bg-muted/30 border-b">
        <CardTitle className="text-lg font-black uppercase italic flex items-center gap-2">
          <Armchair className="text-primary" />{" "}
          {mode === "flight" ? "Cabin Map" : "Select Berth/Seat"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <ScrollArea className="h-[400px] pr-4">
          {mode === "bus" && renderBus()}
          {mode === "train" && renderTrain()}
          {mode === "flight" && renderFlight()}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
