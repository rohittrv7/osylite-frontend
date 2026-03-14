import { useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  MapPin,
  CheckCircle2,
  MessageCircle,
  UserPlus,
  Star,
  Phone,
  Globe,
  Clock,
  ShieldCheck,
  Mail,
} from "lucide-react";
import { useGetAssociateProfileQuery } from "@/store/api/associateApi";
import { ContentTab } from "@/components/associae-form/ContentTab";
import { maskEmail } from "@/helpers/changemail";
// Import the helper component created in step 2

const AssociateProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: associateProfile, isLoading } = useGetAssociateProfileQuery(
    id || "",
    { skip: !id }, // Skip if no ID
  );

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (!associateProfile) return <div>Profile not found</div>;

  const profile = associateProfile.profile;
  const user = profile.user;
  const biz = profile.businessDetails;

  return (
    <div className="min-h-screen p-6 bg-background">
      {/* Cover / Header */}
      <div className="relative cursor-pointer bg-gradient-to-br from-primary/20 via-primary/10 to-accent pb-6 rounded-b-xl">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-30 flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="pt-16 px-4 max-w-2xl mx-auto flex flex-col items-center text-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
              <AvatarImage
                src={user.avatarUrl || ""}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-display bg-primary/10 text-primary">
                {user.firstName[0]}
              </AvatarFallback>
            </Avatar>
            {user.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                <CheckCircle2 className="w-6 h-6 text-primary fill-primary/20" />
              </div>
            )}
          </div>

          {/* Name & Info */}
          <div className="space-y-2">
            <h1 className="text-2xl font-display font-bold text-foreground">
              {profile.businessName || user.fullName}
            </h1>

            <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {profile.city}, {profile.state}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                {Number(profile.rating) > 0 ? profile.rating : "New"}
                <span className="text-xs">
                  ({profile.totalRatings} reviews)
                </span>
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Badge variant="secondary" className="capitalize">
                {profile.category?.replace(/_/g, " ")}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {user.role}
              </Badge>
              {profile.status === "accepted" && (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Verified Associate
                </Badge>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-2">
            <Button className="gap-2">
              <MessageCircle className="w-4 h-4" />
              Chat
            </Button>
            <Button variant="outline" className="gap-2">
              <UserPlus className="w-4 h-4" />
              Follow
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-4xl mx-auto py-6">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-6">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="reels">Reels</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-4">
            {/* Bio */}
            <Card>
              <CardContent className="p-5 space-y-3">
                <h3 className="font-display font-semibold text-lg">Bio</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {user.bio || "No bio available for this associate."}
                </p>
              </CardContent>
            </Card>

            {/* Contact & Business Details */}
            <Card>
              <CardContent className="p-5 space-y-4">
                <h3 className="font-display font-semibold text-lg">
                  Contact & Details
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 mt-0.5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">
                        {biz.businessMobile}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 mt-0.5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">
                        {maskEmail(user.email)}
                      </p>
                    </div>
                  </div>

                  {biz.website && (
                    <>
                      <Separator />
                      <div className="flex items-start gap-3">
                        <Globe className="w-4 h-4 mt-0.5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Website</p>
                          <a
                            href={biz.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            {biz.website}
                          </a>
                        </div>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        {profile.address}, {profile.city}, {profile.state} -{" "}
                        {profile.pincode}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 mt-0.5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Business Hours</p>
                      <p className="text-sm text-muted-foreground">
                        {biz.openingTime} – {biz.closingTime}
                      </p>
                    </div>
                  </div>

                  {biz.fssaiLicense && (
                    <>
                      <Separator />
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="w-4 h-4 mt-0.5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">FSSAI License</p>
                          <p className="text-sm text-muted-foreground">
                            {biz.fssaiLicense}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Member Info */}
            <Card>
              <CardContent className="p-5 space-y-3">
                <h3 className="font-display font-semibold text-lg">
                  Membership
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="capitalize">
                    {user.membershipType?.replace(/_/g, " ")}
                  </Badge>
                  <Badge variant="secondary">Member ID: {user.memberId}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Joined{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts" className="mt-4">
            <ContentTab associateId={id || ""} type="post" />
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="mt-4">
            <ContentTab associateId={id || ""} type="video" />
          </TabsContent>

          {/* Reels Tab */}
          <TabsContent value="reels" className="mt-4">
            <ContentTab associateId={id || ""} type="reel" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AssociateProfile;
