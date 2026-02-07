import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  MessageSquare,
  Eye,
  Phone,
  Mail,
  Plus,
  Loader2,
  Pencil,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  useGetMyPropertiesQuery,
  useGetMyLeadsQuery,
  useTogglePropertyStatusMutation,
  // useDeletePropertyMutation,
} from "@/store/api/propertiesApi";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";

const PropertyFeed = () => {
  const navigate = useNavigate();

  const { data: myProperties = [], isLoading: adsLoading } =
    useGetMyPropertiesQuery();
  const { data: leads = [], isLoading: leadsLoading } = useGetMyLeadsQuery();
  const [toggleStatus] = useTogglePropertyStatusMutation();
  // const [deleteProperty] = useDeletePropertyMutation();

  const handleToggleAvailability = async (id: string) => {
    try {
      await toggleStatus(id).unwrap();
      toast.success("Property status updated!");
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/post-property/${id}`);
  };

  // const handleDelete = async (id: string) => {
  //   if (confirm("Are you sure you want to delete this property?")) {
  //     try {
  //       await deleteProperty(id).unwrap();
  //       toast.success("Property deleted successfully");
  //     } catch (error) {
  //       apiErrorToastHandler(error);
  //     }
  //   }
  // };

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lac`;
    if (price >= 1000) return `₹${(price / 1000).toFixed(1)}K`;
    return `₹${price}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your properties and view inquiries
          </p>
        </div>
        <Link to="/post-property">
          <Button className="mt-4 md:mt-0 cursor-pointer">
            <Plus className="w-4 h-4 mr-2" /> Post New Property
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="my-ads" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="my-ads" className="gap-2 cursor-pointer">
            <Building2 className="w-4 h-4" /> My Ads
          </TabsTrigger>
          <TabsTrigger value="leads" className="gap-2 cursor-pointer">
            <MessageSquare className="w-4 h-4" /> Leads
            {leads.length > 0 && (
              <Badge
                variant="destructive"
                className="ml-1 h-5 w-5 p-0 justify-center"
              >
                {leads.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* My Ads Tab */}
        <TabsContent value="my-ads" className="space-y-4">
          {adsLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin" />
            </div>
          ) : myProperties.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-xl property-card-shadow">
              <Building2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No Properties Listed
              </h3>
              <p className="text-muted-foreground mb-4">
                Start by posting your first property
              </p>
              <Link to="/post-property">
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> Post Property
                </Button>
              </Link>
            </div>
          ) : (
            myProperties.map((property) => (
              <div
                key={property.id}
                className={cn(
                  "bg-card rounded-xl property-card-shadow overflow-hidden transition-opacity",
                  !property.isAvailable && "opacity-60",
                )}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 h-40 md:h-auto flex-shrink-0">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant={
                              property.isAvailable ? "default" : "secondary"
                            }
                          >
                            {property.isAvailable ? "Active" : "Inactive"}
                          </Badge>
                          <Badge variant="outline">
                            {property.listingType}
                          </Badge>
                        </div>
                        <Link
                          to={`/property/${property.id}`}
                          className="text-lg font-semibold hover:text-primary transition-colors"
                        >
                          {property.title}
                        </Link>
                        <p className="text-muted-foreground text-sm mt-1">
                          {property.locality}, {property.city}
                        </p>
                        <p className="text-xl font-bold text-primary mt-2">
                          {formatPrice(property.price)}
                          {property.listingType === "Rent" && (
                            <span className="text-sm font-normal text-muted-foreground">
                              /month
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">
                            {property.viewsCount || 0} views
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(property.id)}
                            className="h-8 px-2"
                          >
                            <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
                          </Button>

                          {/* <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(property.id)}
                            className="h-8 px-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button> */}

                          <div className="flex items-center gap-2 border-l pl-3 ml-1">
                            <span className="text-sm text-muted-foreground">
                              {property.isAvailable ? "Active" : "Hidden"}
                            </span>
                            <Switch
                              checked={property.isAvailable}
                              onCheckedChange={() =>
                                handleToggleAvailability(property.id)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </TabsContent>

        {/* Leads Tab */}
        <TabsContent value="leads" className="space-y-4">
          {leadsLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin" />
            </div>
          ) : leads.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-xl property-card-shadow">
              <MessageSquare className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Inquiries Yet</h3>
              <p className="text-muted-foreground">
                When buyers contact you, their inquiries will appear here
              </p>
            </div>
          ) : (
            leads.map((inquiry) => (
              <div
                key={inquiry.id}
                className="bg-card rounded-xl p-6 property-card-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {inquiry.buyer.firstName[0]}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {inquiry.buyer.firstName} {inquiry.buyer.lastName}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Interested in:{" "}
                          <Link
                            to={`/property/${inquiry.property.id}`}
                            className="text-primary hover:underline"
                          >
                            {inquiry.property.title}
                          </Link>
                        </p>
                        <p className="text-foreground bg-muted/50 rounded-lg p-3 mt-2">
                          "{inquiry.message}"
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatDate(inquiry.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 md:flex-col">
                    <Button
                      size="sm"
                      onClick={() =>
                        (window.location.href = `tel:${inquiry.buyer.phoneNumber}`)
                      }
                    >
                      <Phone className="w-4 h-4 mr-2" /> Call
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        (window.location.href = `mailto:${inquiry.buyer.email}`)
                      }
                    >
                      <Mail className="w-4 h-4 mr-2" /> Email
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyFeed;
