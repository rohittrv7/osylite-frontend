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
import { useBuyProductMutation } from "@/store/api/ordersApi";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";
import { Separator } from "@/components/ui/separator";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const [buyProduct, { isLoading }] = useBuyProductMutation();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("Bihar"); // Bound with UI now

  const totalAmount = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handlePlaceOrder = async () => {
    if (!address || !city || !pincode || !state)
      return toast.error("Please fill complete address details");
    if (items.length === 0) return toast.error("Cart is empty");

    try {
      const addressJson = {
        houseNo: address,
        city: city,
        pincode: pincode,
        state: state,
      };

      // Backend expects single productId as per your PlaceOrderDto
      for (const item of items) {
        await buyProduct({
          productId: item.id,
          quantity: item.quantity,
          address: addressJson,
        }).unwrap();
      }

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
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="text-primary w-5 h-5" /> Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                  Full Street Address / House No.
                </label>
                <Input
                  placeholder="House No, Street, Landmark..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-11"
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
                    className="h-11"
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
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                    Pincode
                  </label>
                  <Input
                    placeholder="800001"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="h-11"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 rounded-2xl shadow-md border-primary/20 bg-primary/5 overflow-hidden">
            <CardHeader className="bg-primary/10 border-b border-primary/10 py-4">
              <CardTitle className="text-lg flex items-center gap-2 text-primary">
                <Coins className="w-5 h-5" /> Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between p-4 bg-background rounded-xl border-2 border-primary shadow-sm relative overflow-hidden group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Coins className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black italic uppercase text-sm">
                      Pay with ANG Coins
                    </h4>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                      Instant & Secure Payment
                    </p>
                  </div>
                </div>
                <CheckCircle2 className="text-primary w-6 h-6 fill-primary/10" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5">
          <Card className="border-2 rounded-[2.5rem] bg-card shadow-2xl overflow-hidden sticky top-24 border-border/50">
            <div className="p-6 sm:p-8 space-y-6">
              <h3 className="font-black italic uppercase tracking-tighter text-xl border-b pb-4 text-foreground">
                Items Summary
              </h3>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-sm group"
                  >
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border bg-muted">
                        <img
                          src={item.image}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold line-clamp-1 max-w-[140px] uppercase text-xs">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-black text-muted-foreground uppercase">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="font-black italic text-primary">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="border-dashed" />

              <div className="flex justify-between items-center text-lg font-black italic text-foreground pt-2">
                <span className="uppercase tracking-tighter">
                  Total Payable
                </span>
                <span className="text-primary text-2xl">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </span>
              </div>

              <Button
                className="w-full h-14 rounded-2xl font-black italic uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all active:scale-95"
                onClick={handlePlaceOrder}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  "Confirm & Pay"
                )}
              </Button>

              <div className="flex flex-col items-center gap-1 opacity-60">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Powered by ANG Network
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
