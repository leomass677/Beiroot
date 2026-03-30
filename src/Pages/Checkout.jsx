import React from "react";
import { useCart } from "../context/CartProvider";
const Checkout = () => {
  const { cart, formatCurrency } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div>
      Checkout
      <ul>
        {cart.map((item) => (
          <li>
            {item.name}
            <span>{item.quantity} </span>
            {formatCurrency(item.price * item.quantity)}
          </li>
        ))}
      </ul>
      <div>
        <h2>Total:{formatCurrency(total)}</h2>
        <button>Confirm Order</button>
      </div>
    </div>
  );
};

export default Checkout;
