import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import StepIndicator from "./StepIndicator";
import BasicInfoStep from "./BasicInfoStep";
import ReligionLocationStep from "./ReligionLocationStep";
import CareerStep from "./CareerStep";
import PhotoBioStep from "./PhotoBioStep";
import type { MatrimonyProfile } from "@/types/matrimony";
import { toast } from "sonner";

const STEPS = [
  { id: 1, title: "Basic Info", icon: "👤" },
  { id: 2, title: "Religion & Location", icon: "🏠" },
  { id: 3, title: "Career", icon: "💼" },
  { id: 4, title: "Photos & Bio", icon: "📸" },
];

const ProfileForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<MatrimonyProfile>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

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
          toast("Please fill in all required fields.");
          return false;
        }
        if (formData.height < 100 || formData.height > 250) {
          toast("Please enter a valid height between 100-250 cm.");
          return false;
        }
        return true;
      case 2:
        if (!formData.religion || !formData.state || !formData.city) {
          toast("Please fill in religion, state, and city.");
          return false;
        }
        return true;
      case 3:
        if (!formData.education || !formData.occupation) {
          toast("Please fill in education and occupation.");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < STEPS.length) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Profile Data:", formData);
    setIsSubmitting(false);
    setIsComplete(true);

    toast("🎉 Profile Created!");
  };

  if (isComplete) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center">
          <Heart className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="text-3xl font-display font-bold text-foreground mb-4">
          Profile Created Successfully!
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Your matrimony profile is now live. We'll notify you when we find
          compatible matches.
        </p>
        <Button
          onClick={() => {
            setIsComplete(false);
            setCurrentStep(1);
            setFormData({});
          }}
          className="bg-primary hover:bg-maroon-dark"
        >
          Create Another Profile
        </Button>
      </div>
    );
  }

  const renderStep = () => {
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
          <PhotoBioStep formData={formData} updateFormData={updateFormData} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full px-6 mx-auto">
      <StepIndicator steps={STEPS} currentStep={currentStep} />

      <div className="bg-card rounded-2xl shadow-matrimony p-6 sm:p-8 border border-border">
        {/* Step Content Rendered Directly */}
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep === STEPS.length ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="gap-2 bg-primary hover:bg-maroon-dark min-w-[140px]"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Create Profile
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              className="gap-2 bg-primary hover:bg-maroon-dark cursor-pointer"
            >
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
