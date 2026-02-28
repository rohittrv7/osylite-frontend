import { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  CheckCircle2,
  Loader2,
  Package,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useLazyTrackAwbQuery } from "@/store/api/shipingApi";

export default function PublicTracking() {
  const [awb, setAwb] = useState("");
  const [triggerTrack, { data, isFetching }] = useLazyTrackAwbQuery();

  const handleSearch = () => {
    if (awb.trim()) triggerTrack(awb);
  };

  return (
    <div className="container py-20 max-w-4xl mx-auto px-4">
      <div className="text-center mb-12 animate-in fade-in duration-700">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-4 text-white">
          Track <span className="text-primary">Shipment</span>
        </h1>
        <div className="flex gap-2 p-2 bg-card border-2 border-border/50 rounded-2xl shadow-2xl max-w-2xl mx-auto">
          <Input
            placeholder="Enter AWB Number (e.g. ANG69458515)"
            className="border-none h-12 text-lg font-mono focus-visible:ring-0 bg-transparent text-white"
            value={awb}
            onChange={(e) => setAwb(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button
            onClick={handleSearch}
            disabled={isFetching}
            className="h-12 rounded-xl px-8 font-black uppercase italic tracking-widest gap-2 bg-primary hover:bg-primary/90"
          >
            {isFetching ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <Search size={20} />
            )}
            Track
          </Button>
        </div>
      </div>

      {data && (
        <div className="space-y-10 animate-in slide-in-from-bottom-10 duration-700">
          {/* Quick Info Header */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-primary/5 border-primary/20 p-6 rounded-[1.5rem] border-2">
              <p className="text-[10px] font-black uppercase text-primary tracking-widest opacity-60">
                Shipment Status
              </p>
              <p className="text-2xl font-black italic text-white uppercase">
                {data.status}
              </p>
            </Card>
            <Card className="bg-card border-border/50 p-6 rounded-[1.5rem] border-2">
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                Service Type
              </p>
              <p className="text-lg font-bold text-white uppercase">
                {data.serviceType.replace("_", " ")}
              </p>
            </Card>
            <Card className="bg-card border-border/50 p-6 rounded-[1.5rem] border-2">
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                Receiver
              </p>
              <p className="text-lg font-bold text-white truncate">
                {data.receiverName}
              </p>
            </Card>
          </div>

          <Separator className="border-dashed opacity-20" />

          {/* Timeline Visual */}
          <div className="max-w-2xl mx-auto space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-muted/30">
            {data.trackingLogs.map((log, idx) => (
              <div
                key={log.id}
                className="flex gap-8 relative z-10 animate-in fade-in slide-in-from-left duration-500"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-2xl border-2 flex items-center justify-center bg-card transition-all duration-500 shadow-xl",
                    idx === 0
                      ? "border-primary text-primary shadow-primary/20 scale-110"
                      : "border-muted text-muted-foreground opacity-50",
                  )}
                >
                  {log.status === "DELIVERED" ? (
                    <CheckCircle2 size={20} className="fill-primary/10" />
                  ) : log.status === "BOOKED" ? (
                    <Package size={20} />
                  ) : (
                    <Clock size={20} />
                  )}
                </div>

                <div
                  className={cn(
                    "flex-1 pb-10",
                    idx === 0 ? "opacity-100" : "opacity-60",
                  )}
                >
                  <div className="bg-muted/10 border-2 border-border/50 p-5 rounded-[1.5rem] group hover:border-primary/30 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-black italic uppercase text-lg tracking-tight text-white">
                        {log.status}
                      </h4>
                      <p className="text-[10px] font-bold text-muted-foreground">
                        {new Date(log.updatedAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase mb-2">
                      <MapPin size={14} /> {log.location}
                    </div>
                    {log.remarks && (
                      <p className="text-[11px] text-muted-foreground bg-background/50 p-2 rounded-lg border border-border/40 italic">
                        Note: {log.remarks}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Data State */}
      {!data && !isFetching && awb && (
        <div className="text-center py-20 bg-muted/5 rounded-[2rem] border-2 border-dashed opacity-50 max-w-2xl mx-auto">
          <Search size={40} className="mx-auto mb-4 text-muted-foreground" />
          <p className="font-bold uppercase italic text-sm tracking-widest">
            No Shipment Found with this AWB
          </p>
        </div>
      )}
    </div>
  );
}

// Sub-component Helper
function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("rounded-xl", className)}>{children}</div>;
}
