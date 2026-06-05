import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "../components/FadeInSection";

// ---------------------------------------------------------------------------
// Soft skills — ancrés dans des preuves réelles
// ---------------------------------------------------------------------------
const skills = [
  {
    id: "analyse",
    label: "Analyse",
    emoji: "🔍",
    color: "#38BDF8",
    glow: "rgba(56,189,248,0.35)",
    angle: 0,
    description: "Comprendre ce qui se passe vraiment avant d'agir. Trouver la source, pas juste traiter les symptômes.",
    proofs: [
      { where: "ArchLink · Écart de données", short: "Volumes incorrects en validation : je sautais la 1ère ligne par réflexe Excel — pas d'en-tête dans les CRTRI. Trouvé hypothèse par hypothèse." },
      { where: "ArchLink · Optimisation SFTP", short: "Collecte à 143s par agence. Cause : scan complet à chaque cycle. Filtre 7 jours → 27s. Gain −81%." },
      { where: "ArchLink · Alertes", short: "Faux positifs le dimanche — tunnels muets normalement. Refonte : alerte uniquement pendant les plages de production définies." },
    ],
  },
  {
    id: "adaptabilite",
    label: "Adaptabilité",
    emoji: "🌍",
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.35)",
    angle: 60,
    description: "Fonctionner dans des environnements nouveaux ou contraints — et produire quand même. Les imprévus ne sont pas des problèmes, c'est la façon d'y réagir qui compte.",
    proofs: [
      { where: "Xidian University · Chine", short: "3 mois seule, barrière de la langue totale, matériel à trouver sur place. Itérer avec ce qu'on a, documenter, avancer." },
      { where: "Collaboration interculturelle", short: "Binôme avec une étudiante chinoise, zéro langue commune. Retrouvées en mobilité — appris à se comprendre malgré les mots manquants." },
      { where: "ArchLink · Agences DPD", short: "Chaque agence avait ses propres configurations. Architecture conçue pour absorber la variabilité par paramétrage, pas par code spécifique." },
    ],
  },
  {
    id: "communication",
    label: "Communication",
    emoji: "💬",
    color: "#EC4899",
    glow: "rgba(236,72,153,0.35)",
    angle: 120,
    description: "Adapter son discours à l'interlocuteur — à l'oral comme à l'écrit. Un technicien, un manager et une DSI n'ont pas besoin du même vocabulaire.",
    proofs: [
      { where: "DPD · DSI & SI-INDUS", short: "Présentations bimensuelles à un public mixte. Échanges DSI sur sécurité et RGPD sans mon MA — adapter le niveau de détail selon l'audience." },
      { where: "Documentation ArchLink", short: "Recueil du besoin, env. technique, Gantt — documenté au fil du projet pour que l'équipe puisse suivre sans moi pendant mes absences." },
      { where: "Polytech · Projets académiques", short: "Ruche connectée devant un jury non technique. Fruity Bowl pitché en anglais devant des investisseurs fictifs. Adapter son registre selon le contexte." },
    ],
  },
  {
    id: "autonomie",
    label: "Autonomie",
    emoji: "🚀",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.35)",
    angle: 180,
    description: "Avancer sans attendre qu'on me dise quoi faire. Et savoir reconnaître le moment où il faut demander de l'aide — ni trop tôt, ni trop tard.",
    proofs: [
      { where: "ArchLink · De bout en bout", short: "Du recueil du besoin à la validation terrain, seule. Mon MA en appui — pas en pilote. Savoir demander quand ça bloque vraiment." },
      { where: "Station météo · Chine", short: "Guide IoT pédagogique réalisé seule en anglais, sans ressources habituelles. Livré dans les délais." },
      { where: "Posture d'apprentissage", short: "Je ne cherche pas un poste où tout est défini. Apprendre en faisant, dans des environnements qui bougent — pas en lisant." },
    ],
  },
  {
    id: "equipe",
    label: "Travail d'équipe",
    emoji: "🤝",
    color: "#22C55E",
    glow: "rgba(34,197,94,0.35)",
    angle: 240,
    description: "Faire sa part sans bloquer les autres. Communiquer tôt, gérer les frictions, garder son calme — même quand tout le monde ne met pas la même énergie.",
    proofs: [
      { where: "DPD France · 3 ans", short: "Collaboration avec des profils très différents — ingénieurs, terrain, DSI. Gérer les situations où tout le monde n'avance pas au même rythme, sans que ça devienne un blocage." },
      { where: "Open Ruche · Groupe (4)", short: "Ma partie devait s'assembler avec les autres. Communiquer tôt, livrer quelque chose d'intégrable — pas juste faire sa partie dans son coin." },
      { where: "Binômes & groupes · Polytech", short: "De 2 à 11 personnes selon les projets. Faire sa part, signaler ce qui bloque, ne pas laisser un désaccord s'envenimer — et parfois juste avancer malgré les frictions." },
    ],
  },
  {
    id: "curiosite",
    label: "Curiosité & apprentissage",
    emoji: "✨",
    color: "#A855F7",
    glow: "rgba(168,85,247,0.35)",
    angle: 300,
    description: "M'intéresser aux avancées technologiques. Apprendre en faisant. Les erreurs ne sont pas des problèmes — c'est la façon d'y réagir et d'en apprendre qui compte.",
    proofs: [
      { where: "Three.js · Ce portfolio", short: "Rien de tout ça dans mon cursus. J'ai cherché ce qui était possible, essayé, raté, recommencé. J'apprends mieux comme ça qu'avec n'importe quel cours." },
      { where: "ArchLink · Sécurité", short: "Audit Bandit et detect-secrets — non demandé, découvert en explorant les bonnes pratiques Python. Zéro vulnérabilité critique à la livraison." },
      { where: "Erreurs & méthode", short: "site_id à refactoriser, PCB recommencé, prototype inachevé en Chine. Aucun ne m'a arrêtée — chacun a changé quelque chose dans ma façon de travailler." },
    ],
  },
];
// ---------------------------------------------------------------------------
// Positions planètes
// ---------------------------------------------------------------------------
function getPlanetPosition(angle: number, r: number, cx: number, cy: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

// ---------------------------------------------------------------------------
// Constellation
// ---------------------------------------------------------------------------
function Constellation({
  onSelect,
  selected,
}: {
  onSelect: (id: string) => void;
  selected: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 560, h: 560 });

  useEffect(() => {
    function update() {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        const h = Math.min(w, 560);
        setSize({ w, h });
      }
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const cx = size.w / 2;
  const cy = size.h / 2;
  const r = Math.min(cx, cy) * 0.72;

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: size.h, minHeight: 420 }}>
      {/* SVG lignes orbitales */}
      <svg className="absolute inset-0 pointer-events-none" width={size.w} height={size.h}>
        {/* Orbite */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 7" />
        {/* Lignes centre → planète */}
        {skills.map((skill) => {
          const pos = getPlanetPosition(skill.angle, r, cx, cy);
          const active = selected === skill.id;
          return (
            <line
              key={skill.id}
              x1={cx} y1={cy} x2={pos.x} y2={pos.y}
              stroke={active ? skill.color : "rgba(255,255,255,0.07)"}
              strokeWidth={active ? 1.5 : 0.8}
              strokeDasharray={active ? "none" : "3 6"}
              style={{ transition: "stroke 0.35s, stroke-width 0.35s" }}
            />
          );
        })}
      </svg>

      {/* Noyau central */}
      <motion.div
        className="absolute flex flex-col items-center justify-center rounded-full border border-white/12 bg-[#0B1120]/90 backdrop-blur-md"
        style={{
          left: cx, top: cy,
          transform: "translate(-50%,-50%)",
          width: Math.max(100, r * 0.58),
          height: Math.max(100, r * 0.58),
        }}
        animate={{
          boxShadow: selected
            ? `0 0 50px ${skills.find(s => s.id === selected)?.glow ?? "rgba(56,189,248,0.2)"}`
            : "0 0 30px rgba(56,189,248,0.08)",
        }}
        transition={{ duration: 0.4 }}
      >
        <span className="font-bold text-white tracking-widest uppercase text-center leading-tight px-2"
          style={{ fontSize: "clamp(0.55rem, 1.3vw, 0.75rem)" }}>
          Asdjad<br />Bakary
        </span>
        <div className="my-1 h-px w-5 bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]" />
        <span className="text-center text-[#94A3B8]" style={{ fontSize: "clamp(0.45rem, 1vw, 0.58rem)" }}>
          Ingénieure
        </span>
      </motion.div>

      {/* Planètes */}
      {skills.map((skill) => {
        const pos = getPlanetPosition(skill.angle, r, cx, cy);
        const active = selected === skill.id;
        const ps = Math.max(68, r * 0.42);

        return (
          <motion.button
            key={skill.id}
            onClick={() => onSelect(active ? "" : skill.id)}
            className="absolute flex flex-col items-center justify-center rounded-full backdrop-blur-md"
            style={{
              left: pos.x, top: pos.y,
              transform: "translate(-50%,-50%)",
              width: ps, height: ps,
              background: active
                ? `radial-gradient(circle at 35% 35%, ${skill.color}55, ${skill.color}18)`
                : "rgba(11,17,32,0.88)",
              border: `1.5px solid ${active ? skill.color : "rgba(255,255,255,0.10)"}`,
              boxShadow: active ? `0 0 28px ${skill.glow}` : "none",
              zIndex: active ? 20 : 10,
            }}
            whileHover={{ scale: 1.14 }}
            whileTap={{ scale: 0.94 }}
            animate={{ scale: active ? 1.1 : 1 }}
            transition={{ duration: 0.22 }}
          >
            <span style={{ fontSize: "clamp(1.1rem, 2.4vw, 1.6rem)", lineHeight: 1 }}>{skill.emoji}</span>
            <span
              className="mt-1 font-semibold text-center leading-tight px-1"
              style={{
                color: active ? skill.color : "#94A3B8",
                fontSize: "clamp(0.5rem, 1.1vw, 0.65rem)",
                transition: "color 0.3s",
              }}
            >
              {skill.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Panneau détail — épuré
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
        {/* Header */}
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

        {/* Description courte */}
        <p className="mb-5 text-sm leading-6 text-[#94A3B8]">{skill.description}</p>

        {/* Preuves — une ligne par preuve */}
        <p className="mb-3 text-[9px] font-semibold uppercase tracking-widest" style={{ color: skill.color }}>
          Où je l'ai montré
        </p>
        <div className="space-y-2">
          {skill.proofs.map((proof, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.22, delay: i * 0.06 }}
              className="flex items-start gap-3 rounded-xl border border-white/6 bg-white/3 px-4 py-3"
            >
              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: skill.color }} />
              <div className="min-w-0">
                <span className="text-xs font-semibold" style={{ color: skill.color }}>{proof.where} — </span>
                <span className="text-xs leading-5 text-[#94A3B8]">{proof.short}</span>
              </div>
            </motion.div>
          ))}
        </div>
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

          {/* Origin story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center"
          >
            <div>
              <p className="mb-5 text-sm uppercase tracking-[0.35em] text-[#8B5CF6]">Profil & Méthode</p>
              <h2 className="max-w-xl text-3xl font-bold leading-[1.15] sm:text-5xl">
                Comment je pense,{" "}
                <span className="bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
                  comment je travaille.
                </span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-[#94A3B8]">
                Les technos s'apprennent. Ce qui fait la différence, c'est la façon d'aborder un problème, de réagir face aux imprévus et de livrer quelque chose qui sert vraiment.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-[#38BDF8]/20 bg-[#070B14]/60 p-8 backdrop-blur-md">
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
            </div>
          </motion.div>

          {/* Instruction */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 text-center text-sm text-[#475569]"
          >
            Clique sur une planète pour voir où cette compétence a été démontrée
          </motion.p>

          {/* Constellation + détail */}
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              <Constellation onSelect={(id) => setSelectedId(id === selectedId ? null : id)} selected={selectedId} />
            </motion.div>

            <div className="flex items-start justify-center min-h-[320px] lg:min-h-[460px]">
              <AnimatePresence mode="wait">
                {selectedSkill ? (
                  <SkillDetail key={selectedSkill.id} skill={selectedSkill} />
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex w-full flex-col items-center justify-center gap-5 rounded-3xl border border-white/8 bg-white/3 p-10 text-center"
                    style={{ minHeight: 280 }}
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
                    <p className="text-sm text-[#475569] max-w-xs">
                      Sélectionne une planète pour voir les situations concrètes où cette compétence a été démontrée
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Citation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 overflow-hidden rounded-3xl border border-[#38BDF8]/15 bg-gradient-to-br from-[#38BDF8]/8 via-transparent to-[#8B5CF6]/8 p-8 sm:p-10"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
              <p className="shrink-0 text-5xl font-light text-[#38BDF8]/60 sm:text-6xl">"</p>
              <div>
                <p className="text-lg font-medium leading-8 text-white sm:text-xl sm:leading-9">
                  Je construis des choses utiles, je les rends belles, et je m'assure que les gens comprennent pourquoi elles existent.
                </p>
                <p className="mt-4 text-sm text-[#475569]">Asdjad Bakary · Ingénieure électronique & informatique</p>
              </div>
            </div>
          </motion.div>

        </FadeInSection>
      </div>
    </section>
  );
}

export default SkillsSection;