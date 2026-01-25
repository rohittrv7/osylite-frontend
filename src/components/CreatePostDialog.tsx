import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UserUploadContent from "./UserUploadContent";

export default function CreatePostDialog({
  trigger,
  type,
}: {
  trigger: React.ReactNode;
  type: "post" | "reel" | "video";
}) {
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

          <UserUploadContent onSuccess={() => setOpen(false)} type={type} />
        </DialogContent>
      </Dialog>
    </>
  );
}
