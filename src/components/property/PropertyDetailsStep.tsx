import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  type Property,
  PropertyCategory,
  FurnishingStatus,
  ConstructionStatus,
  FACING_OPTIONS,
} from "@/types/property";

interface PropertyDetailsStepProps {
  data: Partial<Property>;
  onChange: (data: Partial<Property>) => void;
}

const PropertyDetailsStep = ({ data, onChange }: PropertyDetailsStepProps) => {
  const details = data.details || { areaSqFt: 0 };
  const isPlot = data.category === PropertyCategory.PLOT;

  const updateDetails = (field: string, value: any) => {
    onChange({
      ...data,
      details: { ...details, [field]: value },
    });
  };

  return (
    <div className="space-y-6">
      {/* BHK - Not for Plot */}
      {!isPlot && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            BHK <span className="text-destructive">*</span>
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((bhk) => (
              <button
                key={bhk}
                type="button"
                onClick={() => updateDetails("bhk", bhk)}
                className={`flex-1 py-3 rounded-lg border-2 font-medium transition-all ${
                  details.bhk === bhk
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {bhk} BHK
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Area */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Area (sq.ft) <span className="text-destructive">*</span>
          </label>
          <Input
            type="number"
            placeholder="e.g., 1200"
            value={details.areaSqFt || ""}
            onChange={(e) => updateDetails("areaSqFt", Number(e.target.value))}
            className="h-12"
          />
        </div>

        {!isPlot && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Bathrooms
            </label>
            <Select
              value={String(details.bathrooms || "")}
              onValueChange={(value) =>
                updateDetails("bathrooms", Number(value))
              }
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Plot Dimensions */}
      {isPlot && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Length (ft)
            </label>
            <Input
              type="number"
              placeholder="e.g., 40"
              value={details.plotLength || ""}
              onChange={(e) =>
                updateDetails("plotLength", Number(e.target.value))
              }
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Breadth (ft)
            </label>
            <Input
              type="number"
              placeholder="e.g., 30"
              value={details.plotBreadth || ""}
              onChange={(e) =>
                updateDetails("plotBreadth", Number(e.target.value))
              }
              className="h-12"
            />
          </div>
        </div>
      )}

      {/* Floor Details - Not for Plot */}
      {!isPlot && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Floor No.
            </label>
            <Input
              type="number"
              placeholder="e.g., 3"
              value={details.floor || ""}
              onChange={(e) => updateDetails("floor", Number(e.target.value))}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Total Floors
            </label>
            <Input
              type="number"
              placeholder="e.g., 10"
              value={details.totalFloors || ""}
              onChange={(e) =>
                updateDetails("totalFloors", Number(e.target.value))
              }
              className="h-12"
            />
          </div>
        </div>
      )}

      {/* Furnishing & Construction Status */}
      {!isPlot && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Furnishing
            </label>
            <Select
              value={details.furnishing}
              onValueChange={(value) => updateDetails("furnishing", value)}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(FurnishingStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Status
            </label>
            <Select
              value={details.constructionStatus}
              onValueChange={(value) =>
                updateDetails("constructionStatus", value)
              }
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ConstructionStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Facing */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Facing Direction
        </label>
        <Select
          value={details.facing}
          onValueChange={(value) => updateDetails("facing", value)}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select facing" />
          </SelectTrigger>
          <SelectContent>
            {FACING_OPTIONS.map((facing) => (
              <SelectItem key={facing} value={facing}>
                {facing}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Parking */}
      <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
        <div>
          <p className="font-medium text-foreground">Parking Available</p>
          <p className="text-sm text-muted-foreground">
            Car/bike parking space
          </p>
        </div>
        <Switch
          checked={details.isParkingAvailable || false}
          onCheckedChange={(checked) =>
            updateDetails("isParkingAvailable", checked)
          }
        />
      </div>
    </div>
  );
};

export default PropertyDetailsStep;
