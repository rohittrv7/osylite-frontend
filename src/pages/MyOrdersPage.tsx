import { useNavigate } from "react-router-dom";
import { ChevronRight, IndianRupee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Demo Data for User
const USER_DEMO_ORDERS = [
  {
    id: "ord_1",
    bookingRef: "BKG-99210",
    amount: "1499.00",
    status: "shipped",
    createdAt: new Date().toISOString(),
    title: "Premium Leather Shoes",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
    seller: " बिहार लेदर हब",
  },
  {
    id: "ord_2",
    bookingRef: "BKG-88721",
    amount: "2500.00",
    status: "delivered",
    createdAt: "2026-02-10T10:00:00Z",
    title: "Handcrafted Wall Clock",
    image:
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=2070&auto=format&fit=crop",
    seller: "ANG Home Decor",
  },
];

export default function MyOrdersPage() {
  const navigate = useNavigate();
  const orders = USER_DEMO_ORDERS; // API aane par replace karein

  const activeOrders = orders.filter(
    (o) => o.status !== "delivered" && o.status !== "rejected",
  );
  const pastOrders = orders.filter(
    (o) => o.status === "delivered" || o.status === "rejected",
  );

  return (
    <div className="container py-8 max-w-4xl mx-auto px-4 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-black italic uppercase tracking-tighter">
          My <span className="text-primary">Orders</span>
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          Track and manage your recent purchases.
        </p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="bg-muted/50 p-1 rounded-xl mb-6 grid grid-cols-2 w-full max-w-md">
          <TabsTrigger
            value="active"
            className="rounded-lg font-bold uppercase text-[10px]"
          >
            Active Tracking
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="rounded-lg font-bold uppercase text-[10px]"
          >
            Order History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeOrders.map((order) => (
            <OrderMinimalCard
              key={order.id}
              order={order}
              onClick={() => navigate(`/order-details/${order.id}`)}
            />
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastOrders.map((order) => (
            <OrderMinimalCard
              key={order.id}
              order={order}
              onClick={() => navigate(`/order-details/${order.id}`)}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function OrderMinimalCard({
  order,
  onClick,
}: {
  order: any;
  onClick: () => void;
}) {
  return (
    <Card
      className="border-2 rounded-2xl overflow-hidden hover:border-primary/30 transition-all cursor-pointer group shadow-sm"
      onClick={onClick}
    >
      <CardContent className="p-4 flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden border shrink-0">
          <img
            src={order.image}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge
              className={cn(
                "text-[8px] uppercase px-2 py-0",
                order.status === "delivered" ? "bg-green-600" : "bg-orange-500",
              )}
            >
              {order.status}
            </Badge>
            <span className="text-[10px] font-mono text-muted-foreground">
              #{order.bookingRef}
            </span>
          </div>
          <h3 className="font-bold text-sm uppercase italic truncate">
            {order.title}
          </h3>
          <p className="text-[10px] text-muted-foreground font-medium">
            Ordered on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right flex items-center gap-3">
          <div className="font-black text-sm italic text-foreground flex items-center">
            <IndianRupee size={12} />
            {order.amount}
          </div>
          <ChevronRight
            size={18}
            className="text-muted-foreground group-hover:text-primary transition-colors"
          />
        </div>
      </CardContent>
    </Card>
  );
}
