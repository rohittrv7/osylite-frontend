import { useNavigate, useParams } from "react-router-dom";
import { useGetAssociatesByCategoryQuery } from "@/store/api/associateApi";
import { ArrowLeft, Loader2 } from "lucide-react";
import { AssociateCard } from "@/components/associae-form/AssociateCard";

export const AssociatesList = () => {
  // const [searchParams] = useSearchParams();
  const { category } = useParams();
  console.log(category);
  const navigate = useNavigate();
  // const category = searchParams.get("category") || "";

  // const [search, setSearch] = useState("");
  // const [selectedCity, setSelectedCity] = useState<string | undefined>(
  //   undefined,
  // );

  const { data: associates = [], isLoading } = useGetAssociatesByCategoryQuery({
    category: category,
    // city: selectedCity,
    // search: search,
  });

  return (
    <div className="container mx-auto min-h-screen">
      {/* Header & Filter */}

      <div className="relative bg-primary/5 py-12 mb-10 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="pl-8 flex gap-2" onClick={() => navigate(-1)}>
          <ArrowLeft />
          Back
        </div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground font-display mb-4">
            {category?.replace(/_/g, " ") || "All Associates"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the best service providers near you
          </p>
        </div>
      </div>

      <div className="flex flex-col  md:flex-row justify-between items-start md:items-center gap-4">
        {/* <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select onValueChange={setSelectedCity}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Patna">Patna</SelectItem>
              <SelectItem value="Delhi">Delhi</SelectItem>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : associates.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          No associates found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 px-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {associates.map((associate) => (
            <AssociateCard key={associate.id} data={associate} />
          ))}
        </div>
      )}
    </div>
  );
};
