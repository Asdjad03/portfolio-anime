import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "../components/FadeInSection";
import { X } from "lucide-react";

const stats = [
  {
    value: "3 ans",
    label: "d'alternance",
    sub: "Voir l'expérience →",
    color: "linear-gradient(to bottom, #38BDF8, #2563EB)",
    accentColor: "#38BDF8",
    glowColor: "rgba(56,189,248,0.15)",
    borderColor: "rgba(56,189,248,0.25)",
    clickable: true,
    modal: {
      emoji: "🏭",
      title: "Apprentie Chef de Projet SI Industriels",
      company: "DPD France · Issy-les-Moulineaux",
      period: "Novembre 2023 — Juillet 2026",
      color: "#38BDF8",
      glow: "rgba(56,189,248,0.2)",
      description:
        "Alternance au sein d'un environnement SI industriel. Développement d'ArchLink — plateforme de supervision des arches de lecture en agences. Méthode Agile, cycles courts, présentations bimensuelles à l'équipe SI-INDUS. Échanges directs avec la DSI sur la sécurité et la conformité RGPD.",
      tags: ["SI industriels", "FastAPI", "React", "Supervision", "Agile", "RGPD"],
    },
  },
  {
    value: "1",
    label: "expérience internationale",
    sub: "Voir l'expérience →",
    color: "linear-gradient(to bottom, #8B5CF6, #EC4899)",
    accentColor: "#8B5CF6",
    glowColor: "rgba(139,92,246,0.15)",
    borderColor: "rgba(139,92,246,0.25)",
    clickable: true,
    modal: {
      emoji: "✈️",
      title: "Mobilité internationale & Recherche",
      company: "Xidian University · Xi'an, Chine",
      period: "Juin 2025 — Août 2025",
      color: "#8B5CF6",
      glow: "rgba(139,92,246,0.2)",
      description:
        "Stage de recherche en Chine dans le cadre de la mobilité internationale. Prototype de montre anti-déshydratation avec capteurs biométriques sur TTGO T-Watch. Autonomie totale, barrière de la langue, matériel trouvé sur place. Une expérience humaine autant que technique.",
      tags: ["IoT embarqué", "TTGO T-Watch", "Recherche", "Autonomie", "Mobilité"],
    },
  },
  {
    value: "Sept. 2026",
    label: "disponible en CDI",
    sub: "Île-de-France · mobilité ouverte",
    color: "linear-gradient(to bottom, #22C55E, #38BDF8)",
    accentColor: "#22C55E",
    glowColor: "rgba(34,197,94,0.12)",
    borderColor: "rgba(34,197,94,0.2)",
    clickable: false,
    modal: null,
  },
];

function AboutSection() {
  const [openModal, setOpenModal] = useState<typeof stats[0]["modal"] | null>(null);

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#070B14] px-6 py-10 text-white"
    >
      <div className="absolute left-[-100px] top-10 h-[300px] w-[300px] rounded-full bg-[#38BDF8]/10 blur-3xl" />
      <div className="absolute right-[-100px] bottom-10 h-[300px] w-[300px] rounded-full bg-[#8B5CF6]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <FadeInSection>

          <div className="mb-14 text-center">
            <p className="mb-6 uppercase tracking-[0.35em] text-[#38BDF8]"
              style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)" }}>
              À propos
            </p>
            <h2 className="mx-auto max-w-3xl font-bold leading-[1.2] text-white"
              style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)" }}>
              Ingénieure à l'interface entre{" "}
              <span className="bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] bg-clip-text text-transparent">
                la technique, la data
              </span>{" "}
              et les{" "}
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
                usages concrets.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[#94A3B8] leading-relaxed"
              style={{ fontSize: "clamp(0.85rem, 1.3vw, 1rem)" }}>
              Étudiante ingénieure à Polytech Sorbonne, alternante chez DPD France
              sur des projets SI industriels, data et supervision. Je conçois des
              solutions utiles, lisibles et pensées pour les utilisateurs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={stat.clickable ? { y: -4, scale: 1.02 } : {}}
                onClick={() => stat.clickable && stat.modal && setOpenModal(stat.modal)}
                className={`flex items-center gap-4 rounded-2xl border bg-white/3 px-6 py-5 backdrop-blur-md transition-all duration-300 ${
                  stat.clickable ? "cursor-pointer" : "cursor-default"
                }`}
                style={{
                  borderColor: stat.clickable ? stat.borderColor : "rgba(255,255,255,0.08)",
                  boxShadow: stat.clickable ? `0 0 30px ${stat.glowColor}` : "none",
                }}
              >
                <div className="h-12 w-1 shrink-0 rounded-full" style={{ background: stat.color }} />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}>
                    {stat.value}
                  </p>
                  <p className="text-[#94A3B8]" style={{ fontSize: "clamp(0.75rem, 1.1vw, 0.88rem)" }}>
                    {stat.label}
                  </p>
                  <p className="mt-1 text-[11px]" style={{ color: stat.accentColor + "bb" }}>
                    {stat.sub}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </FadeInSection>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(7,11,20,0.88)", backdropFilter: "blur(12px)" }}
            onClick={() => setOpenModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl bg-[#0B1120] p-7"
              style={{
                border: `2px solid ${openModal.color}40`,
                boxShadow: `0 0 80px ${openModal.glow}`,
                maxHeight: "88vh",
                overflowY: "auto",
              }}
            >
              <button
                onClick={() => setOpenModal(null)}
                className="absolute right-5 top-5 text-[#94A3B8] hover:text-white transition"
              >
                <X size={18} />
              </button>

              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
                  style={{ background: `${openModal.color}15`, border: `1px solid ${openModal.color}30` }}>
                  {openModal.emoji}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base leading-tight">{openModal.title}</h3>
                  <p className="text-[11px] mt-0.5" style={{ color: openModal.color }}>{openModal.company}</p>
                </div>
              </div>

              <p className="mb-4 text-[11px] font-medium text-[#475569]">{openModal.period}</p>

              <p className="mb-5 text-sm leading-7 text-[#CBD5E1]">{openModal.description}</p>

              <div className="flex flex-wrap gap-2">
                {openModal.tags.map((tag) => (
                  <span key={tag}
                    className="rounded-full border border-white/10 bg-[#0F172A]/80 px-3 py-1 text-xs text-[#E2E8F0]">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default AboutSection;