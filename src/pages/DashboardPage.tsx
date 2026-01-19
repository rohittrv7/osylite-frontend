import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  CircleCheck,
  Wallet,
  Coins,
  UserCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "@/store/api/authApi";

export default function Dashboard() {
  const navigator = useNavigate();

  const { data: userData, isLoading } = useGetProfileQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!userData) return <div>No data found</div>;
  return (
    <div className="bg-background text-foreground p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Welcome, {userData.firstName} 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's an overview of your account activity
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-950/40 text-green-400 border border-green-800/60 rounded-full text-sm font-medium">
            <CircleCheck className="h-4 w-4" />
            {userData.role}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card/80 border-border/50 hover:border-border transition-colors">
            <CardContent className="p-5 flex flex-col items-center text-center gap-1">
              <Wallet className="h-8 w-8 text-primary mb-1" />
              <p className="text-sm text-muted-foreground">Wallet Balance</p>
              <p className="text-2xl font-bold">₹{userData?.walletBalance}</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 border-border/50 hover:border-border transition-colors">
            <CardContent className="p-5 flex flex-col items-center text-center gap-1">
              <Coins className="h-8 w-8 text-blue-500 mb-1" />
              <p className="text-sm text-muted-foreground">ANG Tokens</p>
              <p className="text-2xl font-bold">{userData?.angCoins}</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 border-border/50 hover:border-border transition-colors">
            <CardContent className="p-5 flex flex-col items-center text-center gap-1">
              <ShieldCheck className="h-8 w-8 text-emerald-500 mb-1" />
              <p className="text-sm text-muted-foreground">Membership</p>
              <p className="text-xl font-semibold text-emerald-400">{userData.membershipType}</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 border-border/50 hover:border-border transition-colors">
            <CardContent className="p-5 flex flex-col items-center text-center gap-1">
              <CircleCheck className="h-8 w-8 text-green-500 mb-1" />
              <p className="text-sm text-muted-foreground">Account Status</p>
              <p className="text-xl font-semibold text-green-400">{userData.isVerified ? "Active" : "Inactive"}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="bg-card/80 border-border/50">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[180px] flex items-center justify-center text-muted-foreground">
              <p className="text-center py-8">No recent activity</p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-card/80 border-border/50">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-11"
                onClick={() => navigator("/profile")}
              >
                <UserCircle className="h-5 w-5" />
                View Profile
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-11"
              >
                <Coins className="h-5 w-5" />
                ANG Token
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-11"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Change Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
