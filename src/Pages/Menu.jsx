import React from "react";
import { useCart } from "../context/CartProvider";
import { menuItems } from "../data/menuItems";

const Menu = () => {
  const { addItem, removeItem, formatCurrency, cart } = useCart();

  const getQuantity = (id) => {
    const item = cart.find((cartItem) => cartItem.id === id);
    return item ? item.quantity : 0;
  };
  return (
    <div>
      Menu
      <section className="mt-299 w-full h-screen bg-amber-300" id="order-now">
        {" "}
      </section>
    </div>
  );
};

export default Menu;
