function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070B14] px-6 py-8 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">

        <div>
          <p className="text-sm font-bold text-white">Asdjad Bakary</p>
          <p className="mt-1 text-xs text-[#475569]">Ingénieure électronique & informatique · Promo 2026</p>
        </div>

        <div className="flex gap-6 text-xs text-[#475569]">
          <a href="https://github.com/Asdjad03" target="_blank" rel="noreferrer" className="transition hover:text-[#38BDF8]">GitHub</a>
          <a href="https://www.linkedin.com/in/asdjad-bakary/" target="_blank" rel="noreferrer" className="transition hover:text-[#38BDF8]">LinkedIn</a>
          <a href="mailto:asdjad.ab3@gmail.com" className="transition hover:text-[#38BDF8]">Email</a>
        </div>

        <p className="text-xs text-[#2D3748]">Portfolio Asdjad Bakary</p>

      </div>
    </footer>
  );
}

export default Footer;