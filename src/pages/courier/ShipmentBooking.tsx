import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";
import {
  Badge,
  ChevronRight,
  Loader2,
  MapPin,
  Box,
  ChevronLeft,
  Zap,
  Coins,
  Printer,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBookShipmentMutation } from "@/store/api/shipingApi";
import { useCalculateShippingMutation } from "@/store/api/courierApi";

export default function ShipmentBooking() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [awbData, setAwbData] = useState<any>(null);

  const [bookShipment, { isLoading: isBooking }] = useBookShipmentMutation();
  const [
    calculateShipping,
    { data: calculationResult, isLoading: isCalculating },
  ] = useCalculateShippingMutation();

  const handleNextStep = async (data: any) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    if (step === 2) {
      try {
        const payload = {
          fromPincode: updatedData.fromPincode,
          toPincode: updatedData.toPincode,
          weightGm: Number(updatedData.weightGm),
          serviceType: updatedData.serviceType,
          isCod: false,
          dimensions: updatedData.lengthCm
            ? {
                l: Number(updatedData.lengthCm),
                w: Number(updatedData.widthCm),
                h: Number(updatedData.heightCm),
              }
            : undefined,
        };
        await calculateShipping(payload).unwrap();
        setStep(3);
      } catch (err) {
        apiErrorToastHandler(err);
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleFinalBooking = async () => {
    try {
      const res = await bookShipment(formData).unwrap();
      setAwbData(res);
      setStep(4);
      toast.success("Shipment Booked Successfully!");
    } catch (err) {
      apiErrorToastHandler(err);
    }
  };

  return (
    <div className="container py-10 max-w-5xl mx-auto space-y-8 animate-in fade-in">
      <div className="min-h-[500px]">
        {step === 1 && (
          <AddressForm onNext={handleNextStep} defaultValues={formData} />
        )}
        {step === 2 && (
          <ArticleDetails
            onNext={handleNextStep}
            onBack={() => setStep(1)}
            defaultValues={formData}
          />
        )}
        {step === 3 && (
          <ServiceSelection
            onConfirm={handleFinalBooking}
            onBack={() => setStep(2)}
            isLoading={isBooking}
            isCalculating={isCalculating}
            result={calculationResult}
            formData={formData}
          />
        )}
        {step === 4 && awbData && <EReceipt data={awbData} />}
      </div>
    </div>
  );
}

// --- 🏠 STEP 1: Address Details ---
function AddressForm({ onNext, defaultValues }: any) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onNext(Object.fromEntries(fd));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid md:grid-cols-2 gap-8 animate-in slide-in-from-right"
    >
      <Card className="border-2 rounded-md shadow-sm overflow-hidden bg-card border-border/50">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-sm flex items-center gap-2 italic uppercase font-black text-white">
            <MapPin className="text-primary w-4 h-4" /> Pickup Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <Input
            name="senderName"
            defaultValue={defaultValues.senderName}
            placeholder="Sender Name"
            required
            className="h-12 border-2 bg-background"
          />
          <Input
            name="fromPincode"
            maxLength={6}
            defaultValue={defaultValues.fromPincode}
            placeholder="Pickup Pincode"
            required
            className="h-12 border-2 font-mono bg-background"
          />
          <Textarea
            name="senderAddress"
            defaultValue={defaultValues.senderAddress}
            placeholder="Full Pickup Address"
            required
            className="min-h-[100px] border-2 rounded-xl bg-background"
          />
        </CardContent>
      </Card>

      <Card className="border-2 rounded-md shadow-sm overflow-hidden bg-card border-border/50">
        <CardHeader className="bg-destructive/5 border-b border-destructive/10">
          <CardTitle className="text-sm flex items-center gap-2 italic uppercase font-black text-destructive">
            <MapPin className="w-4 h-4" /> Destination Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <Input
            name="receiverName"
            defaultValue={defaultValues.receiverName}
            placeholder="Receiver Name"
            required
            className="h-12 border-2 bg-background"
          />
          <Input
            name="toPincode"
            maxLength={6}
            defaultValue={defaultValues.toPincode}
            placeholder="Delivery Pincode"
            required
            className="h-12 border-2 font-mono bg-background"
          />
          <Textarea
            name="receiverAddress"
            defaultValue={defaultValues.receiverAddress}
            placeholder="Complete Delivery Address"
            required
            className="min-h-[100px] border-2 rounded-xl bg-background"
          />
        </CardContent>
      </Card>

      <div className="md:col-span-2">
        <Button
          type="submit"
          className="w-full h-14 rounded-md font-black uppercase tracking-widest shadow-xl bg-primary text-primary-foreground"
        >
          Continue to Shipment Info <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </form>
  );
}

// --- 📦 STEP 2: Article Details (Dropdown Added) ---
function ArticleDetails({ onNext, onBack, defaultValues }: any) {
  const [showDim, setShowDim] = useState(false);
  const [serviceType, setServiceType] = useState(
    defaultValues.serviceType || "speed_post",
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd);
    onNext({ ...data, serviceType }); // Explicitly include serviceType
  };

  return (
    <Card className="border-2 rounded-[2.5rem] shadow-xl max-w-2xl mx-auto animate-in zoom-in-95 bg-card border-border/50">
      <CardHeader className="bg-muted/30 border-b p-8">
        <CardTitle className="text-2xl font-black italic uppercase flex items-center gap-3 text-white">
          <Box className="text-primary" /> Shipment Specs
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Type Selection */}
          <div className="space-y-2">
            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
              Select Service Type
            </Label>
            <Select value={serviceType} onValueChange={setServiceType} required>
              <SelectTrigger className="h-14 border-2 rounded-md bg-background text-lg font-bold italic">
                <SelectValue placeholder="Choose Service" />
              </SelectTrigger>
              <SelectContent className="bg-card border-2">
                <SelectItem value="speed_post" className="font-bold">
                  Speed Post (Fastest)
                </SelectItem>
                <SelectItem value="express_parcel" className="font-bold">
                  Express Parcel
                </SelectItem>
                <SelectItem value="registered_post" className="font-bold">
                  Registered Post
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
              Actual Weight (Grams)
            </Label>
            <div className="relative">
              <Input
                name="weightGm"
                type="number"
                min={1}
                defaultValue={defaultValues.weightGm}
                placeholder="e.g. 500"
                required
                className="h-16 text-3xl font-black italic border-2 rounded-md px-6 bg-background text-white focus-visible:ring-primary"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-xs opacity-40 text-white">
                GRAMS
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-6 rounded-md bg-muted/20 border-2 border-dashed border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary font-bold text-xs italic">
                DIM
              </div>
              <div>
                <p className="font-bold text-sm uppercase italic text-white">
                  Add Dimensions
                </p>
              </div>
            </div>
            <Switch checked={showDim} onCheckedChange={setShowDim} />
          </div>

          {showDim && (
            <div className="grid grid-cols-3 gap-4 animate-in slide-in-from-top-2">
              {["lengthCm", "widthCm", "heightCm"].map((dim) => (
                <div key={dim} className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-center block text-muted-foreground">
                    {dim.replace("Cm", "")} (CM)
                  </Label>
                  <Input
                    name={dim}
                    type="number"
                    placeholder="0"
                    className="h-12 font-bold text-center border-2 rounded-xl bg-background text-white"
                    required
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="h-14 rounded-md px-8 border-2 text-white"
            >
              <ChevronLeft />
            </Button>
            <Button
              type="submit"
              className="flex-1 h-14 rounded-md font-black uppercase tracking-widest shadow-lg bg-primary text-primary-foreground"
            >
              Calculate Price <ChevronRight className="ml-2" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// --- 💳 STEP 3: Service Selection ---
function ServiceSelection({
  onConfirm,
  onBack,
  isLoading,
  isCalculating,
  result,
  formData,
}: any) {
  if (isCalculating)
    return (
      <div className="py-20 flex flex-col items-center gap-4 animate-pulse">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] italic text-muted-foreground">
          Analyzing Zones & Surcharges...
        </p>
      </div>
    );

  return (
    <div className="grid md:grid-cols-12 gap-8 max-w-6xl mx-auto">
      <div className="md:col-span-7 space-y-6">
        <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4 flex items-center gap-2 text-white">
          Shipping <span className="text-primary">Estimate</span>
        </h3>

        <Card className="border-2 border-primary rounded-md bg-primary/5 overflow-hidden shadow-2xl scale-[1.02]">
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-md bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                  <Zap size={32} />
                </div>
                <div>
                  <h4 className="font-black italic uppercase text-xl text-white">
                    {formData.serviceType?.replace("_", " ")}
                  </h4>
                  <Badge className="bg-primary text-background font-black uppercase italic text-[10px]">
                    {result?.breakdown?.zone}
                  </Badge>
                </div>
              </div>
              <div className="text-right text-white">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                  Est. Delivery
                </p>
                <p className="text-lg font-black italic">
                  {result?.breakdown?.estimatedDays} Working Days
                </p>
              </div>
            </div>

            <div className="space-y-4 bg-background/50 p-6 rounded-md border border-white/10 text-white">
              <div className="flex justify-between text-sm font-bold uppercase tracking-tighter">
                <span className="text-muted-foreground">Base Shipping</span>
                <span>₹{result?.breakdown?.basePrice}</span>
              </div>
              <div className="flex justify-between text-sm font-bold uppercase tracking-tighter">
                <span className="text-muted-foreground">GST (18%)</span>
                <span>₹{result?.breakdown?.gst}</span>
              </div>
              <div className="flex justify-between text-sm font-bold uppercase tracking-tighter">
                <span className="text-muted-foreground">Fuel Surcharge</span>
                <span>₹{result?.breakdown?.fuel}</span>
              </div>
              <Separator className="bg-white/10" />
              <div className="flex justify-between items-center">
                <span className="font-black italic text-lg text-primary uppercase">
                  Total Cost
                </span>
                <span className="text-4xl font-black text-primary italic leading-none">
                  ₹{result?.totalShipping}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-5">
        <Card className="border-2 rounded-md bg-card shadow-2xl sticky top-24 border-border/50 overflow-hidden text-white">
          <CardHeader className="bg-muted/30 border-b p-6">
            <CardTitle className="text-center font-black italic uppercase text-sm tracking-widest">
              Review Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="bg-primary/10 p-5 rounded-md border-2 border-primary/20 flex items-center gap-4">
              <div className="bg-primary/20 p-2 rounded-xl">
                <Coins className="text-primary w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-primary">
                  AngCoins Contribution
                </p>
                <p className="text-lg font-black italic">
                  {result?.angCoinsNeeded} Coins Needed
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                <span>Weight</span>
                <span>{formData.weightGm}g</span>
              </div>
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                <span>Service</span>
                <span className="text-primary">{formData.serviceType}</span>
              </div>
            </div>

            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className="w-full h-16 rounded-md font-black italic uppercase tracking-widest shadow-xl bg-primary text-primary-foreground hover:bg-primary/90 text-lg transition-all active:scale-95"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Confirm & Book Now"
              )}
            </Button>
            <button
              onClick={onBack}
              className="w-full text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary mt-4"
            >
              Edit Details
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// 🔹 E-Receipt Component
function EReceipt({ data }: { data: any }) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="border-4 border-black p-0 bg-white text-black font-mono shadow-2xl overflow-hidden">
        <div className="bg-black text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-black italic tracking-tighter">
            ANG LOGISTICS
          </h2>
          <p className="font-black italic text-lg uppercase border-2 border-white px-3 py-0.5">
            PREPAID
          </p>
        </div>
        <div className="p-10 flex flex-col items-center">
          <p className="text-[10px] font-black opacity-40 mb-1 tracking-widest">
            AWB / TRACKING ID
          </p>
          <p className="text-5xl font-black tracking-widest text-center">
            {data.awbNumber}
          </p>
          <div className="w-full h-24 mt-8 border-2 border-black flex items-center justify-center opacity-30 border-dashed rounded-xl italic font-black">
            |||||||| BARCODE ||||||||
          </div>
        </div>
        <div className="bg-muted p-6 grid grid-cols-3 text-center border-t-2 border-black">
          <div className="border-r border-black/10">
            <p className="text-[10px] font-black uppercase opacity-60">
              Weight
            </p>
            <p className="font-black text-lg">{data.weight}g</p>
          </div>
          <div className="border-r border-black/10">
            <p className="text-[10px] font-black uppercase opacity-60">
              Charge
            </p>
            <p className="font-black text-lg">₹{data.totalAmount}</p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase opacity-60">
              Status
            </p>
            <p className="font-black italic text-lg">BOOKED</p>
          </div>
        </div>
      </Card>
      <Button
        className="w-full h-14 rounded-md gap-2 font-black uppercase tracking-widest bg-primary text-primary-foreground shadow-xl"
        onClick={() => window.print()}
      >
        <Printer size={20} /> Print Shipping Label
      </Button>
    </div>
  );
}
