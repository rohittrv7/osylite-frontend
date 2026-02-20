import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  Truck,
  CheckCircle2,
  MapPin,
  Clock,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface TrackingStep {
  status: string;
  location: string;
  date: string;
  time: string;
  completed: boolean;
  current?: boolean;
}

const mockSteps: TrackingStep[] = [
  {
    status: "Booked",
    location: "New Delhi GPO",
    date: "18 Feb 2026",
    time: "09:30 AM",
    completed: true,
  },
  {
    status: "Dispatched",
    location: "New Delhi Sorting Hub",
    date: "18 Feb 2026",
    time: "02:15 PM",
    completed: true,
  },
  {
    status: "In-Transit",
    location: "Jaipur Distribution Center",
    date: "19 Feb 2026",
    time: "06:45 AM",
    completed: true,
    current: true,
  },
  {
    status: "Out for Delivery",
    location: "Jaipur Local Post Office",
    date: "--",
    time: "--",
    completed: false,
  },
  {
    status: "Delivered",
    location: "Recipient Address",
    date: "--",
    time: "--",
    completed: false,
  },
];

export default function Track() {
  const [searchParams] = useSearchParams();
  const [trackingId, setTrackingId] = useState(searchParams.get("id") || "");
  const [showResult, setShowResult] = useState(!!searchParams.get("id"));

  const handleTrack = () => {
    if (trackingId.trim()) setShowResult(true);
  };

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        {/* Search */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Track Your Consignment
          </h1>
          <p className="text-muted-foreground">
            Enter your tracking number to see real-time status
          </p>
        </div>

        <div className="flex gap-2 max-w-lg mx-auto mb-12">
          <Input
            placeholder="e.g. EM123456789IN"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            className="h-12"
          />
          <Button
            onClick={handleTrack}
            className="h-12 px-6 gradient-hero text-primary-foreground hover:opacity-90"
          >
            <Search className="w-4 h-4 mr-2" /> Track Now
          </Button>
        </div>

        {/* Result */}
        {showResult && (
          <div className="animate-fade-in">
            {/* Summary card */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-card mb-8">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Consignment Number
                  </p>
                  <p className="font-display text-lg font-bold text-foreground">
                    {trackingId || "EM123456789IN"}
                  </p>
                </div>
                <Badge className="bg-info text-info-foreground text-xs px-3 py-1">
                  In-Transit
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">From</p>
                  <p className="font-medium text-foreground">New Delhi</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">To</p>
                  <p className="font-medium text-foreground">Jaipur</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Service</p>
                  <p className="font-medium text-foreground">Speed Post</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Expected</p>
                  <p className="font-medium text-foreground">20 Feb 2026</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-card">
              <h3 className="font-display text-lg font-bold text-foreground mb-6">
                Tracking Timeline
              </h3>
              <div className="relative">
                {mockSteps.map((step, i) => (
                  <div key={i} className="flex gap-4 pb-8 last:pb-0">
                    {/* Line + dot */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          step.completed
                            ? step.current
                              ? "bg-info text-info-foreground ring-4 ring-info/20"
                              : "bg-success text-success-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step.completed ? (
                          step.current ? (
                            <Truck className="w-4 h-4" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4" />
                          )
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                      </div>
                      {i < mockSteps.length - 1 && (
                        <div
                          className={`w-0.5 flex-1 mt-1 ${step.completed ? "bg-success" : "bg-border"}`}
                        />
                      )}
                    </div>

                    {/* Info */}
                    <div className="pb-2">
                      <p
                        className={`font-semibold text-sm ${step.current ? "text-info" : step.completed ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {step.status}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {step.location}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {step.date} • {step.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="mt-6 w-full">
                <Download className="w-4 h-4 mr-2" /> Download Tracking History
                (PDF)
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
