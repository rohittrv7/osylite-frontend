import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { useUpdateAvatarMutation } from "@/store/api/authApi";
// Make sure to import this from your correct api file
import { Loader2, Camera } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { useLazyGetUploadSignatureQuery } from "@/store/api/cloudinaryApi";

interface ProfilePhotoDialogProps {
  avatarUrl?: string;
  username?: string;
  children?: React.ReactNode;
}

export function ProfilePhotoDialog({
  avatarUrl,
  children,
}: ProfilePhotoDialogProps) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Get the signature trigger
  const [getSignatureTrigger] = useLazyGetUploadSignatureQuery();

  const [updateAvatarApi, { isLoading: isUpdatingBackend }] =
    useUpdateAvatarMutation();

  // 2. Define the signature helper function
  const getSignature = async ({ folder }: { folder: string }) => {
    return await getSignatureTrigger({ folder }).unwrap();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    try {
      setUploading(true);
      setProgress(0);

      const uploadRes = await uploadToCloudinary({
        file,
        postType: "avatar",
        getSignature,
        onProgress: setProgress,
      });

      // 4. Send the secure_url to Backend
      await updateAvatarApi({ avatarUrl: uploadRes.secure_url }).unwrap();

      toast.success("Profile photo updated!");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload photo");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleRemovePhoto = async () => {
    try {
      await updateAvatarApi({ avatarUrl: "" }).unwrap();
      toast.success("Profile photo removed");
      setOpen(false);
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative group cursor-pointer">
          {children}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="text-white w-6 h-6" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Change Profile Photo
          </DialogTitle>
        </DialogHeader>

        {uploading ? (
          <div className="py-6 space-y-4 flex flex-col items-center justify-center">
            <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-muted">
              {/* Progress Indicator */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                <span className="text-white font-bold">{progress}%</span>
              </div>
              {/* Optional: You could show a preview of the local file here using URL.createObjectURL(file) if you wanted */}
            </div>
            <div className="w-full max-w-[200px]">
              <Progress value={progress} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground animate-pulse">
              Uploading to server...
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 py-4">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />

            <Button
              variant="ghost"
              className="text-blue-500 font-bold text-md w-full hover:text-blue-600 hover:bg-blue-50/10"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUpdatingBackend}
            >
              {isUpdatingBackend ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Upload Photo"
              )}
            </Button>

            <div className="h-[1px] bg-border w-full my-1" />

            <Button
              variant="ghost"
              className="text-red-500 font-bold text-md w-full hover:text-red-600 hover:bg-red-50/10"
              onClick={handleRemovePhoto}
              disabled={!avatarUrl || isUpdatingBackend}
            >
              Remove Current Photo
            </Button>

            <div className="h-[1px] bg-border w-full my-1" />

            <Button
              variant="ghost"
              className="text-muted-foreground text-md w-full"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
