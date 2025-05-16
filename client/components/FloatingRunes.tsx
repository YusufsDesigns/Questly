import { motion } from "framer-motion";

export default function FloatingRunes() {
  // Define rune positions
  const runes = [
    { x: "10%", y: "20%", rotate: 15, delay: 0, duration: 12 },
    { x: "85%", y: "15%", rotate: -10, delay: 0.5, duration: 15 },
    { x: "20%", y: "75%", rotate: 5, delay: 1, duration: 18 },
    { x: "75%", y: "70%", rotate: -5, delay: 1.5, duration: 14 },
    { x: "45%", y: "90%", rotate: 8, delay: 2, duration: 16 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-5">
      {runes.map((rune, index) => (
        <motion.div
          key={index}
          className="absolute w-16 h-16 magic-rune opacity-30"
          style={{
            left: rune.x,
            top: rune.y,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [
              rune.rotate,
              rune.rotate + 5,
              rune.rotate - 5,
              rune.rotate,
            ],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: rune.duration,
            delay: rune.delay,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
}
