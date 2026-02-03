import { Camera, FileText, Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { MatrimonyProfile } from "@/types/matrimony";

interface PhotoBioStepProps {
  formData: Partial<MatrimonyProfile>;
  updateFormData: (data: Partial<MatrimonyProfile>) => void;
}

const PhotoBioStep = ({ formData, updateFormData }: PhotoBioStepProps) => {
  const [dragOver, setDragOver] = useState(false);
  const photos = formData.photos || [];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you'd upload these to a server
      // For demo, we'll use local URLs
      const newPhotos = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      updateFormData({ photos: [...photos, ...newPhotos].slice(0, 6) });
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    updateFormData({ photos: newPhotos });
  };

  return (
    <div className="space-y-6">
      {/* Photos */}
      <div className="space-y-4">
        <Label className="text-lg font-display text-foreground flex items-center gap-2">
          <Camera className="w-5 h-5 text-primary" />
          Photos{" "}
          <span className="text-muted-foreground text-sm font-normal">
            (Up to 6)
          </span>
        </Label>

        <div className="grid grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden group"
            >
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {photos.length < 6 && (
            <label
              className={cn(
                "aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all",
                dragOver
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 hover:bg-muted/50",
              )}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                // Handle dropped files
              }}
            >
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <Plus className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-xs text-muted-foreground text-center px-2">
                Add Photo
              </span>
            </label>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          Profiles with photos get 10x more responses
        </p>
      </div>

      {/* Bio */}
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
          className="min-h-[150px] resize-none"
          maxLength={500}
        />
        <p className="text-sm text-muted-foreground text-right">
          {(formData.bio || "").length}/500 characters
        </p>
      </div>

      {/* Tips card */}
      <div className="p-4 rounded-lg bg-rose border border-rose-dark">
        <p className="text-sm text-foreground font-medium mb-2">
          ✨ Tips for a great bio:
        </p>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Share your hobbies and interests</li>
          <li>• Mention your family values</li>
          <li>• Describe what you're looking for in a partner</li>
          <li>• Be genuine and positive</li>
        </ul>
      </div>
    </div>
  );
};

export default PhotoBioStep;
