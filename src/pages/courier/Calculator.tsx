import { useState } from "react";
import {
  Calculator as CalcIcon,
  ArrowRight,
  Package,
  Zap,
  Clock,
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

interface RateResult {
  service: string;
  price: number;
  eta: string;
  icon: typeof Zap;
}

export default function CalculatorPage() {
  const [fromPin, setFromPin] = useState("");
  const [toPin, setToPin] = useState("");
  const [weight, setWeight] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [results, setResults] = useState<RateResult[] | null>(null);

  const handleCalculate = () => {
    if (!fromPin || !toPin || !weight) return;
    setResults([
      { service: "Speed Post", price: 85, eta: "1-2 days", icon: Zap },
      { service: "Express Parcel", price: 62, eta: "2-3 days", icon: Package },
      { service: "Registered Post", price: 35, eta: "4-6 days", icon: Clock },
    ]);
  };

  console.log(serviceType);

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Rate Calculator
          </h1>
          <p className="text-muted-foreground">
            Calculate postage and compare delivery options
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Form */}
          <div className="md:col-span-3 bg-card border border-border rounded-lg p-6 shadow-card animate-fade-in">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label className="text-xs text-muted-foreground mb-1">
                  From Pincode
                </Label>
                <Input
                  placeholder="110001"
                  value={fromPin}
                  onChange={(e) => setFromPin(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1">
                  To Pincode
                </Label>
                <Input
                  placeholder="302001"
                  value={toPin}
                  onChange={(e) => setToPin(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label className="text-xs text-muted-foreground mb-1">
                  Weight (grams)
                </Label>
                <Input
                  type="number"
                  placeholder="500"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1">
                  Service Type
                </Label>
                <Select onValueChange={setServiceType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Services" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    <SelectItem value="speed">Speed Post</SelectItem>
                    <SelectItem value="express">Express Parcel</SelectItem>
                    <SelectItem value="registered">Registered Post</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleCalculate}
              className="w-full h-12 gradient-hero text-primary-foreground hover:opacity-90"
            >
              <CalcIcon className="w-4 h-4 mr-2" /> Calculate Rate
            </Button>
          </div>

          {/* Results */}
          <div className="md:col-span-2">
            {results ? (
              <div className="space-y-4 animate-fade-in">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Compare Services
                </h3>
                {results.map((r) => (
                  <div
                    key={r.service}
                    className="bg-card border border-border rounded-lg p-4 shadow-card hover:shadow-elevated transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <r.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-foreground">
                          {r.service}
                        </p>
                        <p className="text-xs text-muted-foreground">{r.eta}</p>
                      </div>
                      <p className="font-display text-xl font-bold text-primary">
                        ₹{r.price}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                    >
                      Book Now <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                ))}
                <p className="text-[10px] text-muted-foreground text-center">
                  * Prices are estimates. GST extra.
                </p>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center p-8">
                <div>
                  <CalcIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Enter details to see rates
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
