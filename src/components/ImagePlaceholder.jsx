export default function ImagePlaceholder({ label = "Glow", className = "", variant = "product" }) {
  const initial = label.trim().charAt(0).toUpperCase() || "G";

  const variants = {
    product:
      "bg-linear-to-br from-sand/40 via-cream to-champagne/60 ring-1 ring-gold/25",
    hero: "bg-linear-to-br from-sage-light/40 via-cream to-sand/30",
    category: "bg-linear-to-t from-forest/30 via-sage-light/30 to-cream",
  };

  return (
    <div
      className={`relative flex aspect-[4/5] items-center justify-center overflow-hidden ${variants[variant]} ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(184,148,94,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(168,176,154,0.25),transparent_50%)]" />
      <span className="text-3xl text-gold/80">✦</span>
      <span className="display-heading absolute bottom-6 text-sm uppercase tracking-[0.2em] text-forest/30">
        {initial}
      </span>
    </div>
  );
}
