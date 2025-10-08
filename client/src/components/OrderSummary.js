import React from 'react';
import { useCart } from '../context/CartContext';

export default function OrderSummary() {
  const { cart } = useCart();

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      {cart.map((item) => (
        <div key={item.id} className="order-item">
          <p><strong>{item.name}</strong></p>
          <p>Price: ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</p>
        </div>
      ))}

      {/* Optional: Total Quantity */}
      <div className="total-quantity">
        <p>
          <strong>Total Quantity:</strong>{' '}
          {cart.reduce((acc, item) => acc + item.quantity, 0)}
        </p>
      </div>
    </div>
  );
}