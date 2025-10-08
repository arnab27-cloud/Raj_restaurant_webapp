import { createContext, useContext, useState } from 'react';

// Create the context object
const BookingContext = createContext();

// Provider component that wraps your app
export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);      // Room bookings
  const [tables, setTables] = useState([]);          // Table bookings
  const [cart, setCart] = useState([]);              // Food cart items

  // -------------------- ROOM BOOKINGS --------------------
  const addBooking = (data) => {
    setBookings((prev) => [...prev, data]);
  };

  const removeBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const clearBookings = () => {
    setBookings([]);
  };

  // -------------------- TABLE BOOKINGS --------------------
  const addTableBooking = (table) => {
    // Check for duplicate table booking based on date & time
    const isDuplicate = tables.some(
      (t) =>
        t.tableNumber === table.tableNumber &&
        t.date === table.date &&
        t.time === table.time
    );
    if (isDuplicate || tables.length >= 10) return false;

    setTables((prev) => [...prev, table]);
    return true;
  };

  const removeTableBooking = (id) => {
    setTables((prev) => prev.filter((t) => t.id !== id));
  };

  const clearTableBookings = () => {
    setTables([]);
  };

  // -------------------- CART --------------------
  const clearCart = () => {
    setCart([]);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        removeBooking,
        clearBookings,
        tables,
        addTableBooking,
        removeTableBooking,
        clearTableBookings,
        cart,
        setCart,
        clearCart,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

// ✅ Custom hook to access the booking context
export const useBooking = () => useContext(BookingContext);