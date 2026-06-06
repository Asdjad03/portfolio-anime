import { motion } from "framer-motion";
import { Mail, MapPin, Sparkles, Briefcase, GraduationCap } from "lucide-react";
import contactPhoto from "../assets/portrait3.png";

const bubblesLeft = [
  {
    icon: <Sparkles size={15} />,
    title: "Disponible",
    text: "À partir de septembre 2026",
    color: "#38BDF8",
    delay: 0,
    floatY: -10,
  },
  {
    icon: <MapPin size={15} />,
    title: "Localisation",
    text: "Île-de-France · ouverte à la mobilité",
    color: "#0EA5E9",
    delay: 0.6,
    floatY: -14,
  },
];

const bubblesRight = [
  {
    icon: <Briefcase size={15} />,
    title: "Je recherche",
    text: "Un CDI dans un environnement technique ambitieux",
    color: "#8B5CF6",
    delay: 0.3,
    floatY: -8,
  },
  {
    icon: <GraduationCap size={15} />,
    title: "Profil",
    text: "Ingénieure électronique & informatique · Promo 2026",
    color: "#EC4899",
    delay: 0.9,
    floatY: -12,
  },
];

// Nuage de pensée SVG — petits cercles qui relient la bulle à la photo
function ThoughtTail({ side, color }: { side: "left" | "right"; color: string }) {
  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 flex items-center gap-1"
      style={{ [side === "left" ? "right" : "left"]: -20 }}
    >
      {[8, 5, 3].map((size, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: size,
            height: size,
            background: color,
            opacity: 0.5 - i * 0.12,
            order: side === "right" ? 2 - i : i,
          }}
        />
      ))}
    </div>
  );
}

function ThoughtBubble({
  bubble,
  side,
}: {
  bubble: typeof bubblesLeft[0];
  side: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      animate={{ y: [0, bubble.floatY, 0] }}
      transition={{
        opacity: { duration: 0.5, delay: bubble.delay },
        x: { duration: 0.5, delay: bubble.delay },
        y: { duration: 4 + bubble.delay * 0.5, repeat: Infinity, ease: "easeInOut", delay: bubble.delay },
      }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.04 }}
      className="relative w-full rounded-2xl border p-3 sm:p-4 backdrop-blur-xl overflow-hidden"
      style={{
        background: "rgba(11,17,32,0.85)",
        borderColor: `${bubble.color}35`,
        boxShadow: `0 0 30px ${bubble.color}15`,
      }}
    >
      {/* Queue de nuage de pensée */}
      <ThoughtTail side={side} color={bubble.color} />

      <div className="flex items-start gap-3">
        <div
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-[#070B14] sm:h-8 sm:w-8 sm:rounded-xl"
          style={{ color: bubble.color, borderColor: `${bubble.color}30` }}
        >
          {bubble.icon}
        </div>
        <div>
          <p className="text-[10px] font-bold text-white sm:text-xs break-words">{bubble.title}</p>
          <p className="mt-0.5 text-[9px] leading-4 text-[#94A3B8] sm:text-[11px] sm:leading-5 break-words">{bubble.text}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#070B14] px-5 py-8 text-white sm:px-6 sm:py-12"
    >
      {/* Glows */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38BDF8]/8 blur-3xl" />
      <div className="absolute right-[-80px] bottom-20 h-[300px] w-[300px] rounded-full bg-[#8B5CF6]/8 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl">

        {/* TITRE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="mb-5 text-sm uppercase tracking-[0.35em] text-[#38BDF8]">Contact</p>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-[1.15] sm:text-5xl">
            Construire quelque chose{" "}
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              qui compte.
            </span>
          </h2>
        </motion.div>

        {/* LAYOUT : bulles gauche | photo | bulles droite */}
        <div className="flex items-center justify-center gap-2 sm:gap-8">

          {/* Colonne gauche */}
          <div className="flex w-[calc(50vw-90px)] min-w-[100px] max-w-[180px] shrink-0 flex-col gap-3">
            {bubblesLeft.map((b) => (
              <ThoughtBubble key={b.title} bubble={b} side="left" />
            ))}
          </div>

          {/* Photo centrale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative shrink-0"
          >
            <div
              className="overflow-hidden rounded-full border border-[#38BDF8]/25 shadow-[0_0_80px_rgba(56,189,248,0.2)]"
              style={{ width: "clamp(120px, 22vw, 200px)", height: "clamp(120px, 22vw, 200px)" }}
            >
              <img
                src={contactPhoto}
                alt="Asdjad Bakary"
                className="h-full w-full object-cover object-center brightness-[1.05] contrast-[1.05]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[#070B14]/10" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-[#070B14]/60 to-transparent" />
            </div>
            {/* Anneau lumineux animé */}
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-[-6px] rounded-full"
              style={{ border: "1.5px solid rgba(56,189,248,0.25)" }}
            />
          </motion.div>

          {/* Colonne droite */}
          <div className="flex w-[calc(50vw-90px)] min-w-[100px] max-w-[180px] shrink-0 flex-col gap-3">
            {bubblesRight.map((b) => (
              <ThoughtBubble key={b.title} bubble={b} side="right" />
            ))}
          </div>

        </div>

        {/* TEXTE D'ACCROCHE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="mx-auto max-w-2xl text-base leading-8 text-[#CBD5E1] sm:text-lg sm:leading-9">
            J'aime comprendre comment les systèmes fonctionnent, mais surtout{" "}
            <span className="font-medium text-white">
              comment ils peuvent aider les personnes qui les utilisent.
            </span>
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#64748B]">
            Que ce soit pour un projet industriel, IoT ou logiciel, je serai ravie d'échanger avec vous.
          </p>
        </motion.div>

        {/* BOUTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="mailto:asdjad.ab3@gmail.com?subject=Contact%20depuis%20votre%20portfolio"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#2563EB] px-8 py-4 font-medium text-white shadow-[0_0_30px_rgba(56,189,248,0.25)] transition hover:scale-105 sm:w-auto"
          >
            <Mail size={18} className="transition group-hover:-translate-y-0.5" />
            asdjad.ab3@gmail.com
          </a>

          <a
            href="https://www.linkedin.com/in/asdjad-bakary/"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-[#8B5CF6]/40 bg-white/5 px-8 py-4 font-medium text-white transition hover:bg-[#8B5CF6]/15 sm:w-auto"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#0A66C2] text-xs font-bold text-white transition group-hover:-translate-y-0.5">
              in
            </span>
            LinkedIn · Asdjad Bakary
          </a>
        </motion.div>

      </div>
    </section>
  );
}

export default ContactSection;