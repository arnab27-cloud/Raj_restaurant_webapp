import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookRoom.css';
import { useBooking } from '../context/BookingContext';

export default function BookRoom() {
  const [roomType, setRoomType] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const navigate = useNavigate();
  const { addBooking } = useBooking(); // ✅ Correct hook usage

  const calculatePrice = (checkIn, checkOut, guests) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

    const baseRatePerNight = 2000;
    const extraGuestFee = guests > 2 ? (guests - 2) * 500 : 0;

    return nights * baseRatePerNight + extraGuestFee;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const price = calculatePrice(checkIn, checkOut, guests);

    const booking = {
      id: Date.now(), // ✅ Unique ID for multi-room support
      roomType,
      checkIn,
      checkOut,
      guests: Number(guests),
      price,
    };

    addBooking(booking); // ✅ Push to bookings array
    navigate('/cart');
  };

  return (
    <div className="book-room-container">
      <h2>📅 Book a Room</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label>Room Type:</label>
          <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
            <option value="">-- Select Room Type --</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
          </select>
        </div>

        <div className="form-group">
          <label>Check-In Date:</label>
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Check-Out Date:</label>
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Guests:</label>
          <input
            type="number"
            value={guests}
            min="1"
            max="5"
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>

        <button type="submit" className="book-btn">Book Now</button>
      </form>
    </div>
  );
}