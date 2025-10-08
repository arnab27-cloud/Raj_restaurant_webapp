import React from 'react';
import DishCard from '../components/DishCard';
import dishes from '../services/dishData';
import './FoodOrdering.css';

export default function FoodOrdering() {
  return (
    <div>
      <h2>Order Popular Indian Dishes</h2>
      <div className="menu-grid">
        {dishes.map((dish, index) => (
          <DishCard key={index} dish={dish} />
        ))}
      </div>
    </div>
  );
}
