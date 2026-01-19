import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadContent from "@/components/UploadContent";

export default function CreatePostDialog({
  trigger,
  type,
}: {
  trigger: React.ReactNode;
  type: "post" | "reel" | "video";
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="capitalize">Create {type}</DialogTitle>
        </DialogHeader>

        <UploadContent defaultType={type} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
