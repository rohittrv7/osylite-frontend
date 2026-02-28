import { useState } from "react";
import {
  Search,
  Download,
  Receipt,
  Package,
  MapPin,
  Printer,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";
import { toast } from "sonner";
import { useLazyDownloadReceiptQuery } from "@/store/api/courierApi";
import { cn } from "@/lib/utils";

export default function ReceiptPage() {
  const [awbInput, setAwbInput] = useState("");
  
  // 🔹 RTK Query Lazy Trigger
  const [triggerFetch, { data: receipt, isFetching, isError }] = useLazyDownloadReceiptQuery();

  const handleSearch = async () => {
    if (!awbInput.trim()) return toast.error("Please enter an AWB number");
    try {
      await triggerFetch(awbInput).unwrap();
    } catch (err) {
      apiErrorToastHandler(err);
    }
  };

  const handleDownload = () => {
    if (receipt?.downloadUrl) {
      window.open(receipt.downloadUrl, "_blank"); // 🔹 Open real Cloudinary/S3 PDF
    }
  };

  return (
    <div className="container py-10 max-w-3xl mx-auto px-4 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 border-2 border-primary/20 shadow-xl">
          <Receipt className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
          e-<span className="text-primary">Receipt</span>
        </h1>
        <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-2 opacity-70">
          Access your digital shipment records
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2 max-w-md mx-auto mb-12 p-2 bg-card border-2 border-border/50 rounded-2xl shadow-2xl">
        <Input
          placeholder="Enter AWB Number (e.g. ANG69458515)"
          value={awbInput}
          onChange={(e) => setAwbInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="h-12 border-none bg-transparent font-mono text-white focus-visible:ring-0"
        />
        <Button
          onClick={handleSearch}
          disabled={isFetching}
          className="h-12 px-8 rounded-xl font-black uppercase italic tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isFetching ? <Loader2 className="animate-spin" /> : <Search className="w-5 h-5" />}
        </Button>
      </div>

      {/* 🧾 Professional Receipt Visual */}
      {receipt && (
        <Card className="border-2 border-primary/30 shadow-2xl animate-in zoom-in-95 bg-card overflow-hidden rounded-[2rem]">
          <CardHeader className="bg-primary/5 border-b border-primary/10 pb-6 pt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-black italic uppercase text-white tracking-tight">
                    ANG <span className="text-primary">Logistics</span>
                  </CardTitle>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                    Department of Operations
                  </p>
                </div>
              </div>
              <Badge className="bg-green-500/10 text-green-500 border-green-500/20 font-black italic uppercase text-[10px] px-4 py-1">
                Verified Receipt
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Tracking ID</span>
                <p className="text-2xl font-black text-white font-mono tracking-tighter">{receipt.awbNumber}</p>
              </div>
              <div className="text-right space-y-1">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Print Status</span>
                <p className="font-bold text-primary italic uppercase">Digital Copy Ready</p>
              </div>
            </div>

            <Separator className="border-dashed opacity-20" />

            {/* Address Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-muted/10 rounded-2xl p-5 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-primary/10 rounded-lg"><MapPin className="w-4 h-4 text-primary" /></div>
                  <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Sender</span>
                </div>
                <p className="font-black italic text-white uppercase">{receipt.sender}</p>
              </div>
              <div className="bg-muted/10 rounded-2xl p-5 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-green-500/10 rounded-lg"><MapPin className="w-4 h-4 text-green-500" /></div>
                  <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Receiver</span>
                </div>
                <p className="font-black italic text-white uppercase">{receipt.receiver}</p>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-2xl border-2 border-dashed border-primary/20 flex items-center justify-between">
               <div>
                  <p className="text-[10px] font-black uppercase text-primary tracking-widest">Document Format</p>
                  <p className="text-sm font-bold text-white uppercase">A4 Shipping Label (PDF)</p>
               </div>
               <ExternalLink className="text-primary w-5 h-5 opacity-50" />
            </div>

            {/* Final Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={handleDownload}
                className="flex-1 h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95 gap-2"
              >
                <Download size={20} /> Download PDF
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.print()}
                className="flex-1 h-14 rounded-2xl border-2 font-black uppercase tracking-widest gap-2 hover:bg-primary/5 transition-all"
              >
                <Printer size={20} /> Print Label
              </Button>
            </div>

            <p className="text-[9px] text-center text-muted-foreground font-medium uppercase tracking-[0.2em] opacity-50 mt-4">
                © 2026 ANG Network Operations Team
            </p>
          </CardContent>
        </Card>
      )}

      {/* Error / Empty State */}
      {!receipt && !isFetching && awbInput && isError && (
        <div className="text-center py-20 opacity-50">
            <Receipt size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="font-black italic uppercase text-xs tracking-widest">No matching records found</p>
        </div>
      )}
    </div>
  );
}

// 🔹 Badge Helper (Agar aapka component library provide nahi karta toh)
function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
    return <span className={cn("rounded-md font-semibold tracking-tight", className)}>{children}</span>;
}