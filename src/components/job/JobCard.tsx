import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, IndianRupee, Clock, Users, Edit } from "lucide-react";
import { type JobResponse } from "@/store/api/jobsApi";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface JobCardProps {
  job: JobResponse;
  isRecruiter?: boolean;
  onApply?: (jobId: string) => void;
  // Optional callback for delete to refresh parent list
  onDelete?: (jobId: string) => void;
}

const JobCard = ({ job, isRecruiter = false, onApply }: JobCardProps) => {
  const navigate = useNavigate();

  // Hooks for actions
  // const [deleteJob, { isLoading: isDeleting }] = useDeleteJobPostMutation();
  // const [updateJob, { isLoading: isUpdating }] = useUpdateJobPostMutation();

  // 1. Edit Action
  const handleEdit = () => {
    navigate(`/jobs/edit/${job.id}`); // This route opens EditJobPage
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200 border-border/60 relative">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <div className="flex gap-3">
            <Avatar className="h-12 w-12 rounded-lg border">
              <AvatarImage src={job.recruiter?.avatarUrl} />
              <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                {job.companyName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-lg leading-tight text-foreground line-clamp-1">
                {job.jobTitle}
              </h3>
              <p className="text-sm text-muted-foreground font-medium">
                {job.companyName}
              </p>
            </div>
          </div>

          {/* RECRUITER ACTIONS MENU */}
          {isRecruiter ? (
            <div className="cursor-pointer">
              <Edit className="mr-2 h-4 w-4" onClick={handleEdit} />
            </div>
          ) : (
            <Badge
              variant={job.jobType === "Full Time" ? "default" : "secondary"}
            >
              {job.jobType}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-3 space-y-4">
        {/* Key Details */}
        <div className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-primary" />
            {job.city}
          </div>
          <div className="flex items-center gap-1.5">
            <IndianRupee className="h-4 w-4 text-green-600" />
            {job.minSalary.toLocaleString()} - {job.maxSalary.toLocaleString()}
          </div>

          {isRecruiter ? (
            <>
              <div className="flex items-center gap-1.5 text-blue-600 font-medium">
                <Users className="h-4 w-4" />
                {job.applicationsCount} Applicants
              </div>
              <div className="flex items-center gap-1.5">
                <Badge variant="outline" className="text-xs">
                  {job.jobType}
                </Badge>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-orange-500" />
              {formatDistanceToNow(new Date(job.createdAt), {
                addSuffix: true,
              })}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-2 border-t bg-muted/5">
        {isRecruiter ? (
          // Recruiter specific main action
          <Button
            variant="default"
            className="w-full gap-2 cursor-pointer"
            onClick={() => navigate(`/jobs/manage/${job.id}`)}
          >
            <Users className="w-4 h-4" /> Manage Applicants (
            {job.applicationsCount})
          </Button>
        ) : (
          // Seeker view
          <div className="w-full flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              {job.workMode}
            </span>
            <Button size="sm" onClick={() => onApply?.(job.id)}>
              Apply Now
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
