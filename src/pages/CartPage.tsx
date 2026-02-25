import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "@/store";
import {
  removeFromCart,
  clearCart,
  updateQuantity,
  type CartItem,
} from "@/store/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items } = useSelector((state: RootState) => state.cart);

  const subtotal = items.reduce(
    (acc: number, item: CartItem) => acc + item.price * item.quantity,
    0,
  );

  const deliveryCharges = subtotal > 500 || subtotal === 0 ? 0 : 40;
  const totalAmount = subtotal + deliveryCharges;

  if (items.length === 0) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center px-6 text-center space-y-4 animate-in fade-in">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-full flex items-center justify-center">
          <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground opacity-50" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black uppercase italic tracking-tighter text-foreground">
          Your Cart is Empty
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm max-w-[250px]">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button
          onClick={() => navigate("/ang-mart")}
          className="rounded-full px-8 font-bold uppercase italic tracking-widest text-xs"
        >
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-6 sm:py-8 max-w-7xl mx-auto px-4 animate-in fade-in duration-500">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-4 sm:mb-6 -ml-2 sm:ml-0 gap-2 font-bold text-muted-foreground hover:text-primary text-xs sm:text-sm"
      >
        <ArrowLeft size={16} /> CONTINUE SHOPPING
      </Button>

      <h1 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tighter mb-6 sm:mb-8 text-foreground">
        Shopping <span className="text-primary">Cart</span>
      </h1>

      <div className="grid lg:grid-cols-12 gap-6 sm:gap-8">
        {/* LEFT: Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden border-2 hover:border-primary/20 transition-all shadow-sm group bg-card"
            >
              <CardContent className="p-3 sm:p-4 flex gap-3 sm:gap-6 relative">
                {/* Product Image - Responsive size */}
                <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-lg sm:rounded-xl overflow-hidden bg-muted shrink-0 border border-border">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>

                {/* Details Section */}
                <div className="flex-1 flex flex-col justify-between py-0.5 sm:py-1 min-w-0">
                  <div className="pr-8">
                    {" "}
                    {/* Padding for Trash icon */}
                    <h3 className="font-bold italic uppercase tracking-tight text-sm sm:text-lg line-clamp-1 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-[9px] sm:text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5 sm:mt-1">
                      Associate: {item.associateId.slice(0, 8)}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-2">
                    <div className="flex items-center gap-1 text-primary font-black text-base sm:text-xl italic">
                      <IndianRupee size={14} className="sm:w-4 sm:h-4" />{" "}
                      {(item.price * item.quantity).toLocaleString("en-IN")}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center bg-muted/50 rounded-lg border border-border p-1 w-fit">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 sm:h-8 sm:w-8 rounded-md"
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, change: -1 }))
                        }
                      >
                        <Minus size={12} className="sm:w-3.5 sm:h-3.5" />
                      </Button>
                      <span className="w-8 sm:w-10 text-center font-bold text-xs sm:text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 sm:h-8 sm:w-8 rounded-md"
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, change: 1 }))
                        }
                      >
                        <Plus size={12} className="sm:w-3.5 sm:h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Remove Button - Positioned top right on small screens */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-full absolute top-2 right-2 h-8 w-8 sm:static sm:h-10 sm:w-10 sm:self-start"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  <Trash2 size={16} className="sm:w-5 sm:h-5" />
                </Button>
              </CardContent>
            </Card>
          ))}

          <Button
            variant="outline"
            className="w-full border-dashed border-2 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] h-10 sm:h-12 rounded-xl text-muted-foreground hover:text-destructive hover:border-destructive/30"
            onClick={() => dispatch(clearCart())}
          >
            Clear Entire Cart
          </Button>
        </div>

        {/* RIGHT: Price Summary */}
        <div className="lg:col-span-4 mt-4 lg:mt-0">
          <Card className="lg:sticky lg:top-24 border-2 bg-card shadow-lg rounded-2xl sm:rounded-[2rem] overflow-hidden border-border">
            <div className="p-5 sm:p-6 space-y-6">
              <h3 className="font-black italic uppercase tracking-tighter text-lg sm:text-xl border-b pb-4 text-foreground">
                Order Summary
              </h3>

              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm font-medium">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Price ({items.length} items)
                  </span>
                  <span className="text-foreground">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Delivery Charges
                  </span>
                  <span
                    className={cn(
                      "font-bold",
                      deliveryCharges === 0
                        ? "text-green-600"
                        : "text-foreground",
                    )}
                  >
                    {deliveryCharges === 0 ? "FREE" : `₹${deliveryCharges}`}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-base sm:text-lg font-black italic uppercase tracking-tight text-foreground">
                    Total Amount
                  </span>
                  <span className="text-xl sm:text-2xl font-black italic text-primary">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <Button
                className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl font-black italic uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 text-xs sm:text-md transition-all active:scale-95"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>

              <div className="flex items-center justify-center gap-2 text-[9px] sm:text-[10px] text-muted-foreground font-black uppercase tracking-tighter pt-2 opacity-70">
                <ShieldCheck size={14} className="text-green-600 shrink-0" />
                Secure Payments with ANG Growth
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
