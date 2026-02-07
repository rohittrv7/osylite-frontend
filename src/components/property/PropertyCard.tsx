import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Maximize, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Property } from "@/types/property";
import { useToggleSavePropertyMutation } from "@/store/api/propertiesApi";
import { toast } from "sonner";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";
import { Button } from "../ui/button";

interface PropertyCardProps {
  property: Property;
  onToggleSave?: (id: string) => void; // Optional callback if parent handles state
}

export function PropertyCard({ property, onToggleSave }: PropertyCardProps) {
  const [imageError, setImageError] = useState(false);

  const [toggleSave, { isLoading: isSaving }] = useToggleSavePropertyMutation();

  const handleSaveClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await toggleSave(property.id).unwrap();
      toast.success(
        property.isSaved ? "Removed from Saved" : "Saved to wishlist",
      );

      // Call parent callback if it exists (e.g., for removing from Wishlist page instantly)
      onToggleSave?.(property.id);
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };

  // ... (formatPrice and getListingTypeBadge functions remain same) ...

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `${(price / 100000).toFixed(2)} Lac`;
    if (price >= 1000) return `${(price / 1000).toFixed(1)}K`;
    return price.toString();
  };

  const getListingTypeBadge = () => {
    const variants: Record<string, string> = {
      Sell: "bg-primary text-primary-foreground",
      Rent: "bg-accent text-accent-foreground",
      PG: "bg-success text-success-foreground",
    };
    return variants[property.listingType] || variants.Sell;
  };

  return (
    <Link to={`/property/${property.id}`}>
      <article className="group bg-card rounded-xl overflow-hidden property-card-shadow hover:property-card-hover-shadow transition-all duration-300 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={imageError ? "/placeholder.svg" : property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            <Badge className={cn("font-semibold", getListingTypeBadge())}>
              {property.listingType}
            </Badge>
            <Button
              variant="secondary"
              size="icon"
              disabled={isSaving}
              className={cn(
                "rounded-full w-9 h-9 bg-card/90 backdrop-blur-sm transition-all duration-200",
                property.isSaved &&
                  "bg-destructive text-destructive-foreground hover:bg-destructive/90",
              )}
              onClick={handleSaveClick}
            >
              {/* <Heart
                className={cn("w-4 h-4", property.isSaved && "fill-current")}
              /> */}
            </Button>
          </div>

          <div className="absolute bottom-3 left-3">
            <div className="flex items-center gap-1 text-white">
              <IndianRupee className="w-5 h-5" />
              <span className="text-2xl font-bold">
                {formatPrice(property.price)}
              </span>
              {property.listingType === "Rent" && (
                <span className="text-sm opacity-80">/month</span>
              )}
            </div>
            {property.isNegotiable && (
              <span className="text-xs text-white/80">Negotiable</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-foreground line-clamp-1 mb-2 group-hover:text-primary transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">
              {property.locality}, {property.city}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {property.details.bhk && (
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4" />
                <span>{property.details.bhk} BHK</span>
              </div>
            )}
            {property.details.bathrooms && (
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4" />
                <span>{property.details.bathrooms}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Maximize className="w-4 h-4" />
              <span>{property.details.areaSqFt} sq.ft</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
