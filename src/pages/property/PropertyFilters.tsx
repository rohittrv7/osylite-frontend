import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
// import {
//   PropertyFilters as Filters,
//   ListingType,
//   PropertyCategory,
// } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cities } from "@/lib/mockData";
import type { PropertyFilters as Filters, ListingType, PropertyCategory } from "@/types/property";

interface PropertyFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function PropertyFilters({
  filters,
  onFiltersChange,
}: PropertyFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const listingTypes: ListingType[] = ["Rent", "Sell", "PG"];
  const categories: PropertyCategory[] = [
    "Flat",
    "House",
    "Plot",
    "Commercial",
  ];
  const bhkOptions = [1, 2, 3, 4, 5];

  const handleTypeChange = (type: ListingType) => {
    onFiltersChange({
      ...filters,
      type: filters.type === type ? undefined : type,
    });
  };

  const handleClear = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== undefined && v !== "",
  );

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Listing Type Toggle */}
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block">
          Looking for
        </label>
        <div className="flex gap-2 flex-wrap">
          {listingTypes.map((type) => (
            <Button
              key={type}
              variant={filters.type === type ? "default" : "outline"}
              size="sm"
              onClick={() => handleTypeChange(type)}
              className="transition-all duration-200"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* City */}
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block">
          City
        </label>
        <Select
          value={filters.city || ""}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, city: value || undefined })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category */}
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block">
          Property Type
        </label>
        <Select
          value={filters.category || ""}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              category: (value as PropertyCategory) || undefined,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* BHK */}
      {filters.category !== "Plot" && filters.category !== "Commercial" && (
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            BHK
          </label>
          <div className="flex gap-2 flex-wrap">
            {bhkOptions.map((bhk) => (
              <Button
                key={bhk}
                variant={filters.bhk === bhk ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  onFiltersChange({
                    ...filters,
                    bhk: filters.bhk === bhk ? undefined : bhk,
                  })
                }
              >
                {bhk} BHK
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Budget Range */}
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block">
          Budget Range
        </label>
        <div className="flex gap-3">
          <Input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ""}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                minPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="flex-1"
          />
          <Input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ""}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                maxPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="flex-1"
          />
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          className="w-full text-destructive hover:text-destructive"
          onClick={handleClear}
        >
          <X className="w-4 h-4 mr-2" />
          Clear all filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="bg-card rounded-xl p-4 property-card-shadow">
      {/* Search Bar */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by locality, title..."
            value={filters.search || ""}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                search: e.target.value || undefined,
              })
            }
            className="pl-10"
          />
        </div>

        {/* Mobile Filter Button */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden">
              <SlidersHorizontal className="w-4 h-4" />
              {hasActiveFilters && (
                <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  !
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6 overflow-y-auto">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:block">
        <FilterContent />
      </div>
    </div>
  );
}
