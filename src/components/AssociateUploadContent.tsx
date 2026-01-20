import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateAssociatePostMutation } from "@/store/api/postsApi";

export default function AssociateUploadContent({ onSuccess }: any) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");
  const [earningMod, setEarningMod] = useState("FREE");
  const [price, setPrice] = useState<number | undefined>();

  const [isEnquiryPost, setIsEnquiryPost] = useState(false);
  const [ctaLabel, setCtaLabel] = useState("");

  // category details
  const [gameName, setGameName] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [businessType, setBusinessType] = useState("");

  const [createPost, { isLoading }] = useCreateAssociatePostMutation();

  const submit = async () => {
    if (!file) return alert("File required");
    if (!title.trim()) return alert("Title required");

    await createPost({
      title,
      description,
      file,
      category,
      earningMod,
      price: earningMod !== "FREE" ? price : undefined,
      categoryDetails:
        category === "SPORTS"
          ? { gameName, organizer }
          : category === "BUSINESS"
            ? { businessType }
            : undefined,
      isEnquiryPost,
      ctaLabel: isEnquiryPost ? ctaLabel : undefined,
    }).unwrap();

    onSuccess?.();
  };

  return (
    <div className="space-y-5">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {/* Category */}
      <Select onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="SPORTS">Sports</SelectItem>
          <SelectItem value="ENTERTAINMENT">Entertainment</SelectItem>
          <SelectItem value="BUSINESS">Business</SelectItem>
        </SelectContent>
      </Select>

      {category === "SPORTS" && (
        <>
          <Input
            placeholder="Game Name"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
          <Input
            placeholder="Organizer"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
          />
        </>
      )}

      {category === "BUSINESS" && (
        <Input
          placeholder="Business Type"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
        />
      )}

      {/* Earning Mode */}
      <Select onValueChange={setEarningMod}>
        <SelectTrigger>
          <SelectValue placeholder="Earning Mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="FREE">Free</SelectItem>
          <SelectItem value="PAID">Paid</SelectItem>
          <SelectItem value="RENT">Rent</SelectItem>
        </SelectContent>
      </Select>

      {earningMod !== "FREE" && (
        <Input
          type="number"
          placeholder="Price (₹)"
          value={price ?? ""}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      )}

      {/* Enquiry */}
      <div className="flex items-center justify-between rounded-lg border p-3">
        <Label>Enable Enquiry CTA</Label>
        <Switch checked={isEnquiryPost} onCheckedChange={setIsEnquiryPost} />
      </div>

      {isEnquiryPost && (
        <Input
          placeholder="CTA Label (e.g. Book Now)"
          value={ctaLabel}
          onChange={(e) => setCtaLabel(e.target.value)}
        />
      )}

      <Button className="w-full" disabled={isLoading || !file} onClick={submit}>
        {isLoading ? "Publishing..." : "Publish"}
      </Button>
    </div>
  );
}
