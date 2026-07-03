import { Link } from "react-router-dom";
import AnimateInView from "./motion/AnimateInView";

const exploreLinks = [
  { label: "Shop All", to: "/shop" },
  { label: "Skin Care", to: "/categories/skin" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Best Sellers", to: "/best-sellers" },
];

const supportLinks = [
  { label: "My Account", to: "/account" },
  { label: "Orders", to: "/orders" },
  { label: "Contact", to: "/contact" },
  { label: "Shipping", to: "/contact/shipping" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "YouTube", href: "#" },
];

function SocialIcon({ children }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/35 bg-gold/15 text-cream transition duration-300 hover:border-gold/55 hover:bg-gold/25 hover:shadow-[0_0_20px_rgba(201,168,106,0.2)]">
      {children}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-28 overflow-hidden bg-forest text-cream">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,148,94,0.16),transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 md:px-8">
        <AnimateInView className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <h3 className="display-heading text-4xl text-cream md:text-5xl">Glow Skin</h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/75">
              Clinical clarity meets calm luxury. Hydration-first skincare for
              glass-skin radiance you can trust every day.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" aria-label="Instagram">
                <SocialIcon>
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.75]">
                    <rect x="4" y="4" width="16" height="16" rx="4" />
                    <circle cx="12" cy="12" r="3.5" />
                    <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
                  </svg>
                </SocialIcon>
              </a>
              <a href="#" aria-label="Pinterest">
                <SocialIcon>
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.75]">
                    <circle cx="12" cy="12" r="8" />
                    <path d="M12 8v8M9 11h6" />
                  </svg>
                </SocialIcon>
              </a>
              <a href="#" aria-label="YouTube">
                <SocialIcon>
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.75]">
                    <rect x="3" y="7" width="18" height="10" rx="2" />
                    <path d="M11 10l4 2-4 2v-4Z" fill="currentColor" stroke="none" />
                  </svg>
                </SocialIcon>
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-[11px] font-medium uppercase tracking-[0.24em] text-gold">
              Explore
            </h4>
            <div className="flex flex-col gap-3 text-sm text-cream/75">
              {exploreLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="transition duration-300 hover:translate-x-1 hover:text-gold-light"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-[11px] font-medium uppercase tracking-[0.24em] text-gold">
              Support
            </h4>
            <div className="flex flex-col gap-3 text-sm text-cream/75">
              {supportLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="transition duration-300 hover:translate-x-1 hover:text-gold-light"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-[11px] font-medium uppercase tracking-[0.24em] text-gold">
              Glow Journal
            </h4>
            <p className="text-sm leading-relaxed text-cream/75">
              Rituals, ingredient science, and seasonal hydration tips — delivered calmly to your inbox.
            </p>
            <form
              className="mt-5 flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full rounded-full border border-sage/30 bg-forest-deep/50 px-4 py-3 text-sm text-cream outline-none backdrop-blur-sm placeholder:text-sage-light focus:border-gold/50"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-gold px-6 py-3 text-sm font-medium text-charcoal transition duration-300 hover:bg-gold-light"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-sage-light">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} className="hover:text-gold">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </AnimateInView>
      </div>

      <div className="relative border-t border-cream/10 px-6 py-6 text-center text-xs text-cream/50">
        Copyright {new Date().getFullYear()} Glow Skin. All rights reserved.
      </div>
    </footer>
  );
}
