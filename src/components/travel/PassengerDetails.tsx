import { User, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const PassengerDetails = ({
  selectedSeats,
}: {
  selectedSeats: string[];
}) => (
  <Card className="border-2 rounded-[2rem] overflow-hidden">
    <CardHeader className="bg-muted/30 border-b">
      <CardTitle className="text-lg font-black uppercase italic flex items-center gap-2">
        <User className="text-primary" /> Passenger Info
      </CardTitle>
    </CardHeader>
    <CardContent className="p-8 space-y-6">
      {selectedSeats.map((seat) => (
        <div
          key={seat}
          className="space-y-4 p-4 rounded-2xl border-2 bg-muted/5 relative"
        >
          <Badge className="absolute -top-2 left-4 px-3 font-black">
            SEAT {seat}
          </Badge>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase opacity-60">
                Full Name
              </label>
              <Input
                className="h-11 rounded-xl border-2 font-bold"
                placeholder="As per ID"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase opacity-60">
                Age
              </label>
              <Input
                className="h-11 rounded-xl border-2 font-bold"
                type="number"
                placeholder="Years"
              />
            </div>
          </div>
        </div>
      ))}
      <div className="p-4 bg-primary/5 rounded-2xl border-2 border-primary/20 flex gap-3 italic">
        <Info className="text-primary shrink-0" size={18} />
        <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed">
          Tickets will be sent to verified email.
        </p>
      </div>
    </CardContent>
  </Card>
);
