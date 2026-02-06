import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import StepIndicator from "./StepIndicator";
import BasicInfoStep from "./BasicInfoStep";
import ReligionLocationStep from "./ReligionLocationStep";
import CareerStep from "./CareerStep";
import PhotoBioStep from "./PhotoBioStep";
import ProfileView from "./ProfileView";
import { toast } from "sonner";
import {
  useCreateOrUpdateMatrimonyProfileMutation,
  useGetMyMatrimonyProfileQuery,
} from "@/store/api/matrimonyApi";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";
import type { MatrimonyProfile } from "@/types/matrimony";

const STEPS = [
  { id: 1, title: "Basic Info", icon: "👤" },
  { id: 2, title: "Religion & Location", icon: "🏠" },
  { id: 3, title: "Career", icon: "💼" },
  { id: 4, title: "Photos & Bio", icon: "📸" },
];

const ProfileForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Default isActive: true, but we will remove it before sending if creating
  const [formData, setFormData] = useState<Partial<MatrimonyProfile>>({
    isActive: true,
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  // --- API Hooks ---
  const {
    data: existingProfile,
    isLoading: isLoadingProfile,
    isSuccess: isProfileLoaded,
  } = useGetMyMatrimonyProfileQuery();

  const [createOrUpdateProfile, { isLoading: isSubmitting }] =
    useCreateOrUpdateMatrimonyProfileMutation();

  // --- Effects ---
  useEffect(() => {
    // Only switch to View/Edit mode if valid data exists
    if (isProfileLoaded && existingProfile && existingProfile.profileFor) {
      setFormData(existingProfile);
      setIsViewMode(true);
      setIsEditMode(true);
    }
  }, [existingProfile, isProfileLoaded]);

  const updateFormData = (data: Partial<MatrimonyProfile>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (
          !formData.profileFor ||
          !formData.gender ||
          !formData.dob ||
          !formData.height
        ) {
          toast.error("Please fill in all required fields.");
          return false;
        }
        if (formData.height < 100 || formData.height > 250) {
          toast.error("Please enter a valid height between 100-250 cm.");
          return false;
        }
        return true;
      case 2:
        if (!formData.religion || !formData.state || !formData.city) {
          toast.error("Please fill in religion, state, and city.");
          return false;
        }
        return true;
      case 3:
        if (!formData.education || !formData.occupation) {
          toast.error("Please fill in education and occupation.");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    try {
      const payload: Partial<MatrimonyProfile> = {
        profileFor: formData.profileFor,
        gender: formData.gender,
        dob: formData.dob,
        height: formData.height,
        religion: formData.religion,
        caste: formData.caste,
        state: formData.state,
        city: formData.city,
        education: formData.education,
        occupation: formData.occupation,
        annualIncome: formData.annualIncome,
        photos: formData.photos,
        bio: formData.bio,
      };

      // Only include 'isActive' if we are in Edit Mode
      if (isEditMode) {
        payload.isActive = formData.isActive;
      }

      await createOrUpdateProfile(payload as MatrimonyProfile).unwrap();

      toast.success(
        isEditMode
          ? "Profile Updated Successfully!"
          : "Profile Created Successfully!",
      );

      setIsViewMode(true);
      setIsEditMode(true);
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };

  const handleEdit = () => {
    setIsViewMode(false);
    setCurrentStep(1);
  };

  // --- Render Logic ---

  if (isLoadingProfile) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isViewMode && formData.profileFor) {
    return (
      <ProfileView profile={formData as MatrimonyProfile} onEdit={handleEdit} />
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep formData={formData} updateFormData={updateFormData} />
        );
      case 2:
        return (
          <ReligionLocationStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <CareerStep formData={formData} updateFormData={updateFormData} />
        );
      case 4:
        return (
          <div className="space-y-6">
            <PhotoBioStep formData={formData} updateFormData={updateFormData} />

            {/* Toggle only in Edit Mode */}
            {isEditMode && (
              <div className="pt-6 border-t border-border mt-6">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                  <div className="space-y-0.5">
                    <Label className="text-base font-semibold flex items-center gap-2">
                      <Power className="w-4 h-4" /> Profile Visibility
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {formData.isActive
                        ? "Your profile is visible to others."
                        : "Your profile is hidden (Inactive)."}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-medium ${
                        formData.isActive
                          ? "text-green-600"
                          : "text-muted-foreground"
                      }`}
                    >
                      {formData.isActive ? "Active" : "Hidden"}
                    </span>
                    <Switch
                      checked={formData.isActive}
                      onCheckedChange={(checked) =>
                        updateFormData({ isActive: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 mx-auto max-w-4xl py-8">
      <StepIndicator steps={STEPS} currentStep={currentStep} />

      <div className="bg-card rounded-2xl shadow-sm border border-border mt-6 overflow-hidden">
        <div className="p-6 sm:p-8">{renderStepContent()}</div>

        <div className="bg-muted/30 px-6 sm:px-8 py-4 border-t border-border flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 1 || isSubmitting}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep === STEPS.length ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="gap-2 bg-primary hover:bg-primary/90 min-w-[140px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  {isEditMode ? "Update Profile" : "Create Profile"}
                </>
              )}
            </Button>
          ) : (
            <Button onClick={nextStep} className="gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
