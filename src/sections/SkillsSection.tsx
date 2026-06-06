import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "../components/FadeInSection";

const skills = [
  {
    id: "analyse", label: "Analyse", emoji: "🔍", color: "#38BDF8",
    glow: "rgba(56,189,248,0.35)", angle: 0,
    description: "Comprendre ce qui se passe vraiment avant d'agir. Trouver la source, pas juste traiter les symptômes.",
  },
  {
    id: "adaptabilite", label: "Adaptabilité", emoji: "🌍", color: "#8B5CF6",
    glow: "rgba(139,92,246,0.35)", angle: 60,
    description: "Fonctionner dans des environnements nouveaux ou contraints — et produire quand même. Les imprévus ne sont pas des problèmes, c'est la façon d'y réagir qui compte.",
  },
  {
    id: "communication", label: "Communication", emoji: "💬", color: "#EC4899",
    glow: "rgba(236,72,153,0.35)", angle: 120,
    description: "Adapter son discours à l'interlocuteur — à l'oral comme à l'écrit. Un technicien, un manager et une DSI n'ont pas besoin du même vocabulaire.",
  },
  {
    id: "autonomie", label: "Autonomie", emoji: "🚀", color: "#F59E0B",
    glow: "rgba(245,158,11,0.35)", angle: 180,
    description: "Avancer sans attendre qu'on me dise quoi faire. Et savoir reconnaître le moment où il faut demander de l'aide — ni trop tôt, ni trop tard.",
  },
  {
    id: "equipe", label: "Travail d'équipe", emoji: "🤝", color: "#22C55E",
    glow: "rgba(34,197,94,0.35)", angle: 240,
    description: "Faire sa part sans bloquer les autres. Communiquer tôt, gérer les frictions, garder son calme — même quand tout le monde ne met pas la même énergie.",
  },
  {
    id: "curiosite", label: "Curiosité & apprentissage", emoji: "✨", color: "#A855F7",
    glow: "rgba(168,85,247,0.35)", angle: 300,
    description: "M'intéresser aux avancées technologiques. Apprendre en faisant. Les erreurs ne sont pas des problèmes — c'est la façon d'y réagir et d'en apprendre qui compte.",
  },
];

// ---------------------------------------------------------------------------
// Constellation — orbite animée via RAF direct sur DOM
// ---------------------------------------------------------------------------
function Constellation({
  onSelect,
  selected,
}: {
  onSelect: (id: string) => void;
  selected: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const planetRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const angleRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastRef = useRef(0);
  const selectedRef = useRef(selected);
  const [dim, setDim] = useState(480);

  useEffect(() => { selectedRef.current = selected; }, [selected]);

  useEffect(() => {
    function update() {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setDim(Math.min(w, 480));
      }
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const cx = dim / 2;
    const cy = dim / 2;
    const r = dim * 0.38;
    const ps = Math.max(60, dim * 0.15);

    function tick(ts: number) {
      if (!selectedRef.current) {
        if (lastRef.current) {
          angleRef.current = (angleRef.current + (ts - lastRef.current) * 0.012) % 360;
        }
        lastRef.current = ts;
      } else {
        lastRef.current = ts;
      }
      const angle = angleRef.current;
      skills.forEach((skill, i) => {
        const el = planetRefs.current[i];
        if (!el) return;
        const rad = ((skill.angle + angle) * Math.PI) / 180;
        const px = cx + r * Math.cos(rad) - ps / 2;
        const py = cy + r * Math.sin(rad) - ps / 2;
        el.style.transform = `translate(${px}px, ${py}px)`;
      });
      if (svgRef.current) {
        const activeLine = svgRef.current.querySelector<SVGLineElement>(".active-line");
        if (activeLine && selectedRef.current) {
          const skill = skills.find(s => s.id === selectedRef.current);
          if (skill) {
            const rad = ((skill.angle + angle) * Math.PI) / 180;
            activeLine.setAttribute("x2", String(cx + r * Math.cos(rad)));
            activeLine.setAttribute("y2", String(cy + r * Math.sin(rad)));
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [dim]);

  const cx = dim / 2;
  const cy = dim / 2;
  const r = dim * 0.38;
  const coreSize = Math.max(90, dim * 0.22);
  const ps = Math.max(60, dim * 0.15);
  const selectedSkill = skills.find(s => s.id === selected);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: dim, maxWidth: dim, margin: "0 auto" }}>
      <svg ref={svgRef} className="absolute inset-0 pointer-events-none" width={dim} height={dim}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="5 8" />
        {selected && selectedSkill && (
          <line className="active-line"
            x1={cx} y1={cy}
            x2={cx + r * Math.cos((selectedSkill.angle + angleRef.current) * Math.PI / 180)}
            y2={cy + r * Math.sin((selectedSkill.angle + angleRef.current) * Math.PI / 180)}
            stroke={selectedSkill.color} strokeWidth="1.5"
          />
        )}
      </svg>

      <motion.div
        className="absolute flex flex-col items-center justify-center rounded-full border border-white/10 bg-[#0B1120]/90 backdrop-blur-md"
        style={{ left: cx - coreSize / 2, top: cy - coreSize / 2, width: coreSize, height: coreSize }}
        animate={{ boxShadow: selected ? `0 0 50px ${selectedSkill?.glow ?? "rgba(56,189,248,0.2)"}` : "0 0 25px rgba(56,189,248,0.08)" }}
        transition={{ duration: 0.4 }}
      >
        <span className="font-bold text-white tracking-widest uppercase text-center leading-tight px-2"
          style={{ fontSize: "clamp(0.52rem, 1.2vw, 0.72rem)" }}>
          Asdjad<br />Bakary
        </span>
        <div className="my-1 h-px w-5 bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]" />
        <span className="text-center text-[#94A3B8]" style={{ fontSize: "clamp(0.42rem, 0.9vw, 0.55rem)" }}>
          Ingénieure
        </span>
      </motion.div>

      {skills.map((skill, i) => {
        const active = selected === skill.id;
        const rad0 = (skill.angle * Math.PI) / 180;
        const px0 = cx + r * Math.cos(rad0) - ps / 2;
        const py0 = cy + r * Math.sin(rad0) - ps / 2;
        return (
          <button
            key={skill.id}
            ref={el => { planetRefs.current[i] = el; }}
            onClick={() => onSelect(active ? "" : skill.id)}
            className="absolute flex flex-col items-center justify-center rounded-full backdrop-blur-md transition-[background,border,box-shadow] duration-300"
            style={{
              top: 0, left: 0,
              transform: `translate(${px0}px, ${py0}px)`,
              width: ps, height: ps,
              background: active ? `radial-gradient(circle at 35% 35%, ${skill.color}55, ${skill.color}18)` : "rgba(11,17,32,0.88)",
              border: `1.5px solid ${active ? skill.color : "rgba(255,255,255,0.12)"}`,
              boxShadow: active ? `0 0 28px ${skill.glow}` : "none",
              zIndex: active ? 20 : 10,
            }}
          >
            <span style={{ fontSize: "clamp(1rem, 2.2vw, 1.4rem)", lineHeight: 1 }}>{skill.emoji}</span>
            <span className="mt-1 font-semibold text-center leading-tight px-1"
              style={{ color: active ? skill.color : "#94A3B8", fontSize: "clamp(0.42rem, 0.95vw, 0.58rem)", transition: "color 0.3s" }}>
              {skill.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Panneau détail
// ---------------------------------------------------------------------------
function SkillDetail({ skill }: { skill: typeof skills[0] }) {
  return (
    <motion.div
      key={skill.id}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.28 }}
      className="relative w-full overflow-hidden rounded-3xl border bg-[#070B14]/80 p-6 backdrop-blur-md"
      style={{ borderColor: `${skill.color}35`, boxShadow: `0 0 40px ${skill.glow}` }}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl" style={{ background: skill.glow }} />
      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl"
            style={{ background: `${skill.color}18`, border: `1px solid ${skill.color}35` }}>
            {skill.emoji}
          </div>
          <div>
            <h3 className="text-base font-bold text-white">{skill.label}</h3>
            <p className="mt-0.5 text-[9px] uppercase tracking-widest" style={{ color: skill.color }}>Compétence démontrée</p>
          </div>
        </div>
        <p className="text-sm leading-6 text-[#94A3B8]">{skill.description}</p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Section principale
// ---------------------------------------------------------------------------
function SkillsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedSkill = skills.find((s) => s.id === selectedId) ?? null;

  return (
    <section id="skills" className="relative overflow-hidden bg-[#0B1120] px-5 py-8 text-white sm:px-6 sm:py-12">
      <div className="absolute left-[-100px] top-10 h-[300px] w-[300px] rounded-full bg-[#38BDF8]/8 blur-3xl" />
      <div className="absolute right-[-100px] bottom-10 h-[300px] w-[300px] rounded-full bg-[#8B5CF6]/8 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeInSection>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <p className="mb-5 text-sm uppercase tracking-[0.35em] text-[#8B5CF6]">Profil & Méthode</p>
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-[1.15] sm:text-5xl">
              Comment je pense,{" "}
              <span className="bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
                comment je travaille.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#94A3B8]">
              Des compétences construites au fil de mes projets et expériences — techniques, humaines, transverses.
            </p>
          </motion.div>

          {/* Origin story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-6 mx-auto max-w-2xl relative overflow-hidden rounded-3xl border border-[#38BDF8]/20 bg-[#070B14]/60 p-8 backdrop-blur-md"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#38BDF8]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#8B5CF6]/10 blur-3xl" />
            <div className="relative z-10 mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#38BDF8]/20 bg-[#0F172A] text-xl">✈️</div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#38BDF8]">D'où je viens</p>
            </div>
            <p className="relative z-10 text-[15px] leading-8 text-[#CBD5E1]">
              J'ai grandi avec les aéroports dans la tête — ma mère y travaillait, et petite, je passais mon temps à essayer de comprendre ce qui se cachait derrière le fonctionnement d'un avion.{" "}
              <span className="font-medium text-white">C'est comme ça que j'ai découvert les systèmes complexes.</span>
            </p>
            <p className="relative z-10 mt-4 text-[15px] leading-8 text-[#CBD5E1]">
              L'électronique, puis l'automatique, puis l'informatique industrielle. Ce qui me motive vraiment, c'est de comprendre comment{" "}
              <span className="font-medium text-white">des systèmes physiques et numériques interagissent</span>{" "}
              — et de contribuer à les rendre plus performants, plus fiables, plus intelligents.
            </p>
            <div className="relative z-10 mt-6 h-px w-full bg-gradient-to-r from-[#38BDF8]/30 via-[#8B5CF6]/30 to-transparent" />
            <p className="relative z-10 mt-4 text-xs text-[#475569]">Polytech Sorbonne · Ingénierie électronique & informatique · Promo 2026</p>
          </motion.div>

          {/* Constellation + détail côte à côte */}
          <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-center">

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="w-full max-w-[480px] mx-auto lg:w-[480px] lg:mx-0 shrink-0"
            >
              <Constellation onSelect={(id) => setSelectedId(id === selectedId ? null : id)} selected={selectedId} />
            </motion.div>

            <div className="w-full lg:flex-1">
              <AnimatePresence mode="wait">
                {selectedSkill ? (
                  <motion.div
                    key={selectedSkill.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SkillDetail skill={selectedSkill} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/8 bg-white/3 py-12 text-center"
                  >
                    <div className="flex gap-2">
                      {skills.map((s) => (
                        <motion.div
                          key={s.id}
                          className="h-2 w-2 rounded-full"
                          style={{ background: s.color }}
                          animate={{ opacity: [0.3, 0.9, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity, delay: skills.indexOf(s) * 0.3 }}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-[#475569] px-6">Clique sur une planète pour en savoir plus</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </FadeInSection>
      </div>
    </section>
  );
}

export default SkillsSection;