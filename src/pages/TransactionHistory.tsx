// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
// import { useGetTransactionHistoryQuery } from "@/store/api/authApi";

// export const TransactionHistory = () => {
//   const { data, isLoading, isError } = useGetTransactionHistoryQuery();

//   if (isLoading) {
//     return (
//       <div className="space-y-4">
//         {[...Array(5)].map((_, i) => (
//           <Skeleton key={i} className="h-16 w-full rounded-xl" />
//         ))}
//       </div>
//     );
//   }

//   if (isError) {
//     return <p className="text-destructive">Failed to load history</p>;
//   }

//   return (
//     <div className="p-6">
//       <h1>Transaction History</h1>
//       <Card className="rounded-2xl">
//         <CardContent className="space-y-3">
//           {data && data.length === 0 && (
//             <p className="text-muted-foreground">No transactions found</p>
//           )}

//           {data?.map((tx) => (
//             <div
//               key={tx.id}
//               className="flex items-center justify-between p-4 border rounded-xl"
//             >
//               <div className="flex items-center gap-3">
//                 {tx.type === "credit" ? (
//                   <ArrowDownLeft className="text-green-600" />
//                 ) : (
//                   <ArrowUpRight className="text-red-600" />
//                 )}
//                 <div>
//                   <p className="font-medium">{tx.reason}</p>
//                   <p className="text-sm text-muted-foreground">
//                     {tx.description || "—"}
//                   </p>
//                   <p className="text-xs text-muted-foreground">
//                     {new Date(tx.createdAt).toLocaleString()}
//                   </p>
//                 </div>
//               </div>

//               <div className="text-right">
//                 <p
//                   className={`font-semibold ${
//                     {
//                       credit: "text-green-600",
//                       debit: "text-red-600",
//                     }[tx.type]
//                   }`}
//                 >
//                   {tx.type === "credit" ? "+" : "-"}
//                   {tx.amount} {tx.currency}
//                 </p>
//                 <Badge variant="secondary" className="mt-1">
//                   {tx.type}
//                 </Badge>
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";
import { useGetTransactionHistoryQuery } from "@/store/api/authApi";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  reason: string;
  description?: string;
  amount: number;
  currency: string;
  createdAt: string;
}

const TransactionSkeleton = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center gap-4 p-4">
        <Skeleton className="h-12 w-12 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
        <Skeleton className="h-6 w-20" />
      </div>
    ))}
  </div>
);

const TransactionItem = ({ tx }: { tx: Transaction }) => {
  const isCredit = tx.type === "credit";

  return (
    <div
      className={`
        flex items-center justify-between p-4 rounded-2xl border
        ${isCredit ? "bg-green-500/10 border-green-500/15" : "bg-destructive/5 border-destructive/10"}
      `}
    >
      <div className="flex items-center gap-4">
        <div
          className={`
            p-3 rounded-2xl
            ${isCredit ? "bg-green-400/20 text-green-600" : "bg-destructive/15 text-destructive"}
          `}
        >
          {isCredit ? (
            <ArrowDownLeft className="w-5 h-5" strokeWidth={2.5} />
          ) : (
            <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
          )}
        </div>

        <div className="space-y-1">
          <p className="font-semibold text-foreground">{tx.reason}</p>
          <p className="text-sm text-muted-foreground">
            {tx.description || "—"}
          </p>
          <p className="text-xs text-muted-foreground/70 font-medium">
            {new Date(tx.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      <div className="text-right flex flex-col items-end gap-2">
        <p
          className={`text-lg font-bold font-display ${isCredit ? "text-success" : "text-destructive"}`}
        >
          {isCredit ? "+" : "-"}$
          {tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          <span className="text-xs font-medium ml-1 opacity-70">
            {tx.currency}
          </span>
        </p>

        <Badge
          variant="secondary"
          className={`
            text-xs font-semibold uppercase px-2.5 py-0.5 border
            ${
              isCredit
                ? "bg-success/10 text-success border-success/20"
                : "bg-destructive/10 text-destructive border-destructive/20"
            }
          `}
        >
          {tx.type}
        </Badge>
      </div>
    </div>
  );
};

export const TransactionHistory = () => {
  const { data, isLoading, isError } = useGetTransactionHistoryQuery();

  if (isLoading) {
    return (
      <Card className="shadow-card border-0">
        <CardContent className="p-4">
          <TransactionSkeleton />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="shadow-card border-0">
        <CardContent className="p-8 text-center">
          <p className="text-destructive font-medium">
            Failed to load transaction history
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Transaction List */}
      <Card className="shadow-card border-0">
        <CardHeader className="pb-4 border-b">
          <CardTitle className="text-xl font-display font-bold text-foreground flex items-center gap-3">
            <span className="w-1.5 h-6 bg-primary rounded-full" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          {data && data.length === 0 ? (
            <div className="py-12 text-center">
              <Wallet className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">
                No transactions found
              </p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Your transactions will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {data?.map((tx) => (
                <TransactionItem key={tx.id} tx={tx} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionHistory;
