import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// 5 projets principaux (billes 3D)
// ---------------------------------------------------------------------------
const projects = [
  {
    emoji: "🏭",
    title: "ArchLink",
    subtitle: "DPD France · Alternance 3 ans · En production",
    color: "#38BDF8",
    glow: "rgba(56,189,248,0.3)",
    border: "border-[#38BDF8]/30",
    summary: "8 agences, 9 tunnels, 11 163 fichiers supervisés. Panne détectée en moins de 10 minutes.",
    role: "Développée seule de bout en bout en méthode Agile — du recueil du besoin jusqu'au déploiement. Mon MA comme appui technique, l'équipe SI-INDUS comme utilisateurs finaux, la DSI comme contrainte réglementaire.",
    delivered: [
      "Avant ArchLink : les données existaient, les équipements produisaient de l'information en continu — mais personne ne pouvait les consulter en temps réel ni comparer les agences entre elles.",
      "Plateforme SaaS centralisée développée seule : backend FastAPI, collecte SFTP automatisée, dashboard React consultable depuis un navigateur sans installation locale.",
      "Méthode Agile avec cycles courts : point hebdomadaire avec mon MA, présentations bimensuelles à l'équipe SI-INDUS pour recueillir leurs retours — notamment sur le frontend.",
      "Architecture parallèle Celery/Redis : 8 agences traitées simultanément en moins de 30 secondes par cycle. Avant optimisation, certaines dépassaient 143 secondes.",
      "~33 000 colis supervisés par jour. Détection de panne réseau en moins de 10 minutes. Paramètres centralisés et modifiables sans redémarrage.",
      "Gestion RGPD avec la DSI — questionnaire de conformité, audit Bandit : zéro vulnérabilité critique à la livraison.",
    ],
    impact: "La décision dont je suis la plus satisfaite : pouvoir ajouter une agence depuis l'interface web sans toucher au code — ce n'était pas prévu, c'est une décision prise en cours de route en pensant à la scalabilité réelle. Ce projet m'a aussi appris à gérer mon temps en le découpant en phases claires, à documenter mon travail au fur et à mesure — techniquement et fonctionnellement — et surtout à adapter ce que je produis à mes interlocuteurs : un technicien, un manager et un interlocuteur DSI n'ont pas besoin du même niveau de détail ni du même vocabulaire.",
    tags: ["FastAPI", "React", "PostgreSQL", "Celery", "Redis", "SFTP", "Docker", "RGPD", "Alternance 3 ans"],
    github: null,
  },
  {
    emoji: "🐝",
    title: "Open Ruche",
    subtitle: "IoT embarqué · Polytech Sorbonne · Projet groupe (4)",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.3)",
    border: "border-[#F59E0B]/30",
    summary: "Système IoT complet déployé sur une vraie ruche — capteurs, PCB maison, LoRaWAN, solaire.",
    role: "Responsable Design & intégration système — architecture, routage PCB, intégration des capteurs, configuration des dashboards. Projet en équipe de 4.",
    delivered: [
      "Point de départ : comment surveiller une ruche à distance ? La colonie peut mourir en quelques jours si personne ne détecte un problème à temps.",
      "Système embarqué mesurant poids (HX711), température (DHT22 + DS18B20), luminosité et niveau de batterie en continu.",
      "Transmission LoRaWAN vers The Things Network → visualisation temps réel sur Ubidots depuis un téléphone.",
      "PCB conçu et routé maison — le premier avait des erreurs de conception. On l'a recommencé. Le deuxième a fonctionné.",
      "Alimentation solaire autonome avec mise en veille automatique (TPL5110) pour durer sans intervention.",
      "Déployé sur une vraie ruche — tous les capteurs validés en conditions terrain réelles.",
    ],
    impact: "Ce projet couvre tout : électronique, embarqué, réseau, cloud et interface. Et il m'a appris que rater un PCB n'est pas un échec — c'est une étape normale du prototypage physique.",
    tags: ["Arduino MKR WAN 1310", "LoRaWAN", "TTN", "PCB", "DHT22", "HX711", "Ubidots", "Solaire", "Groupe (4)"],
    github: "https://github.com/Asdjad03/TANQ_Open_Ruche_",
  },
  {
    emoji: "🚇",
    title: "Train & Ascenseur Automatisés",
    subtitle: "Automatique · Polytech Sorbonne · Binôme",
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.3)",
    border: "border-[#8B5CF6]/30",
    summary: "Programmer un train et un ascenseur pour qu'ils prennent les bonnes décisions seuls — en binôme avec une étudiante chinoise.",
    role: "En binôme avec une camarade en échange de Chine — barrière de la langue, mais très bonne collaboration. Logique de commande train (UNITY/C) et ascenseur (VHDL/Quartus).",
    delivered: [
      "Ce qui m'a marquée autant que la technique : travailler avec quelqu'un qui ne parlait ni français ni vraiment anglais. On a trouvé un rythme, et ça s'est très bien passé.",
      "Train (UNITY en C) : modélisation complète du comportement — graphe d'états, table des transitions, codage minimal des états. Le wagon parcourt son cycle complet sans intervention humaine.",
      "Ascenseur (VHDL/Quartus) : gestion des appels, des étages, ouverture/fermeture des portes et alarme sonore — codage one-hot, FSM, synthèse sur FPGA réel.",
      "Deux systèmes qui respectent leur cahier des charges dans toutes les situations testées, zéro blocage.",
    ],
    impact: "Traduire un besoin concret en logique de commande rigoureuse. Et apprendre que la collaboration ne nécessite pas forcément une langue commune — elle nécessite de la patience et de la bonne volonté.",
    tags: ["Machines à états", "VHDL", "C", "UNITY", "Quartus", "FPGA", "Binôme"],
    github: null,
  },
  {
    emoji: "💧",
    title: "Montre Anti-Déshydratation",
    subtitle: "Xidian University · Xi'an, Chine · Été 2025 · Solo",
    color: "#0EA5E9",
    glow: "rgba(14,165,233,0.3)",
    border: "border-[#0EA5E9]/30",
    summary: "Un prototype né d'une observation : à Xi'an en été, 40 degrés, les personnes âgées sortent à peine.",
    role: "Projet individuel en mobilité internationale — sujet libre choisi seule, développement autonome sans ressources habituelles.",
    delivered: [
      "Xi'an en été : chaleur extrême. Je voyais des personnes âgées et des enfants dehors dans des conditions difficiles. J'ai voulu construire quelque chose qui puisse aider.",
      "Idée : une montre capable de détecter les signes de déshydratation (température corporelle, fréquence cardiaque) et d'envoyer une alerte avant que ça devienne dangereux.",
      "Principale difficulté : certaines librairies ne compilaient pas pour la cible matérielle — j'ai cherché des alternatives, documenté chaque essai, itéré.",
      "Résultat honnête : les données capteurs s'affichaient. L'assemblage complet n'a pas pu être finalisé. Je ne l'ai pas caché.",
    ],
    impact: "Ce projet ne s'est pas terminé comme prévu. Mais avancer seule dans un environnement inconnu, sans documentation en français, sans équipe — et produire quelque chose de réel malgré les obstacles — c'est ce que j'en retiens.",
    tags: ["TTGO T-Watch", "IoT embarqué", "Capteurs biométriques", "Recherche", "Mobilité internationale"],
    github: null,
  },
  {
    emoji: "🌐",
    title: "Ce Portfolio",
    subtitle: "Projet personnel · React · TypeScript · Three.js",
    color: "#EC4899",
    glow: "rgba(236,72,153,0.3)",
    border: "border-[#EC4899]/30",
    summary: "Conçu et développé de A à Z. Identité visuelle construite au fil du temps, vrai défi d'hébergement HTTPS.",
    role: "Développeuse & designer seule — maquette Canva, développement React/TypeScript, animations 3D, déploiement HTTPS gratuit.",
    delivered: [
      "Depuis longtemps, je voulais un portfolio qui me ressemble — qui parle de mes projets, mes ambitions, des choses qu'on ne trouve pas dans un CV.",
      "L'identité visuelle vient de toutes les présentations faites pendant mes études. Au fil du temps, j'ai appris ce qui fonctionne visuellement.",
      "Défi technique principal : héberger un site React en HTTPS sécurisé et gratuit. J'ai cherché, comparé, testé — et trouvé le bon compromis.",
      "Animations 3D avec Three.js/React Three Fiber, transitions Framer Motion, responsive mobile — tout ajusté itérativement.",
    ],
    impact: "Ce portfolio dit mieux que n'importe quel autre comment je travaille : je pars d'une envie réelle, je trouve les outils, j'itère jusqu'à ce que ce soit quelque chose dont je suis fière.",
    tags: ["React", "TypeScript", "Three.js", "Framer Motion", "Tailwind CSS", "HTTPS", "Design personnel"],
    github: "https://github.com/Asdjad03/portfolio-anime",
  },
];

// ---------------------------------------------------------------------------
// Autres projets — mini-cartes colorées + modal
// ---------------------------------------------------------------------------
const otherProjects = [
  {
    emoji: "🧠",
    title: "IA Gestion Bancaire",
    context: "Polytech Sorbonne · Projet groupe · NLP",
    front: "Catégoriser automatiquement ses dépenses depuis un relevé PDF.",
    role: "Responsable préparation des données et entraînement du modèle : extraction et nettoyage de relevés bancaires PDF, transformation en CSV, enrichissement de la base d'entraînement par simulation de transactions, entraînement DistilBERT sur Google Colab avec analyse des courbes de perte et early stopping.",
    learned: "Construire un dataset propre à partir de rien — et comprendre que la qualité des données compte plus que l'architecture du modèle.",
    tags: ["DistilBERT", "Python", "NLP", "Pandas", "Camelot", "Colab"],
    color: "#EC4899",
    github: "https://github.com/Asdjad03/IA-Gestion-Banquaire-",
  },
  {
    emoji: "🌿",
    title: "Logement Éco-Responsable",
    context: "Polytech Sorbonne · Projet groupe · Fullstack IoT",
    front: "Site web fullstack connecté à des capteurs réels pour gérer la consommation énergétique d'un logement.",
    role: "Développeuse fullstack — backend FastAPI, base SQLite, frontend HTML/CSS/JS responsive, intégration capteur température/humidité temps réel et API OpenWeather pour la météo locale.",
    learned: "Connecter un objet physique à une interface web de bout en bout — les vrais bugs arrivent toujours à l'interface entre les couches.",
    tags: ["FastAPI", "SQLite", "IoT", "OpenWeather", "HTML/CSS/JS"],
    color: "#22C55E",
    github: "https://github.com/Asdjad03/iot_projet",
  },
  {
    emoji: "🍓",
    title: "Fruity Bowl",
    context: "Polytech Sorbonne · Dragons' Den · 2e place",
    front: "Bol connecté anti-gaspi pitché en anglais — 2e place au vote des investisseurs fictifs.",
    role: "Projet en équipe de 4 (CEO, CTO, COO, CMO). Mon rôle : CEO & Product Developer — définition du produit, cohérence entre le besoin utilisateur et l'architecture capteurs, business model complet (marché 30Md$, abonnement mensuel, partenariats grande distribution). J'ai aussi coordonné l'équipe et porté le pitch en anglais devant les investisseurs fictifs pour 100 000$ contre 20% du capital.",
    learned: "Construire un produit de A à Z en équipe pluridisciplinaire et convaincre en anglais. La 2e place sur vote d'investissement montre que l'idée et la présentation étaient solides — et que savoir défendre un projet compte autant que le projet lui-même.",
    tags: ["IoT", "Business Model", "Pitch anglais", "Équipe (4)", "2e place"],
    color: "#F59E0B",
    github: "https://github.com/Asdjad03",
  },
  {
    emoji: "🤖",
    title: "IA Embarquée — Jetson",
    context: "Polytech Sorbonne · NVIDIA Jetson · Vision embarquée",
    front: "Faire tourner une IA de segmentation d'images sur hardware embarqué limité.",
    role: "Entraînement d'un modèle ResNetUNet sur dataset KITTI (images réelles de conduite), export ONNX, optimisation TensorRT et déploiement sur NVIDIA Jetson pour inférence en temps réel.",
    learned: "Le déploiement sur hardware contraint n'est pas une étape — c'est un projet à part entière. Ce qui tourne sur un PC ne tourne pas forcément sur embarqué.",
    tags: ["PyTorch", "TensorRT", "ONNX", "CUDA", "KITTI", "Jetson"],
    color: "#38BDF8",
    github: "https://github.com/Asdjad03",
  },
  {
    emoji: "📡",
    title: "Robot Mobile DTMF",
    context: "Université Toulouse III · Projet groupe (11 personnes)",
    front: "Décoder les touches d'un clavier téléphonique par analyse de fréquences audio pour piloter un robot.",
    role: "Développeuse traitement du signal dans une équipe de 4 sur un projet global de 11 personnes. Détection temps réel des fréquences DTMF par microphone, identification de la touche et envoi de la commande au robot.",
    learned: "Travailler sur un sous-système en sachant qu'il doit s'intégrer dans un ensemble plus grand — l'interface entre équipes est souvent l'endroit où tout se complique.",
    tags: ["Arduino Due", "Traitement du signal", "DTMF", "Temps réel"],
    color: "#8B5CF6",
    github: "https://github.com/Asdjad03",
  },
  {
    emoji: "🔌",
    title: "Circuits RLC & Instrumentation",
    context: "Université Toulouse III · Électronique analogique",
    front: "Mesurer, observer, valider — comprendre l'écart entre théorie et composant réel.",
    role: "En binôme — câblage, mesures à l'oscilloscope (fréquences de résonance, amortissement, filtres), caractérisation d'un capteur industriel à effet Hall : sensibilité, précision, limites.",
    learned: "Apprendre à faire confiance aux mesures, pas seulement aux équations — et savoir expliquer pourquoi les deux ne coïncident pas toujours.",
    tags: ["Oscilloscope", "Circuits RLC", "Capteur Hall", "Métrologie"],
    color: "#0EA5E9",
    github: "https://github.com/Asdjad03",
  },
  {
    emoji: "🌦️",
    title: "Station Météo Scolaire",
    context: "Xidian University · Chine · Solo · Pédagogie",
    front: "Station météo IoT réalisée seule en Chine, avec un guide pédagogique complet en anglais pour des collégiens.",
    role: "Développeuse et auteure du guide step-by-step — en autonomie totale, en anglais, sans ressources habituelles. Mesure température, humidité et pression atmosphérique avec micro:bit v2 et capteur BME280.",
    learned: "Concevoir quelque chose de simple et l'expliquer clairement à des débutants — c'est un exercice difficile qui oblige à vraiment comprendre ce qu'on fait.",
    tags: ["micro:bit v2", "BME280", "MakeCode", "I2C", "Pédagogie"],
    color: "#22C55E",
    github: "https://github.com/Asdjad03",
  },
  {
    emoji: "🎮",
    title: "Jeu Mastermind",
    context: "UPEC · Binôme · Première expérience dev",
    front: "Recréer un jeu de A à Z en Python — logique, interface graphique et première expérience collaborative.",
    role: "En binôme — logique du jeu, interface graphique Tkinter, code structuré en orienté objet. On a d'abord joué au vrai jeu pour comprendre toutes les règles avant d'écrire une ligne.",
    learned: "Première expérience de développement collaboratif — se répartir le travail, se synchroniser et livrer ensemble quelque chose de fonctionnel.",
    tags: ["Python", "POO", "Tkinter", "Algorithme", "Binôme"],
    color: "#A855F7",
    github: "https://github.com/Asdjad03",
  },
];

// ---------------------------------------------------------------------------
// Positions 3D des 5 billes
// ---------------------------------------------------------------------------
const INIT_POSITIONS: [number, number, number][] = [
  [-2.4, 1.3, 0.8],
  [0.0, 1.9, -0.5],
  [2.4, 1.1, 0.6],
  [-1.5, -1.2, -0.4],
  [1.6, -1.4, 0.5],
];

const FLOAT_PARAMS = [
  { sx: 0.18, sy: 0.14, sz: 0.11, ox: 0.0, oy: 1.2, oz: 0.4, rx: 0.06, ry: 0.08 },
  { sx: 0.13, sy: 0.19, sz: 0.15, ox: 1.1, oy: 0.3, oz: 1.8, rx: 0.09, ry: 0.05 },
  { sx: 0.21, sy: 0.11, sz: 0.13, ox: 2.2, oy: 2.1, oz: 0.9, rx: 0.07, ry: 0.11 },
  { sx: 0.15, sy: 0.22, sz: 0.09, ox: 0.7, oy: 0.8, oz: 2.3, rx: 0.05, ry: 0.07 },
  { sx: 0.20, sy: 0.16, sz: 0.17, ox: 1.9, oy: 1.5, oz: 0.6, rx: 0.10, ry: 0.06 },
];

// ---------------------------------------------------------------------------
// Billes 3D
// ---------------------------------------------------------------------------
function Balls({
  hoveredRef,
  screenPositionsRef,
}: {
  hoveredRef: React.MutableRefObject<number | null>;
  screenPositionsRef: React.MutableRefObject<{ screen: [number, number]; index: number }[]>;
}) {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const { camera, size } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const newPositions: { screen: [number, number]; index: number }[] = [];
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const p = FLOAT_PARAMS[i];
      const base = INIT_POSITIONS[i];
      mesh.position.x = base[0] + Math.sin(t * p.sx + p.ox) * 0.22;
      mesh.position.y = base[1] + Math.cos(t * p.sy + p.oy) * 0.28;
      mesh.position.z = base[2] + Math.sin(t * p.sz + p.oz) * 0.18;
      mesh.rotation.x = Math.sin(t * p.rx + p.ox) * 0.15;
      mesh.rotation.y = Math.cos(t * p.ry + p.oy) * 0.12;
      const targetScale = hoveredRef.current === i ? 1.22 : 1.0;
      mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      const v = mesh.position.clone().project(camera);
      const x = (v.x * 0.5 + 0.5) * size.width;
      const y = (-v.y * 0.5 + 0.5) * size.height;
      newPositions.push({ screen: [x, y], index: i });
    });
    screenPositionsRef.current = newPositions;
  });

  return (
    <>
      {projects.map((project, i) => (
        <mesh key={project.title} ref={(el) => { meshRefs.current[i] = el; }} position={INIT_POSITIONS[i]}>
          <sphereGeometry args={[0.68, 128, 128]} />
          <meshPhysicalMaterial
            color="#f0f6ff"
            roughness={0.06}
            metalness={0.0}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
            reflectivity={1.0}
            envMapIntensity={4.0}
            transmission={0.08}
            emissive={new THREE.Color(project.color)}
            emissiveIntensity={hoveredRef.current === i ? 0.28 : 0.06}
          />
        </mesh>
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Mini-carte "Et aussi" — petite, colorée, ouvre un modal au clic
// ---------------------------------------------------------------------------
const CARD_ROTATIONS = [-3, 2, -5, 4, -2, 5, -4, 3];

function MiniCard({ project, index, onClick }: { project: typeof otherProjects[0]; index: number; onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.08, rotate: 0, zIndex: 20 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 rounded-2xl p-3 cursor-pointer"
      style={{
        width: 110,
        height: 110,
        flexShrink: 0,
        background: `linear-gradient(135deg, ${project.color}20, ${project.color}06)`,
        border: `1.5px solid ${project.color}40`,
        boxShadow: `0 4px 18px ${project.color}12`,
        rotate: `${CARD_ROTATIONS[index % CARD_ROTATIONS.length]}deg`,
      }}
    >
      <span style={{ fontSize: "1.8rem", lineHeight: 1 }}>{project.emoji}</span>
      <p className="text-center font-semibold text-white leading-tight px-1" style={{ fontSize: "0.6rem" }}>
        {project.title}
      </p>
    </motion.button>
  );
}

// ---------------------------------------------------------------------------
// Modal "Et aussi" — détail complet
// ---------------------------------------------------------------------------
function OtherModal({ project, onClose }: { project: typeof otherProjects[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(7,11,20,0.92)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 260 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl bg-[#0B1120] p-7"
        style={{
          border: `2px solid ${project.color}40`,
          boxShadow: `0 0 80px ${project.color}22`,
          maxHeight: "88vh",
          overflowY: "auto",
        }}
      >
        <button onClick={onClose} className="absolute right-5 top-5 text-[#94A3B8] hover:text-white text-lg transition">✕</button>

        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl"
            style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}>
            {project.emoji}
          </div>
          <div>
            <h3 className="font-bold text-white text-base leading-tight">{project.title}</h3>
            <p className="text-[11px] text-[#64748B] mt-0.5">{project.context}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest" style={{ color: project.color }}>Le projet</p>
          <p className="text-sm leading-7 text-[#CBD5E1]">{project.front}</p>
        </div>

        <div className="mb-4">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest" style={{ color: project.color }}>Ce que j'ai fait</p>
          <p className="text-sm leading-7 text-[#CBD5E1]">{project.role}</p>
        </div>

        <div className="mb-5 rounded-2xl p-4" style={{ background: `${project.color}08`, border: `1px solid ${project.color}20` }}>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest" style={{ color: project.color }}>Ce que ça m'a appris</p>
          <p className="text-sm leading-7 text-[#94A3B8]">{project.learned}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-[#0F172A]/80 px-3 py-1 text-xs text-[#E2E8F0]">{tag}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Section principale
// ---------------------------------------------------------------------------
function ProjectsPreviewSection() {
  const [selected, setSelected] = useState<(typeof projects[0] & { github: string | null }) | null>(null);
  const [selectedOther, setSelectedOther] = useState<typeof otherProjects[0] | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; index: number } | null>(null);
  const hoveredRef = useRef<number | null>(null);
  const screenPositionsRef = useRef<{ screen: [number, number]; index: number }[]>([]);
  const [screenPositions, setScreenPositions] = useState<{ screen: [number, number]; index: number }[]>([]);
  const syncRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startSync = () => {
    if (syncRef.current) return;
    syncRef.current = setInterval(() => setScreenPositions([...screenPositionsRef.current]), 30);
  };

  return (
    <section id="projects" className="relative overflow-hidden bg-[#070B14] px-5 py-14 text-white sm:px-6 sm:py-28">
      <div className="absolute left-[-100px] top-10 h-[300px] w-[300px] rounded-full bg-[#38BDF8]/8 blur-3xl" />
      <div className="absolute right-[-100px] bottom-10 h-[300px] w-[300px] rounded-full bg-[#8B5CF6]/8 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl">

        {/* TITRE */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-10 text-center">
          <p className="mb-5 text-sm uppercase tracking-[0.35em] text-[#38BDF8]">Projets</p>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-[1.2] sm:text-5xl">
            Des projets qui partent{" "}
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">d'un vrai problème.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm text-[#94A3B8] sm:text-base">Passe ta souris sur une bille · Clique pour tout découvrir</p>
        </motion.div>

        {/* CANVAS 3D */}
        <div
          className="relative h-[480px] w-full overflow-hidden rounded-[36px] border border-white/10 sm:h-[560px]"
          style={{ background: "radial-gradient(ellipse at 55% 45%, rgba(56,189,248,0.07), transparent 55%), radial-gradient(ellipse at 30% 65%, rgba(139,92,246,0.06), transparent 50%), #070B14" }}
        >
          <Canvas camera={{ position: [0, 0, 8.5], fov: 52 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.4 }} onCreated={() => startSync()}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[4, 6, 5]} intensity={5} color="#ffffff" />
            <pointLight position={[-4, 3, 5]} intensity={3} color="#38BDF8" />
            <pointLight position={[4, -3, 5]} intensity={3} color="#8B5CF6" />
            <pointLight position={[0, 0, 6]} intensity={2} color="#ffffff" />
            <Environment preset="city" />
            <Balls hoveredRef={hoveredRef} screenPositionsRef={screenPositionsRef} />
          </Canvas>

          {/* Emoji overlay — z-index 15, en dessous de la section "Et aussi" */}
          <div className="pointer-events-none absolute inset-0" style={{ zIndex: 15 }}>
            {screenPositions.map(({ screen, index }) => (
              <div
                key={index}
                className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                style={{ left: screen[0], top: screen[1], cursor: "pointer", zIndex: hovered === index ? 18 : 15, width: 52, height: 52 }}
                onMouseEnter={() => { setHovered(index); hoveredRef.current = index; setTooltip({ x: screen[0], y: screen[1], index }); }}
                onMouseLeave={() => { setHovered(null); hoveredRef.current = null; setTooltip(null); }}
                onClick={() => setSelected(projects[index])}
              >
                <span style={{ fontSize: "1.8rem", filter: "drop-shadow(0 3px 10px rgba(0,0,0,0.8))" }}>{projects[index].emoji}</span>
              </div>
            ))}
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {tooltip !== null && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.93 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.93 }} transition={{ duration: 0.15 }}
                className="pointer-events-none absolute"
                style={{
                  left: Math.min(Math.max(tooltip.x - 100, 8), typeof window !== "undefined" ? window.innerWidth - 216 : 200),
                  top: Math.max(tooltip.y - 150, 8),
                  zIndex: 30,
                  width: 200,
                }}
              >
                <div className={`rounded-2xl border ${projects[tooltip.index].border} bg-[#0B1120]/96 px-4 py-3 backdrop-blur-md`}
                  style={{ width: "100%", boxShadow: `0 0 30px ${projects[tooltip.index].glow}` }}>
                  <p className="font-bold text-sm leading-tight" style={{ color: projects[tooltip.index].color }}>{projects[tooltip.index].title}</p>
                  <p className="mt-1 text-[#CBD5E1] text-xs leading-5">{projects[tooltip.index].summary}</p>
                  <p className="mt-2 text-[10px] font-medium" style={{ color: projects[tooltip.index].color }}>Clique →</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2" style={{ zIndex: 5 }}>
            <p className="rounded-full border border-white/10 bg-black/30 px-4 py-1.5 text-xs text-[#94A3B8] backdrop-blur-sm">↑ Passe ta souris sur une bille</p>
          </div>
        </div>

        {/* Pills */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {projects.map((p) => (
            <button key={p.title} onClick={() => setSelected(p)}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs transition hover:border-white/25 hover:bg-white/8">
              <span>{p.emoji}</span>
              <span style={{ color: p.color }}>{p.title}</span>
            </button>
          ))}
        </div>

        {/* ET AUSSI */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="mt-14">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <p className="text-sm uppercase tracking-[0.3em] text-[#475569]">Et aussi…</p>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <p className="mb-8 text-center text-xs text-[#475569]">Clique sur une carte pour en savoir plus</p>

          {/* Grille flex wrap — cartes petites, dispersées visuellement grâce aux rotations */}
          <div className="flex flex-wrap justify-center gap-5">
            {otherProjects.map((project, i) => (
              <MiniCard key={project.title} project={project} index={i} onClick={() => setSelectedOther(project)} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* MODAL projets principaux */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(7,11,20,0.92)", backdropFilter: "blur(12px)" }}
            onClick={() => setSelected(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.88, y: 40 }}
              transition={{ duration: 0.35, type: "spring", stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-xl overflow-hidden rounded-3xl border-2 ${selected.border} bg-[#0B1120] p-7 sm:p-8`}
              style={{ boxShadow: `0 0 100px ${selected.glow}`, maxHeight: "90vh", overflowY: "auto" }}>
              <button onClick={() => setSelected(null)} className="absolute right-5 top-5 text-[#94A3B8] transition hover:text-white text-xl">✕</button>
              <div className="mb-6 flex items-start gap-4">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${selected.border}`} style={{ background: `${selected.color}15`, fontSize: "2rem" }}>
                  {selected.emoji}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight sm:text-xl">{selected.title}</h3>
                  <p className="mt-0.5 text-xs text-[#94A3B8] sm:text-sm">{selected.subtitle}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: selected.color }}>Mon rôle</p>
                <p className="text-sm leading-7 text-[#CBD5E1]">{selected.role}</p>
              </div>
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: selected.color }}>Ce que j'ai fait concrètement</p>
                <ul className="space-y-2">
                  {selected.delivered.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm leading-7 text-[#CBD5E1]">
                      <span style={{ color: selected.color, marginTop: "4px", flexShrink: 0 }}>▸</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`mb-5 rounded-2xl border ${selected.border} p-4`} style={{ background: `${selected.color}08` }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: selected.color }}>Ce que ça m'a appris</p>
                <p className="text-sm leading-7 text-[#CBD5E1]">{selected.impact}</p>
              </div>
              <div className="mb-6 flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-[#0F172A]/80 px-3 py-1 text-xs text-[#E2E8F0]">{tag}</span>
                ))}
              </div>
              {selected.github && (
                <a href={selected.github} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium text-white transition hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${selected.color}, ${selected.color}88)` }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  Voir sur GitHub
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL autres projets */}
      <AnimatePresence>
        {selectedOther && <OtherModal project={selectedOther} onClose={() => setSelectedOther(null)} />}
      </AnimatePresence>
    </section>
  );
}

export default ProjectsPreviewSection;