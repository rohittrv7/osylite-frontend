import { useState } from "react"; // 1. Import useState
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog"; // 2. Import Dialog
import { Badge } from "@/components/ui/badge";
import type { MatrimonyProfile } from "@/types/matrimony";
import {
  Edit2,
  User,
  MapPin,
  Briefcase,
  Heart,
  CheckCircle2,
  XCircle,
  Camera,
} from "lucide-react";

interface ProfileViewProps {
  profile: MatrimonyProfile;
  onEdit: () => void;
}

const ProfileView = ({ profile, onEdit }: ProfileViewProps) => {
  // 3. State for handling the selected image for preview
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 animate-in fade-in duration-500">
      {/* ... Header Section (Same as before) ... */}
      <div className="text-center py-8 relative bg-card rounded-2xl border border-border shadow-sm p-6">
        {/* ... (Header Content) ... */}
        <div className="absolute top-4 right-4">
          {profile?.isActive ? (
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 gap-1.5 px-3 py-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active Profile
            </Badge>
          ) : (
            <Badge variant="secondary" className="gap-1.5 px-3 py-1">
              <XCircle className="w-3.5 h-3.5" /> Hidden
            </Badge>
          )}
        </div>

        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center overflow-hidden border-4 border-background shadow-lg ring-1 ring-border">
          {profile?.photos && profile.photos.length > 0 ? (
            <img
              src={profile.photos[0]}
              alt="Profile Main"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-16 h-16 text-muted-foreground/50" />
          )}
        </div>

        <h1 className="text-3xl font-display font-bold text-foreground">
          {profile?.profileFor === "Self"
            ? "My Profile"
            : `${profile?.profileFor}'s Profile`}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
          {profile?.isActive
            ? "Your profile is currently live and visible to potential matches."
            : "Your profile is hidden. Activate it to start connecting."}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* --- Basic Info Card --- */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-foreground/80">
              <User className="w-5 h-5 text-primary" /> Basic Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 text-sm border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Profile For</span>
              <span className="font-medium text-right">
                {profile?.profileFor}
              </span>
            </div>
            <div className="grid grid-cols-2 text-sm border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Gender</span>
              <span className="font-medium text-right">{profile?.gender}</span>
            </div>
            <div className="grid grid-cols-2 text-sm border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Date of Birth</span>
              <span className="font-medium text-right">{profile?.dob}</span>
            </div>
            <div className="grid grid-cols-2 text-sm pt-1">
              <span className="text-muted-foreground">Height</span>
              <span className="font-medium text-right">
                {profile?.height} cm
              </span>
            </div>
          </CardContent>
        </Card>

        {/* --- Background Card --- */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-foreground/80">
              <MapPin className="w-5 h-5 text-primary" /> Background
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 text-sm border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Religion</span>
              <span className="font-medium text-right">
                {profile?.religion}
              </span>
            </div>
            <div className="grid grid-cols-2 text-sm border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Caste</span>
              <span className="font-medium text-right">
                {profile?.caste || "Not Specified"}
              </span>
            </div>
            <div className="grid grid-cols-2 text-sm pt-1">
              <span className="text-muted-foreground">Location</span>
              <span className="font-medium text-right">
                {profile?.city}, {profile?.state}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* --- Career Card --- */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-foreground/80">
              <Briefcase className="w-5 h-5 text-primary" /> Education & Career
            </CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Education
              </p>
              <p className="font-medium text-base">{profile?.education}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Occupation
              </p>
              <p className="font-medium text-base">{profile?.occupation}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Annual Income
              </p>
              <p className="font-medium text-base text-green-600">
                {profile?.annualIncome || "Not Specified"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* --- Bio Card --- */}
        <Card className="md:col-span-2 bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-primary">
              <Heart className="w-5 h-5" /> About
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/80 leading-relaxed italic">
              "{profile?.bio || "No description added yet."}"
            </p>
          </CardContent>
        </Card>

        {/* --- Photos Gallery Card --- */}
        <Card className="md:col-span-2 overflow-hidden">
          <CardHeader className="border-b bg-muted/20 pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" /> Photo Gallery
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {profile?.photos && profile.photos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {profile.photos.map((photo, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedPhoto(photo)} // 4. Click Handler
                    className="aspect-square rounded-xl overflow-hidden border border-border bg-muted relative group cursor-pointer hover:shadow-md transition-all"
                  >
                    <img
                      src={photo}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Hover Overlay Icon */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-xl border border-dashed">
                <p>No photos uploaded yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center pt-8 pb-10">
        <Button
          onClick={onEdit}
          className="gap-2 px-10 h-12 text-base shadow-lg hover:shadow-xl transition-all"
          size="lg"
        >
          <Edit2 className="w-4 h-4" /> Edit Profile Details
        </Button>
      </div>

      {/* 5. IMAGE PREVIEW MODAL */}
      <Dialog
        open={!!selectedPhoto}
        onOpenChange={() => setSelectedPhoto(null)}
      >
        <DialogContent className="max-w-screen-lg w-full h-[85vh] p-0 bg-black/90 border-none shadow-none flex items-center justify-center outline-none">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Image */}
            {selectedPhoto && (
              <img
                src={selectedPhoto}
                alt="Preview"
                className="w-full h-full object-contain max-h-[80vh] rounded-md"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileView;
