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
    tags: ["Rigueur", "Responsabilité", "Protocoles"],
    description:
      "Mon premier contact avec un environnement professionnel exigeant. En pleine période COVID, j'assurais la désinfection des espaces de travail et de restauration d'un grand campus télécom. Ce que j'en retiens : la rigueur des protocoles, le sens de la responsabilité individuelle dans un système collectif — et la réalité du terrain avant tout discours.",
  },
  {
    year: "2022",
    icon: "🧾",
    role: "Hôtesse de caisse & Équipière",
    company: "Monoprix Saint-Cloud",
    period: "Été 2022",
    shortLabel: "Monoprix",
    tags: ["Relation client", "Écoute active", "Service"],
    description:
      "Contact direct et continu avec des clients très différents. J'ai appris à lire rapidement une situation, à désamorcer une tension, à être utile sans être envahissante. Ce sens de l'écoute, je l'ai retrouvé plus tard face aux équipes terrain chez DPD — les mêmes mécanismes, dans un autre contexte.",
  },
  {
    year: "2023",
    icon: "🛒",
    role: "Équipière · Grande distribution",
    company: "E.Leclerc Blagnac",
    period: "Avr. — Août 2023",
    shortLabel: "Leclerc",
    tags: ["Organisation", "Autonomie", "Anti-gaspi"],
    description:
      "Expérience menée en parallèle de ma L3 à Toulouse, puis à temps plein l'été. J'organisais les rayons, orientais les clients et participais à la préparation de paniers anti-gaspillage. Ce qui m'a marquée : voir comment un système logistique réel fonctionne au quotidien — les flux, les contraintes, les petits dysfonctionnements que personne ne corrige parce que ça coûte du temps.",
  },
  {
    year: "2023",
    icon: "🏭",
    role: "Apprentie Chef de Projet SI Industriels",
    company: "DPD France · Issy-les-Moulineaux",
    period: "Nov. 2023 — Juil. 2026",
    shortLabel: "DPD France",
    tags: ["SI industriels", "Supervision", "Data", "KPI", "Gestion de projet"],
    description:
      "Mon expérience centrale. Pendant trois ans, j'ai travaillé sur la supervision des systèmes industriels de DPD — des arches de lecture aux tableaux de bord opérationnels. J'ai appris à aller chercher le besoin réel sur le terrain avant de concevoir quoi que ce soit, à fiabiliser des données qui partaient dans tous les sens, et à faire des choix techniques en tenant compte des contraintes humaines et organisationnelles. Le vrai défi n'était pas la technique — c'était de faire parler des équipes qui ne se parlaient pas.",
  },
  {
    year: "2025",
    icon: "✈️",
    role: "Stage de recherche international",
    company: "Xidian University · Xi'an, Chine",
    period: "Juin — Août 2025",
    shortLabel: "Chine",
    tags: ["IoT embarqué", "Prototypage", "Autonomie", "Recherche"],
    description:
      "Trois mois en autonomie totale dans une université chinoise. L'objectif : prototyper une montre anti-déshydratation combinant capteurs de température corporelle, fréquence cardiaque et vibrations (TTGO T-Watch). Barrière de la langue, documentation partielle, matériel qu'on se procure au fur et à mesure — j'ai itéré, documenté, recommencé. Ce que j'ai retenu de plus précieux : la capacité à avancer avec peu, et à transformer chaque blocage en apprentissage.",
  },
];

function ExperienceSection() {
  const [selectedIndex, setSelectedIndex] = useState(3);
  const selected = experiences[selectedIndex];

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#070B14] px-5 py-14 text-white sm:px-6 sm:py-12"
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
          className="mb-10 text-center"
        >
          <p className="mb-5 text-sm uppercase tracking-[0.35em] text-[#38BDF8]">
            Expériences
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-[1.2] sm:text-5xl">
            Un parcours construit pas à pas,{" "}
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              du terrain à l'industrie.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#94A3B8]">
            Chaque étape a construit quelque chose — le sens du terrain, l'écoute,
            la rigueur, puis la capacité à piloter des projets techniques complexes.
          </p>
        </motion.div>

        {/* ── TIMELINE DESKTOP ─────────────────────────────────────────── */}
        <div className="relative mb-10 hidden sm:block">
          <div className="absolute left-0 right-0 top-10 h-[3px] rounded-full bg-white/5" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute left-0 right-0 top-10 h-[3px] origin-left rounded-full bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#EC4899]"
          />
          <div className="relative flex justify-between">
            {experiences.map((exp, index) => {
              const isActive = selectedIndex === index;
              return (
                <button
                  key={exp.role}
                  onClick={() => setSelectedIndex(index)}
                  className="group flex flex-col items-center gap-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "border-[#38BDF8] bg-[#38BDF8]/15 shadow-[0_0_30px_rgba(56,189,248,0.4)]"
                        : "border-white/15 bg-[#0F172A] hover:border-[#8B5CF6]/50"
                    }`}
                  >
                    <span className="text-2xl">{exp.icon}</span>
                    <span
                      className={`absolute -top-7 text-xs font-semibold transition ${
                        isActive ? "text-[#38BDF8]" : "text-[#94A3B8]"
                      }`}
                    >
                      {exp.year}
                    </span>
                  </motion.div>
                  <span
                    className={`text-center text-xs font-medium transition ${
                      isActive ? "text-white" : "text-[#94A3B8]"
                    }`}
                  >
                    {exp.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── TIMELINE MOBILE scroll horizontal ────────────────────────── */}
        <div className="mb-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 sm:hidden">
          {experiences.map((exp, index) => {
            const isActive = selectedIndex === index;
            return (
              <button
                key={exp.role}
                onClick={() => setSelectedIndex(index)}
                className={`flex min-w-[100px] snap-start flex-col items-center gap-2 rounded-2xl border p-3 transition ${
                  isActive
                    ? "border-[#38BDF8] bg-[#38BDF8]/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <span className="text-2xl">{exp.icon}</span>
                <span
                  className={`text-xs font-semibold ${
                    isActive ? "text-[#38BDF8]" : "text-[#94A3B8]"
                  }`}
                >
                  {exp.year}
                </span>
                <span className="text-center text-[10px] text-[#94A3B8] leading-4">
                  {exp.shortLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── CARTE DÉTAIL ─────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.role}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-md md:p-10"
          >
            <div className="absolute bottom-[-60px] right-[-60px] h-48 w-48 rounded-full bg-[#38BDF8]/8 blur-3xl" />
            <div className="absolute left-[-60px] top-[-60px] h-48 w-48 rounded-full bg-[#8B5CF6]/8 blur-3xl" />

            <div className="relative z-10 grid gap-8 md:grid-cols-[auto_1fr]">

              {/* Icône + méta */}
              <div className="flex flex-row items-start gap-4 md:flex-col md:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#38BDF8]/20 bg-[#0F172A] text-3xl">
                  {selected.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#38BDF8]">
                    {selected.period}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#8B5CF6]">
                    {selected.company}
                  </p>
                </div>
              </div>

              {/* Contenu */}
              <div>
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  {selected.role}
                </h3>
                <p className="mt-5 text-sm leading-8 text-[#CBD5E1] sm:text-[15px]">
                  {selected.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-[#0F172A]/70 px-3 py-1 text-xs text-[#E2E8F0]"
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