import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  IndianRupee,
  Clock,
  ChevronRight,
  Search,
  Download,
  Share2,
  Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// --- Types & Interfaces ---
interface Associate {
  id: string;
  name: string;
  role: string;
  city: string;
}

type Step = "recent" | "pay" | "success";

// --- Mock Data ---
const MOCK_ASSOCIATES: Record<string, Associate> = {
  ANG101: {
    id: "ANG101",
    name: "Rohit Kumar",
    role: "Senior Associate",
    city: "Patna",
  },
  ANG102: {
    id: "ANG102",
    name: "Aman Singh",
    role: "Developer",
    city: "Noida",
  },
  ANG105: {
    id: "ANG105",
    name: "Priya Sharma",
    role: "Manager",
    city: "Delhi",
  },
};

export default function AssociatePayPage() {
  const [memberId, setMemberId] = useState<string>("");
  const [associate, setAssociate] = useState<Associate | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [step, setStep] = useState<Step>("recent");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const recentList = useMemo(() => Object.values(MOCK_ASSOCIATES), []);

  const handleVerify = (idToVerify?: string) => {
    const id = (idToVerify || memberId).toUpperCase();
    const found = MOCK_ASSOCIATES[id];
    if (found) {
      setAssociate(found);
      setStep("pay");
    } else {
      alert("Invalid Member ID");
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
    }, 2000);
  };

  const reset = () => {
    setAssociate(null);
    setMemberId("");
    setAmount("");
    setStep("recent");
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto h-screen flex flex-col lg:flex-row">
        {/* --- LEFT SIDE: RECENT & SEARCH (Sidebar) --- */}
        <div
          className={cn(
            "lg:w-[380px] w-full border-r border-border bg-card/30 flex flex-col transition-all shrink-0",
            step !== "recent" ? "hidden lg:flex" : "flex",
          )}
        >
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold tracking-tight">
                ANG <span className="text-primary">Pay</span>
              </h1>
              {/* <Button
                variant="outline"
                size="icon"
                className="rounded-xl h-9 w-9"
              >
                <UserPlus size={16} />
              </Button> */}
            </div>

            <div className="space-y-3">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
                <Input
                  placeholder="Enter Member ID"
                  className="h-11 pl-11 rounded-xl bg-background border-border font-medium uppercase"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                />
              </div>
              <Button
                onClick={() => handleVerify()}
                className="w-full rounded-xl font-bold uppercase text-[11px] tracking-wider"
                disabled={!memberId}
              >
                Verify Associate
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-2">
            <div className="px-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              <Clock size={12} /> Recent Payments
            </div>

            {recentList.map((item) => (
              <button
                key={item.id}
                onClick={() => handleVerify(item.id)}
                className="w-full group flex items-center gap-4 p-4 rounded-xl hover:bg-accent transition-all text-left border border-transparent hover:border-border"
              >
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarFallback className="bg-muted text-muted-foreground font-bold uppercase text-xs">
                    {item.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-bold text-sm flex items-center gap-1">
                    {item.name}{" "}
                    <CheckCircle2 size={12} className="text-blue-500" />
                  </p>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                    {item.id}
                  </p>
                </div>
                <ChevronRight
                  size={14}
                  className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-all"
                />
              </button>
            ))}
          </div>
        </div>

        {/* --- RIGHT SIDE: PAYMENT & SUCCESS AREA --- */}
        <div
          className={cn(
            "flex-1 flex items-center justify-center p-6 relative bg-background",
            step === "recent" ? "hidden lg:flex" : "flex",
          )}
        >
          <AnimatePresence mode="wait">
            {step === "pay" && associate && (
              <motion.div
                key="pay-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-card rounded-2xl p-8 shadow-xl border border-border relative"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={reset}
                  className="absolute top-4 left-4 h-8 w-8 rounded-full lg:hidden"
                >
                  <ArrowLeft size={18} />
                </Button>

                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="space-y-3 pt-4">
                    <Avatar className="h-20 w-20 border-2 border-primary/20 shadow-md mx-auto">
                      <AvatarFallback className="bg-primary/5 text-primary font-bold text-2xl uppercase">
                        {associate.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h2 className="text-2xl font-bold tracking-tight">
                        {associate.name}
                      </h2>
                      <p className="text-[11px] font-semibold text-primary uppercase tracking-widest">
                        {associate.id} • {associate.role}
                      </p>
                    </div>
                  </div>

                  <div className="w-full space-y-6">
                    <div className="relative h-20 bg-muted/30 rounded-xl flex items-center justify-center px-6 border border-border">
                      <IndianRupee
                        className="text-muted-foreground shrink-0"
                        size={24}
                      />
                      <input
                        type="number"
                        placeholder="0"
                        autoFocus
                        className="w-full bg-transparent border-none text-4xl font-bold text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                    <Button
                      onClick={handlePayment}
                      disabled={!amount || isProcessing}
                      className="w-full h-14 rounded-xl font-bold uppercase tracking-wider text-xs"
                    >
                      {isProcessing
                        ? "Processing..."
                        : `Securely Pay ₹${amount}`}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === "success" && associate && (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-card rounded-3xl p-8 shadow-2xl text-center space-y-6 border-t-[6px] border-green-500"
              >
                <div className="space-y-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/20"
                  >
                    <CheckCircle2 size={32} className="text-white" />
                  </motion.div>
                  <h2 className="text-xl font-bold uppercase tracking-tight">
                    Payment Successful
                  </h2>
                  <p className="text-4xl font-black">₹{amount}</p>
                </div>

                <div className="bg-muted/30 rounded-xl p-5 space-y-3 text-left border border-border">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                    <span className="text-muted-foreground">To</span>
                    <span>{associate.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                    <span className="text-muted-foreground">ID</span>
                    <span>{associate.id}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                    <span className="text-muted-foreground">Time</span>
                    <span>{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="rounded-xl h-11 text-[10px] font-bold uppercase"
                  >
                    <Download size={14} className="mr-2" /> Receipt
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-xl h-11 text-[10px] font-bold uppercase"
                  >
                    <Share2 size={14} className="mr-2" /> Share
                  </Button>
                </div>
                <Button
                  onClick={reset}
                  className="w-full h-12 rounded-xl h-11 text-[10px] font-bold uppercase tracking-widest"
                >
                  <Home size={14} className="mr-2" /> Done
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
