import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useBooking } from '../context/BookingContext';
import AddressAutocomplete from '../components/AddressAutocomplete';
import AddressPickerModal from '../components/AddressPickerModal'; // ✅ Add this import
import { ErrorBoundary } from 'react-error-boundary';

export default function Cart() {
  // ✅ Add state to manage map modal visibility
  const [showAddressPicker, setShowAddressPicker] = useState(false);

  const {
    cart,
    removeFromCart,
    incrementQty,
    decrementQty,
    clearCart,
    cartTotal,
    deliveryAddress,
    setDeliveryAddress,
  } = useCart();

  const {
    bookings,
    tables,
    removeBooking,
    removeTableBooking,
    clearBookings,
    clearTableBookings,
  } = useBooking();

  const bookingsTotal = bookings.reduce((sum, b) => sum + b.price, 0);
  const combinedTotal = cartTotal + bookingsTotal;

  const isCartEmpty =
    cart.length === 0 && bookings.length === 0 && tables.length === 0;

  const handleClearAll = () => {
    clearCart();
    clearBookings();
    clearTableBookings();
    setDeliveryAddress('');
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {/* 📍 Delivery Address Section */}
      {cart.length > 0 && (
        <div
          className="address-section"
          style={{
            display: 'inline-block',
            maxWidth: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          <h3 style={{ marginBottom: '8px' }}>Delivery Address</h3>
          <ErrorBoundary fallback={<div>Address input failed to load.</div>}>
          <AddressAutocomplete
          value={deliveryAddress}
          onChange={(address) => setDeliveryAddress(address)}
          />
          </ErrorBoundary>


          {/* 🌐 Map Selector Modal Trigger */}
          <button
            style={{ marginTop: '8px' }}
            onClick={() => setShowAddressPicker(true)}
          >
            Open Map to Select Address
          </button>

          {/* 📍 Map Modal */}
          <AddressPickerModal
            open={showAddressPicker}
            onClose={() => setShowAddressPicker(false)}
            selectedAddress={deliveryAddress}
            onSelectAddress={(addr) => setDeliveryAddress(addr)}
          />
        </div>
      )}

      {/* 🛏️ Room Booking Summary */}
      {bookings.length > 0 && (
        <div className="booking-section">
          <h3>Room Booking Summary</h3>
          <table className="booking-table">
            <thead>
              <tr>
                <th>Room Type</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Guests</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.roomType}</td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>
                  <td>{booking.guests}</td>
                  <td>₹{booking.price}</td>
                  <td>
                    <button onClick={() => removeBooking(booking.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🪑 Table Booking Summary */}
      {tables.length > 0 && (
        <div className="table-section">
          <h3>Table Booking Summary</h3>
          <table className="table-booking-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Guests</th>
                <th>Table No</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table) => (
                <tr key={table.id}>
                  <td>{table.name}</td>
                  <td>{table.date}</td>
                  <td>{table.time}</td>
                  <td>{table.guests}</td>
                  <td>{table.tableNumber}</td>
                  <td>
                    <button onClick={() => removeTableBooking(table.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🍽️ Food Cart Section */}
      {cart.length > 0 && (
        <div className="cart-items">
          <h3>Food Cart Summary</h3>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Dish</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <button
                      onClick={() => decrementQty(item.id)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span style={{ margin: '0 8px' }}>{item.quantity}</span>
                    <button
                      onClick={() => incrementQty(item.id)}
                      disabled={item.quantity >= 10}
                      style={{
                        opacity: item.quantity >= 10 ? 0.5 : 1,
                        cursor: item.quantity >= 10 ? 'not-allowed' : 'pointer',
                      }}
                    >
                      +
                    </button>
                  </td>
                  <td>₹{item.price}</td>
                  <td>₹{item.price * item.quantity}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 💰 Combined Summary Footer */}
      {!isCartEmpty && (
        <div className="cart-footer">
          <h3>Total Amount: ₹{combinedTotal.toFixed(2)}</h3>
          <button onClick={handleClearAll}>Clear All</button>
          <button
            onClick={() =>
              alert(
                `Order placed!\nDelivery Address:\n${deliveryAddress || 'No address provided'}`
              )
            }
          >
            Checkout
          </button>
        </div>
      )}

      {isCartEmpty && <p>Your cart is empty.</p>}
    </div>
  );
}