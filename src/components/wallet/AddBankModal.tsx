import { useState } from "react";
import { toast } from "sonner";
import { useAddBankAccountMutation } from "@/store/api/walletApi";
import { Loader2 } from "lucide-react";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";

interface AddBankModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddBankModal = ({ open, onClose }: AddBankModalProps) => {
  const [form, setForm] = useState({
    holderName: "",
    accountNumber: "",
    confirmAccount: "",
    ifsc: "",
    bankName: "",
  });

  const [addBank, { isLoading }] = useAddBankAccountMutation();

  if (!open) return null;

  const handleSubmit = async () => {
    if (
      !form.holderName ||
      !form.accountNumber ||
      !form.ifsc ||
      !form.bankName
    ) {
      toast.error("Please fill all fields");
      return;
    }
    if (form.accountNumber !== form.confirmAccount) {
      toast.error("Account numbers don't match");
      return;
    }

    try {
      await addBank({
        accountHolderName: form.holderName,
        accountNumber: form.accountNumber,
        ifscCode: form.ifsc,
        bankName: form.bankName,
      }).unwrap();

      toast.success("Bank account added!");
      setForm({
        holderName: "",
        accountNumber: "",
        confirmAccount: "",
        ifsc: "",
        bankName: "",
      });
      onClose();
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md mx-4 mb-4 sm:mb-0 glass-card rounded-2xl p-6 space-y-4 animate-slide-up">
        <h2 className="text-lg font-display font-bold">Add Bank Account</h2>
        {(
          [
            "holderName",
            "accountNumber",
            "confirmAccount",
            "ifsc",
            "bankName",
          ] as const
        ).map((field) => (
          <div key={field}>
            <label className="text-xs text-muted-foreground mb-1 block capitalize">
              {field === "confirmAccount"
                ? "Confirm Account Number"
                : field.replace(/([A-Z])/g, " $1").trim()}
            </label>
            <input
              type="text"
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
        ))}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 cursor-pointer py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 cursor-pointer border py-2.5 rounded-xl gradient-coin text-background bg-foreground text-sm font-semibold flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Add Account
          </button>
        </div>
      </div>
    </div>
  );
};
