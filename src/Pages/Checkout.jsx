import React, { useState } from "react";
import { useCart } from "../context/CartProvider";
import {
  IoTrashOutline,
  IoAdd,
  IoRemove,
  IoCartOutline,
} from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const {
    cart,
    formatCurrency,
    updateQuantity,
    removeItem,
    clearCart,
    cartTotal,
    isLoaded,
  } = useCart();

  const [deliveryLocation, setDeliveryLocation] = useState("standard");
  const deliveryFee =
    deliveryLocation === "standard"
      ? 300
      : deliveryLocation === "express"
        ? 500
        : 0;
  const totalAmount = cartTotal + deliveryFee;

  // Generate WhatsApp order message
  const generateWhatsAppMessage = () => {
    const itemsList = cart
      .map((item, index) => {
        return `${index + 1}. ${item.name}${item.selectedSize ? ` (${item.selectedSize})` : ""} x${item.quantity} - ${formatCurrency(item.price * item.quantity)}`;
      })
      .join("%0A");

    const message = `*BEIROOT ORDER*%0A%0A*Order Details:*%0A${itemsList}%0A%0A*Subtotal:* ${formatCurrency(cartTotal)}%0A*Delivery Fee:* ${formatCurrency(deliveryFee)}%0A*Total:* ${formatCurrency(totalAmount)}%0A%0A*Delivery:* ${deliveryLocation === "standard" ? "Standard" : deliveryLocation === "express" ? "Express" : "Pickup"}%0A%0AThank you!`;

    return message;
  };

  const handleWhatsAppCheckout = () => {
    const phoneNumber = "2348034567890";
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  // Show loading state while restoring cart from localStorage
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <IoCartOutline className="text-6xl text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added any items yet
          </p>
          <button
            onClick={() => navigate("/menu")}
            className="bg-primary-500 text-white px-6 py-3 rounded-full hover:bg-primary-600 transition-colors shadow-xs"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Cart Items Section */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="flex flex-col items-start p-0 pb-3 gap-2.5 w-full border-b border-dashed"
                  style={{ borderBottom: "1px dashed #FEE0CD" }}
                >
                  <div className="flex flex-row items-center gap-3 w-full p-4 pb-0">
                    {/* Item Image */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.image || "/placeholder-food.png"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/placeholder-food.png";
                        }}
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-base">
                        {item.name}
                      </h3>
                      {item.selectedSize && (
                        <span className="text-sm text-gray-500 capitalize">
                          {item.selectedSize}
                        </span>
                      )}
                      <p className="text-primary-500 font-medium text-sm mt-0.5">
                        {formatCurrency(item.price)}
                      </p>
                    </div>

                    {/* Quantity Controls and Price */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.selectedSize,
                              item.quantity - 1,
                            )
                          }
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-xs"
                        >
                          <IoRemove className="text-gray-600 text-xs" />
                        </button>
                        <span className="w-6 text-center font-medium text-gray-800 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.selectedSize,
                              item.quantity + 1,
                            )
                          }
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-xs"
                        >
                          <IoAdd className="text-gray-600 text-xs" />
                        </button>
                      </div>
                      <span className="font-semibold text-gray-800 text-sm">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id, item.selectedSize)}
                      className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
                    >
                      <IoTrashOutline size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              {cart.length > 0 && (
                <div className="p-4 border-t border-gray-100 bg-gray-50">
                  <button
                    onClick={clearCart}
                    className="text-red-500 text-sm hover:text-red-600 transition-colors flex items-center gap-1"
                  >
                    <IoTrashOutline size={14} />
                    Clear Cart
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Payment Summary Section */}
          <div className="lg:w-[380px]">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 mb-6">
                Payment Summary
              </h2>

              {/* Subtotal */}
              <div className="flex justify-between py-3 text-gray-600">
                <span>Subtotal:</span>
                <span className="font-medium">{formatCurrency(cartTotal)}</span>
              </div>

              {/* Delivery Fee */}
              <div className="flex justify-between py-3 text-gray-600">
                <span>Delivery Fee:</span>
                <span className="font-medium">
                  {formatCurrency(deliveryFee)}
                </span>
              </div>

              {/* Delivery Option */}
              <div className="py-3 border-t border-gray-100">
                <label className="text-sm text-gray-600 block mb-2">
                  Delivery Option
                </label>
                <select
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 text-sm shadow-xs"
                >
                  <option value="standard">Standard Delivery - ₦300</option>
                  <option value="express">Express Delivery - ₦500</option>
                  <option value="pickup">Pickup - Free</option>
                </select>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Total Amount */}
              <div className="flex justify-between py-3">
                <span className="text-lg font-bold text-gray-800">
                  Total Amount:
                </span>
                <span className="text-xl font-bold text-primary-500">
                  {formatCurrency(totalAmount)}
                </span>
              </div>

              {/* WhatsApp Checkout Button */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full flex items-center justify-center gap-2 font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <FaWhatsapp size={20} />
                Checkout on WhatsApp
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                You'll be redirected to WhatsApp to confirm your order
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
