"use client"

import { useEffect } from "react";

export default function MagicParticles() {
  useEffect(() => {
    // Create magical particles effect
    const createParticle = () => {
      const container = document.getElementById("magic-particles-container");
      if (!container) return;

      const particle = document.createElement("div");
      particle.classList.add("magic-particle");

      // Randomize particle properties
      const size = Math.random() * 8 + 2;
      const posX = Math.random() * 100;
      const duration = Math.random() * 8 + 3;
      const hue = Math.floor(Math.random() * 60) + 20; // Golden/amber colors

      // Set particle styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.backgroundColor = `hsla(${hue}, 100%, 70%, ${
        Math.random() * 0.5 + 0.3
      })`;

      container.appendChild(particle);

      // Remove particle after animation completes
      setTimeout(() => {
        if (particle.parentNode === container) {
          container.removeChild(particle);
        }
      }, duration * 1000);
    };

    // Create particles at interval
    const particleInterval = setInterval(createParticle, 300);

    return () => clearInterval(particleInterval);
  }, []);

  return (
    <div
      id="magic-particles-container"
      className="fixed inset-0 pointer-events-none z-10"
    ></div>
  );
}
