import { ShieldCheck, CheckCircle2, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PaymentGateway = () => (
  <Card className="border-2 rounded-[2rem] overflow-hidden">
    <CardHeader className="bg-muted/30 border-b">
      <CardTitle className="text-lg font-black uppercase italic flex items-center gap-2">
        <CreditCard className="text-primary" /> Secure Checkout
      </CardTitle>
    </CardHeader>
    <CardContent className="p-10 text-center space-y-6">
      <div className="p-6 bg-primary/5 rounded-[2rem] border-2 border-primary border-dashed flex items-center justify-between group">
        <div className="flex items-center gap-4 text-left">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20">
            <ShieldCheck size={30} />
          </div>
          <div>
            <h4 className="font-black italic uppercase text-base">
              ANG Wallet
            </h4>
            <p className="text-[10px] font-bold text-muted-foreground uppercase">
              Balance: ₹1,19,39,387
            </p>
          </div>
        </div>
        <CheckCircle2 className="text-primary w-8 h-8 fill-primary/10" />
      </div>
    </CardContent>
  </Card>
);
