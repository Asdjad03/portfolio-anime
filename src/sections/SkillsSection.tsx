import { motion } from "framer-motion";
import { useState } from "react";
import FadeInSection from "../components/FadeInSection";

const domains = [
  {
    icon: "🏭",
    label: "SI industriels",
    color: "#38BDF8",
    border: "border-[#38BDF8]/30",
    glow: "rgba(56,189,248,0.3)",
    techs: ["Supervision", "KPI", "FastAPI", "SFTP"],
    desc: "Pilotage et digitalisation des opérations industrielles.",
  },
  {
    icon: "📊",
    label: "Data & KPI",
    color: "#8B5CF6",
    border: "border-[#8B5CF6]/30",
    glow: "rgba(139,92,246,0.3)",
    techs: ["SQL", "Power BI", "Pandas", "Excel"],
    desc: "Analyse et visualisation pour la prise de décision.",
  },
  {
    icon: "📡",
    label: "IoT & Embarqué",
    color: "#22C55E",
    border: "border-[#22C55E]/30",
    glow: "rgba(34,197,94,0.3)",
    techs: ["ESP32", "Arduino", "TTGO", "STM32"],
    desc: "Capteurs, objets connectés et systèmes embarqués.",
  },
  {
    icon: "💻",
    label: "Dev Web",
    color: "#0EA5E9",
    border: "border-[#0EA5E9]/30",
    glow: "rgba(14,165,233,0.3)",
    techs: ["React", "TypeScript", "Tailwind", "Framer"],
    desc: "Interfaces modernes pensées pour l'utilisateur.",
  },
  {
    icon: "🧠",
    label: "IA & NLP",
    color: "#EC4899",
    border: "border-[#EC4899]/30",
    glow: "rgba(236,72,153,0.3)",
    techs: ["DistilBERT", "Python", "NLP", "Colab"],
    desc: "Expérimentation autour des modèles de langage.",
  },
  {
    icon: "📋",
    label: "Gestion de projet",
    color: "#F59E0B",
    border: "border-[#F59E0B]/30",
    glow: "rgba(245,158,11,0.3)",
    techs: ["Agile", "SCRUM", "Gantt", "Git"],
    desc: "Organisation et collaboration en environnement technique.",
  },
  {
    icon: "🎨",
    label: "Design & UX",
    color: "#A855F7",
    border: "border-[#A855F7]/30",
    glow: "rgba(168,85,247,0.3)",
    techs: ["Figma", "UI/UX", "Responsive", "Prototypage"],
    desc: "Conception d'interfaces esthétiques et accessibles.",
  },
];

function DomainCard({ domain, index }: { domain: typeof domains[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ scale: hovered ? 1.18 : 1 }}
      style={{
        perspective: "1000px",
        height: hovered ? 180 : 110,
        transition: "height 0.35s ease",
        cursor: "pointer",
        position: "relative",
        zIndex: hovered ? 10 : 1,
      }}
    >
      <motion.div
        animate={{ rotateY: hovered ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          transformStyle: "preserve-3d",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {/* FACE AVANT */}
        <div
          className={`absolute inset-0 rounded-2xl border ${domain.border} bg-[#0B1120]/80 backdrop-blur-md flex flex-col items-center justify-center gap-2`}
          style={{
            backfaceVisibility: "hidden",
            boxShadow: hovered ? `0 0 30px ${domain.glow}` : "none",
            transition: "box-shadow 0.3s ease",
          }}
        >
          <motion.div
            animate={{ y: hovered ? 0 : [0, -4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)" }}
          >
            {domain.icon}
          </motion.div>
          <p
            className="font-semibold text-white text-center px-2"
            style={{ fontSize: "clamp(0.68rem, 1.1vw, 0.82rem)" }}
          >
            {domain.label}
          </p>
        </div>

        {/* FACE ARRIÈRE */}
        <div
          className={`absolute inset-0 rounded-2xl border ${domain.border} bg-[#0B1120]/90 backdrop-blur-md flex flex-col items-start justify-between p-4`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: `0 0 30px ${domain.glow}`,
          }}
        >
          <p
            className="font-bold"
            style={{ fontSize: "clamp(0.78rem, 1.2vw, 0.9rem)", color: domain.color }}
          >
            {domain.label}
          </p>
          <p
            className="text-[#CBD5E1] leading-relaxed"
            style={{ fontSize: "clamp(0.65rem, 0.9vw, 0.75rem)" }}
          >
            {domain.desc}
          </p>
          <div className="flex flex-wrap gap-1">
            {domain.techs.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 bg-[#0F172A]/80 px-2 py-0.5 text-[#E2E8F0]"
                style={{ fontSize: "clamp(0.58rem, 0.82vw, 0.68rem)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#0B1120] px-6 py-28 text-white"
    >
      <div className="absolute left-[-100px] top-10 h-[300px] w-[300px] rounded-full bg-[#38BDF8]/10 blur-3xl" />
      <div className="absolute right-[-100px] bottom-10 h-[300px] w-[300px] rounded-full bg-[#8B5CF6]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <FadeInSection>

          <div className="mb-14 text-center">
            <p
              className="mb-6 uppercase tracking-[0.35em] text-[#8B5CF6]"
              style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)" }}
            >
              Compétences
            </p>
            <h2
              className="mx-auto max-w-3xl font-bold leading-[1.2] text-white"
              style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)" }}
            >
              Des compétences au service de{" "}
              <span className="bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
                solutions concrètes.
              </span>
            </h2>
            <p
              className="mx-auto mt-6 max-w-2xl text-[#94A3B8] leading-relaxed"
              style={{ fontSize: "clamp(0.85rem, 1.3vw, 1rem)" }}
            >
              Passe ta souris sur les cartes pour découvrir les détails.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {domains.map((domain, i) => (
              <DomainCard key={domain.label} domain={domain} index={i} />
            ))}
          </div>

        </FadeInSection>
      </div>
    </section>
  );
}

export default SkillsSection;