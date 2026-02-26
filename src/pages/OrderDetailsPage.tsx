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

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: order, isLoading, isError } = useGetOrderDetailQuery(id || "");

  // 🔹 Invoice Download Handler
  const handleDownloadInvoice = () => {
    if (order?.invoiceUrl) {
      window.open(order.invoiceUrl, "_blank");
      toast.success("Downloading Invoice...");
    } else {
      toast.error("Invoice not generated yet by the seller.");
    }
  };

  if (isLoading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground italic">
          Fetching Details...
        </p>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <Package className="w-16 h-16 text-muted-foreground opacity-20" />
        <h2 className="text-xl font-black uppercase italic tracking-tighter text-white">
          Order Not Found
        </h2>
        <Button variant="outline" onClick={() => navigate("/my-orders")}>
          Go Back
        </Button>
      </div>
    );
  }

  const product = order.product;
  const seller = order.seller;
  const shipping = order.shippingAddress;
  const buyer = order.buyer;

  return (
    <div className="container py-8 max-w-4xl mx-auto px-4 animate-in slide-in-from-right duration-500">
      {/* Navbar Actions */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="gap-2 font-bold text-muted-foreground hover:text-primary transition-all"
        >
          <ArrowLeft size={18} /> BACK
        </Button>
        <Badge
          variant="outline"
          className="font-mono font-bold border-primary/30 text-primary bg-primary/5 px-4 py-1 rounded-lg"
        >
          ID: {order.orderId}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* 1. Status Header (Refined Rounded) */}
        <Card className="border-none rounded-2xl bg-primary text-primary-foreground shadow-xl overflow-hidden relative">
          <CardContent className="p-8 sm:p-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
            <div className="space-y-2 text-background">
              <div className="flex items-center gap-2 opacity-80 font-black uppercase tracking-[0.3em] text-[10px]">
                <Clock size={12} /> Status Update
              </div>
              <h2 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter">
                {order.status}
              </h2>
              <p className="text-xs font-bold opacity-70 italic">
                Placed on {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="rounded-xl font-bold text-[10px] uppercase tracking-widest h-10 px-6 shadow-lg active:scale-95"
                onClick={handleDownloadInvoice}
              >
                <FileText size={14} className="mr-2" /> Download Invoice
              </Button>
            </div>
          </CardContent>
          <Truck
            size={120}
            className="absolute -right-8 -bottom-6 opacity-20 rotate-[-10deg] pointer-events-none"
          />
        </Card>

        {/* 2. Tracking Stepper */}
        <Card className="border-2 rounded-2xl shadow-sm border-border/50 bg-card">
          <CardContent className="p-8 sm:p-10">
            <OrderTrackingStepper status={order.status} />
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 3. Product Summary */}
          <Card className="border-2 rounded-2xl shadow-sm overflow-hidden bg-card border-border/50">
            <CardHeader className="border-b bg-muted/30 py-4 px-6">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-primary italic">
                <ShoppingBag size={14} /> Item Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-border bg-muted shrink-0">
                  <img
                    src={product.fileUrl?.[0]}
                    className="w-full h-full object-cover"
                    alt={product.title}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-sm uppercase italic leading-tight text-white line-clamp-2">
                    {product.title}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="w-fit mt-2 text-[8px] uppercase font-black"
                  >
                    {product.category}
                  </Badge>
                </div>
              </div>
              <div className="pt-4 border-t border-dashed space-y-2">
                <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase">
                  <span>Unit Price x {order.quantity}</span>
                  <span className="text-white">
                    ₹{Number(product.price).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-black italic uppercase text-xs text-muted-foreground">
                    Total Payable
                  </span>
                  <span className="text-xl font-black italic text-primary flex items-center">
                    <IndianRupee size={16} className="mr-0.5" />{" "}
                    {order.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4. Shipping Details */}
          <Card className="border-2 rounded-2xl shadow-sm bg-muted/20 border-border/50">
            <CardHeader className="border-b border-border/50 py-4 px-6">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-destructive italic">
                <MapPin size={14} /> Shipping To
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-background flex items-center justify-center border shadow-sm shrink-0">
                  <User size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-muted-foreground leading-none mb-1">
                    Receiver Name
                  </p>
                  <p className="font-bold text-sm uppercase italic text-white leading-none">
                    {buyer.fullName}
                  </p>
                </div>
              </div>
              <div className="bg-background/40 p-4 rounded-xl border border-border/50 space-y-1">
                <p className="text-xs font-bold uppercase text-white leading-snug">
                  {shipping.houseNo}
                </p>
                <p className="text-[11px] font-black text-primary uppercase tracking-tighter">
                  {shipping.city}, {shipping.state} - {shipping.pincode}
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full rounded-xl h-10 font-black italic uppercase text-[10px] tracking-widest gap-2 shadow-sm border-2 active:scale-95"
                onClick={() =>
                  (window.location.href = `tel:${buyer.phoneNumber}`)
                }
              >
                <Phone size={14} /> Contact Buyer
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 5. Merchant Information */}
        <Card className="border-2 rounded-2xl shadow-xl border-primary/10 bg-card overflow-hidden">
          <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <Building2 size={28} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">
                  Merchant Details
                </p>
                <p className="font-black italic uppercase text-base text-white truncate leading-tight">
                  {seller.businessName || " Bihar Organic Creator"}
                </p>
                <p className="text-[10px] font-bold text-primary mt-1 uppercase flex items-center gap-1">
                  <MapPin size={10} /> {seller.city} |{" "}
                  <span className="opacity-60">{seller.category}</span>
                </p>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Button
                variant="outline"
                className="flex-1 rounded-xl h-12 gap-2 font-black uppercase text-[10px] tracking-widest border-2 hover:bg-primary/5 transition-all shadow-sm active:scale-95"
                onClick={() =>
                  (window.location.href = `tel:${seller.businessDetails.businessMobile}`)
                }
              >
                <Phone size={14} /> Call Seller
              </Button>
              {/* <Button
                className="flex-1 rounded-xl h-12 gap-2 font-black italic uppercase text-[10px] tracking-widest bg-white text-black hover:bg-white/90 shadow-2xl active:scale-95"
                onClick={() =>
                  window.open(seller.businessDetails.qrCodeUrl, "_blank")
                }
              >
                <QrCode size={16} /> QR Info
              </Button> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// 🔹 Order Tracking Stepper (Refined Rounded)
function OrderTrackingStepper({ status }: { status: string }) {
  const steps = [
    { key: "placed", label: "Ordered", icon: Package },
    { key: "accepted", label: "Verified", icon: Clock },
    { key: "shipped", label: "Shipped", icon: Truck },
    { key: "delivered", label: "Delivered", icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex(
    (s) => s.key === (status === "pending" ? "placed" : status),
  );

  return (
    <div className="relative flex justify-between px-2">
      <div className="absolute top-5 left-10 right-10 h-0.5 bg-muted -z-0 rounded-full" />
      <div
        className="absolute top-5 left-10 h-0.5 bg-primary -z-0 transition-all duration-1000 ease-in-out rounded-full"
        style={{ width: `${(currentStepIndex / (steps.length - 1)) * 92}%` }}
      />

      {steps.map((step, idx) => {
        const Icon = step.icon;
        const isDone = idx <= currentStepIndex;
        const isCurrent = idx === currentStepIndex;

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
                size={isCurrent ? 22 : 18}
                className={isCurrent ? "animate-pulse" : ""}
              />
            </div>
            <span
              className={cn(
                "text-[9px] font-black uppercase tracking-widest text-center max-w-[65px]",
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

// const QrCode = ({ size, className }: { size: number; className?: string }) => (
//   <svg
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <rect width="5" height="5" x="3" y="3" rx="1" />
//     <rect width="5" height="5" x="16" y="3" rx="1" />
//     <rect width="5" height="5" x="3" y="16" rx="1" />
//     <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
//     <path d="M21 21v.01" />
//     <path d="M12 7v3a2 2 0 0 1-2 2H7" />
//     <path d="M3 12h.01" />
//     <path d="M12 3h.01" />
//     <path d="M12 16v.01" />
//     <path d="M16 12h1" />
//     <path d="M21 12v.01" />
//     <path d="M12 21v-1" />
//   </svg>
// );
