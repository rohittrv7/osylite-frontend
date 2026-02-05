import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Sparkles, UserPlus } from "lucide-react";
import type { MatchingCandidateDto } from "@/store/api/jobsApi";

interface MatchCardProps {
  candidate: MatchingCandidateDto;
}

export const MatchingCandidateCard = ({ candidate }: MatchCardProps) => {
  const fullName = `${candidate.user.firstName} ${candidate.user.lastName || ""}`;

  return (
    <Card className="border-dashed border-primary/30 bg-primary/5">
      <CardHeader className="flex flex-row items-start gap-4 pb-3">
        <Avatar className="h-12 w-12 border border-primary/20">
          <AvatarImage src={candidate.user.avatarUrl} />
          <AvatarFallback className="bg-background text-primary font-bold">
            {candidate.user.firstName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">{fullName}</h3>
            <Badge
              variant="default"
              className="text-[10px] h-5 px-1.5 gap-1 bg-purple-600 hover:bg-purple-700"
            >
              <Sparkles className="w-2 h-2" /> Match
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground font-medium flex items-center gap-1">
            <Briefcase className="w-3 h-3" /> {candidate.currentJobTitle}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Experience: {candidate.totalExperienceYears} Years
          </p>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-2">
          {candidate.skills.slice(0, 5).map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="text-xs bg-background/50"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-2 border-t border-primary/10">
        <Button
          size="sm"
          className="w-full gap-2 bg-primary text-background hover:bg-primary/90"
        >
          <UserPlus className="w-4 h-4" /> Invite to Apply
        </Button>
      </CardFooter>
    </Card>
  );
};
