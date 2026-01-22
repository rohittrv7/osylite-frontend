import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, SlidersHorizontal } from "lucide-react";
import {
  DisplayArea,
  EarningMod,
  PostAudience,
  PostCategory,
  PostVisibility,
  type ExploreFilters,
} from "@/types/post";

interface FiltersProps {
  filters: ExploreFilters;
  onChange: (key: keyof ExploreFilters, value?: string) => void;
  onReset?: () => void;
}

export function AngMartFilters({ filters, onChange, onReset }: FiltersProps) {
  const hasFilters = Object.values(filters).some(
    (v) => v !== undefined && v !== "" && v !== "all",
  );

  return (
    <div className="space-y-4">
      {/* Optional header with reset */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="text-sm font-medium">Filters</span>
        </div>

        {hasFilters && onReset && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 px-2 text-xs"
          >
            <X className="mr-1.5 h-3.5 w-3.5" />
            Clear all
          </Button>
        )}
      </div>

      {/* Main filters bar – horizontal scroll on mobile */}
      <div className="flex flex-nowrap items-center gap-2.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        {/* Category */}
        <Select
          value={filters.category || ""}
          onValueChange={(v) => onChange("category", v || undefined)}
        >
          <SelectTrigger className="min-w-[140px] md:min-w-[160px] h-9 text-sm shadow-sm">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Object.values(PostCategory).map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Earning Mode */}
        <Select
          value={filters.earningMod || ""}
          onValueChange={(v) => onChange("earningMod", v || undefined)}
        >
          <SelectTrigger className="min-w-[130px] md:min-w-[150px] h-9 text-sm shadow-sm">
            <SelectValue placeholder="Earning" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Earning Modes</SelectItem>
            {Object.values(EarningMod).map((e) => (
              <SelectItem key={e} value={e}>
                {e.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Audience */}
        <Select
          value={filters.audience || ""}
          onValueChange={(v) => onChange("audience", v || undefined)}
        >
          <SelectTrigger className="min-w-[130px] md:min-w-[145px] h-9 text-sm shadow-sm">
            <SelectValue placeholder="Audience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Audiences</SelectItem>
            {Object.values(PostAudience).map((a) => (
              <SelectItem key={a} value={a}>
                {a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Visibility */}
        <Select
          value={filters.visibility || ""}
          onValueChange={(v) => onChange("visibility", v || undefined)}
        >
          <SelectTrigger className="min-w-[125px] md:min-w-[140px] h-9 text-sm shadow-sm">
            <SelectValue placeholder="Visibility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Visibility</SelectItem>
            {Object.values(PostVisibility).map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Area / Display Area */}
        <Select
          value={filters.displayArea || ""}
          onValueChange={(v) => onChange("displayArea", v || undefined)}
        >
          <SelectTrigger className="min-w-[110px] md:min-w-[130px] h-9 text-sm shadow-sm">
            <SelectValue placeholder="Area" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Areas</SelectItem>
            {Object.values(DisplayArea).map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Type */}
        <Select
          value={filters.type || ""}
          onValueChange={(v) => onChange("type", v || undefined)}
        >
          <SelectTrigger className="min-w-[100px] md:min-w-[120px] h-9 text-sm shadow-sm">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="post">Post</SelectItem>
            <SelectItem value="reel">Reel</SelectItem>
            <SelectItem value="video">Video</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
