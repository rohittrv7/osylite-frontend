import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Briefcase, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import StepIndicator from "@/components/matrimony/StepIndicator";
import JobBasicStep from "./JobBasicStep";
import JobDetailsStep from "./JobDetailsStep";
import {
  useCreateJobPostMutation,
  useUpdateJobPostMutation,
  type CreateJobPostDto,
  JobType,
  WorkMode,
} from "@/store/api/jobsApi";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const STEPS = [
  { id: 1, title: "Basic Info", icon: "📋" },
  { id: 2, title: "Details", icon: "💼" },
];

interface JobPostFormProps {
  initialData?: any; // Accepting full response object
  jobId?: string;
  isEditMode?: boolean;
}

const JobPostForm = ({
  initialData,
  jobId,
  isEditMode = false,
}: JobPostFormProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<
    Partial<CreateJobPostDto> & { isActive?: boolean }
  >({
    skillsRequired: [],
    jobType: JobType.FULL_TIME,
    workMode: WorkMode.ON_SITE,
    minSalary: 0,
    maxSalary: 0,
    vacancies: 1,
    jobTitle: "",
    roleCategory: "",
    description: "",
    city: "",
    state: "",
    address: "",
    experienceRequired: "",
    isActive: true, // Default active for new jobs
  });

  const [isComplete, setIsComplete] = useState(false);

  const [createPost, { isLoading: isCreating }] = useCreateJobPostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdateJobPostMutation();

  const isSubmitting = isCreating || isUpdating;

  // Sync initialData for Edit Mode
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        jobTitle: initialData.jobTitle,
        roleCategory: initialData.roleCategory,
        description: initialData.description,
        city: initialData.city,
        state: initialData.state,
        address: initialData.address,
        minSalary: initialData.minSalary,
        maxSalary: initialData.maxSalary,
        jobType: initialData.jobType,
        workMode: initialData.workMode,
        skillsRequired: initialData.skillsRequired,
        experienceRequired: initialData.experienceRequired,
        vacancies: initialData.vacancies,
        isActive: initialData.isActive ?? true, // Sync Active Status
      }));
    }
  }, [initialData]);

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (
          !formData.jobTitle ||
          !formData.roleCategory ||
          !formData.jobType ||
          !formData.state ||
          !formData.city
        ) {
          toast.error("Please fill all required basic fields");
          return false;
        }
        return true;
      case 2:
        if (
          !formData.minSalary ||
          !formData.experienceRequired ||
          !formData.description ||
          !formData.vacancies
        ) {
          toast.error(
            "Please fill description, experience, salary and vacancies",
          );
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
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = async () => {
    // Payload Construction
    const payload: any = {
      jobTitle: formData.jobTitle!,
      roleCategory: formData.roleCategory!,
      description: formData.description!,
      city: formData.city!,
      state: formData.state!,
      address: formData.address || "",
      minSalary: Number(formData.minSalary),
      maxSalary: Number(formData.maxSalary),
      jobType: formData.jobType!,
      workMode: formData.workMode!,
      skillsRequired: formData.skillsRequired || [],
      experienceRequired: formData.experienceRequired!,
      vacancies: Number(formData.vacancies),
    };

    // Add isActive to payload if in Edit Mode
    if (isEditMode) {
      payload.isActive = formData.isActive;
    }

    try {
      if (isEditMode && jobId) {
        // --- UPDATE FLOW ---
        await updatePost({ jobId, body: payload }).unwrap();
        toast.success("Job Updated Successfully!");
        navigate("/jobs/my-posts");
      } else {
        // --- CREATE FLOW ---
        await createPost(payload).unwrap();
        toast.success("Job Posted Successfully!");
        setIsComplete(true);
      }
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };

  // Success Screen (Only shown for Create Job flow now)
  if (isComplete) {
    return (
      <div className="mx-auto text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Job Posted! 🎉
        </h2>
        <p className="text-muted-foreground mb-6">
          Your job is now live. Candidates will start applying soon.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={() => navigate("/jobs/my-posts")}>
            Go to My Jobs
          </Button>
          <Button
            onClick={() => {
              setIsComplete(false);
              setCurrentStep(1);
              setFormData({
                skillsRequired: [],
                jobType: JobType.FULL_TIME,
                workMode: WorkMode.ON_SITE,
                minSalary: 0,
                maxSalary: 0,
                vacancies: 1,
                jobTitle: "",
                roleCategory: "",
                description: "",
                city: "",
                state: "",
                address: "",
                experienceRequired: "",
                isActive: true,
              });
            }}
          >
            Post Another Job
          </Button>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    if (currentStep === 1)
      return <JobBasicStep data={formData} onChange={setFormData} />;

    if (currentStep === 2)
      return (
        <div className="space-y-8">
          <JobDetailsStep data={formData} onChange={setFormData} />

          {isEditMode && (
            <div className="pt-6 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-semibold text-foreground">
                    Job Post Status
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {formData.isActive
                      ? "This job is currently LIVE and visible to candidates."
                      : "This job is CLOSED and hidden from search results."}
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-muted/30 p-2 pr-4 rounded-full border border-border">
                  {/* Indicator Dot */}
                  <span
                    className={`flex h-3 w-3 rounded-full ${formData.isActive ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-gray-400"}`}
                  />

                  <span className="text-sm font-medium min-w-[3rem]">
                    {formData.isActive ? "Active" : "Closed"}
                  </span>

                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isActive: checked })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      );

    return null;
  };

  return (
    <div className="mx-auto">
      <div className="bg-card rounded-2xl shadow-elegant border border-border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-background" />
            </div>
            <div className="text-background">
              <h2 className="text-lg font-display font-bold">
                {isEditMode ? "Edit Job Post" : "Post a Job"}
              </h2>
              <p className="opacity-90 text-sm">
                {isEditMode
                  ? "Update details & settings"
                  : "Find the right candidates"}
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
        <div className="px-6 py-4 border-t border-border bg-muted/30 flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={isSubmitting}
            className="gap-2 hover:bg-background"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentStep === 1 && isEditMode ? "Cancel" : "Back"}
          </Button>

          <Button
            onClick={handleNext}
            disabled={isSubmitting}
            className="gap-2 shadow-sm cursor-pointer"
          >
            {isSubmitting ? (
              "Saving..."
            ) : currentStep === STEPS.length ? (
              isEditMode ? (
                "Update Job"
              ) : (
                "Post Job"
              )
            ) : (
              <>
                Next <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobPostForm;
