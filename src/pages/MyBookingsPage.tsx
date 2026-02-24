import {
  FileText,
  IndianRupee,
  MapPin,
  Phone,
  Calendar,
  Clock,
  Loader2,
  Download,
  Building2,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useGetMyBookingsQuery, type UserBooking } from "@/store/api/bookingApi";

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function MyBookingsPage() {
  const { data: bookings = [], isLoading } = useGetMyBookingsQuery();

  if (isLoading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );
  }

  const ongoing = bookings.filter((b) => b.status === "pending");
  const completed = bookings.filter(
    (b) => b.status === "accepted" || b.status === "completed",
  );

  return (
    <div className="container py-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-3xl font-black italic uppercase tracking-tighter text-foreground">
          My <span className="text-primary">Bookings</span>
        </h1>
        <p className="text-muted-foreground text-sm">
          Track your orders and download invoices.
        </p>
      </div>

      <Tabs defaultValue="ongoing" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 rounded-xl mb-6">
          <TabsTrigger value="ongoing" className="rounded-lg font-bold">
            Ongoing ({ongoing.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-lg font-bold">
            History ({completed.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ongoing" className="space-y-4">
          {ongoing.length === 0 ? (
            <EmptyState message="No active bookings found." />
          ) : (
            ongoing.map((booking) => (
              <BookingUserCard key={booking.id} booking={booking} />
            ))
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {completed.length === 0 ? (
            <EmptyState message="No previous bookings found." />
          ) : (
            completed.map((booking) => (
              <BookingUserCard key={booking.id} booking={booking} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// --- Sub-component: User Booking Card ---
function BookingUserCard({ booking }: { booking: UserBooking }) {
  const isAccepted = booking.status === "accepted";

  return (
    <Card className="overflow-hidden border-2 hover:border-primary/20 transition-all shadow-sm group bg-card">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Left: Image */}
          <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden bg-muted shrink-0 border border-border">
            <img
              src={
                booking.post.fileUrl?.[0] || "https://via.placeholder.com/150"
              }
              alt={booking.post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Middle: Details */}
          <div className="flex-1 space-y-3">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <Badge
                  variant="outline"
                  className="text-[10px] uppercase font-black tracking-widest bg-muted/50"
                >
                  Ref: {booking.bookingRef}
                </Badge>
                <h3 className="text-lg font-bold italic uppercase tracking-tight text-foreground leading-none pt-1">
                  {booking.post.title}
                </h3>
              </div>
              <div className="text-right">
                <div className="flex items-center text-primary font-black text-xl italic">
                  <IndianRupee size={16} /> {booking.amount}
                </div>
                <Badge
                  className={cn(
                    "text-[9px] uppercase font-bold mt-1",
                    isAccepted
                      ? "bg-green-500/10 text-green-600"
                      : "bg-orange-500/10 text-orange-600",
                  )}
                >
                  {booking.status}
                </Badge>
              </div>
            </div>

            {/* Associate Box */}
            <div className="bg-muted/30 rounded-xl p-3 border border-border/50 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 size={14} className="text-primary" />
                  <span className="text-xs font-bold uppercase truncate max-w-[150px]">
                    {booking.associate.businessName}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-primary gap-1 text-[10px] font-bold"
                  onClick={() =>
                    (window.location.href = `tel:${booking.associate.user.phoneNumber}`)
                  }
                >
                  <Phone size={12} /> CALL
                </Button>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-medium">
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {booking.associate.city}
                </span>
                <span className="flex items-center gap-1">
                  <User size={12} /> {booking.associate.user.fullName}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2 text-[11px] text-muted-foreground font-bold uppercase tracking-tighter">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-primary" />{" "}
                {formatDate(booking.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-primary" /> 11:30 AM
              </span>
            </div>
          </div>
        </div>

        {/* Action Button: Invoice */}
        {isAccepted && booking.invoiceUrl && (
          <div className="mt-6 pt-4 border-t border-dashed border-border">
            <Button
              className="w-full rounded-xl font-black italic uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 h-11 gap-2"
              onClick={() => window.open(booking.invoiceUrl!, "_blank")}
            >
              <Download size={18} /> Download Invoice PDF
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-20 bg-muted/10 rounded-3xl border-2 border-dashed border-border/60">
      <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-20" />
      <p className="font-bold text-muted-foreground">{message}</p>
    </div>
  );
}
