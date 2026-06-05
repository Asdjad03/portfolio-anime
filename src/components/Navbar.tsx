import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#about", label: "À propos" },
  { href: "#skills", label: "Profil" },
  { href: "#experience", label: "Expériences" },
  { href: "#education", label: "Études" },
  { href: "#projects", label: "Projets" },
  { href: "#interests", label: "Centres d'intérêt" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Légère opacité supplémentaire au scroll pour lisibilité
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu si on clique sur un lien
  function handleLinkClick() {
    setOpen(false);
  }

  // Bloque le scroll body quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 z-50 w-full px-4 py-4 sm:px-6 sm:py-6">
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 px-5 py-3 backdrop-blur-md transition-colors duration-300 sm:justify-center sm:px-6 sm:py-4 ${
            scrolled ? "bg-[#070B14]/80" : "bg-white/5"
          }`}
        >
          {/* Logo — visible uniquement sur mobile à gauche */}
          <a
            href="#"
            className="text-sm font-bold tracking-widest text-white sm:hidden"
          >
            AB
          </a>

          {/* Navigation desktop */}
          <nav className="hidden gap-8 text-sm text-[#CBD5E1] md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition hover:text-[#38BDF8]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Bouton hamburger — mobile uniquement */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="flex flex-col items-end justify-center gap-[5px] p-1 md:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7, width: "24px" } : { rotate: 0, y: 0, width: "24px" }}
              transition={{ duration: 0.25 }}
              className="block h-[2px] rounded-full bg-white origin-center"
              style={{ width: 24 }}
            />
            <motion.span
              animate={open ? { opacity: 0, x: 6 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="block h-[2px] rounded-full bg-[#38BDF8]"
              style={{ width: 18 }}
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7, width: "24px" } : { rotate: 0, y: 0, width: "14px" }}
              transition={{ duration: 0.25 }}
              className="block h-[2px] rounded-full bg-white origin-center"
              style={{ width: 14 }}
            />
          </button>
        </div>
      </header>

      {/* ----------------------------------------------------------------
          Menu mobile plein écran
      ---------------------------------------------------------------- */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay backdrop */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-[#070B14]/70 backdrop-blur-sm md:hidden"
            />

            {/* Panel menu */}
            <motion.nav
              key="menu"
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed left-4 right-4 top-[84px] z-50 overflow-hidden rounded-[28px] border border-white/10 bg-[#0B1120]/95 p-6 shadow-[0_0_60px_rgba(56,189,248,0.12)] backdrop-blur-2xl md:hidden"
            >
              {/* Glow interne */}
              <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-[#38BDF8]/6 via-transparent to-[#8B5CF6]/8" />

              <ul className="relative z-10 flex flex-col gap-1">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={handleLinkClick}
                      className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium text-[#CBD5E1] transition hover:bg-white/5 hover:text-[#38BDF8]"
                    >
                      <span>{link.label}</span>
                      <span className="text-[#38BDF8]/40 text-xs">→</span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Footer du panel */}
              <div className="relative z-10 mt-5 border-t border-white/10 pt-5 flex items-center justify-between">
                <span className="text-xs text-[#475569] tracking-widest uppercase">Portfolio 2026</span>
                <div className="flex gap-4 text-xs text-[#475569]">
                  <a href="https://github.com/Asdjad03?tab=repositories" target="_blank" rel="noreferrer"
                    onClick={handleLinkClick}
                    className="hover:text-[#38BDF8] transition">GitHub</a>
                  <a href="https://www.linkedin.com/in/asdjad-bakary/" target="_blank" rel="noreferrer"
                    onClick={handleLinkClick}
                    className="hover:text-[#38BDF8] transition">LinkedIn</a>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;