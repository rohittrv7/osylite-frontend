import { useState } from "react";
import { Camera, FileText, Plus, X, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress"; // Assuming you have a progress component
import type { MatrimonyProfile } from "@/types/matrimony";
import { useLazyGetUploadSignatureQuery } from "@/store/api/cloudinaryApi"; // Correct path for your API slice
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";

interface PhotoBioStepProps {
  formData: Partial<MatrimonyProfile>;
  updateFormData: (data: Partial<MatrimonyProfile>) => void;
}

const PhotoBioStep = ({ formData, updateFormData }: PhotoBioStepProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0); // Upload progress state
  const photos = formData.photos || [];

  // API Hook for Cloudinary Signature
  const [getSignatureTrigger] = useLazyGetUploadSignatureQuery();

  // Signature Helper
  const getSignature = async ({ folder }: { folder: string }) => {
    // This calls your backend to get the signature
    return await getSignatureTrigger({ folder }).unwrap();
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Limit check
    if (photos.length + files.length > 6) {
      toast.error("You can only upload up to 6 photos.");
      return;
    }

    setUploading(true);
    setProgress(0); // Reset progress

    const newPhotoUrls: string[] = [];
    const totalFiles = files.length;
    let completedFiles = 0;

    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) {
          toast.error(`Skipping invalid file: ${file.name}`);
          continue;
        }

        // Upload to Cloudinary
        const uploadRes = await uploadToCloudinary({
          file,
          postType: "matrimony", // Folder name in Cloudinary
          getSignature,
          onProgress: (p) => {
            // Calculate overall progress: (completed + current_file_progress) / total
            const overallProgress =
              ((completedFiles + p / 100) / totalFiles) * 100;
            setProgress(Math.round(overallProgress));
          },
        });

        if (uploadRes && uploadRes.secure_url) {
          newPhotoUrls.push(uploadRes.secure_url);
        }

        completedFiles++;
      }

      // Update state with new URLs
      updateFormData({ photos: [...photos, ...newPhotoUrls] });
      toast.success("Photos uploaded successfully!");
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Failed to upload photos. Please try again.");
    } finally {
      setUploading(false);
      setProgress(0);
      e.target.value = ""; // Reset input
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    updateFormData({ photos: newPhotos });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Photos Section */}
      <div className="space-y-4">
        <Label className="text-lg font-display text-foreground flex items-center gap-2">
          <Camera className="w-5 h-5 text-primary" />
          Photos{" "}
          <span className="text-muted-foreground text-sm font-normal">
            (Up to 6)
          </span>
        </Label>

        <div className="grid grid-cols-3 gap-4">
          {/* Render Existing Photos */}
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden group border border-border"
            >
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-2 right-2 p-1 rounded-full bg-destructive/90 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Upload Button */}
          {photos.length < 6 && (
            <label
              className={cn(
                "aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden",
                dragOver
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50",
                uploading && "pointer-events-none opacity-80 bg-muted/20",
              )}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                // Note: File input onChange handles the actual file processing
                // You can manually trigger it here if needed for drag-n-drop
              }}
            >
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
                disabled={uploading}
              />

              {uploading ? (
                <div className="flex flex-col items-center justify-center gap-2 w-full px-4">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  <span className="text-xs text-muted-foreground font-medium">
                    {progress}%
                  </span>
                  {/* Progress Bar Component */}
                  <Progress
                    value={progress}
                    className="h-1.5 w-full bg-muted"
                  />
                </div>
              ) : (
                <>
                  <Plus className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-xs text-muted-foreground text-center px-2">
                    Add Photo
                  </span>
                </>
              )}
            </label>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          Profiles with photos get 10x more responses.
        </p>
      </div>

      {/* Bio Section */}
      <div className="space-y-3">
        <Label
          htmlFor="bio"
          className="text-lg font-display text-foreground flex items-center gap-2"
        >
          <FileText className="w-5 h-5 text-primary" />
          About You{" "}
          <span className="text-muted-foreground text-sm font-normal">
            (Optional)
          </span>
        </Label>
        <Textarea
          id="bio"
          placeholder="Write a few lines about yourself, your interests, and what you're looking for in a life partner..."
          value={formData.bio || ""}
          onChange={(e) => updateFormData({ bio: e.target.value })}
          className="min-h-[150px] resize-none focus-visible:ring-primary"
          maxLength={500}
        />
        <p className="text-sm text-muted-foreground text-right">
          {(formData.bio || "").length}/500 characters
        </p>
      </div>

      {/* Tips Card */}
      <div className="p-4 rounded-lg bg-rose-50 border border-rose-100 dark:bg-rose-950/20 dark:border-rose-900">
        <p className="text-sm text-foreground font-medium mb-2 flex items-center gap-2">
          ✨ Tips for a great bio:
        </p>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Share your hobbies and interests</li>
          <li>Mention your family values</li>
          <li>Describe what you're looking for in a partner</li>
          <li>Be genuine and positive</li>
        </ul>
      </div>
    </div>
  );
};

export default PhotoBioStep;
