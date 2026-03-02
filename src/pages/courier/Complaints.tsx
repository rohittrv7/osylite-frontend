import { useState } from "react";
import {
  LifeBuoy,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Loader2,
  Calendar,
  ChevronDown,
  ExternalLink,
  Tag,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useGetMyAllComplaintsQuery } from "@/store/api/shipingApi"; // API endpoint name check karein

// 🔹 Status Config with Color-Coded Badges
const statusConfig: Record<
  string,
  { color: string; bg: string; text: string; icon: any; step: number }
> = {
  OPEN: {
    color: "bg-red-500",
    bg: "bg-red-100",
    text: "text-red-700",
    icon: AlertCircle,
    step: 1,
  },
  IN_PROGRESS: {
    color: "bg-blue-500",
    bg: "bg-blue-100",
    text: "text-blue-700",
    icon: Clock,
    step: 2,
  },
  RESOLVED: {
    color: "bg-green-500",
    bg: "bg-green-100",
    text: "text-green-700",
    icon: CheckCircle2,
    step: 3,
  },
};

export default function MyTicketsPage() {
  const { data: tickets = [], isLoading } = useGetMyAllComplaintsQuery();
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="container py-6 md:py-10 max-w-4xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-700 px-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b pb-6 gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-[#333]">
            Support <span className="text-primary">Tickets</span>
          </h1>
          <p className="text-muted-foreground font-medium text-xs md:text-sm">
            Track your reported issues and vertical resolution timeline.
          </p>
        </div>
        <Badge
          variant="secondary"
          className="px-4 py-1.5 rounded-md font-bold shadow-sm"
        >
          Total Tickets: {tickets.length}
        </Badge>
      </div>

      {/* Tickets List */}
      <div className="grid gap-4">
        {tickets.length === 0 ? (
          <EmptyTicketsState />
        ) : (
          tickets.map((ticket: any) => {
            const config = statusConfig[ticket.status] || statusConfig.OPEN;
            const StatusIcon = config.icon;
            const isExpanded = expandedTicket === ticket.id;

            return (
              <Card
                key={ticket.id}
                className={cn(
                  "border-2 rounded-md overflow-hidden transition-all duration-300 bg-card cursor-pointer",
                  isExpanded
                    ? "border-primary ring-4 ring-primary/5 shadow-2xl"
                    : "hover:border-primary/30 border-border/50 shadow-sm",
                )}
                onClick={() => setExpandedTicket(isExpanded ? null : ticket.id)}
              >
                {/* 🔹 TICKET ROW - Mobile Optimized */}
                <div className="p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "p-2.5 rounded-xl border shrink-0",
                        config.bg,
                        config.text,
                      )}
                    >
                      <StatusIcon size={20} />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <p className="text-sm md:text-base font-black text-[#333] tracking-tight truncate">
                        {ticket.complaintNumber}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-[9px] uppercase font-bold tracking-widest bg-muted/30"
                        >
                          {ticket.issueType.replace("_", " ")}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1 whitespace-nowrap">
                          <Calendar size={12} />{" "}
                          {new Date(ticket.createdAt).toLocaleDateString(
                            "en-GB",
                            { day: "2-digit", month: "short", year: "numeric" },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6 border-t md:border-t-0 pt-3 md:pt-0">
                    <div className="text-left md:text-right min-w-0">
                      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">
                        Tracking ID
                      </p>
                      <p className="text-xs font-mono font-bold text-blue-600 hover:underline flex items-center gap-1">
                        {ticket.shipment?.awbNumber} <ExternalLink size={10} />
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={cn(
                          "px-3 md:px-4 py-1 rounded-md font-black text-[10px] uppercase whitespace-nowrap",
                          config.bg,
                          config.text,
                        )}
                      >
                        {ticket.status.replace("_", " ")}
                      </Badge>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 text-muted-foreground transition-transform duration-300 shrink-0",
                          isExpanded && "rotate-180",
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* 🔹 EXPANDED VIEW: TIMELINE */}
                {isExpanded && (
                  <div className="border-t bg-muted/20 animate-in slide-in-from-top-2 duration-500">
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                      {/* Timeline Section */}
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                          <Tag size={12} /> Resolution Timeline
                        </h4>
                        <div className="relative space-y-8 before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border/60 ml-2">
                          <TimelineStep
                            title="Complaint Filed"
                            date={ticket.createdAt}
                            active={true}
                            desc="Issue logged in our support database."
                          />
                          <TimelineStep
                            title="Investigation Started"
                            date={
                              ticket.status !== "OPEN" ? ticket.updatedAt : null
                            }
                            active={config.step >= 2}
                            desc="Operations team is verifying shipment logs."
                          />
                          <TimelineStep
                            title="Resolved"
                            date={
                              ticket.status === "RESOLVED"
                                ? ticket.updatedAt
                                : null
                            }
                            active={config.step === 3}
                            desc="Resolution provided and ticket closed."
                          />
                        </div>
                      </div>

                      {/* Details Section */}
                      <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-card border-2 border-dashed shadow-inner">
                          <p className="text-[10px] font-black uppercase text-muted-foreground mb-2 flex items-center gap-2">
                            <MessageSquare size={12} /> User Description
                          </p>
                          <p className="text-sm text-[#555] leading-relaxed italic">
                            "{ticket.description}"
                          </p>
                        </div>

                        {/* 🔹 ADMIN REMARK BOX */}
                        {ticket.adminRemark && (
                          <div className="p-5 rounded-2xl bg-primary/5 border-2 border-primary/20 animate-in zoom-in-95">
                            <div className="flex items-center gap-2 mb-2 text-primary">
                              <MessageSquare size={16} />
                              <p className="text-[10px] font-black uppercase tracking-widest">
                                Official Response
                              </p>
                            </div>
                            <p className="text-sm font-bold text-foreground leading-snug">
                              {ticket.adminRemark}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

// 🔹 Timeline Step Component
function TimelineStep({ title, date, active, desc }: any) {
  return (
    <div
      className={cn(
        "relative pl-8 transition-all duration-500",
        !active && "opacity-30 grayscale",
      )}
    >
      <div
        className={cn(
          "absolute left-0 top-1.5 w-5 h-5 rounded-md border-4 bg-background z-10 shadow-sm",
          active ? "border-primary scale-110" : "border-muted",
        )}
      />
      <div className="space-y-0.5">
        <p className="text-xs font-black uppercase italic tracking-tight text-foreground">
          {title}
        </p>
        <p className="text-[9px] font-bold text-muted-foreground">
          {date
            ? new Date(date).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Pending Support Action"}
        </p>
        <p className="text-[10px] md:text-[11px] mt-1 font-medium leading-tight opacity-80">
          {desc}
        </p>
      </div>
    </div>
  );
}

// 🔹 Empty State UI
function EmptyTicketsState() {
  return (
    <div className="py-20 md:py-32 text-center border-4 border-dashed rounded-md border-border/50 bg-muted/5 animate-pulse">
      <LifeBuoy className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-20" />
      <p className="text-lg md:text-xl font-black uppercase italic tracking-[0.2em] text-muted-foreground opacity-40">
        No Support History
      </p>
      <p className="text-[10px] uppercase font-bold text-muted-foreground mt-2">
        Tickets you raise will appear here
      </p>
    </div>
  );
}
