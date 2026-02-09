interface StatusBadgeProps {
  status: "pending" | "approved" | "rejected";
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles = {
    pending: "bg-warning/15 text-warning",
    approved: "bg-success/15 text-success",
    rejected: "bg-destructive/15 text-destructive",
  };

  const labels = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
  };

  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};
