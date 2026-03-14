import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, FileText, Calendar, GraduationCap } from "lucide-react";
import { format } from "date-fns";
import type { ApplicantDto } from "@/store/api/jobsApi";
import { maskEmail } from "@/helpers/changemail";

interface ApplicantCardProps {
  app: ApplicantDto;
}

export const ApplicantCard = ({ app }: ApplicantCardProps) => {
  const { candidate } = app;
  const profile = candidate.profile;

  return (
    <Card className="hover:border-primary/50 transition-all duration-200">
      <CardHeader className="flex flex-row items-start gap-4 pb-3">
        <Avatar className="h-14 w-14 border">
          <AvatarImage src={candidate.avatar} alt={candidate.name} />
          <AvatarFallback className="bg-primary/10 text-primary font-bold">
            {candidate.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold">{candidate.name}</h3>
              <p className="text-sm text-muted-foreground font-medium">
                {profile?.title || "No Title"} • {profile?.experience || 0}{" "}
                Years Exp
              </p>
            </div>
            <Badge variant={app.status === "Applied" ? "secondary" : "outline"}>
              {app.status}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" /> {maskEmail(candidate.email)}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" /> {candidate.phone}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Applied:{" "}
              {format(new Date(app.appliedAt), "dd MMM yyyy")}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pb-3">
        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {profile?.skills.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="text-xs bg-muted/20"
            >
              {skill}
            </Badge>
          ))}
        </div>

        {/* Education Highlight */}
        {profile?.education && profile.education.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/10 p-2 rounded">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span>
              {profile.education[0].degree}, {profile.education[0].college}
            </span>
          </div>
        )}

        {/* Cover Letter Snippet */}
        {app.coverLetter && (
          <div className="text-sm text-muted-foreground border-l-2 pl-3 italic line-clamp-2">
            "{app.coverLetter}"
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2 border-t flex gap-3">
        {profile?.resumeUrl ? (
          <Button
            className="flex-1 gap-2"
            variant="default"
            onClick={() => window.open(profile.resumeUrl, "_blank")}
          >
            <FileText className="w-4 h-4" /> View Resume
          </Button>
        ) : (
          <Button className="flex-1" variant="secondary" disabled>
            No Resume
          </Button>
        )}
        <Button variant="outline" className="flex-1">
          Contact
        </Button>
      </CardFooter>
    </Card>
  );
};
