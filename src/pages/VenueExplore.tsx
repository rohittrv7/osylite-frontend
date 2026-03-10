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
    title: "Fashion Store",
    category: AssociateCategory.FASHION_STORE_OWNER,
    img: "https://images.unsplash.com/photo-1521334884684-d80222895322",
  },
  {
    title: "Studio",
    category: AssociateCategory.VIDEO_CREATOR,
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
  },
  {
    title: "Legal Office",
    category: AssociateCategory.ADVOCATE,
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
  },
  {
    title: "Interior Office",
    category: AssociateCategory.INTERIOR_DESIGNER,
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
  },
  {
    title: "Doctor Clinic",
    category: AssociateCategory.DOCTOR,
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d",
  },
  {
    title: "Hospital",
    category: AssociateCategory.HOSPITAL_DIRECTOR_DOCTOR,
    img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
  },
  {
    title: "Clinic",
    category: AssociateCategory.CLINIC_OWNER,
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
  },
  {
    title: "Medical Shop",
    category: AssociateCategory.MEDICAL_SHOP_OWNER,
    img: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88",
  },
  {
    title: "Pathology Centre",
    category: AssociateCategory.PATHOLOGY_LAB,
    img: "https://images.unsplash.com/photo-1579154204601-01588f351e67",
  },
  {
    title: "AnG Outlet",
    category: AssociateCategory.ANG_STORE_PARTNER,
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
  },
  {
    title: "Agency",
    category: AssociateCategory.AGENCY,
    img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
  },
  {
    title: "Distributor",
    category: AssociateCategory.DISTRIBUTOR,
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
  },
  {
    title: "Factory",
    category: AssociateCategory.FACTORY_OWNER,
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  },
  {
    title: "Restaurant",
    category: AssociateCategory.RESTAURANT_OWNER,
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  },
  {
    title: "Catering & Cooking",
    category: AssociateCategory.CATERING_COOKING,
    img: "https://images.unsplash.com/photo-1555244162-803834f70033",
  },
  {
    title: "Hardware Store",
    category: AssociateCategory.HARDWARE_STORE_OWNER,
    img: "https://images.unsplash.com/photo-1530124566582-ab05824d7b90",
  },
  {
    title: "Cement Store",
    category: AssociateCategory.CEMENT_OWNER,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
  },
  {
    title: "CA/CS Office",
    category: AssociateCategory.CA,
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
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
    title: "University",
    category: AssociateCategory.UNIVERSITY_DIRECTOR,
    img: "https://images.unsplash.com/photo-1541339907198-e08756defe33",
  },
  {
    title: "Coaching Centre",
    category: AssociateCategory.COACHING_CENTRE_OWNER,
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  },
  {
    title: "Gym",
    category: AssociateCategory.GYM_OWNER,
    img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f",
  },
  {
    title: "Machinery Store",
    category: AssociateCategory.MACHINERY_TOOLS,
    img: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad",
  },
  {
    title: "Courier Centre",
    category: AssociateCategory.COURIER_BOOK,
    img: "https://plus.unsplash.com/premium_photo-1665203442280-1118daf3de38",
  },
  {
    title: "Service Centre",
    category: AssociateCategory.CONSTRUCTION_SERVICE,
    img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
  },
  {
    title: "Developer Office",
    category: AssociateCategory.SOFTWARE_SERVICE,
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    title: "Hotel & Banquet",
    category: AssociateCategory.OTHERS, // Map it to appropriate category if specific one exists
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
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
            className="group overflow-hidden rounded-2xl shadow-sm transition hover:shadow-lg cursor-pointer gap-0 p-0"
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
