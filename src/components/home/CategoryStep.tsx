import { AssociateCategory } from "@/types/associate";

type Props = {
  value?: AssociateCategory;
  onSelect: (category: AssociateCategory) => void;
};

const categories = Object.values(AssociateCategory);

export const CategoryStep = ({ value, onSelect }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`p-4 rounded-lg border text-sm capitalize
            ${
              value === category
                ? "border-primary bg-primary/10"
                : "border-muted"
            }
          `}
        >
          {category.replaceAll("_", " ")}
        </button>
      ))}
    </div>
  );
};
