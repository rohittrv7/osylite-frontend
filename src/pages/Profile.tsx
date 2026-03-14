import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetProfileQuery, useGetUserStatsQuery } from "@/store/api/authApi";
import CreateMenu from "@/components/CreateMenu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, Contact, Grid3X3 } from "lucide-react";
import MediaGrid from "@/components/MediaGrid";
import {
  useGetMyFollowersQuery,
  useGetMyFollowingQuery,
  useGetMyPostsQuery,
} from "@/store/api/postsApi";
import { useState } from "react";
import { FollowStatsDialog } from "@/components/FollowListDialog";
import { ProfilePhotoDialog } from "@/components/ProfilePhotoDialog";
import { maskEmail } from "@/helpers/changemail";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"post" | "video" | "reel">("post");
  const { data: userData, isLoading } = useGetProfileQuery();

  const { data: Content = [] } = useGetMyPostsQuery({
    type: activeTab,
  });
  const { data: stats } = useGetUserStatsQuery();

  const { data: followers } = useGetMyFollowersQuery();
  const { data: following } = useGetMyFollowingQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!userData) return <div>No data found</div>;

  return (
    <div className="bg-background p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8">
        {/* Avatar */}
        <div className="flex justify-center sm:justify-start">
          <ProfilePhotoDialog avatarUrl={userData.avatarUrl}>
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 cursor-pointer border-2 border-transparent hover:border-muted transition-all">
              <AvatarImage
                src={userData.avatarUrl ?? ""}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl">
                {userData.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </ProfilePhotoDialog>
        </div>

        <div className="flex-1 space-y-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <h2 className="text-lg sm:text-xl font-semibold">
              {userData.username}
            </h2>

            {userData.isVerified && (
              <Badge className="w-fit mx-auto sm:mx-0 bg-blue-600">
                ✔ Verified
              </Badge>
            )}

            <div className="flex justify-center sm:justify-start gap-2">
              {/* <Button variant="outline" size="sm">
                  Edit Profile
                </Button> */}

              {userData?.channel?.status === "approved" && <CreateMenu />}
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center sm:justify-start gap-6 text-sm flex-wrap">
            <span>
              <b>{stats?.totalPosts}</b> posts
            </span>
            <div className="flex gap-6 text-sm">
              <FollowStatsDialog
                label="followers"
                count={stats?.followersCount}
                users={followers ?? []}
              />

              <FollowStatsDialog
                label="following"
                count={stats?.followingCount}
                users={following ?? []}
              />
            </div>
          </div>

          {/* Bio */}
          <div className="text-sm text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">
              {userData.firstName} {userData.lastName}
            </p>
            <p>🚀 Building cool stuff with code</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Info label="Member ID" value={userData.memberId} />
            <Info label="Email" value={maskEmail(userData.email)} />
            <Info label="Mobile" value={userData.phoneNumber} />
            <Info label="Pincode" value={userData.pincode} />
          </CardContent>
        </Card>

        {/* Account Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Account Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Info label="User Type" value={userData.role} />
            <Info label="Balance" value={`₹ ${userData.walletBalance}`} />
            <Info
              label="Joined On"
              value={new Date(userData.createdAt).toDateString()}
            />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Account Status</span>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                {userData.isVerified ? "Active" : "Inactive"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {userData.channel && userData?.channel.status === "approved" && (
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "post" | "video" | "reel")
          }
          className="w-full"
        >
          <TabsList className="w-full bg-transparent border border-gray-800 rounded-none h-auto p-0 flex justify-center gap-12">
            <TabsTrigger
              value="post"
              className="rounded-none border-t border-transparent data-[state=active]:border-white data-[state=active]:text-foreground text-gray-500 uppercase text-xs tracking-widest py-3 gap-2"
            >
              <Grid3X3 size={12} /> Posts
            </TabsTrigger>
            <TabsTrigger
              value="video"
              className="rounded-none border-t border-transparent data-[state=active]:border-white data-[state=active]:text-foreground text-gray-500 uppercase text-xs tracking-widest py-3 gap-2"
            >
              <Bookmark size={12} /> Video
            </TabsTrigger>
            <TabsTrigger
              value="reel"
              className="rounded-none border-t border-transparent data-[state=active]:border-white data-[state=active]:text-foreground text-gray-500 uppercase text-xs tracking-widest py-3 gap-2"
            >
              <Contact size={12} /> Reel
            </TabsTrigger>
          </TabsList>

          <TabsContent value="post">
            <MediaGrid items={Content} userId={userData.id} />
          </TabsContent>

          <TabsContent value="video">
            <MediaGrid items={Content} userId={userData.id} />
          </TabsContent>

          <TabsContent value="reel">
            <MediaGrid items={Content} userId={userData.id} isReel />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
