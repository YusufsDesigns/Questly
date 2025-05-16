"use client"

// app/components/Hero.tsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<
    Array<{ id: number; x: number; y: number; size: number; duration: number }>
  >([]);

  // Handle mouse movement for the magical cursor effect
  const handleMouseMove = (e: React.MouseEvent) => {
    setGlowPosition({ x: e.clientX, y: e.clientY });

    // Add sparkle effect on movement with some randomization
    if (Math.random() > 0.85) {
      const newSparkle = {
        id: Date.now(),
        x: e.clientX - 10 + Math.random() * 20,
        y: e.clientY - 10 + Math.random() * 20,
        size: 2 + Math.random() * 6,
        duration: 0.8 + Math.random() * 1.2,
      };
      setSparkles((prev) => [...prev, newSparkle]);

      // Remove sparkle after animation completes
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, newSparkle.duration * 1000);
    }
  };

  // Floating particles background effect
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; speed: number }>
  >([]);

  useEffect(() => {
    // Create initial particles
    const initialParticles = Array(20)
      .fill(0)
      .map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        speed: 0.5 + Math.random() * 1.5,
      }));
    setParticles(initialParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          y: (p.y - p.speed) % 100, // Move upward and wrap around
          x: p.x + Math.sin(p.y / 10) * 0.5, // Gentle sway
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Content data
  const features = [
    {
      title: "Mint NFT Characters",
      description:
        "Choose your hero and mint them as a unique NFT with custom traits and abilities",
      icon: "⚔️",
      color: "from-purple-500 to-blue-500",
    },
    {
      title: "AI-Generated Quests",
      description:
        "Embark on unique adventures crafted by intelligent magic that adapt to your playstyle",
      icon: "🧙",
      color: "from-emerald-500 to-teal-400",
    },
    {
      title: "Collect Magical Loot",
      description:
        "Earn powerful items as NFTs based on your choices and accomplishments",
      icon: "✨",
      color: "from-amber-400 to-orange-500",
    },
  ];
  return (
    <div className="relative py-16 md:py-24 text-center">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="fantasy-title mb-6 animate-float">QUESTLY</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="fantasy-subtitle text-xl md:text-2xl mb-12 max-w-2xl mx-auto bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300 font-medium">
            Forge your destiny in a realm of magic, adventure, and blockchain treasures
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`glass-panel relative overflow-hidden rounded-xl backdrop-blur-lg p-6 border border-white/10 bg-white/5 shadow-xl`}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.2 },
              }}
              onHoverStart={() => setHoveredPanel(index)}
              onHoverEnd={() => setHoveredPanel(null)}
            >
              {/* Animated gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 -z-10`}
                style={{
                  opacity: hoveredPanel === index ? 0.15 : 0,
                }}
              />

              {/* Large emoji icon */}
              <div className="text-4xl mb-4">{feature.icon}</div>

              <h3 className="text-xl font-bold mb-3 text-white">
                {feature.title}
              </h3>

              <p className="text-gray-300">{feature.description}</p>

              {/* Shimmering animation on hover */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                style={{
                  transform:
                    hoveredPanel === index
                      ? "translateX(200%)"
                      : "translateX(-100%)",
                  transition: "transform 1s ease",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
