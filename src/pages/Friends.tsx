import { Users, UserCheck, UserX } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import FriendRequestCard from "@/components/friend/FriendRequestCard";
import {
  useAcceptFriendRequestMutation,
  useGetFriendRequestsQuery,
  useGetFriendsQuery,
  useRejectFriendRequestMutation,
  useUnfriendMutation,
} from "@/store/api/friendsApi";
import { FriendCard } from "@/components/friend/FriendCard";

const Friends = () => {
  const { data: requests = [], isLoading: loadingRequests } =
    useGetFriendRequestsQuery();

  const { data: friends = [], isLoading: loadingFriends } =
    useGetFriendsQuery();

  const [acceptRequest] = useAcceptFriendRequestMutation();
  const [rejectRequest] = useRejectFriendRequestMutation();
  const [unfriend] = useUnfriendMutation();

  const handleConfirm = async (id: string) => {
    try {
      await acceptRequest(id).unwrap();
      toast.success("Friend request accepted");
    } catch {
      toast.error("Failed to accept request");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await rejectRequest(id).unwrap();
      toast("Friend request deleted");
    } catch {
      toast.error("Failed to delete request");
    }
  };

  const handleUnfriend = async (id: string) => {
    try {
      await unfriend(id).unwrap();
      toast("Friend removed");
    } catch {
      toast.error("Failed to unfriend");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto px-10 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Friends</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your friends and friend requests
          </p>
        </div>

        <Tabs defaultValue="requests">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="requests" className="flex-1 gap-2">
              <UserCheck className="w-4 h-4" />
              Requests
              {requests.length > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-destructive text-white">
                  {requests.length}
                </span>
              )}
            </TabsTrigger>

            <TabsTrigger value="all" className="flex-1 gap-2">
              <Users className="w-4 h-4" />
              All Friends
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-muted">
                {friends.length}
              </span>
            </TabsTrigger>
          </TabsList>

          {/* REQUESTS */}
          <TabsContent value="requests">
            {loadingRequests ? (
              <p className="text-center text-muted-foreground">Loading...</p>
            ) : requests.length > 0 ? (
              <div className="space-y-3">
                {requests.map((req) => (
                  <FriendRequestCard
                    key={req.id}
                    request={req}
                    onConfirm={handleConfirm}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-xl">
                <UserCheck className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold">No pending requests</h3>
              </div>
            )}
          </TabsContent>

          {/* FRIENDS */}
          <TabsContent value="all">
            {loadingFriends ? (
              <p className="text-center text-muted-foreground">Loading...</p>
            ) : friends.length > 0 ? (
              <div className="space-y-3">
                {friends.map((friend) => (
                  <FriendCard
                    key={friend.id}
                    friend={friend}
                    onUnfriend={handleUnfriend}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-xl">
                <UserX className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold">No friends yet</h3>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Friends;
