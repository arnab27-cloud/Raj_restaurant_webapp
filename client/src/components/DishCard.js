import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function DishCard({ dish }) {
  const [quantity, setQuantity] = useState(1);
  const { cart, addToCart } = useCart();

  const handleAddToCart = () => {
    const itemWithQty = { ...dish, id: dish.id, quantity };
    addToCart(itemWithQty);
  };

  // Check if this dish is already in cart
  const cartItem = cart.find(item => item.id === dish.id);
  const selectedQty = cartItem ? cartItem.quantity : 0;

  return (
    <div className="dish-card">
      <img src={dish.image} alt={dish.name} className="dish-image" />
      <h3>{dish.name}</h3>
      <p>{dish.description}</p>
      <p>₹{dish.price}</p>

      <label htmlFor={`qty-${dish.id}`}>Qty:</label>{' '}
      <select
        id={`qty-${dish.id}`}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {[...Array(10)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <button onClick={handleAddToCart}>Add to Cart</button>

      {/* 👇 Show selected quantity if present */}
      {selectedQty > 0 && (
        <p style={{ marginTop: '0.5rem', color: '#007700' }}>
          Selected: {selectedQty} unit{selectedQty > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}