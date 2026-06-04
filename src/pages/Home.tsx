import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BackgroundParticles from "../components/BackgroundParticles";
import AboutSection from "../sections/AboutSection";
import SkillsSection from "../sections/SkillsSection";
import ProjectsPreviewSection from "../sections/ProjectsPreview";
import EducationPreviewSection from "../sections/EducationPreview";
import ContactSection from "../sections/ContactSection";
import InterestsSection from "../sections/InterestsSection";
import ExperienceSection from "../sections/ExperienceSection";
import Footer from "../components/Footer";
import portrait from "../assets/portrait2.png";
import SocialLinks from "../components/SocialLinks";

function useTypewriter(text: string, speed = 60, delay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);
  return { displayed, done };
}

function Home() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateY = useSpring(
    useTransform(mouseX, [-window.innerWidth / 2, window.innerWidth / 2], [-35, 35]),
    { stiffness: 60, damping: 12 }
  );
  const rotateX = useSpring(
    useTransform(mouseY, [-window.innerHeight / 2, window.innerHeight / 2], [20, -20]),
    { stiffness: 60, damping: 12 }
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    mouseX.set(e.clientX - window.innerWidth / 2);
    mouseY.set(e.clientY - window.innerHeight / 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const left1 = useTypewriter("Hello,", 80, 300);
  const left2 = useTypewriter("je suis", 80, left1.done ? 0 : 99999);
  const left3 = useTypewriter("Asdjad Bakary", 60, left2.done ? 0 : 99999);
  const right1 = useTypewriter("Ingénieure", 70, left3.done ? 200 : 99999);
  const right2 = useTypewriter("électronique", 70, right1.done ? 0 : 99999);
  const right3 = useTypewriter("& informatique", 70, right2.done ? 0 : 99999);

  const [showContent, setShowContent] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (right3.done) {
      const t = setTimeout(() => setShowContent(true), 400);
      return () => clearTimeout(t);
    }
  }, [right3.done]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#070B14] text-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <BackgroundParticles />
      <div className="absolute left-[-120px] top-[-160px] h-[520px] w-[520px] rounded-full bg-[#38BDF8] opacity-20 blur-3xl" />
      <div className="absolute right-[-120px] top-[180px] h-[520px] w-[520px] rounded-full bg-[#8B5CF6] opacity-15 blur-3xl" />
      <Navbar />
      

      <section className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden">

        <SocialLinks visible={!scrolled} />

        <motion.div
          style={{ opacity: scrolled ? 0 : 1, transition: "opacity 0.8s ease" }}
          className="absolute left-16 top-1/2 -translate-y-1/2 z-20 text-left xl:left-24"
        >
          <p className="font-light text-[#CBD5E1]" style={{ fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)" }}>
            {left1.displayed}{!left1.done && <span className="animate-pulse">|</span>}
          </p>
          <p className="mt-1 font-light text-[#CBD5E1]" style={{ fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)" }}>
            {left2.displayed}{left1.done && !left2.done && <span className="animate-pulse">|</span>}
          </p>
          <h1 className="mt-2 font-bold leading-tight" style={{ fontSize: "clamp(1.2rem, 2.8vw, 2.2rem)" }}>
            <span className="bg-gradient-to-r from-white via-[#38BDF8] to-[#8B5CF6] bg-clip-text text-transparent">
              {left3.displayed}
            </span>
            {left2.done && !left3.done && <span className="animate-pulse text-white">|</span>}
          </h1>
        </motion.div>

        <motion.div
          ref={portraitRef}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1200, opacity: scrolled ? 0 : 1, transition: "opacity 0.8s ease" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: scrolled ? 0 : 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 flex h-screen w-auto items-end justify-center"
        >
          <img src={portrait} alt="Asdjad Bakary" className="h-[75vh] w-auto object-contain object-bottom sm:h-[80vh] lg:h-[88vh]" style={{ filter: "drop-shadow(0 0 40px rgba(56,189,248,0.25))" }} />
        </motion.div>

        <motion.div
          style={{ opacity: scrolled ? 0 : 1, transition: "opacity 0.8s ease" }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-right lg:right-14 xl:right-20"
        >
          <p className="font-light text-[#CBD5E1]" style={{ fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)" }}>
            {right1.displayed}{left3.done && !right1.done && <span className="animate-pulse">|</span>}
          </p>
          <p className="mt-1 font-bold text-[#38BDF8]" style={{ fontSize: "clamp(1.2rem, 2.8vw, 2.2rem)" }}>
            {right2.displayed}{right1.done && !right2.done && <span className="animate-pulse">|</span>}
          </p>
          <p className="mt-1 font-bold text-[#8B5CF6]" style={{ fontSize: "clamp(1.2rem, 2.8vw, 2.2rem)" }}>
            {right3.displayed}{right2.done && !right3.done && <span className="animate-pulse">|</span>}
          </p>
        </motion.div>

        {showContent && !scrolled && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">Découvrir</p>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="h-8 w-px bg-gradient-to-b from-[#38BDF8] to-transparent" />
          </motion.div>
        )}
      </section>

      {showContent && (
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }}>
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <EducationPreviewSection />
          <ProjectsPreviewSection />
          <InterestsSection />
          <ContactSection />
          <Footer />
        </motion.div>
      )}
    </div>
  );
}

export default Home;