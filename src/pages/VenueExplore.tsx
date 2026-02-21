import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AssociateCategory } from "@/types/associate";

const venues = [
  {
    title: "Tea Shop",
    category: AssociateCategory.TEA_SHOP_OWNER,
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
  },
  {
    title: "Grocery Store",
    category: AssociateCategory.GROCERY_SHOP_OWNER,
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e",
  },
  {
    title: "Petrol Pump",
    category: AssociateCategory.PETROL_PUMP_OWNER,
    img: "https://images.unsplash.com/photo-1709536240401-ae8f6ca55e18",
  },
  {
    title: "Pre-School",
    category: AssociateCategory.PRE_SCHOOL_OWNER,
    img: "https://images.unsplash.com/photo-1588072432836-e10032774350",
  },
  {
    title: "Middle School",
    category: AssociateCategory.MIDDLE_SCHOOL_OWNER,
    img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  },
  {
    title: "High School",
    category: AssociateCategory.HIGH_SCHOOL_OWNER,
    img: "https://images.unsplash.com/photo-1543505298-b8be9b52a21a",
  },
  {
    title: "College",
    category: AssociateCategory.COLLEGE_DIRECTOR,
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
  },
  {
    title: "Fashion Store",
    category: AssociateCategory.FASHION_STORE_OWNER,
    img: "https://images.unsplash.com/photo-1521334884684-d80222895322",
  },
  {
    title: "Hospital",
    category: AssociateCategory.HOSPITAL_DIRECTOR_DOCTOR,
    img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
  },
  {
    title: "Gym",
    category: AssociateCategory.GYM_OWNER,
    img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f",
  },
  {
    title: "Cinema Hall",
    category: AssociateCategory.CINEMA_HALL_OWNER,
    img: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0",
  },
  {
    title: "Restaurant",
    category: AssociateCategory.RESTAURANT_OWNER,
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  },
  {
    title: "Courier",
    category: AssociateCategory.COURIER_BOOK,
    img: "https://plus.unsplash.com/premium_photo-1665203442280-1118daf3de38",
  },
];

export default function VenueExplore() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="relative bg-primary/5 py-8 px-6 mb-10 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground font-display mb-4">
            Explore <span className="text-primary">Venue</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover a wide range of products tailored for your needs. Select a
            category to get started.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
        {venues.map((venue) => (
          <Card
            key={venue.title}
            className="group  overflow-hidden rounded-2xl shadow-sm transition hover:shadow-lg cursor-pointer"
            onClick={() => navigate(`/venue-explore/${venue.category}`)}
          >
            <div className="relative h-40 w-full overflow-hidden">
              <img
                src={`${venue.img}?auto=format&fit=crop&w=800&q=60`}
                alt={venue.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 transition group-hover:opacity-100" />
            </div>
            <CardContent className="flex items-center justify-between p-4">
              <span className="text-sm font-medium">{venue.title}</span>
              <Badge variant="secondary" className="rounded-full">
                Explore
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
