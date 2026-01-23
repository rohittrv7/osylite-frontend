import { Card } from "@/components/ui/card";
import { ASSOCIATE_CATEGORY_OPTIONS } from "@/types/content";
import { useNavigate } from "react-router-dom";

const SelectCategoryPage = () => {
  const navigate = useNavigate();

  const handleSelect = (category: string) => {
    navigate(`/ang-mart/${category}`, {
      state: {
        category,
      },
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Select Category</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ASSOCIATE_CATEGORY_OPTIONS.map((category) => (
          <Card
            onClick={() => handleSelect(category.value)}
            className="h-32 cursor-pointer flex items-center justify-center
                       text-lg font-medium text-white
                       hover:shadow-md transition"
          >
            {category.label}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SelectCategoryPage;
