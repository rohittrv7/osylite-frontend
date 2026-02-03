import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // Ensure you have this component
import { X, Upload, Plus, FileText, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { type CreateJobProfileDto } from "@/store/api/jobsApi";
import { useLazyGetUploadSignatureQuery } from "@/store/api/cloudinaryApi";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";

interface Props {
  data: Partial<CreateJobProfileDto>;
  onChange: (data: Partial<CreateJobProfileDto>) => void;
}

const CandidateSkillsStep = ({ data, onChange }: Props) => {
  // --- Skills State ---
  const [input, setInput] = useState("");
  const skills = data.skills || [];

  // --- Resume Upload State ---
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Cloudinary Hooks ---
  const [getSignatureTrigger] = useLazyGetUploadSignatureQuery();

  // --- Skills Handlers ---
  const addSkill = () => {
    if (input.trim() && !skills.includes(input.trim())) {
      onChange({ ...data, skills: [...skills, input.trim()] });
      setInput("");
    }
  };

  const removeSkill = (skill: string) => {
    onChange({ ...data, skills: skills.filter((s) => s !== skill) });
  };

  // --- Resume Upload Handlers ---
  const getSignature = async ({ folder }: { folder: string }) => {
    return await getSignatureTrigger({ folder }).unwrap();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate File Type (PDF, DOC, DOCX)
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF or Word document.");
      return;
    }

    // Validate File Size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB.");
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Reuse your existing upload logic
      const uploadRes = await uploadToCloudinary({
        file,
        postType: "raw", // Use 'raw' or 'auto' for documents, 'avatar' is for images
        getSignature,
        onProgress: setUploadProgress,
      });

      // Update Form Data with URL
      // Assuming you have a 'resumeUrl' field in your DTO now.
      // If not, you might need to use a different field or update DTO.
      onChange({ ...data, resumeUrl: uploadRes.secure_url });

      toast.success("Resume uploaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload resume.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
    }
  };

  const handleRemoveResume = () => {
    onChange({ ...data, resumeUrl: undefined }); // Or ""
    toast.success("Resume removed.");
  };

  return (
    <div className="space-y-8">
      {/* 1. Skills Section */}
      <div className="space-y-3">
        <label className="text-sm font-medium">
          Key Skills <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <Input
            placeholder="Type skill (e.g. Java, Communication)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
          />
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={addSkill}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 min-h-[2rem]">
          {skills.length === 0 && (
            <p className="text-xs text-muted-foreground italic">
              No skills added yet.
            </p>
          )}
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="gap-1 px-3 py-1">
              {skill}
              <X
                className="w-3 h-3 cursor-pointer hover:text-destructive"
                onClick={() => removeSkill(skill)}
              />
            </Badge>
          ))}
        </div>
      </div>

      {/* 2. Resume Upload Section */}
      <div className="space-y-3 border-t pt-6">
        <label className="text-sm font-medium">Resume / CV (Optional)</label>

        {/* Hidden Input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />

        {/* View: If Uploading */}
        {isUploading ? (
          <div className="border rounded-md p-4 bg-muted/20 space-y-3">
            <div className="flex items-center gap-2 text-sm text-primary font-medium">
              <Loader2 className="w-4 h-4 animate-spin" />
              Uploading Resume... {uploadProgress}%
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        ) : data.resumeUrl ? (
          /* View: If File Exists */
          <div className="flex items-center justify-between p-3 border rounded-md bg-green-50 border-green-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <FileText className="w-5 h-5 text-green-700" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-green-900">Resume Uploaded</p>
                <a
                  href={data.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-green-600 hover:underline truncate max-w-[200px] block"
                >
                  View Document
                </a>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleRemoveResume}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          /* View: Default Upload State */
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/10 transition-colors group"
          >
            <div className="p-3 bg-muted rounded-full mb-3 group-hover:bg-primary/10 transition-colors">
              <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
            </div>
            <p className="text-sm font-medium">Click to Upload Resume</p>
            <p className="text-xs text-muted-foreground mt-1">
              Supported formats: PDF, DOC, DOCX (Max 5MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateSkillsStep;
