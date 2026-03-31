import React, { useState } from "react";
import MenuCard from "./MenuCard";
import { menuItems } from "../data/menuItems";

const MenuGrid = ({ items = menuItems }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  // Get unique categories
  const categories = ["All", ...new Set(items.map((item) => item.category))];

  // Filter items by category
  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div className="container-custom py-8 sm:py-12">
      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-2 sm:gap-3 mb-8 pb-2 scrollbar-hidden">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all whitespace-nowrap text-sm sm:text-base ${
              activeCategory === category
                ? "bg-primary-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Grid - Responsive */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No items found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuGrid;
