import { useGetMyPostedJobsQuery } from "@/store/api/jobsApi";
import JobCard from "@/components/job/JobCard";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecruiterJobsPage = () => {
  const navigate = useNavigate();

  // Fetch recruiter's own jobs
  const { data: myJobs, isLoading } = useGetMyPostedJobsQuery();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background border-b px-4 py-6">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              My Job Postings
            </h1>
            <p className="text-muted-foreground">
              Manage your active listings and applications
            </p>
          </div>
          <Button
            onClick={() => navigate("/post-job")}
            className="gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Post New Job
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : myJobs && myJobs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myJobs.map((job) => (
              <JobCard key={job.id} job={job} isRecruiter={true} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed rounded-xl bg-background">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No Jobs Posted Yet</h3>
            <p className="text-muted-foreground mt-1 mb-6">
              Post your first job to start hiring talent.
            </p>
            <Button onClick={() => navigate("/jobs/create-post")}>
              Create Job Post
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterJobsPage;
