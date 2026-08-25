"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface BookingFormProps {
  initialCar?: string;
}

export default function BookingForm({ initialCar }: BookingFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="success-message"
      >
        <h3 className="item-name">Thank You</h3>
        <p className="body-text">Our concierge will contact you shortly to finalize your reservation.</p>
      </motion.div>
    );
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <input type="text" name="name" placeholder="FULL NAME" required className="form-input" />
        <input type="email" name="email" placeholder="EMAIL ADDRESS" required className="form-input" />
        <select name="car" className="form-input" required defaultValue={initialCar}>
          <option value="">SELECT VEHICLE</option>
          <option value="ferrari-sf90">Ferrari SF90 Stradale</option>
          <option value="porsche-911">Porsche 911 Carrera</option>
          <option value="lamborghini-huracan">Lamborghini Huracán</option>
          <option value="aston-valkyrie">Aston Martin Valkyrie</option>
          <option value="mclaren-720s">McLaren 720S Spider</option>
          <option value="bugatti-chiron">Bugatti Chiron Pure Sport</option>
        </select>
        <button type="submit" disabled={status === "loading"} className="btn-outline dark">
          {status === "loading" ? "PROCESSING..." : "REQUEST RESERVATION"}
        </button>
      </div>
      {status === "error" && <p className="error-text">Something went wrong. Please try again.</p>}

      <style jsx>{`
        .booking-form {
          margin-top: 40px;
          width: 100%;
          max-width: 600px;
        }
        .form-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(23, 30, 25, 0.2);
          padding: 16px 0;
          font-family: var(--font-plus-jakarta);
          font-size: 12px;
          letter-spacing: 0.1em;
          color: var(--navy);
          outline: none;
          transition: border-color 0.3s var(--ease);
        }
        .form-input:focus {
          border-bottom-color: var(--navy);
        }
        .btn-outline.dark {
          border-color: var(--navy);
          color: var(--navy);
          cursor: pointer;
          margin-top: 24px;
        }
        .btn-outline.dark:hover {
          background: var(--navy);
          color: var(--white);
        }
        .success-message {
          padding: 40px;
          background: var(--gray-light);
          border: 1px solid rgba(23, 30, 25, 0.1);
        }
        .error-text {
          color: #ff4d4d;
          font-size: 11px;
          margin-top: 10px;
        }
      `}</style>
    </form>
  );
}
