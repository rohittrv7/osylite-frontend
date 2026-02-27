import { useState } from "react";
import {
  Calculator as CalcIcon,
  ArrowRight,
  Package,
  Zap,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";
import { useCalculateShippingMutation } from "@/store/api/courierApi";

export default function CalculatorPage() {
  const [fromPin, setFromPin] = useState("");
  const [toPin, setToPin] = useState("");
  const [weight, setWeight] = useState("");
  const [serviceType, setServiceType] = useState("all");

  // 🔹 RTK Query Mutation Hook
  const [calculate, { data: results, isLoading }] =
    useCalculateShippingMutation();

  const handleCalculate = async () => {
    if (!fromPin || !toPin || !weight) return;

    try {
      await calculate({
        fromPincode: fromPin,
        toPincode: toPin,
        weightGm: Number(weight),
        serviceType: serviceType === "all" ? undefined : serviceType,
      }).unwrap();
    } catch (err) {
      apiErrorToastHandler(err);
    }
  };

  // Helper to get icons based on service name
  const getServiceIcon = (name: string) => {
    if (name.toLowerCase().includes("speed")) return Zap;
    if (name.toLowerCase().includes("express")) return Package;
    return Clock;
  };

  return (
    <div className="container py-12 max-w-5xl mx-auto px-4">
      <div className="text-center mb-10 animate-in fade-in duration-700">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-foreground mb-2">
          Rate <span className="text-primary">Calculator</span>
        </h1>
        <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em]">
          Instant Postage Estimator & Service Comparison
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Form Section */}
        <div className="md:col-span-3 bg-card border-2 border-border/50 rounded-[2rem] p-8 shadow-sm h-fit">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                From Pincode
              </Label>
              <Input
                placeholder="110001"
                value={fromPin}
                onChange={(e) => setFromPin(e.target.value)}
                className="h-12 rounded-xl border-2 focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                To Pincode
              </Label>
              <Input
                placeholder="800001"
                value={toPin}
                onChange={(e) => setToPin(e.target.value)}
                className="h-12 rounded-xl border-2 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                Weight (Grams)
              </Label>
              <Input
                type="number"
                placeholder="500"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="h-12 rounded-xl border-2 focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                Service Type
              </Label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger className="h-12 rounded-xl border-2">
                  <SelectValue placeholder="All Services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="speed_post">Speed Post</SelectItem>
                  <SelectItem value="express_parcel">Express Parcel</SelectItem>
                  <SelectItem value="registered_post">
                    Registered Post
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleCalculate}
            disabled={isLoading}
            className="w-full h-14 rounded-2xl font-black italic uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all active:scale-95 gap-2"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <CalcIcon size={20} />
            )}
            Estimate Shipping Cost
          </Button>
        </div>

        {/* Results Section */}
        <div className="md:col-span-2">
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4 py-20 bg-muted/20 rounded-[2rem] border-2 border-dashed">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Calculating Best Rates...
              </p>
            </div>
          ) : results ? (
            <div className="space-y-4 animate-in zoom-in-95 duration-500">
              <h3 className="font-black italic uppercase tracking-tighter text-lg mb-4 flex items-center gap-2">
                Available <span className="text-primary">Options</span>
              </h3>

              {/* Backend response agar array hai */}
              {(Array.isArray(results) ? results : [results]).map(
                (r: any, idx: number) => {
                  const Icon = getServiceIcon(r.serviceType || "");
                  return (
                    <div
                      key={idx}
                      className="bg-card border-2 border-border/50 rounded-2xl p-5 shadow-sm hover:border-primary/30 transition-all group"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                          <Icon
                            size={24}
                            className="text-primary group-hover:text-white"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-sm uppercase italic text-foreground truncate">
                            {r.serviceType?.replace("_", " ") ||
                              "Standard Delivery"}
                          </p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight flex items-center gap-1">
                            <Clock size={10} /> {r.estimatedDays || "3-5"} Days
                            ETA
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-2xl italic text-primary">
                            ₹{r.totalPrice || r.price}
                          </p>
                          <p className="text-[8px] font-bold text-muted-foreground uppercase">
                            Inc. GST
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full h-10 rounded-xl font-bold uppercase text-[10px] tracking-widest border-2 hover:bg-primary hover:text-white transition-all"
                      >
                        Book This Service{" "}
                        <ArrowRight className="w-3 h-3 ml-2" />
                      </Button>
                    </div>
                  );
                },
              )}

              <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex gap-3">
                <AlertCircle
                  size={16}
                  className="text-primary shrink-0 mt-0.5"
                />
                <p className="text-[9px] font-medium leading-relaxed text-muted-foreground uppercase">
                  Estimates include GST & Fuel Surcharge. Actual weight may
                  differ upon physical verification at counter.
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-10 bg-muted/10 rounded-[2rem] border-2 border-dashed border-border/50 opacity-40">
              <CalcIcon size={48} className="text-muted-foreground mb-4" />
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                Enter shipment details to see available services
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
