import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { ImagePlus, X } from 'lucide-react';
import { type Property } from '@/types/property';

interface PropertyDescriptionStepProps {
  data: Partial<Property>;
  onChange: (data: Partial<Property>) => void;
}

const PropertyDescriptionStep = ({ data, onChange }: PropertyDescriptionStepProps) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>(data.images || []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newUrls = Array.from(files).map((file) => URL.createObjectURL(file));
      const updatedUrls = [...previewUrls, ...newUrls].slice(0, 10);
      setPreviewUrls(updatedUrls);
      onChange({ ...data, images: updatedUrls });
    }
  };

  const removeImage = (index: number) => {
    const updatedUrls = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(updatedUrls);
    onChange({ ...data, images: updatedUrls });
  };

  return (
    <div className="space-y-6">
      {/* Property Images */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">
          Property Photos <span className="text-muted-foreground">(Max 10)</span>
        </label>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
              <img src={url} alt={`Property ${index + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
              {index === 0 && (
                <span className="absolute bottom-1 left-1 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                  Main
                </span>
              )}
            </div>
          ))}
          
          {previewUrls.length < 10 && (
            <label className="aspect-square rounded-xl border-2 border-dashed border-primary/50 bg-primary/5 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/10 transition-all">
              <ImagePlus className="w-8 h-8 text-primary mb-1" />
              <span className="text-xs text-primary font-medium">Add Photo</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          First image will be the main display image
        </p>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Description <span className="text-destructive">*</span>
        </label>
        <Textarea
          placeholder="Describe your property in detail - amenities, nearby landmarks, why it's special..."
          value={data.description || ''}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          className="min-h-[150px] resize-none"
        />
        <p className="text-xs text-muted-foreground">
          Include details like water supply, power backup, society amenities, nearby schools/hospitals
        </p>
      </div>
    </div>
  );
};

export default PropertyDescriptionStep;
