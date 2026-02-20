import { useState } from "react";
import {
  Search,
  Download,
  Share2,
  QrCode,
  Receipt,
  Package,
  MapPin,
  IndianRupee,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const mockReceipt = {
  receiptNo: "ANG-2026-00451289",
  date: "18 Feb 2026, 03:42 PM",
  service: "Speed Post",
  consignment: "EE123456789IN",
  sender: {
    name: "Rajesh Kumar",
    address: "42, MG Road, Sector 15, Noida, UP - 201301",
    phone: "+91 98765 43210",
  },
  receiver: {
    name: "Priya Sharma",
    address: "B-12, Koramangala 4th Block, Bengaluru, KA - 560034",
    phone: "+91 87654 32109",
  },
  weight: "1.2 kg",
  dimensions: "25 × 18 × 10 cm",
  charges: {
    base: 85,
    speedSurcharge: 40,
    insurance: 20,
    gst: 26.1,
    total: 171.1,
  },
  payment: "UPI (PhonePe)",
  status: "Booked",
};

export default function ReceiptPage() {
  const [receiptId, setReceiptId] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);

  const handleSearch = () => {
    if (receiptId.trim()) setShowReceipt(true);
  };

  return (
    <div className="container py-10 max-w-3xl">
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-3">
          <Receipt className="w-7 h-7 text-accent" />
        </div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          e-Receipt
        </h1>
        <p className="text-muted-foreground mt-1">
          Download or share your digital transaction receipt
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-2 max-w-md mx-auto mb-10">
        <Input
          placeholder="Enter Receipt or Consignment No."
          value={receiptId}
          onChange={(e) => setReceiptId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="h-12"
        />
        <Button
          onClick={handleSearch}
          className="h-12 px-6 gradient-hero text-primary-foreground"
        >
          <Search className="w-4 h-4 mr-2" /> Find
        </Button>
      </div>

      {/* Receipt Card */}
      {showReceipt && (
        <Card className="border-2 border-dashed border-primary/30 shadow-elevated animate-fade-in">
          {/* Receipt Header */}
          <CardHeader className="bg-secondary text-primary-foreground rounded-t-lg pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-lg text-primary-foreground">
                    ANG Post
                  </CardTitle>
                  <p className="text-xs text-secondary-foreground/70">
                    Department of Posts
                  </p>
                </div>
              </div>
              <span className="text-xs bg-success/20 text-success px-3 py-1 rounded-full font-semibold border border-success/30">
                {mockReceipt.status}
              </span>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-5">
            {/* Receipt Meta */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground text-xs">
                  Receipt No.
                </span>
                <p className="font-semibold text-foreground">
                  {mockReceipt.receiptNo}
                </p>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground text-xs">
                  Date & Time
                </span>
                <p className="font-semibold text-foreground">
                  {mockReceipt.date}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground text-xs">
                  Consignment No.
                </span>
                <p className="font-semibold text-primary">
                  {mockReceipt.consignment}
                </p>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground text-xs">Service</span>
                <p className="font-semibold text-foreground">
                  {mockReceipt.service}
                </p>
              </div>
            </div>

            <Separator className="border-dashed" />

            {/* Sender / Receiver */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Sender
                  </span>
                </div>
                <p className="font-semibold text-foreground text-sm">
                  {mockReceipt.sender.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {mockReceipt.sender.address}
                </p>
                <p className="text-xs text-muted-foreground">
                  {mockReceipt.sender.phone}
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-info" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Receiver
                  </span>
                </div>
                <p className="font-semibold text-foreground text-sm">
                  {mockReceipt.receiver.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {mockReceipt.receiver.address}
                </p>
                <p className="text-xs text-muted-foreground">
                  {mockReceipt.receiver.phone}
                </p>
              </div>
            </div>

            <Separator className="border-dashed" />

            {/* Parcel Details */}
            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="text-muted-foreground text-xs">Weight</span>
                <p className="font-semibold text-foreground">
                  {mockReceipt.weight}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground text-xs">
                  Dimensions
                </span>
                <p className="font-semibold text-foreground">
                  {mockReceipt.dimensions}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground text-xs">Payment</span>
                <p className="font-semibold text-foreground">
                  {mockReceipt.payment}
                </p>
              </div>
            </div>

            <Separator className="border-dashed" />

            {/* Charges Breakdown */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <IndianRupee className="w-4 h-4" /> Charges Breakdown
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Postage</span>
                  <span className="text-foreground">
                    ₹{mockReceipt.charges.base.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Speed Post Surcharge
                  </span>
                  <span className="text-foreground">
                    ₹{mockReceipt.charges.speedSurcharge.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Insurance</span>
                  <span className="text-foreground">
                    ₹{mockReceipt.charges.insurance.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span className="text-foreground">
                    ₹{mockReceipt.charges.gst.toFixed(2)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-base">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">
                    ₹{mockReceipt.charges.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <Separator className="border-dashed" />

            {/* QR Code */}
            <div className="flex items-center justify-center py-4">
              <div className="text-center">
                <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center mx-auto border-2 border-dashed border-border">
                  <QrCode className="w-20 h-20 text-muted-foreground/60" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Scan at any ANG Post branch
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1 gradient-hero text-primary-foreground h-12">
                <Download className="w-4 h-4 mr-2" /> Download PDF
              </Button>
              <Button variant="outline" className="flex-1 h-12">
                <Printer className="w-4 h-4 mr-2" /> Print
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-12 border-success text-success hover:bg-success/10"
              >
                <Share2 className="w-4 h-4 mr-2" /> Share via WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
