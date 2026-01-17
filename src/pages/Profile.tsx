import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetProfileQuery } from "@/store/api/authApi";

export default function ProfilePage() {
  const { data: userData, isLoading } = useGetProfileQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!userData) return <div>No data found</div>;

  return (
    <div className="bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Header Card */}
        <Card className="bg-gradient-to-r from-gray-950 to-black border-none">
          <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage
                src={userData.avatarUrl ?? ""}
                alt={userData.firstName}
              />
              <AvatarFallback className="text-4xl bg-primary text-primary-foreground">
                {userData.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-white">
                {userData.firstName} {userData.lastName}
              </h1>
              <p className="text-gray-400 mt-1">@{userData.username}</p>
              <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                <Badge
                  variant="outline"
                  className="bg-green-950 text-green-400 border-green-700"
                >
                  {userData.isVerified ? "Verified" : "Unverified"}
                </Badge>
                <Badge variant="outline">{userData.role}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Info label="Member ID" value={userData.memberId} />
              <Info label="Email" value={userData.email} />
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

        <div className="flex justify-center">
          <Button variant="outline">Edit Profile</Button>
        </div>
      </div>
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
