import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useCreatePostMutation } from "@/store/api/postsApi";

type ContentType = "post" | "reel" | "video";

type UploadTabProps = {
  type: ContentType;
  onSuccess?: () => void;
};

const UploadTab = ({ type, onSuccess }: UploadTabProps) => {
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

    // reset
    setFile(null);
    setCaption("");
    setIsEnquiryPost(false);
    setCtaLabel("");

    onSuccess?.();
  };

  return (
    <div className="space-y-5">
      {/* Caption */}
      <Textarea
        placeholder={`Write ${type} caption...`}
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      {/* File */}
      <Input
        type="file"
        accept={type === "post" ? "image/*" : "video/*"}
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {/* Enquiry Toggle */}
      <div className="flex items-center justify-between rounded-lg border p-3">
        <Label htmlFor="enquiry" className="font-medium">
          Enable Enquiry
        </Label>
        <Switch
          id="enquiry"
          checked={isEnquiryPost}
          onCheckedChange={setIsEnquiryPost}
        />
      </div>

      {/* CTA Label (Conditional) */}
      {isEnquiryPost && (
        <Input
          placeholder="CTA Label (e.g. Apply Now)"
          value={ctaLabel}
          onChange={(e) => setCtaLabel(e.target.value)}
        />
      )}

      {/* Submit */}
      <Button
        onClick={submit}
        disabled={isLoading || !file}
        className="w-full"
      >
        {isLoading ? "Uploading..." : `Upload ${type}`}
      </Button>
    </div>
  );
};

export default function UploadContent({
  defaultType,
  onSuccess,
}: {
  defaultType?: ContentType;
  onSuccess?: () => void;
}) {
  // 👉 Dialog Mode
  if (defaultType) {
    return <UploadTab type={defaultType} onSuccess={onSuccess} />;
  }

  // 👉 Tabs Mode
  return (
    <Tabs defaultValue="post" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="post">Post</TabsTrigger>
        <TabsTrigger value="reel">Reel</TabsTrigger>
        <TabsTrigger value="video">Video</TabsTrigger>
      </TabsList>

      <TabsContent value="post">
        <UploadTab type="post" />
      </TabsContent>

      <TabsContent value="reel">
        <UploadTab type="reel" />
      </TabsContent>

      <TabsContent value="video">
        <UploadTab type="video" />
      </TabsContent>
    </Tabs>
  );
}
