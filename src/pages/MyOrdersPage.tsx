import { useNavigate } from "react-router-dom";
import {
  ChevronRight, IndianRupee, Package, Loader2, ArrowLeft,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useGetMyOrdersQuery } from "@/store/api/ordersApi";
import { Button } from "@/components/ui/button";
import type { OrderListItem } from "@/types/order";

export default function MyOrdersPage() {
  const navigate = useNavigate();
  const { data: orders = [], isLoading } = useGetMyOrdersQuery();

  if (isLoading)
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );

  return (
    <div className="container py-8 max-w-4xl mx-auto px-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-black italic uppercase tracking-tighter text-foreground">
            My <span className="text-primary">Orders</span>
          </h1>
          <p className="text-muted-foreground text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            {orders.length} order{orders.length !== 1 ? "s" : ""} placed
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
          className="rounded-full font-bold text-[10px] uppercase tracking-widest gap-2 border-2"
        >
          <ArrowLeft size={14} /> Back
        </Button>
      </div>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <EmptyOrder />
        ) : (
          orders.map((order: OrderListItem) => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={() => navigate(`/order-details/${order.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function OrderCard({ order, onClick }: { order: OrderListItem; onClick: () => void }) {
  // Show first item's product as primary display
  const firstItem = order.items?.[0];
  const product = firstItem?.product;
  const totalItems = order.items?.reduce((s, i) => s + i.quantity, 0) || 0;

  return (
    <Card
      className="border-2 rounded-[1.5rem] overflow-hidden hover:border-primary/30 transition-all cursor-pointer group shadow-sm bg-card border-border/50"
      onClick={onClick}
    >
      <CardContent className="p-4 flex items-center gap-4 sm:gap-6">
        {/* Product Image */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border shrink-0 bg-muted shadow-inner group-hover:border-primary/20 transition-colors">
          {product?.fileUrl?.[0] ? (
            <img
              src={product.fileUrl[0]}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              alt={product?.title}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl">🍽️</div>
          )}
        </div>

        {/* Order Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <Badge
              className={cn(
                "text-[8px] uppercase px-2.5 py-0.5 font-black tracking-widest rounded-md",
                order.status === "delivered"
                  ? "bg-green-600 text-white"
                  : order.status === "placed"
                    ? "bg-blue-600 text-white"
                    : order.status === "shipped"
                      ? "bg-orange-500 text-white"
                      : "bg-primary text-primary-foreground",
              )}
            >
              {order.status}
            </Badge>
            <span className="text-[9px] font-mono font-bold text-muted-foreground bg-muted/50 px-2 py-0.5 rounded border border-border/50">
              {order.orderId}
            </span>
          </div>

          <h3 className="font-bold text-sm sm:text-base uppercase italic truncate text-foreground tracking-tight group-hover:text-primary transition-colors">
            {product?.title || "Food Order"}
            {order.items.length > 1 && (
              <span className="text-[10px] text-muted-foreground font-normal normal-case ml-1">
                +{order.items.length - 1} more item{order.items.length > 2 ? "s" : ""}
              </span>
            )}
          </h3>

          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter mt-1 opacity-70">
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
            {" · "}{totalItems} item{totalItems !== 1 ? "s" : ""}
            {order.shippingAddress?.city ? ` · ${order.shippingAddress.city}` : ""}
          </p>
        </div>

        {/* Price */}
        <div className="text-right flex items-center gap-3 sm:gap-5">
          <div className="flex flex-col items-end">
            <div className="font-black text-sm sm:text-lg italic text-foreground flex items-center group-hover:text-primary transition-colors">
              <IndianRupee size={14} className="mr-0.5" />
              {order.totalAmount?.toLocaleString("en-IN")}
            </div>
            {order.deliveryFee > 0 && (
              <span className="text-[9px] font-bold text-muted-foreground uppercase mt-0.5">
                +₹{order.deliveryFee} delivery
              </span>
            )}
          </div>
          <div className="p-2 bg-muted/30 rounded-full group-hover:bg-primary/10 transition-colors">
            <ChevronRight
              size={18}
              className="text-muted-foreground group-hover:text-primary transition-colors"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyOrder() {
  return (
    <div className="py-24 text-center border-2 border-dashed rounded-[3rem] border-border/50 bg-muted/5 animate-in fade-in zoom-in">
      <Package className="w-14 h-14 mx-auto mb-4 text-muted-foreground opacity-20" />
      <p className="font-black uppercase italic text-xs tracking-[0.2em] text-muted-foreground mb-2">
        No orders found
      </p>
      <p className="text-[10px] font-bold text-muted-foreground/60 uppercase">
        Start exploring restaurants to place your first order
      </p>
    </div>
  );
}
