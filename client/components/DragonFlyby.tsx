import { motion } from "framer-motion";

export default function DragonFlyby() {
  return (
    <motion.div
      className="fixed w-64 h-32 z-15 dragon-silhouette"
      initial={{ x: "-20vw", y: "20vh", scale: 0.5, opacity: 0 }}
      animate={{
        x: "120vw",
        y: "30vh",
        scale: 1.5,
        opacity: 1,
        transition: { duration: 8 },
      }}
      exit={{ opacity: 0 }}
    >
      {/* Dragon shadow effect */}
      <div className="absolute w-full h-full dragon-shadow"></div>

      {/* Dragon fire breath */}
      <motion.div
        className="absolute -right-16 top-6 w-32 h-12 dragon-fire origin-left"
        animate={{
          scaleX: [1, 1.5, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 0.8,
          repeat: 8,
          repeatType: "reverse",
        }}
      />
    </motion.div>
  );
}
