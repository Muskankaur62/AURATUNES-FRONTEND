

import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Music, Sparkles } from "lucide-react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      {/* Background Image with Overlay */}
      <div className="hero-background">
        <img
          src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Concert Background"
          className="background-image"
          loading="lazy"
        />
        <div className="overlay"></div>
      </div>

      {/* Floating Music Notes */}
      <div className="music-note">🎵</div>
      <div className="music-note">🎶</div>
      <div className="music-note">🎵</div>
      <div className="music-note">🎶</div>

      {/* Floating Dots */}
      <div className="floating-dot"></div>
      <div className="floating-dot"></div>
      <div className="floating-dot"></div>
      <div className="floating-dot"></div>
      <div className="floating-dot"></div>

      {/* Hero Content */}
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h1>
          Discover the music that matches your taste{" "}
          <TypeAnimation
            sequence={[
              "Perfect Playlist",
              2000,
              "New Beats",
              2000,
              "Favorite Artists",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
            cursor={true}
            aria-live="polite"
          />
        </h1>
        <motion.p 
          className="tagline"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Music syncs with your emotion.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Link to="/recommendation">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="secondary-cta"
            >
              <Music size={20} /> Explore Now
            </motion.button>
          </Link>
          <Link to="/community">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="secondary-cta"
            >
              <Sparkles size={20} /> Discover More
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
