import {
  Coins,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Loader2,
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  useGetWalletBalanceQuery,
  useGetTransactionHistoryQuery,
} from "@/store/api/walletApi";

// Shadcn UI Imports
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const WalletHome = () => {
  const navigate = useNavigate();

  const { data: balanceData, isLoading: isBalanceLoading } =
    useGetWalletBalanceQuery();
  const { data: transactions, isLoading: isHistoryLoading } =
    useGetTransactionHistoryQuery();

  const recentTx = transactions?.slice(0, 5) || [];

  if (isBalanceLoading || isHistoryLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="w-3 h-3 text-green-600" />;
      case "rejected":
        return <XCircle className="w-3 h-3 text-red-600" />;
      default:
        return <Clock className="w-3 h-3 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 hover:bg-green-100 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 hover:bg-red-100 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200";
    }
  };

  return (
    <div className="bg-background p-5">
      {/* Top Header Section */}
      <div className="bg-primary/5 pb-8 pt-6 px-4 rounded-b-3xl">
        <div className="mx-auto space-y-6">
          {/* Nav Header */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/settings")}
              className="rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-display font-bold">My Wallet</h1>
          </div>

          {/* Balance Cards Slider / Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Coins Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
              <CardContent className="p-5 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                    <Coins className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                    Ang Coins
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-white/80 font-medium">
                    Available Balance
                  </p>
                  <h2 className="text-3xl font-bold tracking-tight">
                    {balanceData?.angCoins || 0}
                  </h2>
                </div>
                <Button
                  onClick={() => navigate("/buy-coins")}
                  className="w-full mt-4 cursor-pointer bg-white text-purple-600 hover:bg-white/90 font-semibold shadow-sm"
                  size="sm"
                >
                  + Buy Coins
                </Button>
              </CardContent>
            </Card>

            {/* Cash Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
              <CardContent className="p-5 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                    <Wallet className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                    Cash
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-white/80 font-medium">
                    Withdrawable
                  </p>
                  <h2 className="text-3xl font-bold tracking-tight">
                    ₹{balanceData?.withdrawableAmount || 0}
                  </h2>
                </div>
                <Button
                  onClick={() => navigate("/withdraw")}
                  className="w-full cursor-pointer mt-4 bg-white text-emerald-600 hover:bg-white/90 font-semibold shadow-sm"
                  size="sm"
                >
                  Withdraw Money
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-4">
        {/* Rate Card */}
        <Card className="shadow-sm border-border/50 backdrop-blur-sm bg-background/80 supports-[backdrop-filter]:bg-background/60">
          <CardContent className="p-3 flex justify-center items-center gap-4 text-sm font-medium text-muted-foreground">
            <span className="flex items-center gap-1">
              <Coins className="w-3 h-3 text-yellow-500" /> 1 = ₹2
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-1">
              <Coins className="w-3 h-3 text-yellow-500" /> 10 = $160
            </span>
          </CardContent>
        </Card>

        {/* Transactions Section */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-semibold text-foreground">
              Recent Activity
            </h3>
            <Button
              variant="link"
              className="text-primary h-auto p-0 font-medium"
              onClick={() => navigate("/history")}
            >
              View All
            </Button>
          </div>

          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-0">
              {recentTx.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    <Clock className="w-6 h-6 text-muted-foreground/50" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    No transactions yet
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your recent activity will show up here
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[300px]">
                  <div className="divide-y divide-border/50">
                    {recentTx.map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                              tx.type === "credit"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600",
                            )}
                          >
                            {tx.type === "credit" ? (
                              <ArrowDownLeft className="w-5 h-5" />
                            ) : (
                              <ArrowUpRight className="w-5 h-5" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {tx.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {format(
                                new Date(tx.createdAt),
                                "MMM dd, hh:mm a",
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          <span
                            className={cn(
                              "text-sm font-bold",
                              tx.type === "credit"
                                ? "text-green-600"
                                : "text-red-600",
                            )}
                          >
                            {tx.type === "credit" ? "+" : "-"}
                            {tx.amount}
                          </span>
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-[10px] h-5 px-1.5 font-medium gap-1 uppercase tracking-wider",
                              getStatusColor(tx.status),
                            )}
                          >
                            {getStatusIcon(tx.status)}
                            {tx.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WalletHome;
