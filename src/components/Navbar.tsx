function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full px-6 py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-md">
        <nav className="hidden gap-8 text-sm text-[#CBD5E1] md:flex">
          <a href="#about" className="transition hover:text-[#38BDF8]">À propos</a>
          <a href="#skills" className="transition hover:text-[#38BDF8]">Compétences</a>
          <a href="#interests" className="transition hover:text-[#38BDF8]">Centres d'intérêt</a>
          <a href="#projects" className="transition hover:text-[#38BDF8]">Projets</a>
          <a href="#experience" className="transition hover:text-[#38BDF8]">Expériences</a>
          <a href="#education" className="transition hover:text-[#38BDF8]">Études</a>
          <a href="#contact" className="transition hover:text-[#38BDF8]">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;