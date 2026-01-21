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
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";

export default function AssociateUploadContent({ onSuccess, type }: any) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState<string>("");
  const [earningMod, setEarningMod] = useState<string>("free");
  const [price, setPrice] = useState<number | undefined>();
  const [visibility, setVisibility] = useState<string>("public");
  const [audience, setAudience] = useState<string>("all");
  const [displayArea, setDisplayArea] = useState<string>("district");

  const [isEnquiryPost, setIsEnquiryPost] = useState(false);
  const [ctaLabel, setCtaLabel] = useState("");

  const [gameName, setGameName] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [businessType, setBusinessType] = useState("");

  const [createPost, { isLoading }] = useCreateAssociatePostMutation();

  const submit = async () => {
    try {
      if (!file) return alert("File required");
      if (!title.trim()) return alert("Title required");
      if (!category) return alert("Category required");

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("type", type);
      formData.append("category", category);
      formData.append("earningMod", earningMod);
      formData.append("visibility", visibility);
      formData.append("audience", audience);
      formData.append("displayArea", displayArea);
      formData.append("file", file);

      formData.append("isEnquiryPost", String(isEnquiryPost));

      if (isEnquiryPost && ctaLabel) {
        formData.append("ctaLabel", ctaLabel);
      }

      if (earningMod !== "free" && price !== undefined) {
        formData.append("price", String(price));
      }

      const details: any = {};
      if (category === "sports") {
        details.gameName = gameName;
        details.organizer = organizer;
      } else if (category === "business") {
        details.businessType = businessType;
      }
      formData.append("categoryDetails", JSON.stringify(details));

      await createPost(formData).unwrap();
      onSuccess?.();
    } catch (err) {
      apiErrorToastHandler(err);
    }
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
        accept={type === "post" ? "image/*" : "video/*"}
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <Select onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="entertainment">Entertainment</SelectItem>
          <SelectItem value="education">Education</SelectItem>
          <SelectItem value="business">Business</SelectItem>
          <SelectItem value="sports">Sports</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>

      {category === "sports" && (
        <div className="space-y-3 pl-4 border-l-2 border-primary/20">
          <Label>Sports Details</Label>
          <Input
            placeholder="Game Name (e.g. Cricket)"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
          <Input
            placeholder="Organizer (e.g. BCCI)"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
          />
        </div>
      )}

      {category === "business" && (
        <div className="space-y-3 pl-4 border-l-2 border-primary/20">
          <Label>Business Details</Label>
          <Input
            placeholder="Business Type"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
          />
        </div>
      )}

      <Select onValueChange={setVisibility} defaultValue="public">
        <SelectTrigger>
          <SelectValue placeholder="Visibility" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="public">Public</SelectItem>
          <SelectItem value="listed">Listed</SelectItem>
          <SelectItem value="private">Private</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setAudience} defaultValue="all">
        <SelectTrigger>
          <SelectValue placeholder="Audience" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="0-17">0-17</SelectItem>
          <SelectItem value="18-30">18-30</SelectItem>
          <SelectItem value="31-50">31-50</SelectItem>
          <SelectItem value="50+">50+</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setDisplayArea} defaultValue="district">
        <SelectTrigger>
          <SelectValue placeholder="Display Area" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="district">District</SelectItem>
          <SelectItem value="state">State</SelectItem>
          <SelectItem value="national">National</SelectItem>
          <SelectItem value="international">International</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setEarningMod} defaultValue="free">
        <SelectTrigger>
          <SelectValue placeholder="Earning Mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="free">Free</SelectItem>
          <SelectItem value="running_ads">Running Ads</SelectItem>
          <SelectItem value="on_rent">On Rent</SelectItem>
          <SelectItem value="paid_viewer">Paid Viewer</SelectItem>
          <SelectItem value="copyright_sale">Copyright Sale</SelectItem>
        </SelectContent>
      </Select>

      {earningMod !== "free" && (
        <Input
          type="number"
          placeholder="Price (₹)"
          value={price ?? ""}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      )}

      <div className="flex items-center justify-between rounded-lg border p-3">
        <Label>Enable Enquiry CTA</Label>
        <Switch checked={isEnquiryPost} onCheckedChange={setIsEnquiryPost} />
      </div>

      {isEnquiryPost && (
        <Input
          placeholder="CTA Label (e.g. Apply Now)"
          value={ctaLabel}
          onChange={(e) => setCtaLabel(e.target.value)}
        />
      )}

      <Button className="w-full" disabled={isLoading} onClick={submit}>
        {isLoading ? "Publishing..." : "Publish"}
      </Button>
    </div>
  );
}
