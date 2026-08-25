"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav-container">
        <Link href="/" className="logo">AURELIA</Link>
        <div className="nav-links">
          <Link href="#philosophy">Philosophy</Link>
          <Link href="#works">The Fleet</Link>
          <Link href="#services">Experience</Link>
          <Link href="#contact" className="btn-outline">Book an Estate</Link>
        </div>
      </div>
    </motion.nav>
  );
}
