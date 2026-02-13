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
import { Loader2, X } from "lucide-react"; // Preview delete karne ke liye

type Props = {
  type?: "post" | "reel" | "video";
  onSuccess?: () => void;
};

export default function UserUploadContent({ type = "post", onSuccess }: Props) {
  // 1. Change single file to Array
  const [files, setFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);

  const [createPost, { isLoading }] = useCreatePostMutation();
  const [getSignatureTrigger] = useLazyGetUploadSignatureQuery();

  const getSignature = async ({ folder }: { folder: string }) => {
    return await getSignatureTrigger({ folder }).unwrap();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      // Post ke liye multiple, reels/video ke liye sirf pehli file
      if (type === "post") {
        setFiles((prev) => [...prev, ...selectedFiles]);
      } else {
        setFiles([selectedFiles[0]]);
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const submit = async () => {
    if (files.length === 0)
      return toast.warning("Please select at least one file");

    try {
      setProgress(0);
      const uploadedUrls: string[] = [];
      let firstThumbnail: string | undefined = undefined;

      // 2. Loop through all files and upload
      for (let i = 0; i < files.length; i++) {
        // Individual progress calculate karne ke liye logic (optional simple version)
        const res = await uploadToCloudinary({
          file: files[i],
          postType: type,
          getSignature,
          onProgress: (p) =>
            setProgress(Math.round(((i + p / 100) / files.length) * 100)),
        });

        uploadedUrls.push(res.secure_url);
        if (i === 0) firstThumbnail = res.eager?.[0]?.secure_url;
      }

      // 3. Send as Array to Backend
      await createPost({
        type,
        fileUrl: uploadedUrls, // Ab ye array hai
        caption: caption.trim() || undefined,
        thumbnailUrl: firstThumbnail,
      }).unwrap();

      toast.success("Post created successfully!");
      setFiles([]);
      setCaption("");
      setProgress(0);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      apiErrorToastHandler(err);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="min-h-[100px]"
      />

      {/* File Input */}
      <div className="space-y-2">
        <Input
          type="file"
          multiple={type === "post"} // Post ke liye multiple selection allow karein
          accept={type === "post" ? "image/*" : "video/*"}
          onChange={handleFileChange}
        />
        <p className="text-[10px] text-muted-foreground italic">
          * You can select multiple images for a post.
        </p>
      </div>

      {/* 4. Image Previews */}
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {files.map((f, idx) => (
            <div
              key={idx}
              className="relative aspect-square border rounded-md overflow-hidden bg-muted"
            >
              <img
                src={URL.createObjectURL(f)}
                className="w-full h-full object-cover"
                alt="preview"
              />
              <button
                onClick={() => removeFile(idx)}
                className="absolute top-1 right-1 bg-destructive text-white rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {progress > 0 && (
        <div className="space-y-1">
          <Progress value={progress} className="h-2" />
          <p className="text-center text-[10px] font-medium">
            Uploading Assets: {progress}%
          </p>
        </div>
      )}

      <Button
        className="w-full"
        disabled={isLoading || files.length === 0}
        onClick={submit}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Uploading {files.length} items...</span>
          </div>
        ) : (
          "Post Content"
        )}
      </Button>
    </div>
  );
}
