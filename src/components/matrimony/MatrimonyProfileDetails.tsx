import { useParams, useNavigate } from "react-router-dom";
import { useGetMatrimonyProfileByIdQuery } from "@/store/api/matrimonyApi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Ruler,
  GraduationCap,
  Heart,
  Calendar,
  IndianRupee,
  User,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

const MatrimonyProfileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const { data: profile, isLoading } = useGetMatrimonyProfileByIdQuery(
    id || "",
    {
      skip: !id,
    },
  );

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!profile)
    return (
      <div className="h-screen flex items-center justify-center">
        Profile not found
      </div>
    );

  const age = new Date().getFullYear() - new Date(profile.dob).getFullYear();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* 1. Header / Navigation */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b px-4 py-3 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="font-semibold text-lg leading-none">
            {profile.profileFor === "Self"
              ? "Profile Details"
              : `${profile.profileFor}'s Profile`}
          </h1>
          <p className="text-xs text-muted-foreground">
            ID: {profile.id?.slice(0, 8)}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-8">
          {/* 2. Left Column: Photos */}
          <div className="md:col-span-1 space-y-4">
            {/* Main Photo */}
            <div
              className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted shadow-lg cursor-pointer"
              onClick={() => setSelectedPhoto(profile.photos?.[0] || "")}
            >
              <img
                src={
                  profile.photos?.[0] ||
                  "https://placehold.co/400x500?text=No+Photo"
                }
                className="w-full h-full object-cover transition-transform hover:scale-105"
                alt="Main"
              />
            </div>

            {/* Gallery Grid */}
            {profile.photos && profile.photos.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {profile.photos.slice(1).map((photo, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-lg overflow-hidden cursor-pointer opacity-80 hover:opacity-100 ring-2 ring-transparent hover:ring-primary transition-all"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <img
                      src={photo}
                      className="w-full h-full object-cover"
                      alt={`Gallery ${idx}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Right Column: Details */}
          <div className="md:col-span-2 space-y-10">
            {/* ===== Header / Basic Info ===== */}
            <div className="text-center space-y-4">
              <div className="space-y-1">
                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  {profile?.user?.firstName} {profile?.user?.lastName}
                </h2>

                <p className="text-muted-foreground text-lg">
                  {age} Years • {profile.height} cm
                </p>

                <p className="text-muted-foreground text-sm">
                  {profile?.user?.phoneNumber}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  ✔ Verified Profile
                </Badge>
              </div>

              <p className="text-muted-foreground flex justify-center items-center gap-2">
                <MapPin className="w-4 h-4" />
                {profile.city}, {profile.state}
              </p>
            </div>

            <hr className="border-border" />

            {/* ===== About Section ===== */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500" />
                About
              </h3>

              <div className="bg-muted/40 rounded-xl p-4 text-muted-foreground leading-relaxed">
                {profile.bio || "No description provided."}
              </div>
            </div>

            {/* ===== Details Section ===== */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Personal Details</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <InfoCard
                  icon={Briefcase}
                  label="Occupation"
                  value={profile.occupation}
                />
                <InfoCard
                  icon={GraduationCap}
                  label="Education"
                  value={profile.education}
                />
                <InfoCard
                  icon={IndianRupee}
                  label="Income"
                  value={profile.annualIncome || "N/A"}
                />
                <InfoCard
                  icon={Ruler}
                  label="Height"
                  value={`${profile.height} cm`}
                />
                <InfoCard
                  icon={User}
                  label="Religion"
                  value={profile.religion}
                />
                <InfoCard
                  icon={User}
                  label="Caste"
                  value={profile.caste || "Not Specified"}
                />
                <InfoCard
                  icon={Calendar}
                  label="Date of Birth"
                  value={new Date(profile.dob).toLocaleDateString()}
                />
                <InfoCard icon={User} label="Gender" value={profile.gender} />
              </div>
            </div>

            {/* ===== CTA Section ===== */}
            <div className="fixed bottom-0 left-0 right-0 md:relative bg-background border-t md:border-0 p-4 md:p-0 z-20">
              <div className="flex gap-3 max-w-4xl mx-auto">
                <Button
                  className="flex-1 h-12 text-base font-semibold rounded-xl shadow-lg shadow-primary/25 cursor-pointer"
                  size="lg"
                  onClick={() => {
                    window.location.href = `tel:${profile?.user?.phoneNumber}`;
                  }}
                >
                  Connect Now
                </Button>

                <Button
                  variant="outline"
                  className="h-12 w-12 rounded-xl flex items-center justify-center"
                  size="lg"
                >
                  <Heart className="w-6 h-6 text-rose-500" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      <Dialog
        open={!!selectedPhoto}
        onOpenChange={() => setSelectedPhoto(null)}
      >
        <DialogContent className="max-w-4xl w-full p-0 bg-black border-none shadow-none flex justify-center items-center h-[90vh]">
          {selectedPhoto && (
            <img
              src={selectedPhoto}
              alt="Full view"
              className="max-h-full max-w-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Helper Component for Info Grid
const InfoCard = ({ icon: Icon, label, value }: any) => (
  <Card className="bg-secondary/20 border-0 shadow-none">
    <CardContent className="p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-primary shadow-sm">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
        <p className="font-medium text-foreground">{value}</p>
      </div>
    </CardContent>
  </Card>
);

export default MatrimonyProfileDetails;
