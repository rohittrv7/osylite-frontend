import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Briefcase,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import StepIndicator from "@/components/matrimony/StepIndicator";
import { Card } from "@/components/ui/card";

// Steps Components
import CandidateBasicStep from "./CandidateBasicStep";
import CandidateSkillsStep from "./CandidateSkillsStep";
import CandidateHistoryStep from "./CandidateHistoryStep";
import RecruiterBasicStep from "./RecruiterBasicStep";
import RecruiterLocationStep from "./RecruiterLocationStep";

import {
  useCreateOrUpdateProfileMutation,
  JobProfileType,
  type CreateJobProfileDto,
} from "@/store/api/jobsApi";
import { useGetProfileQuery } from "@/store/api/authApi"; // Auth API se profile data
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";

// Step Configurations
const RECRUITER_STEPS = [
  { id: 1, title: "Company Info", icon: "🏢" },
  { id: 2, title: "Location", icon: "📍" },
];

const CANDIDATE_STEPS = [
  { id: 1, title: "Basic Info", icon: "👤" },
  { id: 2, title: "Skills", icon: "💡" },
  { id: 3, title: "History", icon: "🎓" },
];

const JobProfileForm = () => {
  const navigate = useNavigate();

  // 1. Get User Profile Data
  const { data: user, isLoading: isUserLoading } = useGetProfileQuery();

  const [profileTypeSelected, setProfileTypeSelected] =
    useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Unified Form State
  const [formData, setFormData] = useState<Partial<CreateJobProfileDto>>({
    profileType: JobProfileType.CANDIDATE,
    skills: [],
    workHistory: [],
    education: [],
    hiringFocus: [],
  });

  const [createProfile, { isLoading: isSubmitting }] =
    useCreateOrUpdateProfileMutation();

  const steps =
    formData.profileType === JobProfileType.CANDIDATE
      ? CANDIDATE_STEPS
      : RECRUITER_STEPS;

  // --- Validation Logic ---
  const validateStep = (step: number): boolean => {
    if (formData.profileType === JobProfileType.CANDIDATE) {
      if (
        step === 1 &&
        (!formData.currentJobTitle ||
          !formData.totalExperienceYears ||
          !formData.aboutMe)
      ) {
        toast.error("Please fill all required fields");
        return false;
      }
      if (step === 2 && (!formData.skills || formData.skills.length === 0)) {
        toast.error("Please add at least one skill");
        return false;
      }
    } else {
      if (
        step === 1 &&
        (!formData.companyName ||
          !formData.designation ||
          !formData.hiringIndustry)
      ) {
        toast.error("Company details are required");
        return false;
      }
      if (step === 2 && (!formData.operatingCity || !formData.officialEmail)) {
        toast.error("Location and Email are required");
        return false;
      }
    }
    return true;
  };

  // --- Handlers ---
  const handleTypeSelection = (type: JobProfileType) => {
    setFormData((prev) => ({ ...prev, profileType: type }));
    setProfileTypeSelected(true);
    setCurrentStep(1);
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
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
      setProfileTypeSelected(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await createProfile(formData as CreateJobProfileDto).unwrap();
      toast.success("Profile created successfully!");
      // Successful hone par RTK Query cache update karega aur
      // component re-render hoga, tab `user.isJobProfileCreated` true ho jayega.
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };

  // --- RENDER LOGIC ---

  // 1. Loading State
  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // 2. IF PROFILE EXISTS -> Show Actions (Post Job / Apply)
  if (user?.isJobProfileCreated) {
    const isRecruiter = user.jobProfileType === JobProfileType.RECRUITER;

    return (
      <div className="mx-auto text-center py-12 px-4 max-w-lg">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>

        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Profile Active!
        </h2>

        <p className="text-muted-foreground mb-8">
          {isRecruiter
            ? "Your company profile is set up. You can now post job vacancies and hire talent."
            : "Your candidate profile is live. You can now apply for jobs and get discovered."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isRecruiter ? (
            <>
              <Button
                onClick={() => navigate("/post-job")}
                className="w-full sm:w-auto gap-2"
              >
                <Briefcase className="w-4 h-4" /> Post a New Job
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/jobs/feed")}
                className="w-full sm:w-auto"
              >
                Find Candidates
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/jobs/feed")}
                className="w-full sm:w-auto gap-2"
              >
                <Briefcase className="w-4 h-4" /> Find Jobs
              </Button>
              <Button
                variant="outline"
                // Navigate to edit profile page if you have one, or just show toast
                onClick={() => toast.info("Edit Profile feature coming soon!")}
                className="w-full sm:w-auto"
              >
                View Profile
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  // 3. IF NO PROFILE -> Show Type Selection
  if (!profileTypeSelected) {
    return (
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">
          What are you looking for?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Candidate Option */}
          <Card
            className="p-8 cursor-pointer hover:border-blue-500 transition-all flex flex-col items-center text-center gap-4 hover:shadow-md group"
            onClick={() => handleTypeSelection(JobProfileType.CANDIDATE)}
          >
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">I want a Job</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Create a candidate profile to showcase your skills and resume.
              </p>
            </div>
          </Card>

          {/* Recruiter Option */}
          <Card
            className="p-8 cursor-pointer hover:border-purple-500 transition-all flex flex-col items-center text-center gap-4 hover:shadow-md group"
            onClick={() => handleTypeSelection(JobProfileType.RECRUITER)}
          >
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <Briefcase className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">I want to Hire</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Create a company profile to post jobs and find talent.
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // 4. IF TYPE SELECTED -> Show Dynamic Form Steps
  const renderStepContent = () => {
    if (formData.profileType === JobProfileType.CANDIDATE) {
      switch (currentStep) {
        case 1:
          return <CandidateBasicStep data={formData} onChange={setFormData} />;
        case 2:
          return <CandidateSkillsStep data={formData} onChange={setFormData} />;
        case 3:
          return (
            <CandidateHistoryStep data={formData} onChange={setFormData} />
          );
        default:
          return null;
      }
    } else {
      switch (currentStep) {
        case 1:
          return <RecruiterBasicStep data={formData} onChange={setFormData} />;
        case 2:
          return (
            <RecruiterLocationStep data={formData} onChange={setFormData} />
          );
        default:
          return null;
      }
    }
  };

  return (
    <div className="px-4 md:px-8 mx-auto max-w-2xl">
      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
              {formData.profileType === JobProfileType.CANDIDATE ? (
                <User size={20} />
              ) : (
                <Briefcase size={20} />
              )}
            </div>
            <div className="text-white">
              <h2 className="text-lg font-bold capitalize">
                {formData.profileType === JobProfileType.CANDIDATE
                  ? "Candidate Profile"
                  : "Recruiter Profile"}
              </h2>
              <p className="text-white/80 text-sm">
                Step {currentStep} of {steps.length}
              </p>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-4 border-b border-border">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>

        {/* Form Content */}
        <div className="p-6">{renderStepContent()}</div>

        {/* Navigation */}
        <div className="px-6 py-4 border-t border-border bg-muted/30 flex justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={isSubmitting}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={isSubmitting}
            className="gap-2"
          >
            {isSubmitting
              ? "Saving..."
              : currentStep === steps.length
                ? "Finish & Create"
                : "Next"}
            {!isSubmitting && currentStep !== steps.length && (
              <ArrowRight className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobProfileForm;
