import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [currency, setCurrency] = useState("NGN");
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("beirootCart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("beirootCart", JSON.stringify(cart));
    updateCartTotals();
  }, [cart]);

  // Update cart totals
  const updateCartTotals = () => {
    const total = cart.reduce((sum, item) => sum + item.total, 0);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartTotal(total);
    setCartCount(count);
  };

  // Add item to cart with size and customizations
  const addItem = (item) => {
    setCart((prev) => {
      // Check if same item with same size exists
      const existing = prev.find(
        (i) => i.id === item.id && i.selectedSize === item.selectedSize,
      );

      if (existing) {
        // Update quantity and total for existing item
        return prev.map((i) =>
          i.id === item.id && i.selectedSize === item.selectedSize
            ? {
                ...i,
                quantity: i.quantity + item.quantity,
                total: (i.quantity + item.quantity) * i.price,
              }
            : i,
        );
      }

      // Add new item
      return [...prev, { ...item, total: item.price * item.quantity }];
    });
  };

  // Update item quantity
  const updateQuantity = (id, selectedSize, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id, selectedSize);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === selectedSize
          ? {
              ...item,
              quantity: newQuantity,
              total: item.price * newQuantity,
            }
          : item,
      ),
    );
  };

  // Remove item completely from cart
  const removeItem = (id, selectedSize) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.selectedSize === selectedSize),
      ),
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Format currency
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  // Get cart summary for WhatsApp order
  const getCartSummary = () => {
    const itemsList = cart
      .map((item, index) => {
        return `${index + 1}. ${item.name}${item.selectedSize ? ` (${item.selectedSize})` : ""} x${item.quantity} - ${formatCurrency(item.total)}`;
      })
      .join("\n");

    return {
      items: itemsList,
      subtotal: cartTotal,
      total: cartTotal,
      itemCount: cartCount,
      itemsList: cart,
    };
  };

  // Calculate delivery fee based on location (example)
  const getDeliveryFee = (location = "standard") => {
    const deliveryFees = {
      standard: 1500,
      express: 2500,
      free: 0,
    };
    return deliveryFees[location] || 1500;
  };

  // Get total with delivery
  const getTotalWithDelivery = (deliveryLocation = "standard") => {
    return cartTotal + getDeliveryFee(deliveryLocation);
  };

  const value = {
    cart,
    cartTotal,
    cartCount,
    currency,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    formatCurrency,
    setCurrency,
    getCartSummary,
    getDeliveryFee,
    getTotalWithDelivery,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
