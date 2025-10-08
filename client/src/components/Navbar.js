import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useBooking } from '../context/BookingContext';
import './NavBar.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { cart } = useCart();
  const { bookings, tables } = useBooking();
  const cartCount = cart.length + bookings.length + tables.length;

  const toggleMenu = () => setIsOpen(prev => !prev);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <div className="navbar-logo">Raj Restaurant 🛎️</div>
        <div className="hamburger" onClick={toggleMenu}>☰</div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="dropdown-menu"
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="close-icon" onClick={toggleMenu}>✖</div>
            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/book-table" onClick={toggleMenu}>Book Table</Link></li>
            <li><Link to="/book-room" onClick={toggleMenu}>Book Room</Link></li>
            <li><Link to="/order-food" onClick={toggleMenu}>Order Food</Link></li>
            <li><Link to="/cart" onClick={toggleMenu}>Cart ({cartCount})</Link></li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}