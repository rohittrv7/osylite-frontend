import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useCreateOrderMutation } from "@/store/api/bookingApi";
import { clearCart } from "@/store/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { RootState } from "@/store";
import { useCreateOrderMutation } from "@/store/api/bookingApi";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const totalAmount = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handlePlaceOrder = async () => {
    if (!address || !city || !pincode)
      return toast.error("Please fill complete address");

    try {
      await createOrder({
        items: items.map((i) => ({ postId: i.id, quantity: i.quantity })),
        address,
        city,
        pincode,
      }).unwrap();

      toast.success("Order Placed Successfully!");
      dispatch(clearCart());
      navigate("/my-bookings");
    } catch (err) {
      apiErrorToastHandler(err);
    }
  };

  return (
    <div className="container py-10 max-w-5xl mx-auto px-4 animate-in fade-in">
      <h1 className="text-3xl font-black uppercase italic tracking-tighter mb-8">
        Checkout <span className="text-primary">Process</span>
      </h1>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left: Address Form */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-2 rounded-2xl shadow-sm">
            <CardHeader className="border-b bg-muted/20">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="text-primary" /> Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  Full Address
                </label>
                <Input
                  placeholder="House No, Street, Landmark..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    City
                  </label>
                  <Input
                    placeholder="Patna"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Pincode
                  </label>
                  <Input
                    placeholder="800001"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 rounded-2xl shadow-sm opacity-60">
            <CardHeader className="bg-muted/20 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="text-primary" /> Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 font-bold text-sm italic">
              Cash on Delivery (Default for this order)
            </CardContent>
          </Card>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5">
          <Card className="border-2 rounded-[2rem] bg-card shadow-xl overflow-hidden sticky top-24">
            <div className="p-6 space-y-6">
              <h3 className="font-black italic uppercase tracking-tighter text-xl border-b pb-4">
                Items Summary
              </h3>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <div className="flex gap-3 items-center">
                      <img
                        src={item.image}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="font-bold line-clamp-1 max-w-[150px]">
                        {item.title}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        x{item.quantity}
                      </span>
                    </div>
                    <span className="font-black">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-lg font-black italic">
                  <span>Grand Total</span>
                  <span className="text-primary text-xl">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
              <Button
                className="w-full h-14 rounded-2xl font-black italic uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg text-md transition-all active:scale-95"
                onClick={handlePlaceOrder}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Place Order Now"
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
