import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const education = [
  {
    school: "UPEC — Université Paris-Est Créteil",
    shortTitle: "Licence SPI",
    degree: "Sciences pour l'Ingénieur",
    period: "2020 — 2022",
    color: "from-[#0EA5E9] to-[#8B5CF6]",
    progression: "Le point de départ — poser les bases.",
    details:
      "Formation pluridisciplinaire qui m'a donné les fondations : programmation (C, Python), mathématiques, physique, mécanique. C'est ici que j'ai découvert l'ingénierie et confirmé mon attrait pour la technique et la résolution de problèmes.",
    tags: ["C", "Python", "Maths", "Physique", "Mécanique", "Chimie"],
  },
  {
    school: "Université Paul Sabatier Toulouse III",
    shortTitle: "Licence 3",
    degree: "Électronique, Énergie Électrique & Automatique",
    period: "2022 — 2023",
    color: "from-[#8B5CF6] to-[#EC4899]",
    progression: "La spécialisation — aller plus loin dans la technique.",
    details:
      "Après les bases, j'ai voulu me spécialiser. Cette année très pratique m'a plongée dans l'électronique appliquée, l'instrumentation et l'automatique. Elle a confirmé mon souhait de poursuivre en cycle ingénieur.",
    tags: ["Instrumentation", "Micro-électronique", "Traitement du signal", "Automatique", "Énergie"],
  },
  {
    school: "Polytech Sorbonne",
    shortTitle: "Cycle ingénieur",
    degree: "Ingénierie Électronique & Informatique",
    period: "2023 — 2026",
    color: "from-[#38BDF8] to-[#2563EB]",
    progression: "L'aboutissement — technique, data et terrain en alternance.",
    details:
      "Le cycle ingénieur a élargi mon spectre : IoT, IA embarquée, cybersécurité, réseaux, calcul haute performance, gestion d'entreprise. L'alternance chez DPD France m'a permis d'appliquer ces compétences sur des projets industriels réels dès la première année.",
    tags: ["IoT", "IA embarquée", "Cybersécurité", "Management de projet", "Micro-controleur", "Alternance"],
  },
];

function EducationPreviewSection() {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const selectedEducation = education[selectedIndex];

  return (
    <section
      id="education"
      className="relative overflow-hidden bg-[#0B1120] px-6 py-28 text-white"
    >
      <div className="absolute left-[-120px] top-20 h-[320px] w-[320px] rounded-full bg-[#8B5CF6]/10 blur-3xl" />
      <div className="absolute right-[-100px] bottom-20 h-[320px] w-[320px] rounded-full bg-[#38BDF8]/10 blur-3xl" />

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
            className="mb-5 uppercase tracking-[0.35em] text-[#8B5CF6]"
            style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)" }}
          >
            Formation
          </p>
          <h2
            className="mx-auto max-w-3xl font-bold leading-[1.2]"
            style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)" }}
          >
            Un parcours académique{" "}
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              construit étape par étape.
            </span>
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">

          {/* BIBLIOTHÈQUE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
          >
            <div className="absolute bottom-[-60px] left-[-60px] h-48 w-48 rounded-full bg-[#38BDF8]/8 blur-3xl" />
            <div className="absolute right-[-60px] top-[-60px] h-48 w-48 rounded-full bg-[#8B5CF6]/8 blur-3xl" />

            <p
              className="mb-8 uppercase tracking-[0.3em] text-[#38BDF8]"
              style={{ fontSize: "clamp(0.65rem, 1vw, 0.78rem)" }}
            >
              Bibliothèque académique
            </p>

            <div className="flex min-h-[320px] items-end gap-5 overflow-x-auto pb-3">
              {education.map((item, index) => {
                const isActive = selectedIndex === index;
                return (
                  <button
                    key={item.school}
                    onClick={() => setSelectedIndex(index)}
                    className="group flex min-w-[88px] flex-col items-center gap-3"
                  >
                    <motion.div
                      whileHover={{ y: -8, rotate: -1 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative flex h-[280px] w-[88px] items-center justify-center overflow-hidden rounded-2xl border transition ${
                        isActive
                          ? "border-[#38BDF8]/70 shadow-[0_0_35px_rgba(56,189,248,0.3)]"
                          : "border-white/10 hover:border-[#8B5CF6]/40"
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-b ${item.color} opacity-25`} />
                      <div className="absolute left-0 top-0 h-full w-2.5 bg-white/10" />
                      <div className="absolute bottom-4 left-3 right-3 h-px bg-white/20" />
                      <div className="absolute top-4 h-8 w-8 rounded-full border border-white/20 bg-white/10" />

                      <div className="relative z-10 flex h-full flex-col items-center justify-between px-2 py-6 text-center">
                        <p
                          className="text-white/80"
                          style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.72rem)" }}
                        >
                          {item.period}
                        </p>
                        <div className="flex rotate-180 items-center justify-center [writing-mode:vertical-rl]">
                          <p
                            className="font-bold uppercase tracking-[0.15em] text-white"
                            style={{ fontSize: "clamp(0.65rem, 1vw, 0.78rem)" }}
                          >
                            {item.shortTitle}
                          </p>
                        </div>
                        <div className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${item.color}`} />
                      </div>
                    </motion.div>

                    <p
                      className={`transition ${isActive ? "text-[#38BDF8]" : "text-[#94A3B8]"}`}
                      style={{ fontSize: "clamp(0.62rem, 0.9vw, 0.72rem)" }}
                    >
                      Voir plus
                    </p>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* DÉTAIL */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#07111F]/70 p-8 backdrop-blur-md">
            <div className="absolute bottom-[-60px] right-[-60px] h-48 w-48 rounded-full bg-[#38BDF8]/8 blur-3xl" />
            <div className="absolute left-[-60px] top-[-60px] h-48 w-48 rounded-full bg-[#8B5CF6]/8 blur-3xl" />

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedEducation.school}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="relative z-10"
              >
                <div
                  className={`mb-6 inline-flex rounded-full bg-gradient-to-r ${selectedEducation.color} px-5 py-2 font-semibold text-white`}
                  style={{ fontSize: "clamp(0.72rem, 1.1vw, 0.85rem)" }}
                >
                  {selectedEducation.period}
                </div>

                <h3
                  className="font-bold text-white"
                  style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.7rem)" }}
                >
                  {selectedEducation.school}
                </h3>

                <p
                  className="mt-3 text-[#CBD5E1]"
                  style={{ fontSize: "clamp(0.85rem, 1.3vw, 1rem)" }}
                >
                  {selectedEducation.degree}
                </p>

                {/* PROGRESSION */}
                <p
                  className="mt-5 font-semibold"
                  style={{
                    fontSize: "clamp(0.82rem, 1.2vw, 0.95rem)",
                    color:
                      selectedIndex === 0
                        ? "#0EA5E9"
                        : selectedIndex === 1
                        ? "#8B5CF6"
                        : "#38BDF8",
                  }}
                >
                  → {selectedEducation.progression}
                </p>

                <p
                  className="mt-3 leading-relaxed text-[#94A3B8]"
                  style={{ fontSize: "clamp(0.82rem, 1.2vw, 0.95rem)" }}
                >
                  {selectedEducation.details}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedEducation.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-[#0F172A]/70 px-3 py-1 text-[#E2E8F0]"
                      style={{ fontSize: "clamp(0.65rem, 0.9vw, 0.75rem)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EducationPreviewSection;