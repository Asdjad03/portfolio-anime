import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

const projects = [
  {
    emoji: "🏭",
    title: "ArchLink",
    subtitle: "Supervision SI Industriels — DPD France",
    category: "SI industriels · FastAPI · KPI",
    color: "#38BDF8",
    glow: "rgba(56,189,248,0.3)",
    border: "border-[#38BDF8]/30",
    summary: "Supervision temps réel des arches de lecture en agences DPD avec alertes et dashboards.",
    role: "Alternante Chef de Projet SI — conception fonctionnelle, développement backend, mise en production.",
    delivered: [
      "Système de supervision centralisé des arches de lecture dans les agences",
      "Pipeline de collecte de données via FastAPI + SFTP automatisé",
      "Dashboard de KPI opérationnels avec alertes en cas d'anomalie",
      "Documentation technique et formation des équipes terrain",
    ],
    impact: "Réduction du temps de détection des pannes. Visibilité temps réel sur la performance des équipements industriels.",
    tags: ["FastAPI", "Python", "SFTP", "KPI", "Supervision", "Alternance 3 ans"],
    github: "https://github.com/Asdjad03",
  },
  {
    emoji: "🧠",
    title: "IA Gestion Bancaire",
    subtitle: "Un problème réel d'étudiante — Polytech Sorbonne",
    category: "IA · NLP · Python",
    color: "#EC4899",
    glow: "rgba(236,72,153,0.3)",
    border: "border-[#EC4899]/30",
    summary: "Un outil né d'un vrai problème : finir le mois à découvert sans savoir où est passé l'argent.",
    role: "Lead technique — choix du sujet, préparation des données, entraînement du modèle, développement de l'interface.",
    delivered: [
      "Idée venue d'un constat personnel : en tant qu'étudiante, difficile de suivre ses dépenses et d'anticiper les fins de mois",
      "Outil qui analyse automatiquement un relevé bancaire et range chaque dépense dans la bonne catégorie",
      "Plus besoin de relire ligne par ligne — l'IA fait le tri et affiche une répartition claire",
      "Interface simple : on importe son relevé PDF, on voit immédiatement où part son argent",
    ],
    impact: "Un projet utile au quotidien, pas juste un exercice académique. Montre ma capacité à identifier un besoin réel, choisir la bonne techno et livrer quelque chose de fonctionnel.",
    tags: ["DistilBERT", "Python", "NLP", "Pandas", "Tkinter", "Projet personnel", "Polytech Sorbonne"],
    github: "https://github.com/Asdjad03/IA-Gestion-Banquaire-",
  },
  {
    emoji: "🌿",
    title: "Logement Éco-Responsable",
    subtitle: "Plateforme IoT fullstack de gestion énergétique",
    category: "IoT · FastAPI · SQLite · HTML/CSS/JS",
    color: "#22C55E",
    glow: "rgba(34,197,94,0.3)",
    border: "border-[#22C55E]/30",
    summary: "Site web fullstack connecté à des capteurs IoT pour gérer la consommation énergétique.",
    role: "Développeuse fullstack — backend, frontend, intégration IoT et API tierces.",
    delivered: [
      "Backend FastAPI (Python) avec base de données SQLite et routes REST",
      "Frontend HTML/CSS/JS responsive adapté mobile",
      "Capteur physique température/humidité avec affichage temps réel",
      "Intégration API OpenWeather pour la météo locale des logements",
      "Gestion et visualisation des factures énergétiques",
    ],
    impact: "Application complète de bout en bout mêlant IoT physique, API tierces et interface utilisateur moderne.",
    tags: ["FastAPI", "SQLite", "HTML/CSS/JS", "IoT", "OpenWeather API", "Bootstrap"],
    github: "https://github.com/Asdjad03/iot_projet",
  },
  {
    emoji: "⚡",
    title: "Optimisation HPC",
    subtitle: "Meilleure présentation du cours — Polytech Sorbonne",
    category: "C · Performance · Analyse CPU",
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.3)",
    border: "border-[#8B5CF6]/30",
    summary: "Faire tourner un programme 18× plus vite — sans toucher à ce qu'il fait, juste comment il le fait.",
    role: "Développeuse seule — analyse des goulots d'étranglement, optimisations, benchmarking et présentation.",
    delivered: [
      "Identification de ce qui ralentissait vraiment le programme (84% du temps sur 2 étapes seulement)",
      "Série d'optimisations appliquées une par une, chacune mesurée et justifiée",
      "Résultat final : de 15 images/seconde à 270 images/seconde sur vidéo 1080p",
      "Meilleure note de présentation du cours — jury convaincu par la clarté de l'analyse",
    ],
    impact: "Gain ×18 sur les performances. Ce projet m'a appris à raisonner sur ce que fait vraiment un CPU — pas juste écrire du code qui marche, mais comprendre pourquoi il est lent et comment le rendre rapide.",
    tags: ["C", "Analyse de performance", "SIMD SSE", "Optimisation mémoire", "Meilleure présentation", "Polytech Sorbonne"],
    github: "https://github.com/Asdjad03",
  },
  {
    emoji: "🤖",
    title: "IA Embarquée — NVIDIA Jetson",
    subtitle: "Segmentation d'images pour véhicule autonome",
    category: "PyTorch · TensorRT · ONNX · CUDA",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.3)",
    border: "border-[#F59E0B]/30",
    summary: "Faire tourner une IA de vision sur un petit ordinateur embarqué — sans sacrifier la précision.",
    role: "Développeuse IA embarquée — architecture, entraînement, export et déploiement sur Jetson.",
    delivered: [
      "Modèle capable de reconnaître et délimiter les véhicules et piétons pixel par pixel dans une image",
      "Entraîné sur des images réelles de conduite (dataset KITTI), pas juste des données synthétiques",
      "Modèle compressé et optimisé pour tourner sur hardware embarqué limité en ressources",
      "Chaîne complète : entraînement sur PC → export → déploiement sur Jetson → inférence temps réel",
    ],
    impact: "Un modèle de segmentation fonctionnel qui tourne sur hardware embarqué — directement applicable à des systèmes autonomes réels.",
    tags: ["PyTorch", "TensorRT", "ONNX", "CUDA", "ResNetUNet", "KITTI", "Jetson"],
    github: "https://github.com/Asdjad03",
  },
  {
    emoji: "🐝",
    title: "Open Ruche",
    subtitle: "Système IoT de surveillance de ruches — Polytech Sorbonne",
    category: "Arduino · LoRaWAN · PCB · Ubidots",
    color: "#0EA5E9",
    glow: "rgba(14,165,233,0.3)",
    border: "border-[#0EA5E9]/30",
    summary: "Permettre à un apiculteur de surveiller ses ruches à distance, depuis son téléphone.",
    role: "Responsable Design — conception système, intégration IoT, routage PCB, configuration dashboards. Projet de groupe.",
    delivered: [
      "Système embarqué qui mesure le poids, la température et la luminosité d'une ruche en continu",
      "Les données sont envoyées sans fil (LoRaWAN) et consultables sur un dashboard web en temps réel",
      "PCB fabriqué maison : schéma, routage, soudure — avec gestion des erreurs de conception en cours de route",
      "Alimentation autonome par panneau solaire + batterie, avec mise en veille automatique pour durer dans le temps",
      "Déployé sur une vraie ruche — tous les tests terrain validés",
    ],
    impact: "Un système IoT complet qui fonctionne en conditions réelles. Ce projet couvre tout : électronique, embarqué, réseau, cloud et interface — de A à Z.",
    tags: ["Arduino MKR WAN 1310", "LoRaWAN", "TTN", "PCB", "Ubidots", "Solaire", "Projet groupe"],
    github: "https://github.com/Asdjad03",
  },
  {
    emoji: "🎵",
    title: "Analyseur de Spectre FPGA",
    subtitle: "Projet de groupe — ZedBoard Zynq-7000",
    category: "VHDL · VGA · Co-design embarqué",
    color: "#A855F7",
    glow: "rgba(168,85,247,0.3)",
    border: "border-[#A855F7]/30",
    summary: "Projet de groupe : affichage VGA d'un signal audio sur FPGA Zynq-7000.",
    role: "Développeuse VHDL — responsable du module d'affichage VGA (ma partie dans le projet collectif de 5 personnes).",
    delivered: [
      "Module VGA en VHDL qui affiche une image en damier sur écran physique — format 1024×768 @ 60Hz",
      "Génération précise des signaux de synchronisation horizontale et verticale",
      "Testbench complet pour valider le fonctionnement en simulation avant de tester sur la vraie carte",
      "Conversion d'horloge (100 MHz → 65 MHz) pour respecter les contraintes timing de la norme VGA",
      "Module intégré avec succès dans la chaîne audio complète du groupe",
    ],
    impact: "Ma partie livrable et fonctionnelle dans un projet système complexe — apprendre à travailler sur un sous-système en sachant qu'il doit s'intégrer dans un ensemble plus grand.",
    tags: ["VHDL", "VGA", "Vivado", "Zynq-7000", "Testbench", "Projet groupe (5 personnes)"],
    github: "https://github.com/Asdjad03",
  },
  {
    emoji: "🖥️",
    title: "Processeur Monocycle 32 bits",
    subtitle: "Concevoir un CPU de zéro — Polytech Sorbonne",
    category: "VHDL · FPGA · Architecture numérique",
    color: "#38BDF8",
    glow: "rgba(56,189,248,0.3)",
    border: "border-[#38BDF8]/30",
    summary: "Concevoir un processeur fonctionnel de A à Z en VHDL — comprendre comment un CPU fonctionne vraiment.",
    role: "Conception complète individuelle — de la logique à l'implémentation sur carte FPGA réelle.",
    delivered: [
      "Un processeur qui fonctionne : capable d'exécuter des calculs, gérer des registres et faire des sauts conditionnels",
      "Toutes les briques conçues from scratch : unité de calcul, décodeur d'instructions, unité de contrôle",
      "Testé et validé en simulation avant déploiement sur carte physique FPGA",
      "Résultat concret : processeur tournant à 59.9 MHz sur la carte, sans erreur",
    ],
    impact: "Ce projet m'a permis de comprendre concrètement comment un processeur exécute du code — une compétence rare qui change la façon d'écrire du software.",
    tags: ["VHDL", "FPGA", "Architecture", "Quartus", "Modelsim", "Polytech Sorbonne"],
    github: "https://github.com/Asdjad03",
  },
  {
    emoji: "🌦️",
    title: "Station Météo Scolaire",
    subtitle: "Projet éducatif IoT — Xidian University, Chine",
    category: "micro:bit v2 · BME280 · MakeCode · IoT",
    color: "#22C55E",
    glow: "rgba(34,197,94,0.3)",
    border: "border-[#22C55E]/30",
    summary: "Station météo pédagogique réalisée en autonomie en Chine pour initier des collégiens à l'IoT.",
    role: "Développeuse et auteure du guide pédagogique complet en anglais — projet solo en mobilité internationale.",
    delivered: [
      "Station météo fonctionnelle mesurant température, humidité et pression atmosphérique",
      "Tout conçu seule, dans un environnement étranger, en anglais, sans ressources habituelles",
      "Guide pédagogique step-by-step pour des élèves sans aucune expérience — accessible et progressif",
      "Projet livré dans les délais malgré les défis logistiques et la barrière de la langue",
    ],
    impact: "Ce projet dit autant sur les compétences techniques que sur l'autonomie, l'adaptabilité et la capacité à transmettre dans un contexte difficile.",
    tags: ["micro:bit v2", "BME280", "MakeCode", "I2C", "Pédagogie", "Mobilité internationale", "Xidian University"],
    github: "https://github.com/Asdjad03",
  },
  {
    emoji: "🍓",
    title: "Fruity Bowl",
    subtitle: "2e place Dragons' Den — projet de groupe (4 personnes)",
    category: "IoT · IA · Product Design · Pitch en anglais",
    color: "#EC4899",
    glow: "rgba(236,72,153,0.3)",
    border: "border-[#EC4899]/30",
    summary: "Bol connecté anti-gaspi pitché en anglais — 2e place au vote des meilleurs projets d'investissement.",
    role: "CEO & Product Developer — définition du produit, architecture capteurs, cohérence tech/besoin utilisateur. Projet de groupe de 4 (CEO, CTO, COO, CMO).",
    delivered: [
      "Concept produit complet : un bol qui prédit quand vos fruits vont se gâter, pour éviter le gaspillage",
      "Étude de marché sérieuse : marché adressable de 30 milliards de dollars",
      "Business model complet : prix de vente, abonnement mensuel, partenariats grande distribution",
      "Pitch en anglais devant investisseurs fictifs — demande de 100 000$ pour 20% de l'entreprise",
      "2e place au classement final — vote sur le projet méritant le plus l'investissement",
    ],
    impact: "Capacité à travailler en équipe pluridisciplinaire, construire un produit IoT de A à Z et convaincre en anglais. La 2e place sur vote d'investissement montre que le pitch était solide.",
    tags: ["IoT", "IA", "Business Model", "Pitch en anglais", "Travail en équipe", "2e place"],
    github: "https://github.com/Asdjad03",
  },
  {
    emoji: "📡",
    title: "Robot Mobile DTMF",
    subtitle: "Projet EEA en équipe — Université Paul Sabatier Toulouse III",
    category: "Arduino · Traitement du signal · Embarqué",
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.3)",
    border: "border-[#8B5CF6]/30",
    summary: "Faire parler un téléphone à un robot — détecter des touches par analyse de fréquences audio.",
    role: "Développeuse traitement du signal — équipe de 4 sur la partie DTMF, dans un projet global de 11 personnes.",
    delivered: [
      "Système capable de reconnaître quelle touche d'un clavier téléphonique a été pressée, en temps réel via microphone",
      "Chaque touche correspond à deux fréquences audio combinées — le programme les détecte et les décode",
      "Une fois la touche identifiée, le robot reçoit la commande et se déplace en conséquence",
      "Intégration réussie avec les autres équipes du projet (électronique de puissance, automatique)",
    ],
    impact: "Comprendre comment transformer un son en commande exploitable par une machine — une brique fondamentale du traitement du signal embarqué.",
    tags: ["Arduino Due", "Traitement du signal", "Temps réel", "Projet groupe (11 personnes)", "Université Toulouse III"],
    github: "https://github.com/Asdjad03",
  },
  {
    emoji: "💻",
    title: "Jeu Mastermind",
    subtitle: "Première expérience de dev collaboratif — UPEC",
    category: "Python · POO · Interface graphique",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.3)",
    border: "border-[#F59E0B]/30",
    summary: "Recréer un jeu connu de A à Z en Python — logique, interface et travail en binôme.",
    role: "Développeuse en binôme — logique du jeu, interface graphique, structuration du code.",
    delivered: [
      "On a d'abord joué au vrai jeu pour comprendre toutes les règles avant d'écrire une ligne de code",
      "Logique algorithmique complète : génération du code secret, comparaison des propositions, gestion des erreurs",
      "Interface graphique interactive avec Tkinter — intuitive et agréable à utiliser",
      "Code structuré en orienté objet pour que chaque partie soit indépendante et réutilisable",
    ],
    impact: "Première expérience de développement collaboratif — apprendre à se répartir le travail, se synchroniser et livrer ensemble quelque chose de fonctionnel.",
    tags: ["Python", "POO", "Tkinter", "Algorithme", "Projet binôme", "UPEC"],
    github: "https://github.com/Asdjad03",
  },
  {
    emoji: "🔌",
    title: "Circuits RLC & Instrumentation",
    subtitle: "Caractérisation expérimentale — Université Toulouse III",
    category: "Électronique analogique · Oscilloscope · Métrologie",
    color: "#0EA5E9",
    glow: "rgba(14,165,233,0.3)",
    border: "border-[#0EA5E9]/30",
    summary: "Mesurer, observer et valider — comprendre comment les circuits se comportent vraiment en dehors des équations.",
    role: "Binôme — câblage, mesures expérimentales, analyse et rédaction des résultats.",
    delivered: [
      "Circuits RLC câblés et testés à l'oscilloscope — observation des comportements en conditions réelles",
      "Mesures concrètes : fréquences de résonance, coefficients d'amortissement, réponse des filtres",
      "Caractérisation complète d'un capteur industriel à effet Hall : sensibilité, précision, limites",
      "Comparaison systématique entre ce qu'on mesure et ce que la théorie prédit — et explication des écarts",
    ],
    impact: "Apprendre à faire confiance aux mesures, pas seulement aux équations — comprendre l'écart entre modèle théorique et composant réel.",
    tags: ["Oscilloscope", "Circuits RLC", "Capteur Hall", "Métrologie", "Électronique analogique", "Université Toulouse III"],
    github: "https://github.com/Asdjad03",
  },
  {
    emoji: "🚇",
    title: "Train & Ascenseur Automatisés",
    subtitle: "Automatique à Événements Discrets — Université Toulouse III",
    category: "Automatique · VHDL · Machines à états",
    color: "#22C55E",
    glow: "rgba(34,197,94,0.3)",
    border: "border-[#22C55E]/30",
    summary: "Programmer un train et un ascenseur pour qu'ils prennent les bonnes décisions tout seuls.",
    role: "Conception et implémentation — logique de commande train (C/UNITY) et ascenseur (VHDL/Quartus).",
    delivered: [
      "Train automatisé : toute la logique de circulation programmée — chaque scénario fonctionne comme prévu",
      "Ascenseur intelligent : gestion des appels, des priorités et des situations simultanées — zéro blocage",
      "Deux systèmes qui respectent leur cahier des charges dans toutes les situations testées",
      "Approche rigoureuse : modélisation des états avant de coder, pour ne rien oublier",
    ],
    impact: "Traduire un besoin concret en logique de commande rigoureuse — directement applicable en automatisme industriel.",
    tags: ["Machines à états", "VHDL", "C", "UNITY", "Quartus", "Automatique industrielle", "Université Toulouse III"],
    github: "https://github.com/Asdjad03",
  },
];

const INIT_POSITIONS: [number, number, number][] = [
  [-2.2, 1.6, 0.3],
  [-0.4, 2.0, -0.2],
  [1.5, 1.5, 0.4],
  [-3.0, 0.1, -0.3],
  [-1.2, 0.3, 0.5],
  [0.7, 0.0, -0.4],
  [2.4, 0.4, 0.2],
  [-2.0, -1.4, 0.3],
  [-0.3, -1.6, -0.3],
  [1.4, -1.2, 0.4],
  [2.8, -0.8, -0.2],
  [0.2, -2.8, 0.1],
  [-1.8, 2.8, -0.2],
  [1.8, -2.8, 0.3],
];

function Balls({
  hoveredRef,
  screenPositionsRef,
}: {
  hoveredRef: React.MutableRefObject<number | null>;
  screenPositionsRef: React.MutableRefObject<{ screen: [number, number]; index: number }[]>;
}) {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const { camera, size } = useThree();
  const motionData = useMemo(
    () => projects.map(() => ({
      ox: Math.random() * Math.PI * 2,
      oy: Math.random() * Math.PI * 2,
      sx: 0.12 + Math.random() * 0.10,
      sy: 0.10 + Math.random() * 0.08,
    })),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const newPositions: { screen: [number, number]; index: number }[] = [];

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const d = motionData[i];
      const base = INIT_POSITIONS[i];

      mesh.position.x = base[0] + Math.sin(t * d.sx + d.ox) * 0.10;
      mesh.position.y = base[1] + Math.cos(t * d.sy + d.oy) * 0.09;

      const targetScale = hoveredRef.current === i ? 1.2 : 1.0;
      mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.10);

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
        <mesh
          key={project.title}
          ref={el => { meshRefs.current[i] = el; }}
          position={INIT_POSITIONS[i]}
        >
          <sphereGeometry args={[0.55, 96, 96]} />
          <meshPhysicalMaterial
            color="#eef4ff"
            roughness={0.10}
            metalness={0.0}
            clearcoat={1.0}
            clearcoatRoughness={0.04}
            reflectivity={1.0}
            envMapIntensity={3.2}
            emissive={new THREE.Color(project.color)}
            emissiveIntensity={hoveredRef.current === i ? 0.20 : 0.0}
          />
        </mesh>
      ))}
    </>
  );
}

function ProjectsPreviewSection() {
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; index: number } | null>(null);
  const hoveredRef = useRef<number | null>(null);
  const screenPositionsRef = useRef<{ screen: [number, number]; index: number }[]>([]);
  const [screenPositions, setScreenPositions] = useState<{ screen: [number, number]; index: number }[]>([]);
  const syncRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startSync = () => {
    if (syncRef.current) return;
    syncRef.current = setInterval(() => {
      setScreenPositions([...screenPositionsRef.current]);
    }, 33);
  };

  return (
    <section id="projects" className="relative overflow-hidden bg-[#070B14] px-6 py-28 text-white">
      <div className="absolute left-[-100px] top-10 h-[300px] w-[300px] rounded-full bg-[#38BDF8]/8 blur-3xl" />
      <div className="absolute right-[-100px] bottom-10 h-[300px] w-[300px] rounded-full bg-[#8B5CF6]/8 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="mb-5 uppercase tracking-[0.35em] text-[#38BDF8]" style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)" }}>
            Projets
          </p>
          <h2 className="mx-auto max-w-3xl font-bold leading-[1.2]" style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)" }}>
            Des projets qui mêlent{" "}
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              technique, curiosité et impact.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[#94A3B8]" style={{ fontSize: "clamp(0.85rem, 1.3vw, 1rem)" }}>
            Passe ta souris pour voir le résumé · Clique pour tout découvrir
          </p>
        </motion.div>

        <div
          className="relative h-[580px] w-full overflow-hidden rounded-[36px] border border-white/10"
          style={{ background: "radial-gradient(circle at 60% 40%, rgba(56,189,248,0.10), transparent 35%), radial-gradient(circle at 30% 60%, rgba(139,92,246,0.08), transparent 35%), #070B14" }}
        >
          <Canvas
            camera={{ position: [0, 0, 9], fov: 48 }}
            gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.3 }}
            onCreated={() => startSync()}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 5, 5]} intensity={4.5} color="#ffffff" />
            <pointLight position={[-3, 2, 4]} intensity={2.5} color="#38BDF8" />
            <pointLight position={[3, -2, 4]} intensity={2.5} color="#8B5CF6" />
            <pointLight position={[0, 3, 3]} intensity={1.5} color="#ffffff" />
            <Environment preset="city" />
            <Balls hoveredRef={hoveredRef} screenPositionsRef={screenPositionsRef} />
          </Canvas>

          {/* Emoji overlay */}
          <div className="pointer-events-none absolute inset-0">
            {screenPositions.map(({ screen, index }) => {
              const project = projects[index];
              return (
                <div
                  key={index}
                  className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                  style={{ left: screen[0], top: screen[1], cursor: "pointer", zIndex: hovered === index ? 20 : 10, width: 44, height: 44 }}
                  onMouseEnter={() => {
                    setHovered(index);
                    hoveredRef.current = index;
                    setTooltip({ x: screen[0], y: screen[1], index });
                  }}
                  onMouseLeave={() => {
                    setHovered(null);
                    hoveredRef.current = null;
                    setTooltip(null);
                  }}
                  onClick={() => setSelected(project)}
                >
                  <span style={{ fontSize: "1.4rem", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))" }}>
                    {project.emoji}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {tooltip !== null && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.93 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.93 }}
                transition={{ duration: 0.15 }}
                className="pointer-events-none absolute z-40 -translate-x-1/2"
                style={{ left: tooltip.x, top: Math.max(tooltip.y - 120, 10) }}
              >
                <div
                  className={`rounded-2xl border ${projects[tooltip.index].border} bg-[#0B1120]/96 px-4 py-3 backdrop-blur-md`}
                  style={{ maxWidth: "230px", boxShadow: `0 0 30px ${projects[tooltip.index].glow}` }}
                >
                  <p className="font-bold leading-tight" style={{ fontSize: "clamp(0.75rem, 1.1vw, 0.85rem)", color: projects[tooltip.index].color }}>
                    {projects[tooltip.index].title}
                  </p>
                  <p className="mt-0.5 text-[#94A3B8]" style={{ fontSize: "0.65rem" }}>
                    {projects[tooltip.index].subtitle}
                  </p>
                  <p className="mt-2 text-[#CBD5E1]" style={{ fontSize: "clamp(0.65rem, 0.9vw, 0.72rem)" }}>
                    {projects[tooltip.index].summary}
                  </p>
                  <p className="mt-2 font-medium" style={{ fontSize: "0.62rem", color: projects[tooltip.index].color }}>
                    Clique pour les détails →
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2">
            <p className="rounded-full border border-white/10 bg-black/30 px-4 py-1.5 text-xs text-[#94A3B8] backdrop-blur-sm">
              ↑ Passe ta souris sur une boule
            </p>
          </div>
        </div>

        {/* Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {projects.map((p) => (
            <button
              key={p.title}
              onClick={() => setSelected(p)}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-white/30 hover:bg-white/10"
              style={{ fontSize: "clamp(0.7rem, 1vw, 0.82rem)" }}
            >
              <span>{p.emoji}</span>
              <span style={{ color: p.color }}>{p.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(7,11,20,0.92)", backdropFilter: "blur(12px)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 40 }}
              transition={{ duration: 0.35, type: "spring", stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-xl overflow-hidden rounded-3xl border-2 ${selected.border} bg-[#0B1120] p-8`}
              style={{ boxShadow: `0 0 100px ${selected.glow}`, maxHeight: "90vh", overflowY: "auto" }}
            >
              <button onClick={() => setSelected(null)} className="absolute right-5 top-5 text-[#94A3B8] transition hover:text-white" style={{ fontSize: "1.2rem" }}>✕</button>

              {/* Header */}
              <div className="mb-6 flex items-start gap-4">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${selected.border}`} style={{ background: `${selected.color}15`, fontSize: "2rem" }}>
                  {selected.emoji}
                </div>
                <div>
                  <h3 className="font-bold text-white leading-tight" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}>
                    {selected.title}
                  </h3>
                  <p className="mt-0.5 text-[#94A3B8]" style={{ fontSize: "clamp(0.72rem, 1vw, 0.82rem)" }}>
                    {selected.subtitle}
                  </p>
                </div>
              </div>

              {/* Mon rôle */}
              <div className="mb-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: selected.color }}>
                  Mon rôle
                </p>
                <p className="text-[#CBD5E1]" style={{ fontSize: "clamp(0.82rem, 1.1vw, 0.9rem)" }}>
                  {selected.role}
                </p>
              </div>

              {/* Ce que j'ai livré */}
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: selected.color }}>
                  Ce que j'ai fait concrètement
                </p>
                <ul className="space-y-1.5">
                  {selected.delivered.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#CBD5E1]" style={{ fontSize: "clamp(0.78rem, 1.05vw, 0.88rem)" }}>
                      <span style={{ color: selected.color, marginTop: "3px", flexShrink: 0 }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact */}
              <div className={`mb-5 rounded-2xl border ${selected.border} p-4`} style={{ background: `${selected.color}08` }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: selected.color }}>
                  Ce que ça m'a apporté
                </p>
                <p className="text-[#CBD5E1]" style={{ fontSize: "clamp(0.78rem, 1.05vw, 0.88rem)" }}>
                  {selected.impact}
                </p>
              </div>

              {/* Tags */}
              <div className="mb-6 flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-[#0F172A]/80 px-3 py-1 text-[#E2E8F0]" style={{ fontSize: "clamp(0.62rem, 0.88vw, 0.72rem)" }}>
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={selected.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-medium text-white transition hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${selected.color}, ${selected.color}88)`, fontSize: "clamp(0.78rem, 1.1vw, 0.9rem)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                Voir sur GitHub
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectsPreviewSection;