import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Wallet,
  ChevronRight,
  User,
  Bell,
  Shield,
  HelpCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "@/store/selectors/authSelectors";

const Settings = () => {
  const navigate = useNavigate();
  const user = useSelector(selectAuthUser);
  const settingsItems = [
    {
      icon: User,
      label: "Profile",
      description: "Manage your account details",
      path: "/my-profile",
      onClick: () => {},
    },
    {
      icon: Bell,
      label: "Notifications",
      description: "Configure alerts & updates",
      onClick: () => {},
    },
    {
      icon: Shield,
      label: "Security",
      description: "Password & authentication",
      onClick: () => {},
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      description: "FAQs and contact us",
      onClick: () => {},
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-accent/20 px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your preferences</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Wallet Card - Clickable */}
        <Card
          className="bg-gradient-coin cursor-pointer border-accent-foreground transition-transform duration-200 shadow-lg"
          onClick={() => navigate("/wallet")}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">My Wallet</p>
                  <p className="text-white font-bold text-xl">
                    {user?.angCoins} Coins
                  </p>
                  <p className="text-white/70 text-xs">
                    ₹{(user?.angCoins || 0) * 2} Balance
                  </p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-white/70" />
            </div>
          </CardContent>
        </Card>

        {/* Other Settings */}
        <div className="space-y-2">
          {settingsItems.map((item, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={item.onClick}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {item.label}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className="w-5 h-5 text-muted-foreground"
                    onClick={() => navigate(item?.path || "")}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
