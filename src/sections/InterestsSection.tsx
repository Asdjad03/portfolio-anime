import { motion } from "framer-motion";

const interests = [
  { label: "Aéronautique", icon: "🛩️" },
  { label: "Innovations tech", icon: "🚀" },
  { label: "Design & UX", icon: "🎨" },
  { label: "Jeux vidéo", icon: "🎮" },
  { label: "Voyages", icon: "✈️" },
  { label: "Basketball", icon: "🏀" },
  { label: "Football", icon: "⚽" },
];

function TagRow({
  tags,
  direction,
  duration,
}: {
  tags: typeof interests;
  direction: "left" | "right";
  duration: number;
}) {
  const tripled = [...tags, ...tags, ...tags, ...tags];

  return (
    <div className="overflow-hidden py-2">
      <motion.div
        animate={{ x: direction === "left" ? ["0%", "-25%"] : ["-25%", "0%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="flex gap-4 w-max"
      >
        {tripled.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.12, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex cursor-default items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md transition hover:border-[#38BDF8]/40 hover:bg-[#38BDF8]/8"
          >
            <span style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}>
              {item.icon}
            </span>
            <span
              className="font-medium text-[#CBD5E1] whitespace-nowrap"
              style={{ fontSize: "clamp(0.75rem, 1.1vw, 0.88rem)" }}
            >
              {item.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function InterestsSection() {
  return (
    <section
      id="interests"
      className="relative overflow-hidden bg-[#0B1120] px-0 py-28 text-white"
    >
      <div className="absolute left-[-120px] top-20 h-[300px] w-[300px] rounded-full bg-[#38BDF8]/8 blur-3xl" />
      <div className="absolute right-[-100px] bottom-20 h-[300px] w-[300px] rounded-full bg-[#EC4899]/8 blur-3xl" />

      {/* TITRE */}
      <div className="relative z-10 mb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p
            className="mb-5 uppercase tracking-[0.35em] text-[#38BDF8]"
            style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)" }}
          >
            Centres d'intérêt
          </p>
          <h2
            className="mx-auto max-w-3xl font-bold leading-[1.2]"
            style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)" }}
          >
            Entre sport, tech et exploration —{" "}
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              ce qui me fait avancer.
            </span>
          </h2>
          <p
            className="mx-auto mt-5 max-w-xl text-[#94A3B8]"
            style={{ fontSize: "clamp(0.85rem, 1.3vw, 1rem)" }}
          >
            Du terrain à l'innovation — basketball, football, jeux vidéo, aéronautique, design et voyages. Des univers différents qui nourrissent ma curiosité et ma créativité.
          </p>
        </motion.div>
      </div>

      {/* TAGS */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 flex flex-col gap-5"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#0B1120] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#0B1120] to-transparent" />

        <TagRow tags={interests} direction="left" duration={18} />
        <TagRow tags={[...interests].reverse()} direction="right" duration={22} />
      </motion.div>
    </section>
  );
}

export default InterestsSection;