import React, { useState, useMemo } from "react";
import MenuCard from "./MenuCard";
import { MenuItemSkeleton } from "./Skeleton";
import { menuItems } from "../data/menuItems";

const MenuGrid = React.memo(({ items = menuItems, isLoading = false }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  // Get unique categories - memoize to prevent recalculation
  const categories = useMemo(
    () => ["All", ...new Set(items.map((item) => item.category))],
    [items],
  );

  // Filter items by category - memoize to prevent recalculation
  const filteredItems = useMemo(
    () =>
      activeCategory === "All"
        ? items
        : items.filter((item) => item.category === activeCategory),
    [activeCategory, items],
  );

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Category Header - Sticky at top */}
      <div className="sticky top-0 z-10 pt-4 pb-2 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container-custom">
          <div className="flex overflow-x-auto gap-2 sm:gap-3 pb-2 scrollbar-hidden">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-md transition-all whitespace-nowrap text-sm sm:text-base flex-shrink-0 ${
                  activeCategory === category
                    ? "bg-secondary-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable Menu Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="container-custom py-4 sm:py-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No items found in this category.
              </p>
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 justify-items-center">
              <MenuItemSkeleton />
              <MenuItemSkeleton />
              <MenuItemSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 justify-items-center">
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

MenuGrid.displayName = "MenuGrid";

export default MenuGrid;
