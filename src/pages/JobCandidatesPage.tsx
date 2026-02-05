import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Users, Sparkles } from "lucide-react";
import {
  useGetJobApplicantsQuery,
  useGetMatchingCandidatesQuery,
} from "@/store/api/jobsApi";
import { ApplicantCard } from "@/components/job/ApplicantCard";
import { MatchingCandidateCard } from "@/components/job/MatchingCandidateCard";

const JobCandidatesPage = () => {
  const { jobId } = useParams(); // Get ID from URL: /jobs/manage/:jobId
  const navigate = useNavigate();

  const { data: applicants = [], isLoading: loadingApplicants } =
    useGetJobApplicantsQuery(jobId || "", { skip: !jobId });

  // 2. Fetch Matching Candidates
  const { data: matches = [], isLoading: loadingMatches } =
    useGetMatchingCandidatesQuery(jobId || "", { skip: !jobId });

  if (!jobId) return <div className="p-8 text-center">Invalid Job ID</div>;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background border-b px-4 py-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">Manage Candidates</h1>
            <p className="text-xs text-muted-foreground">
              Review applications and find talent
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="applicants" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="applicants" className="gap-2">
              <Users className="w-4 h-4" />
              Applicants ({applicants.length})
            </TabsTrigger>
            <TabsTrigger value="matches" className="gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              Suggested ({matches.length})
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: APPLICANTS */}
          <TabsContent value="applicants" className="space-y-4">
            {loadingApplicants ? (
              <div className="flex justify-center py-10">
                <Loader2 className="animate-spin" />
              </div>
            ) : applicants.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-lg">
                No applications received yet.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {applicants.map((app) => (
                  <ApplicantCard key={app.applicationId} app={app} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* TAB 2: SUGGESTED MATCHES */}
          <TabsContent value="matches" className="space-y-4">
            {loadingMatches ? (
              <div className="flex justify-center py-10">
                <Loader2 className="animate-spin" />
              </div>
            ) : matches.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-lg">
                No matching candidates found automatically.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {matches.map((candidate) => (
                  <MatchingCandidateCard
                    key={candidate.id}
                    candidate={candidate}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default JobCandidatesPage;
