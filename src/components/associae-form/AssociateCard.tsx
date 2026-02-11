import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  MessageCircle,
  UserPlus,
  Map,
  FileText,
  Video,
  CheckCircle2,
  Star,
  ArrowRight,
} from "lucide-react";
import type { VenueProfile } from "@/store/api/associateApi";

// Update Interface based on your JSON Response

interface AssociateCardProps {
  data: VenueProfile;
}

export const AssociateCard = ({ data }: AssociateCardProps) => {
  const navigate = useNavigate();

  // Handle navigation to full profile
  const handleViewMore = () => {
    navigate(`/associate/${data?.user?.id}`);
  };

  // Determine Display Values (Handling nested user object)
  const firstName = data.firstName || data.user?.firstName || "";
  const lastName = data.lastName || data.user?.lastName || "";
  const avatarUrl = data.avatarUrl || data.user?.avatarUrl || "";
  const displayName = data.businessName || `${firstName} ${lastName}`;
  const displayAddress = data.city
    ? `${data.address}, ${data.city}`
    : data.address;

  // Mocking verification/rating if not in API response yet
  const isVerified = data.isVerified ?? false;
  const rating = data.rating ?? 0;

  return (
    <Card className="relative w-full max-w-sm mx-auto bg-white dark:bg-card border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden rounded-xl">
      {/* 1. Top Section: Verified Badge & Rating */}
      <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5 z-10">
        {isVerified && (
          <span className="flex items-center gap-1 text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full border border-purple-100">
            <CheckCircle2 className="w-3.5 h-3.5 fill-purple-600 text-white" />
            Verified
          </span>
        )}
        {rating > 0 && (
          <div className="flex items-center gap-1 bg-green-700 text-white text-xs font-bold px-1.5 py-0.5 rounded-[4px]">
            {rating} <Star className="w-3 h-3 fill-white" />
          </div>
        )}
      </div>

      {/* 2. Profile Image (Orange Circle Style) */}
      <div className="pt-8 pb-4 flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-orange-400 to-orange-600 shadow-lg">
            <Avatar className="w-full h-full border-2 border-white">
              <AvatarImage src={avatarUrl || ""} className="object-cover" />
              <AvatarFallback className="bg-orange-100 text-orange-700 text-xl font-bold">
                {firstName ? firstName[0]?.toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* 3. Info Section */}
      <div className="text-center px-4 pb-4">
        <h3 className="text-lg font-bold text-foreground leading-tight line-clamp-1">
          {displayName}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
          {displayAddress}
        </p>
      </div>

      {/* 4. Action Icons Row (Mchat, Follow, etc.) */}
      <div className="flex justify-center items-center gap-4 py-3 border-t border-dashed border-gray-200">
        <ActionIcon icon={MessageCircle} label="Mchat" />
        <ActionIcon icon={UserPlus} label="Follow" />
        <ActionIcon icon={Map} label="Mway" />
        <ActionIcon icon={FileText} label="Post" />
        <ActionIcon icon={Video} label="Video" />
      </div>

      {/* 5. Footer: View More */}
      <div
        onClick={handleViewMore}
        className="bg-gray-50 dark:bg-muted/30 py-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-muted/50 transition-colors border-t"
      >
        <span className="text-sm font-semibold text-primary">View Profile</span>
        <ArrowRight className="w-4 h-4 text-primary" />
      </div>
    </Card>
  );
};

// Helper for the small icon buttons below name
const ActionIcon = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <div className="flex flex-col items-center gap-1 cursor-pointer group">
    <div className="w-9 h-9 rounded-full bg-secondary/50 flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-white transition-all duration-300">
      <Icon className="w-4 h-4" />
    </div>
    <span className="text-[10px] text-muted-foreground font-medium group-hover:text-primary transition-colors">
      {label}
    </span>
  </div>
);
