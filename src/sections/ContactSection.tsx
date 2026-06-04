import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Mail, MapPin, Sparkles } from "lucide-react";
import contactPhoto from "../assets/portrait3.png";

const floatingBubbles = [
  {
    icon: <Sparkles size={18} />,
    title: "Disponible",
    text: "À partir de septembre 2026",
    className: "left-4 top-8 md:left-10 md:top-12",
    delay: 0,
  },
  {
    icon: <MapPin size={18} />,
    title: "Localisation",
    text: "Île-de-France · ouverte aux mobilités",
    className: "right-4 top-14 md:right-12 md:top-20",
    delay: 0.3,
  },
  {
    icon: <Briefcase size={18} />,
    title: "Recherche",
    text: "CDI autour des SI, data, IoT ou IA",
    className: "left-4 bottom-24 md:left-16 md:bottom-28",
    delay: 0.6,
  },
  {
    icon: <GraduationCap size={18} />,
    title: "Profil",
    text: "Ingénieure électronique & informatique",
    className: "right-4 bottom-28 md:right-16 md:bottom-32",
    delay: 0.9,
  },
];

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#070B14] px-6 py-32 text-white"
    >
      {/* Glows de fond */}
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38BDF8]/10 blur-3xl"></div>
      <div className="absolute right-[-120px] top-20 h-[380px] w-[380px] rounded-full bg-[#8B5CF6]/10 blur-3xl"></div>
      <div className="absolute bottom-[-160px] left-[-120px] h-[380px] w-[380px] rounded-full bg-[#0EA5E9]/10 blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 mx-auto max-w-7xl overflow-hidden rounded-[44px] border border-white/10 bg-white/5 px-6 py-20 text-center shadow-[0_0_90px_rgba(56,189,248,0.08)] backdrop-blur-md md:px-12 lg:min-h-[760px]"
      >
        {/* Effet réseau discret */}
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute left-[18%] top-[28%] h-px w-[180px] rotate-12 bg-gradient-to-r from-transparent via-[#38BDF8]/40 to-transparent"></div>
          <div className="absolute right-[18%] top-[35%] h-px w-[210px] -rotate-12 bg-gradient-to-r from-transparent via-[#8B5CF6]/40 to-transparent"></div>
          <div className="absolute bottom-[24%] left-[30%] h-px w-[240px] rotate-[-8deg] bg-gradient-to-r from-transparent via-[#38BDF8]/30 to-transparent"></div>
        </div>

        {/* Bulles flottantes */}
        {floatingBubbles.map((bubble) => (
          <motion.div
            key={bubble.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: bubble.delay },
              scale: { duration: 0.6, delay: bubble.delay },
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bubble.delay,
              },
            }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -6 }}
            className={`group absolute z-20 hidden max-w-[260px] rounded-[28px] border border-white/10 bg-[#0F172A]/45 p-4 text-left shadow-[0_0_45px_rgba(56,189,248,0.10)] backdrop-blur-2xl transition lg:block ${bubble.className}`}
          >
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-[#38BDF8]/8 via-transparent to-[#8B5CF6]/10 opacity-70 transition group-hover:opacity-100"></div>

            <div className="relative z-10 flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#38BDF8]/20 bg-[#07111F]/70 text-[#38BDF8]">
                {bubble.icon}
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  {bubble.title}
                </p>
                <motion.p
                  animate={{ opacity: [0.55, 1, 0.55] }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: bubble.delay,
                  }}
                  className="mt-1 text-sm leading-6 text-[#CBD5E1] group-hover:!opacity-100"
                >
                  {bubble.text}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Contenu central */}
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 px-5 py-2 text-sm text-[#38BDF8]">
            ✦ Disponible à partir de septembre 2026
          </div>

          <p className="mb-5 text-sm uppercase tracking-[0.35em] text-[#38BDF8]">
            Contact
          </p>

          <h2 className="max-w-4xl text-4xl font-bold leading-[1.1] md:text-6xl">
            Échanger, construire et donner vie à des{" "}
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              projets utiles.
            </span>
          </h2>

          {/* Image centrale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative mt-10 h-[260px] w-[260px] overflow-hidden rounded-full border border-[#38BDF8]/25 shadow-[0_0_90px_rgba(56,189,248,0.22)] md:h-[330px] md:w-[330px]"
          >
            <img
              src={contactPhoto}
              alt="Portrait Asdjad Bakary"
              className="h-full w-full object-cover object-center brightness-[1.05] contrast-[1.05] saturate-[1.05]"
            />

            <div className="pointer-events-none absolute inset-0 bg-[#070B14]/10"></div>
            <div className="pointer-events-none absolute right-0 top-0 h-full w-28 bg-gradient-to-l from-[#38BDF8]/25 to-transparent"></div>
            <div className="pointer-events-none absolute left-0 top-0 h-full w-28 bg-gradient-to-r from-[#8B5CF6]/18 to-transparent"></div>
            <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-[#070B14]/80 to-transparent"></div>
          </motion.div>

          <p className="mx-auto mt-10 max-w-3xl text-lg leading-8 text-[#CBD5E1]">
            Je suis ouverte aux opportunités autour des systèmes d’information
            industriels, de la data, de l’IoT, de l’IA et du développement
            d’interfaces modernes.
          </p>

          <p className="mx-auto mt-4 max-w-3xl leading-8 text-[#94A3B8]">
            J’aime comprendre les besoins terrain, collaborer avec les équipes et
            transformer les idées en expériences concrètes, accessibles et belles
            à utiliser.
          </p>

          {/* Boutons */}
          <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">
            <a
              href="mailto:asdjad.ab3@gmail.com?subject=Contact%20depuis%20votre%20portfolio"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#2563EB] px-10 py-4 font-medium text-white shadow-[0_0_35px_rgba(56,189,248,0.35)] transition duration-300 hover:scale-105"
            >
              <Mail size={20} className="transition group-hover:-translate-y-0.5" />
              M’envoyer un mail
            </a>

            <a
              href="https://www.linkedin.com/in/asdjad-bakary/"
              target="_blank"
              rel="noreferrer"
              
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-[#8B5CF6]/50 bg-white/5 px-10 py-4 font-medium text-white transition duration-300 hover:bg-[#8B5CF6]/15"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded bg-[#0A66C2] text-xs font-bold text-white transition group-hover:-translate-y-0.5">
                in
              </span>
              LinkedIn
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default ContactSection;