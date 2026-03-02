import { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  CheckCircle2,
  Loader2,
  Package,
  HelpCircle,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  useLazyTrackAwbQuery,
  useFileComplaintMutation,
} from "@/store/api/shipingApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";

enum ComplaintIssueType {
  LATE_DELIVERY = "LATE_DELIVERY",
  DAMAGED = "DAMAGED",
  NOT_PICKED_UP = "NOT_PICKED_UP",
  WRONG_ITEM = "WRONG_ITEM",
}

export default function PublicTracking() {
  const [awb, setAwb] = useState("");
  const [triggerTrack, { data, isFetching }] = useLazyTrackAwbQuery();

  const handleSearch = () => {
    if (awb.trim()) triggerTrack(awb);
  };

  return (
    <div className="container py-20 max-w-4xl mx-auto px-4">
      <div className="text-center mb-12 animate-in fade-in duration-700">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-4 text-foreground">
          Track <span className="text-primary">Shipment</span>
        </h1>
        <div className="flex gap-2 p-2 bg-card border-2 border-border/50 rounded-2xl shadow-2xl max-w-2xl mx-auto">
          <Input
            placeholder="Enter AWB Number (e.g. ANG69458515)"
            className="border-none h-12 text-lg font-mono focus-visible:ring-0 bg-transparent text-foreground"
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
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-primary/5 border-primary/20 p-6 rounded-[1.5rem] border-2 relative">
              {/* 🔹 Raise Ticket Trigger */}
              <div className="absolute top-4 right-4">
                <RaiseComplaintDialog
                  shipmentId={data.id}
                  awb={data.awbNumber}
                />
              </div>
              <p className="text-[10px] font-black uppercase text-primary tracking-widest opacity-60">
                Shipment Status
              </p>
              <p className="text-2xl font-black italic text-foreground uppercase">
                {data.status}
              </p>
            </Card>
            <Card className="bg-card border-border/50 p-6 rounded-[1.5rem] border-2">
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                Service Type
              </p>
              <p className="text-lg font-bold text-foreground uppercase">
                {data.serviceType.replace("_", " ")}
              </p>
            </Card>
            <Card className="bg-card border-border/50 p-6 rounded-[1.5rem] border-2">
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                Receiver
              </p>
              <p className="text-lg font-bold text-foreground truncate">
                {data.receiverName}
              </p>
            </Card>
          </div>

          <Separator className="border-dashed opacity-20" />

          <div className="max-w-2xl mx-auto space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-muted/30">
            {data.trackingLogs.map((log: any, idx: number) => (
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
                      <h4 className="font-black italic uppercase text-lg tracking-tight text-foreground">
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

// 🔹 COMPLAINT MODAL COMPONENT
function RaiseComplaintDialog({
  shipmentId,
  awb,
}: {
  shipmentId: string;
  awb: string;
}) {
  const [fileComplaint, { isLoading }] = useFileComplaintMutation();
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleComplaint = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      shipmentId,
      issueType: formData.get("issueType") as string,
      description: formData.get("description") as string,
    };

    try {
      const res = await fileComplaint(payload).unwrap();
      setSubmittedData(res); // API should return complaint number
      toast.success("Complaint filed successfully");
    } catch (err) {
      apiErrorToastHandler(err);
    }
  };

  return (
    <Dialog onOpenChange={(open) => !open && setSubmittedData(null)}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <HelpCircle size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-[2.5rem] max-w-lg border-2 shadow-2xl">
        {!submittedData ? (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-destructive/10 rounded-2xl text-destructive">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter">
                    Raise Ticket
                  </DialogTitle>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                    AWB: {awb}
                  </p>
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={handleComplaint} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest">
                  Issue Type
                </Label>
                <Select name="issueType" required>
                  <SelectTrigger className="h-12 rounded-xl border-2">
                    <SelectValue placeholder="What's the issue?" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2">
                    <SelectItem value={ComplaintIssueType.LATE_DELIVERY}>
                      ❌ Item not delivered (Late Delivery)
                    </SelectItem>
                    <SelectItem value={ComplaintIssueType.DAMAGED}>
                      📦 Package is damaged
                    </SelectItem>
                    <SelectItem value={ComplaintIssueType.NOT_PICKED_UP}>
                      🛵 Driver not picked up
                    </SelectItem>
                    <SelectItem value={ComplaintIssueType.WRONG_ITEM}>
                      ⚠️ Wrong/Missing Item
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest">
                  Describe your issue in detail
                </Label>
                <Textarea
                  name="description"
                  placeholder="Tell us what happened (min 200 words recommended)..."
                  required
                  className="min-h-[150px] rounded-2xl border-2 focus-visible:ring-primary"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 rounded-2xl font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-xl"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Submit Complaint"
                )}
              </Button>
            </form>
          </>
        ) : (
          /* SUCCESS STATE */
          <div className="py-12 text-center space-y-6 animate-in zoom-in-95">
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border-4 border-green-500/20">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black italic uppercase tracking-tighter">
                Ticket Raised!
              </h3>
              <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">
                Your Ticket Reference Number is:
              </p>
              <div className="bg-muted p-4 rounded-2xl border-2 border-dashed border-primary/20">
                <p className="text-3xl font-mono font-black text-primary tracking-widest">
                  {submittedData.complaintNumber || "COMP-202603-9982"}
                </p>
              </div>
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase max-w-xs mx-auto">
              Our support team will investigate and update you within 24-48
              working hours.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("rounded-xl", className)}>{children}</div>;
}
