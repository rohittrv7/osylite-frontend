import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const venues = [
  {
    title: "Tea Shop",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
  },
  {
    title: "Grocery Store",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e",
  },
  {
    title: "Petrol Pump",
    img: "https://images.unsplash.com/photo-1709536240401-ae8f6ca55e18",
  },
  {
    title: "Pre-School",
    img: "https://images.unsplash.com/photo-1588072432836-e10032774350",
  },
  {
    title: "Middle School",
    img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  },
  {
    title: "High School",
    img: "https://images.unsplash.com/photo-1543505298-b8be9b52a21a",
  },
  {
    title: "College",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
  },
  {
    title: "Fashion Store",
    img: "https://images.unsplash.com/photo-1521334884684-d80222895322",
  },
  {
    title: "Bank",
    img: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc",
  },
  {
    title: "Hospital",
    img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
  },
  {
    title: "Clinic",
    img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09",
  },
  {
    title: "Coaching Centre",
    img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8",
  },
  {
    title: "Training Institute",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
  },
  {
    title: "University",
    img: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238",
  },
  {
    title: "Hardware Store",
    img: "https://images.unsplash.com/photo-1586864387789-628af9feed72",
  },
  {
    title: "Cement Store",
    img: "https://images.unsplash.com/photo-1618220179428-22790b461013",
  },
  {
    title: "Post Office",
    img: "https://images.unsplash.com/photo-1593113598332-cd288d649433",
  },
  {
    title: "Gym",
    img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f",
  },
  {
    title: "Park",
    img: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf",
  },
  {
    title: "Cinema Hall",
    img: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0",
  },
  {
    title: "Garden (Sitting Place)",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
];

export default function VenueExplore() {
  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">
        Venue Explore
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {venues.map((venue) => (
          <Card
            key={venue.title}
            className="group overflow-hidden rounded-2xl shadow-sm transition hover:shadow-lg"
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
