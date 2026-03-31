import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartProvider";
import { IoMdCart } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";

const MenuCard = ({ item }) => {
  const { cart, addItem, updateQuantity, removeItem, formatCurrency } =
    useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Get available sizes from prices
  const availableSizes = item.prices ? Object.keys(item.prices) : [];

  // Set default selected size if not set
  useEffect(() => {
    if (availableSizes.length > 0 && !selectedSize) {
      setSelectedSize(availableSizes[0]);
    }
  }, [availableSizes, selectedSize]);

  // Check if item is already in cart with same size
  const cartItem = cart.find(
    (cartItem) =>
      cartItem.id === item.id && cartItem.selectedSize === selectedSize,
  );

  const currentQuantity = cartItem ? cartItem.quantity : 0;
  const isInCart = currentQuantity > 0;

  // Get current price
  const getCurrentPrice = () => {
    if (selectedSize && item.prices[selectedSize]) {
      return item.prices[selectedSize];
    }
    return item.prices ? Object.values(item.prices)[0] : 0;
  };

  const price = getCurrentPrice();
  const totalPrice = price * (isInCart ? currentQuantity : 1);

  const handleAddToCart = () => {
    if (price === 0) return;

    const cartItemData = {
      id: item.id,
      name: item.name,
      selectedSize: selectedSize,
      quantity: 1,
      price: price,
      total: price,
      image: item.image,
      tags: item.tags,
      category: item.category,
    };

    addItem(cartItemData);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleIncrement = () => {
    const newQuantity = currentQuantity + 1;
    updateQuantity(item.id, selectedSize, newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = currentQuantity - 1;
    if (newQuantity === 0) {
      removeItem(item.id, selectedSize);
    } else {
      updateQuantity(item.id, selectedSize, newQuantity);
    }
  };

  // Size options with styling
  const sizeOptions = {
    mini: "Mini",
    regular: "Regular",
    large: "Large",
    single: "Single",
    double: "Double",
    medium: "Medium",
  };

  return (
    <motion.div
      className="group relative bg-white rounded-lg overflow-hidden shadow-xs hover:shadow-sm transition-all duration-300 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Mobile/Tablet: Row Layout, Desktop: Column Layout */}
      <div className="flex flex-row lg:flex-col h-full ">
        {/* Image Section - Mobile: 130px, Desktop: Full width */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 lg:max-h-[140px]  to-secondary-50 w-[130px] lg:w-full flex-shrink-0 lg:aspect-square">
          {item.image && !imageError ? (
            <motion.img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full min-h-[130px] lg:min-h-[200px] flex items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-100">
              <span className="text-3xl lg:text-5xl">
                {item.category === "Burgers" && "🍔"}
                {item.category === "Wraps" && "🌯"}
                {item.category === "Irish Potato Loaded Fries" && "🍟"}
                {item.category === "Sweet Potato Loaded Fries" && "🍠"}
                {item.category === "Sub Sandwiches" && "🥪"}
                {item.category === "Sides" && "🍟"}
                {item.category === "Extras" && "✨"}
                {item.category === "Dips" && "🥫"}
                {item.category === "Combos" && "🍱"}
                {!item.category && "🍽️"}
              </span>
            </div>
          )}

          {/* Best Seller Badge */}
          {item.bestSale && (
            <div className="absolute top-2 right-2 z-10">
              <span className="bg-gradient-primary   text-shade text-[10px] lg:text-xs font-semibold px-2 py-2 lg:px-3  rounded shadow-lg">
                Best Seller
              </span>
            </div>
          )}

          {/* Added to Cart Animation */}
          <AnimatePresence>
            {addedToCart && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute inset-0 bg-black/50 flex items-center justify-center z-20"
              >
                <div className="bg-white rounded-full px-2 py-1 lg:px-4 lg:py-2 flex items-center gap-1">
                  <svg
                    className="w-3 h-3 lg:w-4 lg:h-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-[10px] lg:text-xs font-semibold text-dark">
                    Added!
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-3 lg:p-4 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="mb-2">
              <h6 className="text-dark font-semibold text-sm md:text-base lg:text-[16px] line-clamp-2 leading-tight">
                {item.name}
              </h6>
              {item.category && (
                <p className="text-gray-500 text-xs lg:text-sm font-medium mt-0.5">
                  {item.category}
                </p>
              )}
            </div>

            {/* Size Selection - Flex Row with gap-2 */}
            {availableSizes.length > 0 && (
              <div className="flex flex-row gap-2 flex-wrap">
                {availableSizes.map((size) => (
                  <span
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      px-[14px]  py-[4px]    rounded-sm text-xs lg:text-sm font-medium li cursor-pointer transition-all duration-200 border-[1.5px]
                      ${
                        selectedSize === size
                          ? "text-primary-500  border-primary-500 bg-transparent"
                          : "text-secondary-400 border-transparent hover:text-primary-500 hover:border-primary-100"
                      }
                    `}
                  >
                    {sizeOptions[size] ||
                      size.charAt(0).toUpperCase() + size.slice(1)}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Price and Add to Cart - Same Row */}
          <div className="flex items-center justify-between gap-2 mt-2 lg:mt-3">
            <motion.div
              key={totalPrice}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-dark font-semibold  text-base">
                {formatCurrency(totalPrice)}
              </span>
            </motion.div>

            <AnimatePresence mode="wait">
              {!isInCart ? (
                <motion.button
                  key="add-to-cart"
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={price === 0}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className={`
                    flex items-center justify-center gap-1.5 px-3 py-1.5 lg:px-4 lg:py-1 rounded-md font-medium text-sm lg:text-base transition-all duration-300 min-w-[100px] lg:min-w-[134px] h-[32px] lg:h-[40px]
                    ${
                      price === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-primary text-shade hover:shadow-md"
                    }
                  `}
                >
                  <IoMdCart className="text-sm lg:text-base" />
                  <span>Add to Cart</span>
                </motion.button>
              ) : (
                <motion.div
                  key="quantity-selector"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2  min-w-[100px] lg:min-w-[120px] justify-end"
                >
                  <button
                    onClick={handleDecrement}
                    className="w-7 h-7 lg:w-8 lg:h-8 rounded-full cursor-pointer bg-gray-100 text-dark flex items-center justify-center text-lg lg:text-xl font-bold hover:bg-secondary-400 transition-colors"
                  >
                    <IoIosRemove />
                  </button>
                  <span className="text-dark font-semibold text-base lg:text-lg min-w-[24px] lg:min-w-[32px] text-center">
                    {currentQuantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="w-7 h-7 lg:w-8 lg:h-8 cursor-pointer rounded-full bg-primary-500 text-white flex items-center justify-center text-lg lg:text-xl font-bold hover:bg-primary-600 transition-colors"
                  >
                    <IoIosAdd />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Includes Section for Combos */}
          {item.includes && item.includes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 pt-2 lg:mt-3 lg:pt-3 border-t border-gray-100"
            >
              <p className="text-[10px] lg:text-xs text-gray-500 mb-0.5">
                Includes:
              </p>
              <div className="flex flex-wrap gap-1">
                {item.includes.slice(0, 2).map((include, index) => (
                  <span
                    key={index}
                    className="text-[10px] lg:text-xs bg-gray-50 text-gray-600 px-1.5 py-0.5 lg:px-2 lg:py-1 rounded"
                  >
                    {include.length > 20
                      ? include.substring(0, 17) + "..."
                      : include}
                  </span>
                ))}
                {item.includes.length > 2 && (
                  <span className="text-[10px] lg:text-xs bg-gray-50 text-gray-600 px-1.5 py-0.5 lg:px-2 lg:py-1 rounded">
                    +{item.includes.length - 2}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
