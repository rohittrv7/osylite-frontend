import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Briefcase, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import StepIndicator from "@/components/matrimony/StepIndicator";
import JobBasicStep from "./JobBasicStep";
import JobDetailsStep from "./JobDetailsStep";
import type { JobPost } from "@/types/job";

const STEPS = [
  { id: 1, title: "Basic Info", icon: "📋" },
  { id: 2, title: "Details", icon: "💼" },
];

const JobPostForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<JobPost>>({
    skills: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (
          !formData.jobTitle ||
          !formData.companyName ||
          !formData.jobType ||
          !formData.roleCategory ||
          !formData.state ||
          !formData.city
        ) {
          toast.error("Please fill all required fields");
          return false;
        }
        return true;
      case 2:
        if (
          !formData.minSalary ||
          !formData.experienceRequired ||
          !formData.description
        ) {
          toast.error("Please fill all required fields");
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
    toast.success("Job posted successfully!");
  };

  if (isComplete) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Job Posted! 🎉
        </h2>
        <p className="text-muted-foreground mb-6">
          Your job is now live. Candidates will start applying soon.
        </p>
        <Button
          onClick={() => {
            setIsComplete(false);
            setCurrentStep(1);
            setFormData({ skills: [] });
          }}
        >
          Post Another Job
        </Button>
      </div>
    );
  }

  // Helper to render the correct step component
  const renderStep = () => {
    if (currentStep === 1) {
      return <JobBasicStep data={formData} onChange={setFormData} />;
    }
    if (currentStep === 2) {
      return <JobDetailsStep data={formData} onChange={setFormData} />;
    }
    return null;
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-card rounded-2xl shadow-elegant border border-border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-white">
                Post a Job
              </h2>
              <p className="text-white/80 text-sm">Find the right candidates</p>
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
              "Post Job"
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

export default JobPostForm;
