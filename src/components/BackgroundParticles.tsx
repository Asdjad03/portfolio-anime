import { motion } from "framer-motion";

const particles = [
  { x: "10%", y: "20%", size: "h-2 w-2", color: "bg-[#38BDF8]", delay: 0 },
  { x: "80%", y: "30%", size: "h-3 w-3", color: "bg-[#8B5CF6]", delay: 0.5 },
  { x: "30%", y: "75%", size: "h-2 w-2", color: "bg-[#EC4899]", delay: 1 },
  { x: "90%", y: "85%", size: "h-2 w-2", color: "bg-[#38BDF8]", delay: 1.5 },
  { x: "55%", y: "15%", size: "h-1.5 w-1.5", color: "bg-[#A855F7]", delay: 2 },
  { x: "18%", y: "60%", size: "h-1.5 w-1.5", color: "bg-[#38BDF8]", delay: 2.5 },
];

function BackgroundParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full ${particle.size} ${particle.color}`}
          style={{
            left: particle.x,
            top: particle.y,
            boxShadow: "0 0 24px currentColor",
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.3, 0.9, 0.3],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 4,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default BackgroundParticles;