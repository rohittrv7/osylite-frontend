import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  X,
  Check,
  Home,
  Building,
  MapPin,
  Loader2,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { amenitiesList, cities } from "@/lib/mockData";
import {
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useGetPropertyByIdQuery,
} from "@/store/api/propertiesApi";
import { useLazyGetUploadSignatureQuery } from "@/store/api/cloudinaryApi";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";

type Step = 1 | 2 | 3;

interface FormData {
  title: string;
  description: string;
  listingType: string;
  category: string;
  price: string;
  isNegotiable: boolean;
  maintenanceCost: string;
  city: string;
  locality: string;
  address: string;
  bhk: string;
  bathrooms: string;
  areaSqFt: string;
  furnishing: string;
  floor: string;
  totalFloors: string;
  facing: string;
  parking: boolean;
  constructionStatus: string;
  amenities: string[];
  images: string[];
}

const PostProperty = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    listingType: "Sell",
    category: "Flat",
    price: "",
    isNegotiable: false,
    maintenanceCost: "",
    city: "",
    locality: "",
    address: "",
    bhk: "",
    bathrooms: "",
    areaSqFt: "",
    furnishing: "Semi Furnished",
    floor: "",
    totalFloors: "",
    facing: "North",
    parking: false,
    constructionStatus: "Ready to Move",
    amenities: [],
    images: [],
  });

  // --- Real Upload States ---
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const { data: existingProperty, isLoading: isLoadingData } =
    useGetPropertyByIdQuery(id || "", {
      skip: !isEditMode,
    });

  const [createProperty, { isLoading: isCreating }] =
    useCreatePropertyMutation();
  const [updateProperty, { isLoading: isUpdating }] =
    useUpdatePropertyMutation();
  const [getSignatureTrigger] = useLazyGetUploadSignatureQuery();

  const isSubmitting = isCreating || isUpdating;

  useEffect(() => {
    if (isEditMode && existingProperty && !formData.title) {
      setFormData({
        title: existingProperty.title,
        description: existingProperty.description,
        listingType: existingProperty.listingType,
        category: existingProperty.category,
        price: existingProperty.price ? existingProperty.price.toString() : "",
        isNegotiable: existingProperty.isNegotiable,
        maintenanceCost: existingProperty.maintenanceCost
          ? existingProperty.maintenanceCost.toString()
          : "",
        city: existingProperty.city,
        locality: existingProperty.locality,
        address: existingProperty.address,
        bhk: existingProperty.details.bhk
          ? existingProperty.details.bhk.toString()
          : "",
        bathrooms: existingProperty.details.bathrooms
          ? existingProperty.details.bathrooms.toString()
          : "",
        areaSqFt: existingProperty.details.areaSqFt
          ? existingProperty.details.areaSqFt.toString()
          : "",
        furnishing: existingProperty.details.furnishing || "Semi Furnished",
        floor: existingProperty.details.floor
          ? existingProperty.details.floor.toString()
          : "",
        totalFloors: existingProperty.details.totalFloors
          ? existingProperty.details.totalFloors.toString()
          : "",
        facing: existingProperty.details.facing || "North",
        parking: existingProperty.details.parking || false,
        constructionStatus:
          existingProperty.details.constructionStatus || "Ready to Move",
        amenities: existingProperty.amenities,
        images: existingProperty.images,
      });
    }
  }, [existingProperty, isEditMode, formData.title]);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter((a) => a !== amenity)
      : [...formData.amenities, amenity];
    updateFormData({ amenities: newAmenities });
  };

  // --- Real Cloudinary Upload Handler ---
  const getSignature = async ({ folder }: { folder: string }) => {
    return await getSignatureTrigger({ folder }).unwrap();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const filesArray = Array.from(selectedFiles);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < filesArray.length; i++) {
        const res = await uploadToCloudinary({
          file: filesArray[i],
          postType: "post",
          getSignature,
          onProgress: (p) => {
            const totalP = Math.round(
              ((i + p / 100) / filesArray.length) * 100,
            );
            setUploadProgress(totalP);
          },
        });
        uploadedUrls.push(res.secure_url);
      }
      updateFormData({ images: [...formData.images, ...uploadedUrls] });
      toast.success(`${filesArray.length} images uploaded successfully!`);
    } catch (error) {
      apiErrorToastHandler(error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    updateFormData({ images: newImages });
  };

  // const handleSubmit = async () => {
  //   try {
  //     const payload = {
  //       title: formData.title,
  //       description: formData.description,
  //       listingType: formData.listingType as any,
  //       category: formData.category as any,
  //       city: formData.city,
  //       locality: formData.locality,
  //       address: formData.address,
  //       price: Number(formData.price) || 0,
  //       isNegotiable: formData.isNegotiable,
  //       maintenanceCost: formData.maintenanceCost
  //         ? Number(formData.maintenanceCost)
  //         : undefined,
  //       amenities: formData.amenities,
  //       images: formData.images,
  //       details: {
  //         bhk: formData.bhk,
  //         bathrooms: formData.bathrooms,
  //         areaSqFt: Number(formData.areaSqFt) || 0,
  //         furnishing: formData.furnishing,
  //         floor: formData.floor,
  //         totalFloors: formData.totalFloors,
  //         facing: formData.facing,
  //         constructionStatus: formData.constructionStatus,
  //         parking: formData.parking,
  //       },
  //     };

  //     if (isEditMode && id) {
  //       await updateProperty({ id, data: payload }).unwrap();
  //       toast.success("Property updated successfully!");
  //     } else {
  //       await createProperty(payload).unwrap();
  //       toast.success("Property posted successfully!");
  //     }

  //     navigate("/property");
  //   } catch (error) {
  //     apiErrorToastHandler(error);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        listingType: formData.listingType as any,
        category: formData.category as any,
        city: formData.city,
        locality: formData.locality,
        address: formData.address,
        price: Number(formData.price) || 0,
        isNegotiable: formData.isNegotiable,
        maintenanceCost: formData.maintenanceCost
          ? Number(formData.maintenanceCost)
          : undefined,
        amenities: formData.amenities,
        images: formData.images,
        details: {
          // Yahan conversion zaroori hai
          bhk: Number(formData.bhk) || 0,
          bathrooms: Number(formData.bathrooms) || 0,
          areaSqFt: Number(formData.areaSqFt) || 0,
          furnishing: formData.furnishing,
          floor: Number(formData.floor) || 0,
          totalFloors: Number(formData.totalFloors) || 0,
          facing: formData.facing,
          constructionStatus: formData.constructionStatus,
          parking: formData.parking,
        },
      };

      // Payload type ab CreatePropertyDto se match karega
      if (isEditMode && id) {
        await updateProperty({ id, data: payload as any }).unwrap();
        toast.success("Property updated successfully!");
      } else {
        await createProperty(payload as any).unwrap();
        toast.success("Property posted successfully!");
      }

      navigate("/property");
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.title && formData.price && formData.city;
      case 2:
        return formData.areaSqFt;
      case 3:
        return formData.images.length > 0 && !isUploading;
      default:
        return false;
    }
  };

  const steps = [
    { number: 1, title: "Basic Info", icon: Home },
    { number: 2, title: "Details", icon: Building },
    { number: 3, title: "Images", icon: MapPin },
  ];

  if (isEditMode && isLoadingData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center justify-center mb-12">
        {steps.map((s, index) => (
          <div key={s.number} className="flex items-center">
            <div
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300",
                step >= s.number
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-muted-foreground/30 text-muted-foreground",
              )}
            >
              {step > s.number ? (
                <Check className="w-5 h-5" />
              ) : (
                <s.icon className="w-5 h-5" />
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-16 md:w-24 h-1 mx-2 rounded transition-colors duration-300",
                  step > s.number ? "bg-primary" : "bg-muted",
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl p-6 md:p-8 property-card-shadow border">
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {isEditMode ? "Edit Property" : "Basic Information"}
              </h2>
              <p className="text-muted-foreground">
                {isEditMode
                  ? "Update property details"
                  : "Tell us about your property"}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Listing Type</Label>
                <RadioGroup
                  value={formData.listingType}
                  onValueChange={(value) =>
                    updateFormData({ listingType: value })
                  }
                  className="flex gap-4 mt-2"
                >
                  {["Sell", "Rent", "PG"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type} id={type} />
                      <Label htmlFor={type} className="cursor-pointer">
                        {type}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label>Property Type</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => updateFormData({ category: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Flat", "House", "Plot", "Commercial"].map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title">Property Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => updateFormData({ title: e.target.value })}
                  placeholder="e.g., 3 BHK Luxury Flat with Garden View"
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">
                    Price {formData.listingType === "Rent" ? "(per month)" : ""}
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => updateFormData({ price: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div className="flex items-end pb-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="negotiable"
                      checked={formData.isNegotiable}
                      onCheckedChange={(checked) =>
                        updateFormData({ isNegotiable: checked as boolean })
                      }
                    />
                    <Label htmlFor="negotiable">Price Negotiable</Label>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="maintenanceCost">
                  Maintenance Cost (Monthly)
                </Label>
                <Input
                  id="maintenanceCost"
                  type="number"
                  value={formData.maintenanceCost}
                  onChange={(e) =>
                    updateFormData({ maintenanceCost: e.target.value })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label>City</Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) => updateFormData({ city: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="locality">Locality</Label>
                <Input
                  id="locality"
                  value={formData.locality}
                  onChange={(e) => updateFormData({ locality: e.target.value })}
                  placeholder="e.g., Kankarbagh"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="address">Full Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateFormData({ address: e.target.value })}
                  placeholder="Complete address with landmarks"
                  className="mt-2"
                  rows={2}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold mb-2">Property Details</h2>
              <p className="text-muted-foreground">
                Provide more details about your property
              </p>
            </div>

            <div className="space-y-4">
              {formData.category !== "Plot" &&
                formData.category !== "Commercial" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bhk">BHK</Label>
                      <Select
                        value={formData.bhk}
                        onValueChange={(value) =>
                          updateFormData({ bhk: value })
                        }
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((n) => (
                            <SelectItem key={n} value={n.toString()}>
                              {n} BHK
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Select
                        value={formData.bathrooms}
                        onValueChange={(value) =>
                          updateFormData({ bathrooms: value })
                        }
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((n) => (
                            <SelectItem key={n} value={n.toString()}>
                              {n}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

              <div>
                <Label htmlFor="area">Area (sq.ft)</Label>
                <Input
                  id="area"
                  type="number"
                  value={formData.areaSqFt}
                  onChange={(e) => updateFormData({ areaSqFt: e.target.value })}
                  className="mt-2"
                />
              </div>

              {formData.category !== "Plot" && (
                <>
                  <div>
                    <Label>Furnishing</Label>
                    <RadioGroup
                      value={formData.furnishing}
                      onValueChange={(value) =>
                        updateFormData({ furnishing: value })
                      }
                      className="flex flex-wrap gap-4 mt-2"
                    >
                      {["Fully Furnished", "Semi Furnished", "Unfurnished"].map(
                        (type) => (
                          <div
                            key={type}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem value={type} id={type} />
                            <Label htmlFor={type} className="text-sm">
                              {type}
                            </Label>
                          </div>
                        ),
                      )}
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="floor">Floor</Label>
                      <Input
                        id="floor"
                        type="number"
                        value={formData.floor}
                        onChange={(e) =>
                          updateFormData({ floor: e.target.value })
                        }
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="totalFloors">Total Floors</Label>
                      <Input
                        id="totalFloors"
                        type="number"
                        value={formData.totalFloors}
                        onChange={(e) =>
                          updateFormData({ totalFloors: e.target.value })
                        }
                        className="mt-2"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <Label>Facing Direction</Label>
                <Select
                  value={formData.facing}
                  onValueChange={(value) => updateFormData({ facing: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "North",
                      "South",
                      "East",
                      "West",
                      "North-East",
                      "South-West",
                    ].map((dir) => (
                      <SelectItem key={dir} value={dir}>
                        {dir}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="parking"
                  checked={formData.parking}
                  onCheckedChange={(checked) =>
                    updateFormData({ parking: checked as boolean })
                  }
                />
                <Label htmlFor="parking">Parking Available</Label>
              </div>

              <div>
                <Label>Construction Status</Label>
                <Select
                  value={formData.constructionStatus}
                  onValueChange={(v) =>
                    updateFormData({ constructionStatus: v })
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Ready to Move", "Under Construction"].map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    updateFormData({ description: e.target.value })
                  }
                  placeholder="Describe your property in detail..."
                  className="mt-2"
                  rows={4}
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold mb-2">Images & Amenities</h2>
              <p className="text-muted-foreground">
                Add photos and select amenities
              </p>
            </div>

            <div>
              <Label className="mb-3 block">Property Images</Label>
              <div
                className={cn(
                  "border-2 border-dashed rounded-xl p-8 text-center transition-all",
                  isUploading
                    ? "bg-muted border-muted"
                    : "border-muted hover:border-primary/50",
                )}
              >
                <input
                  type="file"
                  id="prop-file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
                {isUploading ? (
                  <div className="space-y-4">
                    <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary" />
                    <div className="space-y-2 max-w-xs mx-auto text-sm">
                      <p>Uploading... {uploadProgress}%</p>
                      <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-primary h-full transition-all"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <label htmlFor="prop-file" className="cursor-pointer block">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4 font-medium">
                      Click to select multiple property images
                    </p>
                    <Button
                      variant="outline"
                      type="button"
                      className="pointer-events-none"
                    >
                      Select Files
                    </Button>
                  </label>
                )}
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img
                        src={img}
                        className="w-full h-full object-cover rounded-lg border shadow-sm"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-7 h-7 bg-destructive text-white rounded-full flex items-center justify-center shadow-md"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label className="mb-3 block text-lg font-semibold">
                Amenities
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenitiesList.map((amenity) => (
                  <div
                    key={amenity}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                      formData.amenities.includes(amenity)
                        ? "border-primary bg-primary/5"
                        : "border-muted",
                    )}
                    onClick={() => handleAmenityToggle(amenity)}
                  >
                    <Checkbox checked={formData.amenities.includes(amenity)} />
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => setStep((step - 1) as Step)}
            disabled={step === 1 || isSubmitting}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Previous
          </Button>

          {step < 3 ? (
            <Button
              onClick={() => setStep((step + 1) as Step)}
              disabled={!canProceed()}
            >
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  {isEditMode ? "Updating..." : "Posting..."}
                </>
              ) : (
                <>
                  {isEditMode ? (
                    <Pencil className="w-4 h-4 mr-2" />
                  ) : (
                    <Check className="w-4 h-4 mr-2" />
                  )}{" "}
                  {isEditMode ? "Update" : "Post"} Property
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostProperty;
