import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useCreatePostMutation } from "@/store/api/postsApi";
import { useLazyGetUploadSignatureQuery } from "@/store/api/cloudinaryApi";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { Progress } from "./ui/progress";
import { toast } from "sonner";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";

type Props = {
  type?: "post" | "reel" | "video";
  onSuccess?: () => void;
};

export default function UserUploadContent({ type = "post", onSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);

  const [createPost, { isLoading }] = useCreatePostMutation();
  const [getSignatureTrigger] = useLazyGetUploadSignatureQuery();

  const getSignature = async ({ folder }: { folder: string }) => {
    return await getSignatureTrigger({ folder }).unwrap();
  };

  const submit = async () => {
    if (!file) return toast.warning("Please select a file");

    try {
      setProgress(0);

      const uploadRes = await uploadToCloudinary({
        file,
        postType: type,
        getSignature,
        onProgress: setProgress,
      });

      await createPost({
        type,
        fileUrl: uploadRes.secure_url,
        caption: caption.trim() || undefined,
        thumbnailUrl: uploadRes.eager?.[0]?.secure_url, // optional
      }).unwrap();

      setFile(null);
      setCaption("");
      setProgress(0);

      onSuccess?.();
    } catch (err) {
      console.error(err);
      apiErrorToastHandler(err);
    }
  };

  return (
    <div className="space-y-3">
      <Textarea
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <Input
        type="file"
        accept={type === "post" ? "image/*" : "video/*"}
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {progress > 0 && (
        <div className="space-y-1">
          <Progress value={progress} />
          <p className="text-xs text-muted-foreground">
            Uploading... {progress}%
          </p>
        </div>
      )}

      <Button className="w-full" disabled={isLoading || !file} onClick={submit}>
        {isLoading ? "Posting..." : "Post"}
      </Button>
    </div>
  );
}
