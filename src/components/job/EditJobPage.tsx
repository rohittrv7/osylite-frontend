import { useParams, useNavigate } from "react-router-dom";
import {
  useGetJobByIdQuery,
  // useUpdateJobPostMutation,
} from "@/store/api/jobsApi";
import JobPostForm from "@/components/job/JobPostForm";
import { Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";

const EditJobPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  // 1. Fetch Existing Data
  const {
    data: job,
    isLoading,
    isError,
  } = useGetJobByIdQuery(jobId || "", {
    skip: !jobId,
  });

  // 2. Mutation Hook for Status Update
  // const [updateJob] = useUpdateJobPostMutation();

  // Local state for toggle (synced with job data)
  // const [isActive, setIsActive] = useState(false);

  // Sync state when data loads
  // useEffect(() => {
  //   if (job) {
  //     setIsActive(job.isActive ?? true);
  //   }
  // }, [job]);

  // 3. Handle Toggle Change
  // const handleStatusChange = async (checked: boolean) => {
  //   if (!jobId) return;

  //   // UI Optimistic update (optional, but better to wait for API here)
  //   const previousState = isActive;
  //   setIsActive(checked);

  //   try {
  //     await updateJob({
  //       jobId,
  //       body: { isActive: checked },
  //     }).unwrap();

  //     toast.success(
  //       checked ? "Job is now Live! 🟢" : "Job Closed successfully 🔴",
  //     );
  //   } catch (error) {
  //     setIsActive(previousState);
  //     apiErrorToastHandler(error);
  //   }
  // };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p>Job not found</p>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Main Form Section */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <JobPostForm isEditMode={true} jobId={jobId} initialData={job} />
      </div>
    </div>
  );
};

export default EditJobPage;
