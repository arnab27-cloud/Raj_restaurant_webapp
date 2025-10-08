export default function HomePage() {
  return (
    <section style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#BFBF7E',
      color: 'black',
      padding: '2rem',
      gap: '2rem'
    }}>
      {/* Left: Welcome Text */}
      <div style={{ flex: 1 }}>
        <h1>Welcome to Your Stay & Dine Experience</h1>
        <p>Book a room, reserve a table, and order authentic Indian dishes!</p>
      </div>

      {/* Right: Food Image */}
      <div style={{ flex: 1, textAlign: 'right' }}>
        <img
          src="/images/food.jpg" // ✅ Replace with your actual image path
          alt="Delicious Indian Food"
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}
        />
      </div>
    </section>
  );
}
