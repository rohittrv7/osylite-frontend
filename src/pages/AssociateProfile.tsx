// import { useParams, useNavigate } from "react-router-dom";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   ArrowLeft,
//   MapPin,
//   CheckCircle2,
//   MessageCircle,
//   UserPlus,
//   Star,
//   Phone,
//   Globe,
// } from "lucide-react";
// import { useGetAssociateProfileQuery } from "@/store/api/associateApi";

// export const AssociateProfile = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const { data: profile, isLoading } = useGetAssociateProfileQuery(id || "");

//   if (isLoading)
//     return (
//       <div className="h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   if (!profile) return <div>Profile not found</div>;

//   return (
//     <div className="min-h-screen bg-background pb-10">
//       {/* 1. Header / Cover Area */}
//       <div className="bg-primary/5 pb-10 pt-6 px-4">
//         <div className="container max-w-4xl mx-auto">
//           <Button
//             variant="ghost"
//             size="sm"
//             className="mb-4 -ml-2 gap-2"
//             onClick={() => navigate(-1)}
//           >
//             <ArrowLeft className="w-4 h-4" /> Back
//           </Button>

//           <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
//             {/* Profile Pic */}
//             <div className="relative">
//               <Avatar className="w-28 h-28 border-4 border-white shadow-xl">
//                 <AvatarImage src={profile.avatarUrl} className="object-cover" />
//                 <AvatarFallback className="text-3xl font-bold">
//                   {profile.firstName[0]}
//                 </AvatarFallback>
//               </Avatar>
//               {profile.isVerified && (
//                 <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-sm">
//                   <CheckCircle2 className="w-6 h-6 text-purple-600 fill-white" />
//                 </div>
//               )}
//             </div>

//             {/* Basic Info */}
//             <div className="flex-1 text-center md:text-left space-y-2">
//               <h1 className="text-2xl md:text-3xl font-bold">
//                 {profile.businessName ||
//                   `${profile.firstName} ${profile.lastName}`}
//               </h1>

//               <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-muted-foreground text-sm">
//                 <span className="flex items-center gap-1">
//                   <MapPin className="w-4 h-4" /> {profile.locality},{" "}
//                   {profile.city}
//                 </span>
//                 <span className="flex items-center gap-1 text-foreground font-medium">
//                   <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
//                   {profile.rating || "New"}
//                   <span className="text-muted-foreground font-normal">
//                     ({profile.totalRatings || 0} reviews)
//                   </span>
//                 </span>
//               </div>

//               <div className="flex items-center justify-center md:justify-start gap-2 pt-2">
//                 <Badge variant="secondary" className="capitalize">
//                   {profile.role.replace(/_/g, " ")}
//                 </Badge>
//               </div>
//             </div>

//             {/* Primary Actions */}
//             <div className="flex gap-3 mt-4 md:mt-0">
//               <Button>
//                 <MessageCircle className="w-4 h-4 mr-2" /> Chat
//               </Button>
//               <Button variant="outline">
//                 <UserPlus className="w-4 h-4 mr-2" /> Follow
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 2. Main Content Tabs */}
//       <div className="container max-w-4xl mx-auto px-4 -mt-6">
//         <div className="bg-card rounded-xl border shadow-sm p-1 min-h-[400px]">
//           <Tabs defaultValue="about" className="w-full">
//             <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-12 p-0">
//               <TabsTrigger
//                 value="about"
//                 className="h-full px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
//               >
//                 About
//               </TabsTrigger>
//               <TabsTrigger
//                 value="posts"
//                 className="h-full px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
//               >
//                 Posts
//               </TabsTrigger>
//               <TabsTrigger
//                 value="videos"
//                 className="h-full px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
//               >
//                 Videos
//               </TabsTrigger>
//               <TabsTrigger
//                 value="services"
//                 className="h-full px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
//               >
//                 Services
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="about" className="p-6 space-y-6">
//               <div>
//                 <h3 className="text-lg font-semibold mb-2">Bio</h3>
//                 <p className="text-muted-foreground leading-relaxed">
//                   {profile.bio || "No bio available for this associate."}
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="p-4 border rounded-lg flex items-center gap-3">
//                   <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                     <Phone className="w-5 h-5 text-green-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium">Contact</p>
//                     <p className="text-sm text-muted-foreground">
//                       Available for Mchat
//                     </p>
//                   </div>
//                 </div>
//                 <div className="p-4 border rounded-lg flex items-center gap-3">
//                   <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                     <Globe className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium">Website</p>
//                     <p className="text-sm text-muted-foreground">
//                       Link in Mway
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>

//             <TabsContent value="posts" className="p-6">
//               <div className="text-center text-muted-foreground py-10">
//                 No posts yet.
//               </div>
//             </TabsContent>

//             <TabsContent value="videos" className="p-6">
//               <div className="text-center text-muted-foreground py-10">
//                 No videos yet.
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// };

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

const AssociateProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: associateProfile, isLoading } = useGetAssociateProfileQuery(
    id || "",
  );

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!associateProfile) return <div>Profile not found</div>;

  //   const { profile, content } = mockAssociateProfile;
  const profile = associateProfile.profile;
  const user = profile.user;
  const biz = profile.businessDetails;

  return (
    <div className="min-h-screen p-6 bg-background">
      {/* Cover / Header */}
      <div className="relative cursor-pointer bg-gradient-to-br from-primary/20 via-primary/10 to-accent pb-6">
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
              <AvatarImage src={user.avatarUrl || ""} />
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
                <Star className="w-3.5 h-3.5 text-price fill-price" />
                New
                <span className="text-xs">(0 reviews)</span>
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Badge variant="secondary" className="capitalize">
                {profile.category.replace(/_/g, " ")}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {user.role}
              </Badge>
              {profile.status === "accepted" && (
                <Badge className="bg-success text-success-foreground">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Accepted
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
      <div className="mx-auto px-4 py-6">
        <Tabs defaultValue="about">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="mt-4 space-y-4">
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
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Globe className="w-4 h-4 mt-0.5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Website</p>
                      <a
                        href={biz.website || ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {biz.website}
                      </a>
                    </div>
                  </div>

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
                    {user.membershipType.replace(/_/g, " ")}
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
            <Card>
              <CardContent className="p-10 text-center text-muted-foreground">
                <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No posts yet.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="mt-4">
            <Card>
              <CardContent className="p-10 text-center text-muted-foreground">
                <Globe className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No videos yet.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="mt-4">
            <Card>
              <CardContent className="p-10 text-center text-muted-foreground">
                <Star className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No services yet.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AssociateProfile;
