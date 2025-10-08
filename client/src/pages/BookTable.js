import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import './BookTable.css';

const BookTable = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [tableNumber, setTableNumber] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { addTableBooking, setCart } = useBooking();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !date || !time) {
      setError('Please fill in all required fields.');
      return;
    }

    const bookingDetails = {
      name,
      date,
      time,
      guests,
      tableNumber,
      type: 'Table'
    };

    const bookingSuccess = addTableBooking(bookingDetails);

    if (bookingSuccess) {
      setSuccess(`Table ${tableNumber} booked successfully for ${name}! You will be redirected to your cart.`);
      setTimeout(() => {
        setCart((prev) => [...prev, bookingDetails]);
        navigate('/cart');
      }, 3000);
    } else {
      setError('This table is already booked for the selected date and time. Please choose another.');
    }
  };

  const tableOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="book-table-container">
      <h2>Book a Table</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="guests">Number of Guests</label>
          <input
            type="number"
            id="guests"
            value={guests}
            min="1"
            max="10"
            onChange={(e) => setGuests(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tableNumber">Table Number</label>
          <select
            id="tableNumber"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
          >
            {tableOptions.map(table => (
              <option key={table} value={table}>
                Table {table}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-btn">Book Now</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default BookTable;