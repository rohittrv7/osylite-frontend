import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  MessageCircle,
  Share2,
  IndianRupee,
  Bed,
  Bath,
  Maximize,
  Building,
  Compass,
  Sofa,
  CheckCircle2,
} from "lucide-react";
import { ImageGallery } from "@/components/property/ImageGallery";
import { AmenityIcon } from "@/components/property/AmenityIcon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  useContactOwnerMutation,
  useGetPropertyByIdQuery,
} from "@/store/api/propertiesApi";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";

const PropertyDetails = () => {
  const { id } = useParams();
  // const [isSaved, setIsSaved] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState(
    "Hi, I am interested in your property. When can I visit?",
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const navigate = useNavigate();

  const [contactOwner] = useContactOwnerMutation();

  const { data: property } = useGetPropertyByIdQuery(id || "", {
    skip: !id,
  });

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
        <Link to="/">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  const handleSendInquiry = async () => {
    if (!id) return;
    try {
      await contactOwner({ id, message: inquiryMessage }).unwrap();
      toast.success("Inquiry sent to owner successfully!");
      setDialogOpen(false);
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(2)} Crore`;
    } else if (price >= 100000) {
      return `${(price / 100000).toFixed(2)} Lac`;
    }
    return price.toLocaleString("en-IN");
  };

  const handleCall = () => {
    if (property.owner.phoneNumber) {
      window.location.href = `tel:${property.owner.phoneNumber}`;
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: property.title,
        text: property.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back Button */}
      <div
        onClick={() => navigate(-1)}
        className="inline-flex cursor-pointer items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to listings
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <ImageGallery images={property.images} title={property.title} />

          {/* Title & Price */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge
                  variant={
                    property.listingType === "Sell" ? "default" : "secondary"
                  }
                  className="text-sm"
                >
                  {property.listingType}
                </Badge>
                <Badge variant="outline">{property.category}</Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {property.title}
              </h1>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                {property.address}, {property.locality}, {property.city}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-3xl md:text-4xl font-bold text-primary">
                <IndianRupee className="w-7 h-7" />
                {formatPrice(property.price)}
              </div>
              {property.listingType === "Rent" && (
                <span className="text-muted-foreground">/month</span>
              )}
              {property.isNegotiable && (
                <Badge variant="secondary" className="mt-2">
                  Price Negotiable
                </Badge>
              )}
            </div>
          </div>

          {/* Quick Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {property.details.bhk && (
              <div className="bg-card rounded-xl p-4 property-card-shadow text-center">
                <Bed className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="font-semibold">{property.details.bhk} BHK</div>
                <div className="text-sm text-muted-foreground">Bedrooms</div>
              </div>
            )}
            {property.details.bathrooms && (
              <div className="bg-card rounded-xl p-4 property-card-shadow text-center">
                <Bath className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="font-semibold">
                  {property.details.bathrooms}
                </div>
                <div className="text-sm text-muted-foreground">Bathrooms</div>
              </div>
            )}
            <div className="bg-card rounded-xl p-4 property-card-shadow text-center">
              <Maximize className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="font-semibold">{property.details.areaSqFt}</div>
              <div className="text-sm text-muted-foreground">Sq. Ft.</div>
            </div>
            {property.details.floor && (
              <div className="bg-card rounded-xl p-4 property-card-shadow text-center">
                <Building className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="font-semibold">
                  {property.details.floor}/{property.details.totalFloors}
                </div>
                <div className="text-sm text-muted-foreground">Floor</div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-card rounded-xl p-6 property-card-shadow">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Property Details */}
          <div className="bg-card rounded-xl p-6 property-card-shadow">
            <h2 className="text-xl font-semibold mb-4">Property Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.details.furnishing && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sofa className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Furnishing
                    </div>
                    <div className="font-medium">
                      {property.details.furnishing}
                    </div>
                  </div>
                </div>
              )}
              {property.details.facing && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Compass className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Facing</div>
                    <div className="font-medium">{property.details.facing}</div>
                  </div>
                </div>
              )}
              {property.details.constructionStatus && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <div className="font-medium">
                      {property.details.constructionStatus}
                    </div>
                  </div>
                </div>
              )}
              {property.maintenanceCost && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <IndianRupee className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Maintenance
                    </div>
                    <div className="font-medium">
                      ₹{property.maintenanceCost}/month
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-card rounded-xl p-6 property-card-shadow">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {property.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <AmenityIcon
                    name={amenity}
                    className="w-5 h-5 text-primary"
                  />
                  <span className="text-sm font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Owner Info */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            {/* Owner Card */}
            <div className="bg-card rounded-xl p-6 property-card-shadow">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={property.owner.avatarUrl} />
                  <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                    {property.owner.firstName[0]}
                    {property.owner.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">
                    {property.owner.firstName} {property.owner.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Property Owner
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full" size="lg" onClick={handleCall}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call Owner
                </Button>

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full" size="lg">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Inquiry
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Send Inquiry</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <Textarea
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        placeholder="Write your message..."
                        rows={4}
                      />
                      <Button className="w-full" onClick={handleSendInquiry}>
                        Send Message
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {/* <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsSaved(!isSaved)}
              >
                <Heart
                  className={`w-4 h-4 mr-2 ${isSaved ? "fill-destructive text-destructive" : ""}`}
                />
                {isSaved ? "Saved" : "Save"}
              </Button> */}
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
