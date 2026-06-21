import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "@/store/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Loader2, Coins, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import type { RootState } from "@/store";
import { useBuyProductMutation } from "@/store/api/ordersApi"; // 🔹 Using Bulk Mutation
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useGetProfileQuery } from "@/store/api/authApi";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  const { data: userData } = useGetProfileQuery();
  const userCoins = userData?.angCoins ?? 0;

  // 🔹 Updated mutation hook
  const [placeOrder, { isLoading }] = useBuyProductMutation();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("Bihar");

  const totalAmount = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handlePlaceOrder = async () => {
    // 1. Validation
    if (!address || !city || !pincode || !state)
      return toast.error("Please fill complete address details");
    if (items.length === 0) return toast.error("Cart is empty");

    try {
      // 2. 🔹 Prepare the payload exactly as you requested
      const payload = {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        address: {
          houseNo: address,
          city: city,
          state: state,
          pincode: pincode,
        },
      };

      // 3. 🔹 Single API Call for all items
      await placeOrder(payload).unwrap();

      toast.success("Order Placed Successfully!");
      dispatch(clearCart());
      navigate("/my-orders");
    } catch (err) {
      apiErrorToastHandler(err);
    }
  };

  return (
    <div className="container py-10 max-w-5xl mx-auto px-4 animate-in fade-in duration-500">
      <h1 className="text-3xl font-black uppercase italic tracking-tighter mb-8">
        Checkout <span className="text-primary">Process</span>
      </h1>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Side: Address & Payment */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-2 rounded-2xl shadow-sm overflow-hidden">
            <CardHeader className="border-b bg-muted/20 py-4">
              <CardTitle className="text-lg flex items-center gap-2 font-bold italic uppercase">
                <MapPin className="text-primary w-5 h-5" /> Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                  Full Street Address / House No.
                </label>
                <Input
                  placeholder="Flat 101, Shanti Enclave..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-12 border-2 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                    City
                  </label>
                  <Input
                    placeholder="Patna"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="h-12 border-2 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                    State
                  </label>
                  <Input
                    placeholder="Bihar"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="h-12 border-2 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                    Pincode
                  </label>
                  <Input
                    placeholder="800002"
                    value={pincode}
                    maxLength={6}
                    onChange={(e) => setPincode(e.target.value)}
                    className="h-12 border-2 rounded-xl font-mono"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Card */}
          <Card className="border-2 rounded-2xl shadow-md border-primary/20 bg-primary/5 overflow-hidden">
            <CardHeader className="bg-primary/10 border-b border-primary/10 py-4">
              <CardTitle className="text-lg flex items-center gap-2 text-primary font-bold italic uppercase">
                <Coins className="w-5 h-5" /> Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className={cn(
                "flex items-center justify-between p-5 bg-background rounded-xl border-2 shadow-sm relative overflow-hidden group",
                userCoins >= totalAmount ? "border-primary" : "border-border opacity-60"
              )}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Coins className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black italic uppercase text-sm">
                      Pay with ANG Coins
                    </h4>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                      Available: {userCoins.toLocaleString()} Coins (Need: {totalAmount.toLocaleString()})
                    </p>
                  </div>
                </div>
                {userCoins >= totalAmount && <CheckCircle2 className="text-primary w-6 h-6 fill-primary/10" />}
              </div>

              {userCoins < totalAmount && (
                <div className="border-2 border-dashed border-orange-200 bg-orange-50/50 dark:bg-orange-950/20 p-5 rounded-xl space-y-3">
                  <p className="text-xs font-bold text-orange-600 dark:text-orange-400">
                    ⚠️ You do not have enough coins to complete this order. Need {(totalAmount - userCoins).toLocaleString()} more coins (approx ₹{((totalAmount - userCoins) * 2).toLocaleString()}).
                  </p>
                  <Button
                    onClick={() => navigate(`/buy-coins?redirect=/checkout&amount=${(totalAmount - userCoins) * 2}`)}
                    className="w-full h-11 bg-orange-600 hover:bg-orange-700 text-white font-black italic uppercase text-xs tracking-wider rounded-lg shadow-md"
                  >
                    Pay with Currency (Buy Coins)
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5">
          <Card className="border-2 rounded-[2rem] bg-card shadow-2xl overflow-hidden sticky top-24 border-border/50">
            <div className="p-6 sm:p-8 space-y-6">
              <h3 className="font-black italic uppercase tracking-tighter text-2xl border-b pb-4 text-foreground">
                Items <span className="text-primary">Summary</span>
              </h3>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center group"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="w-14 h-14 rounded-xl overflow-hidden border-2 bg-muted shrink-0 shadow-sm">
                        <img
                          src={item.image}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          alt={item.title}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black uppercase text-xs tracking-tight line-clamp-1 max-w-[160px]">
                          {item.title}
                        </span>
                        <Badge
                          variant="secondary"
                          className="w-fit text-[9px] font-black px-2 mt-1"
                        >
                          QTY: {item.quantity}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black italic text-primary text-sm">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="border-dashed" />

              <div className="space-y-2">
                <div className="flex justify-between text-muted-foreground text-xs uppercase font-bold tracking-widest">
                  <span>Subtotal</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-black italic text-foreground pt-2">
                  <span className="uppercase tracking-tighter">
                    Total Payable
                  </span>
                  <span className="text-primary text-3xl">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <Button
                className="w-full h-16 rounded-2xl font-black italic uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all active:scale-95 group"
                onClick={handlePlaceOrder}
                disabled={isLoading || items.length === 0 || userCoins < totalAmount}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-6 h-6" />
                ) : (
                  <>Confirm & Place Order</>
                )}
              </Button>

              <div className="flex flex-col items-center gap-1 opacity-40">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Secure Checkout by ANG Network
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// 🔹 Small Badge Helper if not already in your UI folder
function Badge({ children, className }: any) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
        className,
      )}
    >
      {children}
    </span>
  );
}
