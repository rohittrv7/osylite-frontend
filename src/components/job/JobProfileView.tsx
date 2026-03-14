import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Briefcase,
  MapPin,
  Mail,
  Globe,
  Pencil,
  Building2,
  FileText,
  Plus,
  LayoutDashboard,
  User2,
} from "lucide-react";
import { JobProfileType } from "@/store/api/jobsApi";
import { useNavigate } from "react-router-dom";
import type { User, workHistory } from "@/types/user";
import { maskEmail } from "@/helpers/changemail";

interface JobProfileViewProps {
  user: User; // Using API User type here ideally
  onEdit: () => void;
}

const JobProfileView = ({ user, onEdit }: JobProfileViewProps) => {
  const navigate = useNavigate();
  const profile = user?.jobProfile;
  const isRecruiter = user?.jobProfileType === JobProfileType.RECRUITER;

  if (!profile) return null;

  // --- 1. RECRUITER VIEW ---
  if (isRecruiter) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto py-8 px-4">
        {/* Company Header Card */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl">{profile.companyName}</CardTitle>
              <p className="text-muted-foreground font-medium">
                {profile.designation}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="gap-2"
            >
              <Pencil className="w-4 h-4" /> Edit
            </Button>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 text-sm mt-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Briefcase className="w-4 h-4" /> {profile.hiringIndustry}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" /> {profile.operatingCity}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4" /> {maskEmail(profile?.officialEmail)}
            </div>
            {profile.companyWebsite && (
              <div className="flex items-center gap-2 text-blue-600">
                <Globe className="w-4 h-4" />
                <a
                  href={profile.companyWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  Company Website
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">About Company</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {profile.aboutMe}
            </p>
          </CardContent>
        </Card>

        {/* Address Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Office Address</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {profile.companyAddress}
            </p>
          </CardContent>
        </Card>

        {/* Hiring Focus */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="text-lg">Hiring For</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.hiringFocus?.map((role: string, idx: number) => (
                <Badge key={idx} variant="secondary">
                  {role}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card> */}

        {/* Actions */}
        <div className="flex gap-4 justify-center pt-4">
          <Button onClick={() => navigate("/post-job")} className="gap-2">
            <Plus className="w-4 h-4" /> Post New Job
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/jobs/my-posts")}
            className="gap-2"
          >
            <LayoutDashboard className="w-4 h-4" /> Manage Jobs
          </Button>
        </div>
      </div>
    );
  }

  // --- 2. CANDIDATE VIEW ---
  return (
    <div className="space-y-6 max-w-3xl mx-auto py-8 px-4">
      {/* Profile Header */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback className="bg-primary/10 text-primary">
              <User2 className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-2xl flex items-center gap-2">
              {user.firstName} {user.lastName}
            </CardTitle>
            <p className="text-primary font-medium text-lg">
              {profile.currentJobTitle}
            </p>
            <p className="text-sm text-muted-foreground">
              {profile.totalExperienceYears} Years Experience •{" "}
              {profile.highestQualification}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="gap-2"
          >
            <Pencil className="w-4 h-4" /> Edit
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mt-2">
            {profile.aboutMe}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.skills?.map((skill: string, idx: number) => (
                <Badge key={idx} variant="outline" className="bg-primary/5">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Career Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expected Salary:</span>
              <span className="font-medium">
                ₹ {profile.expectedSalary || "Not Disclosed"}
              </span>
            </div>
            {profile.resumeUrl && (
              <div className="pt-2">
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline p-2 bg-blue-50 rounded-md"
                >
                  <FileText className="w-4 h-4" /> View Resume
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Work History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Work History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {profile.workHistory && profile.workHistory?.length > 0 ? (
            profile.workHistory.map((job: workHistory, idx: number) => (
              <div
                key={idx}
                className="flex gap-3 pb-4 border-b last:border-0 last:pb-0"
              >
                <div className="mt-1 bg-muted p-2 rounded-full h-fit">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold">{job.role}</h4>
                  <p className="text-sm text-primary font-medium">
                    {job.company}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {job.startDate} — {job.endDate || "Present"}
                  </p>
                  {job.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {job.description}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No work history added.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {/* <div className="flex gap-4 justify-center pt-4">
        <Button
          onClick={() => navigate("/jobs/feed")}
          className="w-full sm:w-auto gap-2 text-lg h-12 px-8"
        >
          <Briefcase className="w-5 h-5" /> Find Matching Jobs
        </Button>
      </div> */}
    </div>
  );
};

export default JobProfileView;
