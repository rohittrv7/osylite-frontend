import {
  useFollowUserMutation,
  useGetPublicProfileQuery,
  useGetUserFollowersQuery,
  useGetUserFollowingQuery,
  useGetUserPostsQuery,
  useUnfollowUserMutation,
} from "@/store/api/postsApi";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  BadgeCheck,
  Bookmark,
  Contact,
  Grid3X3,
  MessageCircle,
  UserCheck,
  UserMinus,
  UserPlus,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { useState } from "react";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";
import { toast } from "sonner";
import PostMediaGrid from "../components/PostMediaGrid";
import { FollowStatsDialog } from "../components/FollowListDialog";
import {
  useAcceptFriendRequestByUserIdMutation, // 👈 Import Correct Hook
  useCancelFriendRequestMutation,
  useSendFriendRequestMutation,
} from "@/store/api/friendsApi";

export default function PublicProfile() {
  const { id: userId = "" } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"post" | "video" | "reel">("post");

  const { data: userData, isLoading } = useGetPublicProfileQuery({
    targetUserId: userId,
  });
  const { data: Content } = useGetUserPostsQuery({ userId, type: activeTab });

  const { data: followers } = useGetUserFollowersQuery(userId);
  const { data: following } = useGetUserFollowingQuery(userId);

  const [follow] = useFollowUserMutation();
  const [unFollow] = useUnfollowUserMutation();
  const [cancelRequest] = useCancelFriendRequestMutation();
  const [sendRequest] = useSendFriendRequestMutation();

  // 👈 Change this to use the new mutation
  const [acceptRequest] = useAcceptFriendRequestByUserIdMutation();

  if (!userData || isLoading) return <div>Loading...</div>;
  if (!userData) {
    return <Navigate to="/mlife" replace />;
  }

  const followUser = async (userId: string) => {
    try {
      const res = await follow({ userId }).unwrap();
      toast.success(res.message);
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };

  const unfollowUser = async (userId: string) => {
    try {
      const res = await unFollow({ userId }).unwrap();
      toast.success(res.message);
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };

  const handleAddFriend = async (id: string, name: string) => {
    try {
      await sendRequest(id).unwrap();
      toast.success(`Friend request sent to ${name}`);
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };

  const handleAcceptRequest = async (id: string) => {
    try {
      // Ab ye Backend par User ID bhejega aur wahan sahi logic chalega
      await acceptRequest(id).unwrap();
      toast.success("Friend request accepted");
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };

  const handleCancelRequest = async (userId: string) => {
    try {
      await cancelRequest(userId).unwrap();
      toast.success("Request canceled");
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };

  return (
    <div className="bg-background p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8">
        {/* Avatar */}
        <div className="flex justify-center sm:justify-start">
          <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
            <AvatarImage src={userData?.avatarUrl ?? ""} />
            <AvatarFallback>
              {userData.firstName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 space-y-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 justify-between max-w-96">
            <h2 className="text-lg sm:text-xl font-semibold flex gap-2 items-center justify-center sm:justify-start">
              {userData.username}
              {userData.isVerified && <BadgeCheck />}
            </h2>
          </div>

          {/* Stats */}
          <div className="flex justify-center sm:justify-start gap-6 text-sm flex-wrap">
            <span>
              <b>{userData.stats?.totalPosts}</b> posts
            </span>
            <div className="flex gap-6 text-sm">
              <FollowStatsDialog
                label="followers"
                count={userData.stats?.followersCount}
                users={followers ?? []}
              />

              <FollowStatsDialog
                label="following"
                count={userData.stats?.followingCount}
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
          <div className="flex gap-2 w-full max-w-md">
            <Button
              onClick={() => {
                if (userData.isFollowing) {
                  unfollowUser(userData.id);
                } else {
                  followUser(userData.id);
                }
              }}
              className={`flex-1 ${userData.isFollowing ? "bg-secondary hover:bg-secondary/80 text-secondary-foreground" : "bg-primary hover:bg-primary/90 text-primary-foreground"} font-semibold rounded-lg cursor-pointer`}
            >
              {userData.isFollowing ? "Following" : "Follow"}
            </Button>
            {(() => {
              const { friendStatus, friendRequestSentByMe } = userData;

              if (friendStatus === "accepted") {
                return (
                  <Button
                    variant="default"
                    onClick={() => navigate(`/mchat?userId=${userData.id}`)}
                    className="flex-1 cursor-pointer font-semibold rounded-lg gap-2"
                  >
                    <MessageCircle size={18} />
                    Chat
                  </Button>
                );
              }

              if (friendStatus === "pending") {
                if (friendRequestSentByMe) {
                  return (
                    <Button
                      variant="destructive"
                      onClick={() => handleCancelRequest(userData.id)}
                      className="flex-1 cursor-pointer font-semibold rounded-lg gap-2"
                    >
                      <UserMinus size={18} />
                      Cancel Request
                    </Button>
                  );
                } else {
                  return (
                    <Button
                      variant="default"
                      onClick={() => handleAcceptRequest(userData.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white cursor-pointer font-semibold rounded-lg gap-2"
                    >
                      <UserCheck size={18} />
                      Accept Request
                    </Button>
                  );
                }
              }

              return (
                <Button
                  variant="secondary"
                  onClick={() =>
                    handleAddFriend(userData.id, userData.firstName)
                  }
                  className="flex-1 bg-secondary cursor-pointer hover:bg-secondary/80 text-secondary-foreground font-semibold rounded-lg gap-2"
                >
                  <UserPlus size={18} />
                  Add Friend
                </Button>
              );
            })()}
          </div>
        </div>
      </div>
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
          <PostMediaGrid items={Content} />
        </TabsContent>

        <TabsContent value="video">
          <PostMediaGrid items={Content} />
        </TabsContent>

        <TabsContent value="reel">
          <PostMediaGrid items={Content} isReel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
