import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, User, ArrowRight, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { MatrimonyProfile } from "@/types/matrimony";

// Helper to calculate age from DOB
const getAge = (dob: string) => {
  const birthDate = new Date(dob);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const MatrimonyCard = ({ profile }: { profile: MatrimonyProfile }) => {
  const navigate = useNavigate();
  const mainPhoto = profile.photos?.[0] || "";

  return (
    <Card className="group overflow-hidden rounded-2xl border border-border/60 bg-background hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      {/* ===== Image Section ===== */}
      <div className="relative aspect-[5/4] overflow-hidden bg-muted">
        {mainPhoto ? (
          <img
            src={mainPhoto}
            alt="Profile"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary/30">
            <User className="w-20 h-20 text-muted-foreground/40" />
          </div>
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Top Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-green-600/90 text-white text-xs px-2 py-0.5 rounded-full">
            ✔ Verified
          </Badge>
        </div>

        {/* Bottom Overlay Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white space-y-1">
          <h3 className="text-lg font-semibold">
            {getAge(profile.dob)} Yrs • {profile.height} cm
          </h3>

          <p className="text-xs flex items-center gap-1.5 text-white/90">
            <Briefcase className="w-3.5 h-3.5" />
            {profile.occupation}
          </p>

          <p className="text-xs flex items-center gap-1.5 text-white/80">
            <MapPin className="w-3.5 h-3.5" />
            {profile.city}, {profile.state}
          </p>
        </div>
      </div>

      {/* ===== Content ===== */}
      <CardContent className="px-4 py-0 space-y-3">
        {/* Name */}
        <div className="fle items-center justify-between">
          <h3 className="text-lg font-semibold leading-tight">
            {profile?.user?.fullName ??
              `${profile?.user?.firstName} ${profile?.user?.lastName}`}
          </h3>
          <h3 className="text-sm flex gap-1 items-center text-accent-foreground font-semibold leading-tight">
            <Phone className="w-4 h-4" />
            {profile?.user?.phoneNumber}
          </h3>

          {/* <Heart className="w-5 h-5 text-muted-foreground hover:text-rose-500 cursor-pointer transition-colors" /> */}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-xs">
          <Badge className="bg-background font-normal text-foreground">
            {profile.religion}
          </Badge>
          {profile.caste && (
            <Badge className="bg-background font-normal text-foreground">
              {profile.caste}
            </Badge>
          )}
          <Badge className="bg-background font-normal text-foreground">
            {profile.education}
          </Badge>
        </div>
      </CardContent>

      {/* ===== CTA ===== */}
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full rounded-xl font-medium gap-2 transition-all group-hover:bg-primary group-hover:text-white"
          variant="outline"
          onClick={() => navigate(`/matrimony/profile/${profile.id}`)}
        >
          View Full Profile
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MatrimonyCard;
