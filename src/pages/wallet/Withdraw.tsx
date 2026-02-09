import { useState } from "react";
import { ArrowLeft, AlertCircle, Loader2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AddBankModal } from "@/components/wallet/AddBankModal";
import { toast } from "sonner";
import {
  useGetWalletBalanceQuery,
  useGetBankAccountsQuery,
  useRedeemCoinsMutation,
} from "@/store/api/walletApi";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";

const CurrencyType = {
  INR: "INR",
  USD: "USD",
  RUB: "RUB",
  CNY: "CNY",
  GOLD: "GOLD",
};

export type CurrencyType = (typeof CurrencyType)[keyof typeof CurrencyType];

// Constant or fetch from API config
const COIN_TO_INR_RATE = 2;

const Withdraw = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [showAddBank, setShowAddBank] = useState(false);
  // const [submitted, setSubmitted] = useState(false);

  // RTK Queries
  const { data: balanceData, isLoading: isBalanceLoading } =
    useGetWalletBalanceQuery();
  const { data: bankAccounts = [], isLoading: isBanksLoading } =
    useGetBankAccountsQuery();
  const [redeemCoins, { isLoading: isSubmitting }] = useRedeemCoinsMutation();

  const currentCoins = balanceData?.angCoins || 0;
  const coinAmount = Number(coins) || 0;
  const inrAmount = coinAmount * COIN_TO_INR_RATE;
  const insufficient = coinAmount > currentCoins;

  const handleSubmit = async () => {
    if (coinAmount <= 0) {
      toast.error("Enter valid coin amount");
      return;
    }
    if (insufficient) {
      toast.error("Insufficient balance");
      return;
    }
    if (!selectedBank) {
      toast.error("Select a bank account");
      return;
    }

    try {
      await redeemCoins({
        angCoins: coinAmount,
        currency: CurrencyType.INR,
        bankAccountId: selectedBank,
      }).unwrap();
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };

  // 1. Loading State
  if (isBalanceLoading || isBanksLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // 2. CHECK: If a redemption request is already pending, block the form
  if (balanceData?.hasPendingRedemption) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-4 animate-slide-up">
          <div className="w-16 h-16 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center">
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
          <h2 className="text-xl font-display font-bold">Request Pending</h2>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            You already have a withdrawal request in process. Please wait for it
            to be approved or rejected before making another one.
          </p>
          <button
            onClick={() => navigate("/wallet")}
            className="px-6 cursor-pointer border py-3 rounded-xl gradient-gold text-accent-foreground font-semibold"
          >
            Back to Wallet
          </button>
        </div>
      </div>
    );
  }

  // 3. Success State (After submitting a new request)
  // if (submitted) {
  //   return (
  //     <div className="min-h-screen bg-background flex items-center justify-center px-4">
  //       <div className="text-center space-y-4 animate-slide-up">
  //         <div className="w-16 h-16 mx-auto rounded-full bg-success/20 flex items-center justify-center">
  //           <span className="text-2xl">✓</span>
  //         </div>
  //         <h2 className="text-xl font-display font-bold">
  //           Withdrawal Requested!
  //         </h2>
  //         <p className="text-sm text-muted-foreground">
  //           {coinAmount} coins deducted. ₹{inrAmount} will be sent to your bank
  //           within 48 hours.
  //         </p>
  //         <button
  //           onClick={() => navigate("/wallet")}
  //           className="px-6 py-3 cursor-pointer border rounded-xl gradient-gold text-accent-foreground font-semibold"
  //         >
  //           Back to Wallet
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  // 4. Main Form (Only shown if hasPendingRedemption is false)
  return (
    <div className="min-h-screen bg-background px-6">
      <div className="mx-auto px-4 py-6 space-y-6 animate-slide-up">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/wallet")}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-display font-bold">Withdraw Money</h1>
        </div>

        {/* Balance */}
        <div className="glass-card rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Available Balance
          </span>
          <span className="text-lg font-display font-bold text-gradient-coin">
            {currentCoins} Coins
          </span>
        </div>

        {/* Input */}
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">
            Coins to Withdraw
          </label>
          <input
            type="number"
            min="1"
            placeholder="Enter coins"
            value={coins}
            onChange={(e) => setCoins(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {coinAmount > 0 && (
            <p className="text-sm mt-2">
              You will receive:{" "}
              <strong className="text-gradient-gold">₹{inrAmount}</strong>
            </p>
          )}
          {insufficient && (
            <p className="text-xs text-destructive mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> Insufficient balance
            </p>
          )}
        </div>

        {/* Bank Selection */}
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">
            Select Bank Account
          </label>
          <div className="space-y-2">
            {bankAccounts.map((bank) => (
              <button
                key={bank.id}
                onClick={() => setSelectedBank(bank.id)}
                className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                  selectedBank === bank.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <p className="text-sm font-medium">{bank.bankName}</p>
                <p className="text-xs text-muted-foreground">
                  {bank.accountNumber} • {bank.ifsc}
                </p>
              </button>
            ))}
            <button
              onClick={() => setShowAddBank(true)}
              className="w-full cursor-pointer p-3 rounded-xl border-2 border-dashed border-border hover:border-primary/50 text-sm text-muted-foreground transition-colors"
            >
              + Add New Bank Account
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={
            coinAmount <= 0 || insufficient || !selectedBank || isSubmitting
          }
          className="w-full cursor-pointer py-3 rounded-xl gradient-gold text-accent-foreground font-semibold disabled:opacity-40 transition-opacity flex items-center justify-center gap-2"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Request Withdrawal
        </button>

        <AddBankModal
          open={showAddBank}
          onClose={() => setShowAddBank(false)}
        />
      </div>
    </div>
  );
};

export default Withdraw;
