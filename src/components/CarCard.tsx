"use client";

import { motion } from "framer-motion";
import { Car } from "@/lib/data";

interface CarCardProps {
  car: Car;
  index: number;
  onClick: () => void;
}

export default function CarCard({ car, index, onClick }: CarCardProps) {
  return (
    <motion.div 
      className="portfolio-item"
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: (index % 3) * 0.1,
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      <div className="image-reveal">
        <img src={car.image} alt={car.name} />
        <div className="hover-overlay">
          <div className="view-tag">BOOK</div>
        </div>
      </div>
      <div className="item-info">
        <div className="info-top">
          <span className="item-category">{car.category}</span>
          <span className="item-price">${car.price.toLocaleString()} / DAY</span>
        </div>
        <h3 className="item-name">{car.name}</h3>
        <div className="item-specs">
          <span>{car.specs.hp}</span> • <span>0-60: {car.specs.zeroToSixty}</span> • <span>{car.specs.engine}</span>
        </div>
      </div>
    </motion.div>
  );
}
