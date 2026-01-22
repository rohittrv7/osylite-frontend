import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePostMutation } from "@/store/api/postsApi";

type Props = {
  type?: "post" | "reel" | "video";
  onSuccess?: () => void;
};

export default function UserUploadContent({ type = "post", onSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [isEnquiryPost, setIsEnquiryPost] = useState(false);
  const [ctaLabel, setCtaLabel] = useState("");

  const [createPost, { isLoading }] = useCreatePostMutation();

  const submit = async () => {
    if (!file) return alert("Please select a file");

    await createPost({
      type,
      caption: caption.trim() || undefined,
      file,
      isEnquiryPost,
      ctaLabel: isEnquiryPost ? ctaLabel : undefined,
    }).unwrap();

    setFile(null);
    setCaption("");
    setIsEnquiryPost(false);
    setCtaLabel("");

    onSuccess?.();
  };

  return (
    <div className="space-y-2">
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

      {/* <div className="flex items-center justify-between rounded-lg border p-3">
        <Label htmlFor="enquiry">Enable Enquiry</Label>
        <Switch
          id="enquiry"
          checked={isEnquiryPost}
          onCheckedChange={setIsEnquiryPost}
        />
      </div>

      {isEnquiryPost && (
        <Input
          placeholder="CTA Label (e.g. Apply Now)"
          value={ctaLabel}
          onChange={(e) => setCtaLabel(e.target.value)}
        />
      )} */}

      <Button className="w-full" disabled={isLoading || !file} onClick={submit}>
        {isLoading ? "Uploading..." : "Post"}
      </Button>
    </div>
  );
}
