import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FollowList, { type FollowUser } from "./FollowList";

interface FollowStatsDialogProps {
  label: "followers" | "following";
  count?: number;
  users: FollowUser[];
}

export function FollowStatsDialog({
  label,
  count,
  users,
}: FollowStatsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer hover:underline">
          <b>{count}</b> {label}
        </span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="capitalize">{label}</DialogTitle>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto">
          <FollowList users={users} type={label} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
