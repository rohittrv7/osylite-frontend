import { Card } from "@/components/ui/card";
import { VIDEO_CATEGORY_OPTIONS } from "@/types/content";
import { useNavigate } from "react-router-dom";

export const SelectEntertainment = () => {
  const navigate = useNavigate();

  const handleSelect = (category: string) => {
    navigate(`/entertainment/${category}`, {
      state: {
        category,
      },
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Select Category</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {VIDEO_CATEGORY_OPTIONS.map((category) => (
          <Card
            onClick={() => handleSelect(category.value)}
            className="h-32 cursor-pointer flex items-center justify-center
                       text-lg font-medium text-foreground
                       hover:shadow-md transition"
          >
            {category.label}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SelectEntertainment;
