import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Building2,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  IndianRupee,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  // Demo Data Fetch (Replace with useGetOrderByIdQuery)
  const order = {
    bookingRef: "BKG-99210",
    status: "shipped",
    amount: "1499.00",
    createdAt: new Date().toISOString(),
    address: "H-45, Phase 2, Ashiana Nagar, Near IGIMS",
    city: "Patna",
    pincode: "800025",
    title: "Premium Leather Shoes",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
    seller: " बिहार लेदर हब",
    sellerPhone: "9876543210",
  };

  return (
    <div className="container py-8 max-w-3xl mx-auto px-4 animate-in slide-in-from-right duration-500">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 gap-2 font-bold text-muted-foreground"
      >
        <ArrowLeft size={18} /> BACK TO ORDERS
      </Button>

      <div className="space-y-6">
        {/* Status Header */}
        <Card className="border-2 rounded-[2rem] bg-primary text-primary-foreground shadow-xl overflow-hidden">
          <CardContent className="p-8 flex justify-between items-center relative">
            <div className="space-y-1 z-10">
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">
                Order Status
              </p>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter">
                {order.status}
              </h2>
              <p className="text-xs font-bold opacity-70">
                REF: {order.bookingRef}
              </p>
            </div>
            <Truck
              size={80}
              className="absolute right-4 bottom-[-10px] opacity-20 rotate-[-10deg]"
            />
          </CardContent>
        </Card>

        {/* Tracking Stepper */}
        <Card className="border-2 rounded-[2rem] shadow-sm">
          <CardContent className="p-8">
            <OrderTrackingStepper status={order.status} />
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Item Details */}
          <Card className="border-2 rounded-[2rem] shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h4 className="text-[10px] font-black uppercase text-primary tracking-widest italic">
                Item Details
              </h4>
              <div className="flex gap-4">
                <img
                  src={order.image}
                  className="w-20 h-20 rounded-2xl border object-cover"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-sm uppercase italic leading-tight">
                    {order.title}
                  </h3>
                  <p className="text-xl font-black mt-1 flex items-center italic">
                    <IndianRupee size={16} />
                    {order.amount}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card className="border-2 rounded-[2rem] shadow-sm bg-muted/20">
            <CardContent className="p-6 space-y-4">
              <h4 className="text-[10px] font-black uppercase text-primary tracking-widest italic">
                Delivery Address
              </h4>
              <div className="flex gap-3">
                <MapPin className="text-destructive shrink-0" size={20} />
                <div className="text-xs space-y-1">
                  <p className="font-bold uppercase text-foreground">
                    {order.address}
                  </p>
                  <p className="font-black text-primary">
                    {order.city} - {order.pincode}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Seller Info & Invoice */}
        <Card className="border-2 rounded-[2rem] shadow-sm border-dashed">
          <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <Building2 className="text-primary" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-muted-foreground">
                  Sold By
                </p>
                <p className="font-bold uppercase italic text-sm">
                  {order.seller}
                </p>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Button
                variant="outline"
                className="flex-1 rounded-xl gap-2 font-bold"
                onClick={() =>
                  (window.location.href = `tel:${order.sellerPhone}`)
                }
              >
                <Phone size={16} /> CALL SELLER
              </Button>
              <Button className="flex-1 rounded-xl gap-2 font-bold bg-black hover:bg-black/80">
                <FileText size={16} /> INVOICE
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Reusable Stepper for User View
function OrderTrackingStepper({ status }: { status: string }) {
  const steps = [
    { key: "pending", label: "Ordered", icon: Package },
    { key: "accepted", label: "Packed", icon: Clock },
    { key: "shipped", label: "Shipped", icon: Truck },
    { key: "delivered", label: "Delivered", icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="relative flex justify-between px-2">
      <div className="absolute top-5 left-10 right-10 h-1 bg-muted -z-0 rounded-full" />
      <div
        className="absolute top-5 left-10 h-1 bg-primary -z-0 transition-all duration-1000 rounded-full"
        style={{ width: `${(currentStepIndex / (steps.length - 1)) * 92}%` }}
      />

      {steps.map((step, idx) => {
        const Icon = step.icon;
        const isDone = idx <= currentStepIndex;
        const isCurrent = idx === currentStepIndex;

        return (
          <div
            key={step.key}
            className="relative z-10 flex flex-col items-center gap-3"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500",
                isDone
                  ? "bg-primary border-primary text-white scale-110 shadow-lg shadow-primary/30"
                  : "bg-background border-muted text-muted-foreground",
              )}
            >
              <Icon size={18} className={isCurrent ? "animate-pulse" : ""} />
            </div>
            <span
              className={cn(
                "text-[9px] font-black uppercase tracking-tighter text-center max-w-[60px]",
                isDone ? "text-primary" : "text-muted-foreground",
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
