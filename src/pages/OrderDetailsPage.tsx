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
  Loader2,
  User,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useGetOrderDetailQuery } from "@/store/api/ordersApi";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: order, isLoading, isError } = useGetOrderDetailQuery(id || "");

  const handleDownloadInvoice = () => {
    if (order?.invoiceUrl) {
      window.open(order.invoiceUrl, "_blank");
      toast.success("Downloading Invoice...");
    } else {
      toast.error("Invoice not generated yet.");
    }
  };

  if (isLoading)
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground italic">
          Syncing Order Data...
        </p>
      </div>
    );

  if (isError || !order)
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4 text-center">
        <Package className="w-16 h-16 text-muted-foreground opacity-20" />
        <h2 className="text-xl font-black italic uppercase text-white">
          Order Not Found
        </h2>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    );

  // Helper to get first seller info (assuming multi-item orders are from same seller or just for display)
  const sellerInfo = order.items[0]?.product?.user?.associateProfile;

  return (
    <div className="container py-8 max-w-4xl mx-auto px-4 animate-in slide-in-from-right duration-500">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="gap-2 font-bold text-muted-foreground hover:text-primary"
        >
          <ArrowLeft size={18} /> BACK
        </Button>
        <Badge
          variant="outline"
          className="font-mono font-bold border-primary/30 text-primary bg-primary/5 px-4 py-1"
        >
          {order.orderId}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* 1. Status Header */}
        <Card className="border-none rounded-2xl bg-primary text-primary-foreground shadow-xl overflow-hidden relative">
          <CardContent className="p-8 sm:p-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 opacity-80 font-black uppercase tracking-[0.3em] text-[10px] text-background">
                <Clock size={12} /> Status Update
              </div>
              <h2 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter text-background">
                {order.status}
              </h2>
              <p className="text-xs font-bold opacity-70 italic text-background">
                Placed on {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <Button
              variant="secondary"
              className="rounded-xl font-black text-[10px] uppercase tracking-widest h-10 px-6 shadow-lg active:scale-95"
              onClick={handleDownloadInvoice}
            >
              <FileText size={14} className="mr-2" /> Invoice
            </Button>
          </CardContent>
          <Truck
            size={120}
            className="absolute -right-8 -bottom-6 opacity-20 rotate-[-10deg]"
          />
        </Card>

        {/* 2. Order Stepper */}
        <Card className="border-2 rounded-2xl shadow-sm bg-card">
          <CardContent className="p-8 sm:p-10">
            <OrderTrackingStepper status={order.status} />
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-5 gap-6">
          {/* 3. Items List (Left Side) */}
          <div className="md:col-span-3 space-y-6">
            <Card className="border-2 rounded-2xl shadow-sm overflow-hidden bg-card">
              <CardHeader className="border-b bg-muted/30 py-4 px-6">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-primary italic">
                  <ShoppingBag size={14} /> Cart Items ({order.items.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {order.items.map((item, idx) => (
                  <div key={item.id}>
                    <div className="p-6 flex gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-border bg-muted shrink-0">
                        <img
                          src={item.product.fileUrl[0]}
                          className="w-full h-full object-cover"
                          alt={item.product.title}
                        />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <h3 className="font-bold text-sm uppercase italic text-white truncate">
                          {item.product.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="secondary"
                            className="text-[8px] uppercase font-black"
                          >
                            QTY: {item.quantity}
                          </Badge>
                          <span className="text-sm font-black text-primary">
                            ₹{Number(item.priceAtPurchase).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    {idx < order.items.length - 1 && (
                      <Separator className="opacity-10" />
                    )}
                  </div>
                ))}
                <div className="p-6 bg-muted/20 border-t border-dashed">
                  <div className="flex justify-between items-center">
                    <span className="font-black italic uppercase text-xs text-muted-foreground">
                      Grand Total
                    </span>
                    <span className="text-2xl font-black italic text-primary flex items-center">
                      <IndianRupee size={20} />{" "}
                      {order.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 4. Shipping & Seller (Right Side) */}
          <div className="md:col-span-2 space-y-6">
            {/* Shipping Address */}
            <Card className="border-2 rounded-2xl bg-muted/20 border-border/50">
              <CardHeader className="border-b border-border/50 py-4 px-6">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-destructive italic">
                  <MapPin size={14} /> Deliver To
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <User size={16} className="text-primary" />
                  <p className="font-bold text-xs uppercase text-white truncate">
                    {order.buyer.fullName}
                  </p>
                </div>
                <div className="bg-background/40 p-4 rounded-xl border border-border/50 space-y-1">
                  <p className="text-xs font-bold uppercase text-white leading-snug">
                    {order.shippingAddress.houseNo}
                  </p>
                  <p className="text-[11px] font-black text-primary uppercase tracking-tighter">
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    - {order.shippingAddress.pincode}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Merchant Info */}
            {sellerInfo && (
              <Card className="border-2 rounded-2xl border-primary/10 bg-card overflow-hidden">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Building2 size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] font-black uppercase text-muted-foreground leading-none mb-1">
                        Seller
                      </p>
                      <p className="font-black italic uppercase text-xs text-white truncate">
                        {sellerInfo.businessName}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl h-10 gap-2 font-black uppercase text-[10px] tracking-widest border-2"
                    onClick={() =>
                      (window.location.href = `tel:${sellerInfo.businessDetails.businessMobile}`)
                    }
                  >
                    <Phone size={14} /> Call Seller
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Stepper Component Remains largely same, handles status mapping
function OrderTrackingStepper({ status }: { status: string }) {
  const steps = [
    { key: "pending", label: "Ordered", icon: Package },
    { key: "accepted", label: "Verified", icon: Clock },
    { key: "shipped", label: "Shipped", icon: Truck },
    { key: "delivered", label: "Delivered", icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="relative flex justify-between px-2">
      <div className="absolute top-5 left-10 right-10 h-0.5 bg-muted -z-0 rounded-full" />
      <div
        className="absolute top-5 left-10 h-0.5 bg-primary -z-0 transition-all duration-1000 rounded-full"
        style={{ width: `${(currentStepIndex / (steps.length - 1)) * 92}%` }}
      />

      {steps.map((step, idx) => {
        const Icon = step.icon;
        const isDone = idx <= currentStepIndex;
        return (
          <div
            key={step.key}
            className="relative z-10 flex flex-col items-center gap-4"
          >
            <div
              className={cn(
                "w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-700",
                isDone
                  ? "bg-primary border-primary text-background scale-110 shadow-lg shadow-primary/30"
                  : "bg-background border-muted text-muted-foreground",
              )}
            >
              <Icon
                size={idx === currentStepIndex ? 22 : 18}
                className={idx === currentStepIndex ? "animate-pulse" : ""}
              />
            </div>
            <span
              className={cn(
                "text-[9px] font-black uppercase tracking-widest text-center",
                isDone ? "text-primary italic" : "text-muted-foreground",
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
