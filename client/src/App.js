import React, { useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import BookTable from './pages/BookTable';
import BookRoom from './pages/BookRoom';
import OrderFood from './pages/FoodOrdering';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';
import { BookingProvider } from './context/BookingContext';

import './transitions.css'; // Animations for route transitions

function App() {
  const location = useLocation();
  const nodeRef = useRef(null); // Avoid deprecated findDOMNode

  return (
  <CartProvider>
    <BookingProvider>
      <Navbar />
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          classNames="fade"
          timeout={300}
        >
          <div ref={nodeRef}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/book-table" element={<BookTable />} />
              <Route path="/book-room" element={<BookRoom />} />
              <Route path="/order-food" element={<OrderFood />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </BookingProvider>
  </CartProvider>
  );
}

export default App;