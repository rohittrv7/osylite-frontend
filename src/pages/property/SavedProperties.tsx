import { PropertyGrid } from "@/components/property/PropertyGrid";
import { Heart, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGetSavedPropertiesQuery } from "@/store/api/propertiesApi";

const SavedProperties = () => {
  const { data: savedProperties = [], isLoading } =
    useGetSavedPropertiesQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Saved Properties
        </h1>
        <p className="text-muted-foreground">
          Properties you've shortlisted for later
        </p>
      </div>

      {savedProperties.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-xl property-card-shadow">
          <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Saved Properties</h3>
          <p className="text-muted-foreground mb-4">
            Start exploring and save properties you like
          </p>
          <Link to="/property-feed">
            <Button>Browse Properties</Button>
          </Link>
        </div>
      ) : (
        // Passing handleToggleSave is optional here if PropertyCard handles it internally
        // via RTK Query invalidation (which we set up).
        <PropertyGrid properties={savedProperties} />
      )}
    </div>
  );
};

export default SavedProperties;
