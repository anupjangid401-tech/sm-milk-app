"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import BookingForm from "./BookingForm";
import { Car } from "@/lib/data";

interface BookingModalProps {
  car: Car | null;
  onClose: () => void;
}

export default function BookingModal({ car, onClose }: BookingModalProps) {
  if (!car) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div 
          className="modal-content"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>

          <div className="modal-grid">
            <div className="modal-image">
              <img src={car.image} alt={car.name} />
              <div className="modal-info">
                <span className="label-taupe">{car.category}</span>
                <h2 className="item-name">{car.name}</h2>
                <div className="modal-specs">
                  <div className="spec-item">
                    <span>POWER</span>
                    <strong>{car.specs.hp}</strong>
                  </div>
                  <div className="spec-item">
                    <span>0-60</span>
                    <strong>{car.specs.zeroToSixty}</strong>
                  </div>
                  <div className="spec-item">
                    <span>PRICE</span>
                    <strong>${car.price.toLocaleString()}/DAY</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-form-section">
              <h3 className="anton-small">REQUEST RESERVATION</h3>
              <p className="body-text">Please provide your details below and our concierge will reach out to verify your credentials.</p>
              <BookingForm initialCar={car.id} />
            </div>
          </div>
        </motion.div>

        <style jsx>{`
          .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(23, 30, 25, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            padding: 40px;
          }
          .modal-content {
            background: var(--white);
            width: 100%;
            max-width: 1100px;
            position: relative;
            overflow: hidden;
          }
          .close-btn {
            position: absolute;
            top: 24px;
            right: 24px;
            background: none;
            border: none;
            cursor: pointer;
            z-index: 10;
            color: var(--navy);
          }
          .modal-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
          .modal-image {
            position: relative;
            background: var(--gray-light);
            padding: 60px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .modal-image img {
            width: 100%;
            margin-bottom: 40px;
          }
          .modal-specs {
            display: flex;
            gap: 32px;
            margin-top: 32px;
            border-top: 1px solid rgba(23, 30, 25, 0.1);
            padding-top: 24px;
          }
          .spec-item span {
            font-size: 10px;
            color: var(--taupe);
            display: block;
            letter-spacing: 0.1em;
          }
          .spec-item strong {
            font-family: var(--font-anton);
            font-size: 1.25rem;
            color: var(--navy);
          }
          .modal-form-section {
            padding: 80px 60px;
          }
          .anton-small {
            font-size: 2rem;
            margin-bottom: 16px;
          }
          @media (max-width: 900px) {
            .modal-grid { grid-template-columns: 1fr; }
            .modal-image { padding: 40px; }
            .modal-form-section { padding: 40px; }
          }
        `}</style>
      </div>
    </AnimatePresence>
  );
}
