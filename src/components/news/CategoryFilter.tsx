"use client";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  const allCategories = ['All', ...categories];

  return (
    <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
      <div className="flex flex-nowrap md:flex-wrap gap-2 min-w-max md:min-w-0">
        {allCategories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-navy-900 text-white'
                  : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
