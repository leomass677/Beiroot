import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage with better error handling
  const [cart, setCart] = useState([]);
  const [currency, setCurrency] = useState("NGN");
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount - RUNS ONLY ONCE
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("beirootCart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          setCart(parsedCart);
          if (process.env.NODE_ENV === "development") {
            console.log(
              "Cart loaded from localStorage:",
              parsedCart.length,
              "items",
            );
          }
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to load cart from localStorage:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("beirootCart", JSON.stringify(cart));
      updateCartTotals();
      if (process.env.NODE_ENV === "development") {
        console.log("Cart saved to localStorage:", cart.length, "items");
      }
    }
  }, [cart, isLoaded]);

  // Update cart totals
  const updateCartTotals = () => {
    const total = cart.reduce(
      (sum, item) => sum + (item.total || item.price * item.quantity),
      0,
    );
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

      // Add new item with image
      return [
        ...prev,
        {
          ...item,
          total: item.price * item.quantity,
          image: item.image || "/placeholder-food.png",
        },
      ];
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
    localStorage.removeItem("beirootCart");
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

  // Calculate delivery fee based on location
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
    isLoaded,
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
