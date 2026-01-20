import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AssociateUploadContent from "./AssociateUploadContent";
import UserUploadContent from "./UserUploadContent";
import { UserRole } from "@/types/userRole";
import { useSelector } from "react-redux";
import { selectAuthUser } from "@/store/selectors/authSelectors";

export default function CreatePostDialog({
  trigger,
  type,
}: {
  trigger: React.ReactNode;
  type: "post" | "reel" | "video";
}) {
  const user = useSelector(selectAuthUser);
  const [open, setOpen] = useState(false);

  return (
    <>
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {trigger}
      </span>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="capitalize">Create {type}</DialogTitle>
          </DialogHeader>

          {user?.role === UserRole.ASSOCIATE ? (
            <AssociateUploadContent
              onSuccess={() => setOpen(false)}
              type={type}
            />
          ) : (
            <UserUploadContent onSuccess={() => setOpen(false)} type={type} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
