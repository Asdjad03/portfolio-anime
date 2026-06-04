import { motion } from "framer-motion";
import FadeInSection from "../components/FadeInSection";

const stats = [
  { value: "3 ans", label: "d'alternance" },
  { value: "1", label: "expérience internationale" },
  { value: "Sept. 2026", label: "disponible en CDI" },
];

function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#070B14] px-6 py-28 text-white"
    >
      <div className="absolute left-[-100px] top-10 h-[300px] w-[300px] rounded-full bg-[#38BDF8]/10 blur-3xl" />
      <div className="absolute right-[-100px] bottom-10 h-[300px] w-[300px] rounded-full bg-[#8B5CF6]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <FadeInSection>

          <div className="mb-14 text-center">
            <p
              className="mb-6 uppercase tracking-[0.35em] text-[#38BDF8]"
              style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)" }}
            >
              À propos
            </p>
            <h2
              className="mx-auto max-w-3xl font-bold leading-[1.2] text-white"
              style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)" }}
            >
              Ingénieure à l'interface entre{" "}
              <span className="bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] bg-clip-text text-transparent">
                la technique, la data
              </span>{" "}
              et les{" "}
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
                usages concrets.
              </span>
            </h2>
            <p
              className="mx-auto mt-6 max-w-2xl text-[#94A3B8] leading-relaxed"
              style={{ fontSize: "clamp(0.85rem, 1.3vw, 1rem)" }}
            >
              Étudiante ingénieure à Polytech Sorbonne, alternante chez DPD France
              sur des projets SI industriels, data et supervision. Je conçois des
              solutions utiles, lisibles et pensées pour les utilisateurs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/3 px-6 py-5 backdrop-blur-md"
              >
                <div
                  className="h-12 w-1 shrink-0 rounded-full"
                  style={{
                    background: i === 0
                      ? "linear-gradient(to bottom, #38BDF8, #2563EB)"
                      : i === 1
                      ? "linear-gradient(to bottom, #8B5CF6, #EC4899)"
                      : "linear-gradient(to bottom, #22C55E, #38BDF8)",
                  }}
                />
                <div>
                  <p
                    className="font-bold text-white"
                    style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-[#94A3B8]"
                    style={{ fontSize: "clamp(0.75rem, 1.1vw, 0.88rem)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </FadeInSection>
      </div>
    </section>
  );
}

export default AboutSection;