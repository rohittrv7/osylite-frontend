import type { CurrencyType } from "@/pages/wallet/Withdraw";

export interface WalletBalance {
  angCoins: number;
  withdrawableAmount: number;
  currency: string;
  hasPendingRecharge: true;
  hasPendingRedemption: false;
}

export interface Plan {
  id: string;
  name: string;
  coins: number;
  priceINR: number;
  isPopular?: boolean;
}

export interface BankAccount {
  id: string;
  holderName: string;
  accountNumber: string;
  ifsc: string;
  bankName: string;
}

export interface Transaction {
  id: string;
  type: "credit" | "debit";
  description: string;
  amount: number;
  unit: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

// DTOs for Mutations
export interface AddBankAccountDto {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
}

export interface RequestRedemptionDto {
  angCoins: number;
  currency: CurrencyType;
  bankAccountId: string;
}

export interface AdminQrResponse {
  upiId: string;
  qrCodeUrl?: string;
}
