import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Button from "./Button";
import { SMOOTH_EASE } from "../utils/introConstants";

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/7616753/7616753-sd_640_360_25fps.mp4";

const FLOATING_PRODUCTS = [
  {
    label: "Vitamin C Serum",
    sub: "Radiance boost",
    className: "right-[8%] top-[14%] h-28 w-28",
    delay: 0,
  },
  {
    label: "Hydra Cream",
    sub: "Deep moisture",
    className: "right-[22%] bottom-[22%] h-24 w-24",
    delay: 0.4,
  },
  {
    label: "SPF 50",
    sub: "Daily shield",
    className: "right-[4%] bottom-[38%] h-20 w-20",
    delay: 0.8,
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: SMOOTH_EASE },
});

function FloatingOrb({ className, duration = 8, parallax = 0 }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className} />;

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -14, 0], opacity: [0.35, 0.55, 0.35] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      style={{ x: parallax * 0.5, y: parallax * 0.3 }}
    />
  );
}

function FloatingProduct({ item, parallax, reduceMotion }) {
  return (
    <motion.div
      className={`pointer-events-none absolute hidden xl:block ${item.className}`}
      animate={reduceMotion ? undefined : { y: [0, -12, 0], rotate: [0, 2, -2, 0] }}
      transition={{ duration: 5 + item.delay, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
      style={{ x: parallax.x * 0.15, y: parallax.y * 0.1 }}
    >
      <div className="glass-panel flex h-full w-full flex-col items-center justify-center rounded-full border-gold/40 p-3 text-center shadow-[0_20px_48px_-16px_rgba(36,52,42,0.25)]">
        <span className="text-lg text-gold">✦</span>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-forest">{item.label}</p>
        <p className="text-[9px] text-slate-500">{item.sub}</p>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return undefined;

    const playVideo = () => video.play().catch(() => {});

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? playVideo() : video.pause()),
        { threshold: 0.25 }
      );
      observer.observe(video);
      return () => observer.disconnect();
    }

    playVideo();
    return undefined;
  }, [reduceMotion]);

  const handleMouseMove = (event) => {
    if (reduceMotion || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
    setParallax({ x: x * 24, y: y * 16 });
  };

  return (
    <section
      id="glow-skin-botanical-theme"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative left-1/2 mb-4 w-screen max-w-none -translate-x-1/2 overflow-hidden"
    >
      <div className="relative min-h-[92vh]">
        {!reduceMotion && (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setVideoReady(true)}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        )}

        <div
          className={`absolute inset-0 ${
            reduceMotion
              ? "bg-linear-to-br from-cream via-sand/30 to-sage-light/40"
              : "bg-linear-to-br from-forest/85 via-forest/55 to-cream/35"
          }`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(168,176,154,0.25),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(184,148,94,0.15),transparent_45%)]" />

        <FloatingOrb
          className="pointer-events-none absolute left-[8%] top-[18%] h-40 w-40 rounded-full bg-sage/25 blur-3xl"
          duration={9}
          parallax={parallax.x}
        />
        <FloatingOrb
          className="pointer-events-none absolute bottom-[12%] right-[10%] h-52 w-52 rounded-full bg-gold/12 blur-3xl"
          duration={11}
          parallax={parallax.x}
        />

        {FLOATING_PRODUCTS.map((item) => (
          <FloatingProduct
            key={item.label}
            item={item}
            parallax={parallax}
            reduceMotion={reduceMotion}
          />
        ))}

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-6 py-32 md:px-10 lg:px-12">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              style={{ x: parallax.x * -0.2, y: parallax.y * -0.15 }}
              className="max-w-2xl"
            >
              <motion.p
                {...(reduceMotion ? {} : fadeUp(0.1))}
                className="section-overline mb-6 text-champagne/95"
              >
                Luxury Skincare Rituals
              </motion.p>

              <motion.h1
                {...(reduceMotion ? {} : fadeUp(0.2))}
                className="display-heading text-6xl leading-[0.98] text-cream md:text-7xl lg:text-8xl"
              >
                Glow Skin
              </motion.h1>

              <motion.p
                {...(reduceMotion ? {} : fadeUp(0.35))}
                className="mt-4 text-xl font-light tracking-wide text-champagne md:text-2xl"
              >
                Skincare that glows with you
              </motion.p>

              <motion.p
                {...(reduceMotion ? {} : fadeUp(0.45))}
                className="mt-6 max-w-lg text-base leading-relaxed text-cream/90 md:text-lg"
              >
                Clinical hydration meets calm luxury. Discover serums, creams, and SPF rituals
                designed for luminous, glass-skin radiance every day.
              </motion.p>

              <motion.div
                {...(reduceMotion ? {} : fadeUp(0.55))}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Link to="/shop">
                  <Button className="min-w-[140px] hover:shadow-[0_16px_40px_-12px_rgba(184,148,94,0.35)]">
                    Shop Now
                  </Button>
                </Link>
                <Link to="/categories/skin">
                  <Button variant="outline" className="border-cream/60 bg-cream/90 text-forest hover:border-gold">
                    Explore Collection
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                {...(reduceMotion ? {} : fadeUp(0.65))}
                className="mt-14 flex flex-wrap gap-10 border-t border-cream/20 pt-8"
              >
                {[
                  { value: "98%", label: "Hydration boost" },
                  { value: "Clean", label: "Dermatologist tested" },
                  { value: "Vegan", label: "Cruelty-free" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-semibold text-cream">{stat.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-champagne/80">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              style={{ x: parallax.x * 0.25, y: parallax.y * 0.2 }}
              {...(reduceMotion ? {} : fadeUp(0.4))}
              className="relative hidden lg:block"
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="glass-panel ml-auto max-w-sm overflow-hidden rounded-[28px] border-sand/30 bg-cream/20 p-6 backdrop-blur-xl"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-[20px] bg-linear-to-br from-champagne/90 via-cream/60 to-beige/50">
                  <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                    <span className="text-5xl text-gold">✦</span>
                    <p className="display-heading mt-4 text-3xl text-forest">Hydra Glow</p>
                    <p className="mt-2 text-sm text-slate-600">Weightless serum ritual</p>
                  </div>
                </div>
                <div className="mt-5 rounded-2xl bg-cream/90 p-4 backdrop-blur-md">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                    Featured ritual
                  </p>
                  <p className="display-heading mt-1 text-2xl text-forest">Morning glow sequence</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
