"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

interface Booking {
  id: string;
  name: string;
  email: string;
  car: string;
  timestamp: string;
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/booking")
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main style={{ background: "var(--white)", minHeight: "100vh" }}>
      <Navbar />
      
      <section className="admin-section" style={{ paddingTop: "160px" }}>
        <div className="container">
          <span className="label-taupe">MANAGEMENT</span>
          <h1 className="section-title">RESERVATION LOG</h1>
          
          {loading ? (
            <p>Loading bookings...</p>
          ) : (
            <div className="bookings-table">
              <div className="table-header">
                <span>DATE</span>
                <span>CLIENT</span>
                <span>EMAIL</span>
                <span>VEHICLE</span>
              </div>
              {bookings.length === 0 ? (
                <p style={{ marginTop: "40px", color: "var(--taupe)" }}>No reservations found.</p>
              ) : (
                bookings.reverse().map(booking => (
                  <div key={booking.id} className="table-row">
                    <span>{new Date(booking.timestamp).toLocaleDateString()}</span>
                    <strong>{booking.name}</strong>
                    <span>{booking.email}</span>
                    <span className="label-sage">{booking.car}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .bookings-table {
          margin-top: 60px;
          border-top: 1px solid rgba(23, 30, 25, 0.1);
        }
        .table-header {
          display: grid;
          grid-template-columns: 1fr 2fr 2fr 1fr;
          padding: 24px 0;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: var(--taupe);
          border-bottom: 1px solid rgba(23, 30, 25, 0.05);
        }
        .table-row {
          display: grid;
          grid-template-columns: 1fr 2fr 2fr 1fr;
          padding: 32px 0;
          align-items: center;
          border-bottom: 1px solid rgba(23, 30, 25, 0.05);
          font-size: 14px;
        }
        .label-sage {
          background: var(--sage);
          color: var(--navy);
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 10px;
          font-weight: 600;
          text-align: center;
          width: fit-content;
        }
      `}</style>
    </main>
  );
}
