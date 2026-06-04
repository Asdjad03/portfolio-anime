function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070B14] px-6 py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">

        {/* Texte */}
        <div>
          <h3 className="text-xl font-bold text-[#38BDF8]">
            Asdjad Bakary
          </h3>

          <p className="mt-2 text-sm text-[#94A3B8]">
            Portfolio 2026 · React · TypeScript · UI/UX · SI Industriels
          </p>
        </div>

        {/* Réseaux */}
        <div className="flex gap-6 text-sm text-[#CBD5E1]">

          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-[#38BDF8]"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-[#38BDF8]"
          >
            LinkedIn
          </a>

          <a
            href="mailto:ton.email@example.com"
            className="transition hover:text-[#38BDF8]"
          >
            Email
          </a>

        </div>
      </div>
    </footer>
  );
}

export default Footer;