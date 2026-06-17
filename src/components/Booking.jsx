"use client";

export default function Booking({ booking }) {
  return (
    <div
      style={{
        background: "#0f172a",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "10px",
        color: "white",
        display: "flex",
        gap: "15px",
        alignItems: "center",
      }}
    >
      {/* Car Image */}
      <img
        src={booking.image}
        alt="car"
        style={{
          width: "120px",
          height: "80px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      {/* Info */}
      <div>
        <h3 style={{ margin: 0 }}>{booking.carName}</h3>
        <p style={{ margin: "5px 0" }}>💰 ${booking.price}</p>
        <p style={{ fontSize: "12px", color: "gray" }}>
          {booking.createdAt
            ? new Date(booking.createdAt).toLocaleString()
            : "No date"}
        </p>
      </div>
    </div>
  );
}