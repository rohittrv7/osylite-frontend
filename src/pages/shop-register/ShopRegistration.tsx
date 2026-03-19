import React, { useState } from "react";
import {
  Store,
  FileText,
  MapPin,
  Landmark,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// --- Types ---
type Step = 1 | 2 | 3 | 4 | 5;

const CATEGORIES = [
  "Grocery & Supermarket",
  "Electronics & Appliances",
  "Fashion & Apparel",
  "Food & Restaurant",
  "Health & Pharmacy",
  "Home & Furniture",
  "Other Services",
];

export default function ShopRegistration() {
  const [step, setStep] = useState<Step>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  // --- Form State ---
  const [formData, setFormData] = useState({
    // Step 1
    storeName: "",
    ownerName: "",
    phone: "",
    category: "",
    // Step 2
    panNumber: "",
    gstNumber: "",
    // Step 3
    address: "",
    pincode: "",
    city: "",
    // Step 4
    accountNo: "",
    ifsc: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () =>
    setStep((prev) => (prev < 5 ? ((prev + 1) as Step) : prev));
  const prevStep = () =>
    setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev));

  const handleSubmit = () => {
    setIsProcessing(true);
    // API Call Simulation
    setTimeout(() => {
      // Pure function inside handler, safe from React render warnings
      const newId = `ANG-SHOP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setRegistrationId(newId);
      setIsProcessing(false);
      setStep(5); // Move to success
    }, 1500);
  };

  const isStep1Valid =
    formData.storeName &&
    formData.ownerName &&
    formData.phone &&
    formData.category;
  const isStep2Valid = formData.panNumber; // GST can be optional for some, but let's assume PAN is mandatory
  const isStep3Valid = formData.address && formData.pincode && formData.city;
  const isStep4Valid = formData.accountNo && formData.ifsc;

  return (
    <div className="w-full min-h-screen bg-background flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-3xl space-y-8">
        {/* --- Header & Stepper --- */}
        {step < 5 && (
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm space-y-8">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building2 size={32} className="text-primary" />
              </div>
              <h1 className="text-3xl font-black uppercase tracking-tight">
                Partner Registration
              </h1>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Join the elite merchant network
              </p>
            </div>

            {/* Stepper UI */}
            <div className="flex items-center justify-between relative px-4">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted rounded-full -z-10 px-8">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${((step - 1) / 3) * 100}%` }}
                />
              </div>

              {[
                { num: 1, icon: Store, label: "Profile" },
                { num: 2, icon: FileText, label: "KYC" },
                { num: 3, icon: MapPin, label: "Location" },
                { num: 4, icon: Landmark, label: "Bank" },
              ].map((s) => (
                <div
                  key={s.num}
                  className="flex flex-col items-center gap-2 bg-card px-2"
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center border-4 font-bold transition-colors",
                      step >= s.num
                        ? "border-primary bg-primary text-background"
                        : "border-muted bg-background text-muted-foreground",
                    )}
                  >
                    {step > s.num ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      <s.icon size={20} />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-widest hidden sm:block",
                      step >= s.num
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- Step 1: Store Profile --- */}
        {step === 1 && (
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm space-y-6">
            <h2 className="text-xl font-bold tracking-tight mb-6">
              1. Store Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Store Name
                </label>
                <Input
                  name="storeName"
                  placeholder="E.g. Sharma Electronics"
                  className="h-14 rounded-2xl font-bold bg-background"
                  value={formData.storeName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Business Category
                </label>
                <select
                  name="category"
                  className="w-full h-14 px-4 rounded-2xl bg-background border border-border font-bold appearance-none"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Owner Full Name
                </label>
                <Input
                  name="ownerName"
                  placeholder="E.g. Rahul Sharma"
                  className="h-14 rounded-2xl font-bold bg-background"
                  value={formData.ownerName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Phone Number
                </label>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  className="h-14 rounded-2xl font-bold bg-background"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="pt-6 flex justify-end">
              <Button
                onClick={nextStep}
                disabled={!isStep1Valid}
                className="h-14 px-8 rounded-2xl font-bold uppercase tracking-widest"
              >
                Save & Next <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* --- Step 2: KYC & Business Details --- */}
        {step === 2 && (
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm space-y-6">
            <h2 className="text-xl font-bold tracking-tight mb-6">
              2. Business KYC
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  PAN Number *
                </label>
                <Input
                  name="panNumber"
                  placeholder="ABCDE1234F"
                  className="h-14 rounded-2xl font-bold uppercase bg-background"
                  value={formData.panNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  GSTIN (Optional)
                </label>
                <Input
                  name="gstNumber"
                  placeholder="22ABCDE1234F1Z5"
                  className="h-14 rounded-2xl font-bold uppercase bg-background"
                  value={formData.gstNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 bg-muted/30">
              <Upload size={32} className="text-muted-foreground" />
              <div>
                <p className="font-bold text-sm">Upload Business Proof</p>
                <p className="text-xs font-medium text-muted-foreground">
                  Upload Shop Act, Udyam, or Trade License (PDF/JPG)
                </p>
              </div>
              <Button
                variant="outline"
                className="mt-2 rounded-xl text-xs font-bold uppercase tracking-widest"
              >
                Browse Files
              </Button>
            </div>

            <div className="pt-6 flex justify-between">
              <Button
                variant="ghost"
                onClick={prevStep}
                className="h-14 px-6 rounded-2xl font-bold uppercase tracking-widest hover:bg-muted"
              >
                <ArrowLeft size={18} className="mr-2" /> Back
              </Button>
              <Button
                onClick={nextStep}
                disabled={!isStep2Valid}
                className="h-14 px-8 rounded-2xl font-bold uppercase tracking-widest"
              >
                Save & Next <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* --- Step 3: Location Details --- */}
        {step === 3 && (
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm space-y-6">
            <h2 className="text-xl font-bold tracking-tight mb-6">
              3. Store Location
            </h2>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Complete Shop Address
                </label>
                <textarea
                  name="address"
                  placeholder="Shop No, Building, Street..."
                  className="w-full min-h-[100px] p-4 rounded-2xl bg-background border border-border focus:outline-none focus:border-primary/50 font-bold"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Pincode
                  </label>
                  <Input
                    name="pincode"
                    type="number"
                    placeholder="800001"
                    className="h-14 rounded-2xl font-bold bg-background"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    City
                  </label>
                  <Input
                    name="city"
                    placeholder="Patna"
                    className="h-14 rounded-2xl font-bold bg-background"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-between">
              <Button
                variant="ghost"
                onClick={prevStep}
                className="h-14 px-6 rounded-2xl font-bold uppercase tracking-widest hover:bg-muted"
              >
                <ArrowLeft size={18} className="mr-2" /> Back
              </Button>
              <Button
                onClick={nextStep}
                disabled={!isStep3Valid}
                className="h-14 px-8 rounded-2xl font-bold uppercase tracking-widest"
              >
                Save & Next <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* --- Step 4: Bank Details --- */}
        {step === 4 && (
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm space-y-6">
            <h2 className="text-xl font-bold tracking-tight mb-6">
              4. Bank & Payouts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Account Number
                </label>
                <Input
                  name="accountNo"
                  type="password"
                  placeholder="••••••••1234"
                  className="h-14 rounded-2xl font-bold bg-background"
                  value={formData.accountNo}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Re-enter Account No
                </label>
                <Input
                  placeholder="Enter again to verify"
                  className="h-14 rounded-2xl font-bold bg-background"
                />
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  IFSC Code
                </label>
                <Input
                  name="ifsc"
                  placeholder="SBIN0001234"
                  className="h-14 rounded-2xl font-bold uppercase bg-background"
                  value={formData.ifsc}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-600 dark:text-green-400 bg-green-500/10 py-3 px-4 rounded-xl mt-4">
              <ShieldCheck size={16} /> 100% Encrypted Bank Verification
            </div>

            <div className="pt-6 flex justify-between">
              <Button
                variant="ghost"
                onClick={prevStep}
                className="h-14 px-6 rounded-2xl font-bold uppercase tracking-widest hover:bg-muted"
              >
                <ArrowLeft size={18} className="mr-2" /> Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!isStep4Valid || isProcessing}
                className="h-14 px-8 rounded-2xl bg-slate-900 dark:bg-primary text-white dark:text-black font-bold uppercase tracking-widest"
              >
                {isProcessing ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </div>
        )}

        {/* --- Step 5: Success --- */}
        {step === 5 && (
          <div className="bg-card p-12 rounded-[2.5rem] border-t-8 border-green-500 shadow-2xl text-center space-y-8 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.4)]">
              <CheckCircle2 size={48} className="text-white" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight">
                Application Submitted
              </h2>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Your store is currently under review
              </p>
            </div>

            <div className="bg-muted/30 rounded-2xl p-6 space-y-4 text-left border border-border inline-block min-w-[300px] w-full max-w-md">
              <div className="flex justify-between items-center text-xs font-bold uppercase">
                <span className="text-muted-foreground tracking-widest">
                  Store Name
                </span>
                <span>{formData.storeName}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold uppercase">
                <span className="text-muted-foreground tracking-widest">
                  Category
                </span>
                <span>{formData.category}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold uppercase">
                <span className="text-muted-foreground tracking-widest">
                  App ID
                </span>
                <span className="text-primary">{registrationId}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold uppercase">
                <span className="text-muted-foreground tracking-widest">
                  Status
                </span>
                <span className="text-orange-500">Pending Approval</span>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={() => window.location.reload()}
                className="w-full max-w-md h-14 rounded-xl font-bold uppercase tracking-widest"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
