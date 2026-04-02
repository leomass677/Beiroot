import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartProvider";
import { IoMdCart, IoIosAdd, IoIosRemove } from "react-icons/io";
import { FaHamburger, FaPizzaSlice } from "react-icons/fa";
import { MdOutlineFastfood } from "react-icons/md";
import { GiChickenOven, GiSandwich, GiFrenchFries } from "react-icons/gi";

// Memoize MenuCard to prevent unnecessary re-renders when parent list updates
const MenuCard = React.memo(({ item }) => {
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

  // Check if item has limited edition tag
  const isLimitedEdition =
    item.tags?.includes("Limited Edition") || item.limitedEdition;

  // Get category icon
  const getCategoryIcon = () => {
    const iconProps = { className: "text-3xl md:text-4xl text-primary-400" };
    switch (item.category) {
      case "Burgers":
        return <FaHamburger {...iconProps} />;
      case "Wraps":
        return <GiChickenOven {...iconProps} />;
      case "Irish Potato Loaded Fries":
      case "Sweet Potato Loaded Fries":
        return <GiFrenchFries {...iconProps} />;
      case "Sub Sandwiches":
        return <GiSandwich {...iconProps} />;
      case "Pizza":
        return <FaPizzaSlice {...iconProps} />;
      default:
        return <MdOutlineFastfood {...iconProps} />;
    }
  };

  return (
    <motion.div
      className="group relative bg-[#FBFBF8] rounded-md border border-[#FEE0CD] overflow-hidden flex  shadow-xs hover:shadow-sm transition-all duration-300 w-full max-w-[398px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-row flex-1 h-full  lg:h-fit max-h-[200px]">
        {/* Image Section - Fixed width for all screens */}
        <div
          className="relative flex-shrink-0 overflow-hidden w-full max-w-[120px] min-h-[170px]  object-cover"
          style={{
            background:
              "linear-gradient(97.17deg, rgba(255, 237, 211, 0.15) 0%, rgba(255, 231, 208, 0.5) 46.81%, rgba(255, 237, 211, 0.25) 93.62%)",
          }}
        >
          {item.image && !imageError ? (
            <motion.img
              src={item.image}
              alt={item.name}
              className="w-full h-full  object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {getCategoryIcon()}
            </div>
          )}
        </div>

        {/* Content Section - Flexible width */}
        <div className="flex-1  flex flex-col p-3 w-full h-full justify-between items-end  gap-3 h-full ">
          {/* Title and Category */}
          <div className="flex flex-col items-start gap-2 w-full">
            <h6 className="font-medium font-roboto text-base leading-relaxed text-dark  w-full line-clamp-2">
              {item.name}
            </h6>
            {item.category && (
              <p className="font-medium font-roboto text-sm leading-[150%] text-[#636363] w-full truncate">
                {item.category}
              </p>
            )}
          </div>

          {/* Size Selection and Price/Add to Cart */}
          <div className="flex flex-col items-start  self-end  gap-3 w-full">
            {/* Size Selection */}
            {availableSizes.length > 0 && (
              <div className="flex flex-row items-center gap-[14px] h-[25px]">
                {availableSizes.map((size) => {
                  const sizeName =
                    sizeOptions[size] ||
                    size.charAt(0).toUpperCase() + size.slice(1);
                  const isSelected = selectedSize === size;

                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`cursor-pointer transition-all duration-200 px-3  py-0.5 rounded ${isSelected ? " bg-secondary-50 shadow-2xs rounded-sm" : ""}  `}
                    >
                      <b
                        className={`font-medium font-roboto text-sm whitespace-nowrap ${
                          isSelected ? "text-primary-500" : "text-secondary-400"
                        }`}
                      >
                        {sizeName}
                      </b>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Price and Add to Cart */}
            <div className="flex flex-row justify-between items-center w-full h-8">
              <motion.div
                key={totalPrice}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="flex gap-4"
              >
                <span className="font-bold font-roboto text-lg leading-[150%] text-[#040404]">
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
                    className={`flex items-center justify-center gap-1 cursor-pointer w-full text-sm max-w-[124px] font-medium h-8 rounded transition-all ${
                      price === 0
                        ? "bg-gray-300"
                        : "bg-[#D15202] hover:bg-[#b84802]"
                    }`}
                  >
                    <span className="font-semibold font-roboto text-sm leading-[150%] text-[#F7F7F2] whitespace-nowrap">
                      Add to Cart
                    </span>
                    <IoMdCart className="w-5 h-5 text-[#F7F7F2]" />
                  </motion.button>
                ) : (
                  <motion.div
                    key="quantity-selector"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <button
                      onClick={handleDecrement}
                      className="w-7 h-7 rounded-full bg-gray-100 text-dark flex items-center justify-center text-lg font-bold hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      <IoIosRemove className="text-xl" />
                    </button>
                    <span className="text-dark font-semibold text-base min-w-[24px] text-center">
                      {currentQuantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      className="w-7 h-7 rounded-full bg-[#D15202] text-white flex items-center justify-center text-xl font-bold hover:bg-[#b84802] transition-colors cursor-pointer"
                    >
                      <IoIosAdd className="text-xl" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Display name for debugging
MenuCard.displayName = "MenuCard";

export default MenuCard;
