import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const experiences = [
  {
    year: "2021",
    icon: "🧼",
    role: "Agent de service",
    company: "GSF · Bouygues Telecom Vélizy",
    period: "Été 2021",
    shortLabel: "GSF",
    tags: ["Responsabilité", "Hygiène", "Rigueur"],
    description: "Hygiène et désinfection des espaces de travail durant la période COVID. Veille au respect des mesures sanitaires.",
  },
  {
    year: "2022",
    icon: "🧾",
    role: "Hôtesse de caisse & Équipière",
    company: "Monoprix Saint-Cloud",
    period: "Été 2022",
    shortLabel: "Monoprix",
    tags: ["Relation client", "Service", "Écoute"],
    description: "Accueil clients, gestion de caisse, organisation des rayons. Développement du sens du contact et de l'écoute.",
  },
  {
    year: "2023",
    icon: "🛒",
    role: "Équipière · Grande distribution",
    company: "E.Leclerc Blagnac",
    period: "Avr. — Août 2023",
    shortLabel: "Leclerc",
    tags: ["Organisation", "Anti-gaspi", "Adaptation"],
    description: "Contact client, orientation en magasin, participation à la préparation de paniers anti-gaspillage.",
  },
  {
    year: "2023",
    icon: "🏭",
    role: "Apprentie Chef de Projet SI Industriels",
    company: "DPD France · Issy-les-Moulineaux",
    period: "Nov. 2023 — Juil. 2026",
    shortLabel: "DPD France",
    tags: ["SI industriels", "Supervision", "Data", "KPI"],
    description: "Contribution à des projets de supervision, digitalisation et amélioration continue. Analyse de flux de données industriels, définition de KPI, collaboration avec les équipes métier et production.",
  },
  {
    year: "2025",
    icon: "✈️",
    role: "Stage de recherche international",
    company: "Xidian University · Xi'an, Chine",
    period: "Juin — Août 2025",
    shortLabel: "Chine",
    tags: ["Recherche", "IoT", "International", "Autonomie"],
    description: "Prototype de montre anti-déshydratation (TTGO, capteurs température, fréquence cardiaque). Découverte d'une nouvelle culture, renforcement de l'anglais.",
  },
];

function ExperienceSection() {
  const [selectedIndex, setSelectedIndex] = useState(3);
  const selected = experiences[selectedIndex];

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#070B14] px-6 py-28 text-white"
    >
      <div className="absolute left-[-140px] top-20 h-[360px] w-[360px] rounded-full bg-[#38BDF8]/10 blur-3xl" />
      <div className="absolute right-[-120px] bottom-20 h-[380px] w-[380px] rounded-full bg-[#8B5CF6]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl">

        {/* TITRE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p
            className="mb-5 uppercase tracking-[0.35em] text-[#38BDF8]"
            style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)" }}
          >
            Expériences
          </p>
          <h2
            className="mx-auto max-w-3xl font-bold leading-[1.2]"
            style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)" }}
          >
            Un parcours construit pas à pas,{" "}
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              du terrain à l'industrie.
            </span>
          </h2>
        </motion.div>

        {/* ROUTE TIMELINE */}
        <div className="relative mb-16">

          {/* Ligne de route */}
          <div className="absolute left-0 right-0 top-10 h-[3px] rounded-full bg-white/5" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute left-0 right-0 top-10 h-[3px] origin-left rounded-full bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#EC4899]"
          />

          {/* Points sur la route */}
          <div className="relative flex justify-between">
            {experiences.map((exp, index) => {
              const isActive = selectedIndex === index;
              return (
                <button
                  key={exp.role}
                  onClick={() => setSelectedIndex(index)}
                  className="group flex flex-col items-center gap-3"
                >
                  {/* Point */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "border-[#38BDF8] bg-[#38BDF8]/15 shadow-[0_0_30px_rgba(56,189,248,0.4)]"
                        : "border-white/15 bg-[#0F172A] hover:border-[#8B5CF6]/50"
                    }`}
                  >
                    <span style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}>
                      {exp.icon}
                    </span>

                    {/* Année au dessus */}
                    <span
                      className={`absolute -top-7 font-semibold transition ${
                        isActive ? "text-[#38BDF8]" : "text-[#94A3B8]"
                      }`}
                      style={{ fontSize: "clamp(0.65rem, 1vw, 0.78rem)" }}
                    >
                      {exp.year}
                    </span>
                  </motion.div>

                  {/* Label en dessous */}
                  <span
                    className={`text-center font-medium transition ${
                      isActive ? "text-white" : "text-[#94A3B8]"
                    }`}
                    style={{ fontSize: "clamp(0.6rem, 0.95vw, 0.75rem)" }}
                  >
                    {exp.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CARTE DÉTAIL */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.role}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:p-10"
          >
            <div className="absolute bottom-[-60px] right-[-60px] h-48 w-48 rounded-full bg-[#38BDF8]/8 blur-3xl" />
            <div className="absolute left-[-60px] top-[-60px] h-48 w-48 rounded-full bg-[#8B5CF6]/8 blur-3xl" />

            <div className="relative z-10 grid gap-8 md:grid-cols-[auto_1fr]">

              {/* ICÔNE + PÉRIODE */}
              <div className="flex flex-col items-center gap-4 md:items-start">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#38BDF8]/20 bg-[#0F172A]">
                  <span style={{ fontSize: "2rem" }}>{selected.icon}</span>
                </div>
                <div>
                  <p
                    className="font-medium text-[#38BDF8]"
                    style={{ fontSize: "clamp(0.72rem, 1.1vw, 0.85rem)" }}
                  >
                    {selected.period}
                  </p>
                  <p
                    className="mt-1 font-semibold text-[#8B5CF6]"
                    style={{ fontSize: "clamp(0.78rem, 1.2vw, 0.9rem)" }}
                  >
                    {selected.company}
                  </p>
                </div>
              </div>

              {/* CONTENU */}
              <div>
                <h3
                  className="font-bold text-white"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
                >
                  {selected.role}
                </h3>
                <p
                  className="mt-4 leading-relaxed text-[#CBD5E1]"
                  style={{ fontSize: "clamp(0.82rem, 1.2vw, 0.95rem)" }}
                >
                  {selected.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-[#0F172A]/70 px-3 py-1 text-[#E2E8F0]"
                      style={{ fontSize: "clamp(0.65rem, 0.9vw, 0.75rem)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

export default ExperienceSection;