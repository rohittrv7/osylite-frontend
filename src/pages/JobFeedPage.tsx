import { useState } from "react";
import {
  useApplyForJobMutation,
  useGetRecommendedJobsQuery,
  useSearchJobsQuery,
  type JobSearchDto,
} from "@/store/api/jobsApi";
import JobCard from "@/components/job/JobCard";
import JobFilters from "@/components/job/JobFilters";
import { Loader2, SearchX } from "lucide-react";
import { toast } from "sonner";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";

const JobFeedPage = () => {
  const [filters, setFilters] = useState<JobSearchDto>({});

  const hasFilters = Object.values(filters).some(
    (val) => val !== "" && val !== undefined && val !== 0,
  );

  const { data: recommendedJobs, isLoading: loadingRecs } =
    useGetRecommendedJobsQuery(undefined, { skip: hasFilters });

  const [applyForJob] = useApplyForJobMutation();

  const {
    data: searchResults,
    isLoading: loadingSearch,
    isFetching: fetchingSearch,
  } = useSearchJobsQuery(filters, { skip: !hasFilters });

  const isLoading = loadingRecs || loadingSearch || fetchingSearch;
  const jobs = hasFilters ? searchResults : recommendedJobs;

  const handleApply = async (jobId: string) => {
    try {
      const payload = { coverLetter: "" };

      await applyForJob({ jobId, body: payload }).unwrap();

      toast.success("Application Sent Successfully! 🎉");
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="border-b pb-8 pt-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-foreground">
            Find Your Dream <span className="text-primary">Job</span>
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Explore thousands of job opportunities matching your skills and
            preferences.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <JobFilters filters={filters} onFilterChange={setFilters} />
          </aside>

          {/* Main Feed */}
          <main className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {hasFilters ? "Search Results" : "Recommended for You"}
              </h2>
              <span className="text-sm text-muted-foreground">
                {jobs?.length || 0} Jobs found
              </span>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground mt-4">
                  Finding the best jobs...
                </p>
              </div>
            ) : jobs && jobs.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} onApply={handleApply} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/10">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchX className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No Jobs Found</h3>
                <p className="text-muted-foreground mt-1">
                  Try adjusting your search filters or check back later.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default JobFeedPage;
