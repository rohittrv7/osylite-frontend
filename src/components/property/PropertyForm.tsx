import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import StepIndicator from "@/components/matrimony/StepIndicator";
import PropertyTypeStep from "./PropertyTypeStep";
import PropertyLocationStep from "./PropertyLocationStep";
import PropertyDetailsStep from "./PropertyDetailsStep";
import PropertyDescriptionStep from "./PropertyDescriptionStep";
import { PropertyCategory, type Property } from "@/types/property";

const STEPS = [
  { id: 1, title: "Type", icon: "🏠" },
  { id: 2, title: "Location", icon: "📍" },
  { id: 3, title: "Details", icon: "📋" },
  { id: 4, title: "Photos", icon: "📸" },
];

const PropertyForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Property>>({
    details: { areaSqFt: 0 },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.listingType || !formData.category) {
          toast.error("Please select listing type and property type");
          return false;
        }
        return true;
      case 2:
        if (
          !formData.title ||
          !formData.city ||
          !formData.locality ||
          !formData.price
        ) {
          toast.error("Please fill all required fields");
          return false;
        }
        return true;
      case 3:
        if (!formData.details?.areaSqFt) {
          toast.error("Please enter property area");
          return false;
        }
        if (
          formData.category !== PropertyCategory.PLOT &&
          !formData.details?.bhk
        ) {
          toast.error("Please select BHK");
          return false;
        }
        return true;
      case 4:
        if (!formData.description) {
          toast.error("Please add property description");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsComplete(true);
    toast.success("Property listed successfully!");
  };

  if (isComplete) {
    return (
      <div className="mx-auto text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Property Listed! 🎉
        </h2>
        <p className="text-muted-foreground mb-6">
          Your property is now live. Interested buyers/tenants will contact you
          soon.
        </p>
        <Button
          onClick={() => {
            setIsComplete(false);
            setCurrentStep(1);
            setFormData({ details: { areaSqFt: 0 } });
          }}
        >
          List Another Property
        </Button>
      </div>
    );
  }

  // Helper to render the current step content
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PropertyTypeStep data={formData} onChange={setFormData} />;
      case 2:
        return <PropertyLocationStep data={formData} onChange={setFormData} />;
      case 3:
        return <PropertyDetailsStep data={formData} onChange={setFormData} />;
      case 4:
        return (
          <PropertyDescriptionStep data={formData} onChange={setFormData} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-6 mx-auto">
      <div className="bg-card rounded-2xl shadow-elegant border border-border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-backgroud/20 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-background" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-background">
                Post Your Property
              </h2>
              <p className="text-background/80 text-sm">
                Find tenants or buyers quickly
              </p>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-4 border-b border-border">
          <StepIndicator steps={STEPS} currentStep={currentStep} />
        </div>

        {/* Form Content */}
        <div className="p-6">{renderStep()}</div>

        {/* Navigation */}
        <div className="px-6 py-4 border-t border-border bg-muted/30 flex justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              "Posting..."
            ) : currentStep === STEPS.length ? (
              "Post Property"
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;
