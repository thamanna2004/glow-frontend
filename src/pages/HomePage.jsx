import { useQuery } from "@tanstack/react-query";
import HeroSection from "../components/HeroSection";
import ProductGrid from "../components/ProductGrid";
import CategoryCard from "../components/CategoryCard";
import ReviewCard from "../components/ReviewCard";
import Loader from "../components/Loader";
import ProductState from "../components/ProductState";
import AnimateInView from "../components/motion/AnimateInView";
import { useHomeCollections } from "../hooks/useStoreProducts";
import { productService } from "../services/productService";
import { skinGroupCards } from "../data/skinCategories";

const featuredCategorySlugs = ["serums", "moisturizers", "cleansers", "sun-care"];

function SectionTitle({ overline, title, description }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="section-overline">{overline}</p>
      <h2 className="display-heading mt-3 text-4xl text-forest md:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">{description}</p>}
    </div>
  );
}

export default function HomePage() {
  const { collections, isLoading, isError, error } = useHomeCollections();
  const reviewsQuery = useQuery({
    queryKey: ["reviews"],
    queryFn: productService.getReviews,
  });
  const ingredientsQuery = useQuery({
    queryKey: ["ingredients"],
    queryFn: productService.getIngredients,
  });

  const featuredCategories = featuredCategorySlugs
    .map((slug) => skinGroupCards.find((category) => category.slug === slug))
    .filter(Boolean);

  if (isLoading || reviewsQuery.isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ProductState error={error} />;
  }

  return (
    <div className="space-y-28 pb-16">
      <HeroSection />

      <AnimateInView>
        <div className="glass-panel grid items-center gap-10 rounded-[28px] p-6 md:grid-cols-[1.1fr_1fr] md:p-12">
          <div>
            <p className="section-overline">Glass Skin Philosophy</p>
            <h2 className="display-heading mt-3 text-4xl text-forest md:text-5xl">
              Hydration that feels weightless
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
              Inspired by clinical hydration science and spa-like calm — every formula
              is designed for clarity, glow, and skin you trust.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[24px] bg-linear-to-br from-sand/40 via-cream to-sage-light/30 p-8">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sage/20 blur-2xl" />
            <p className="display-heading relative text-5xl text-forest/10">Hydrate</p>
            <p className="relative mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
              Layer lightweight serums and creams for a dewy, breathable finish that lasts all day.
            </p>
          </div>
        </div>
      </AnimateInView>

      <AnimateInView delay={0.05}>
        <SectionTitle
          overline="Featured Collection"
          title="Editorial hydration essentials"
          description="Lightweight serums and creams formulated for luminous, glass-skin radiance."
        />
        <ProductGrid products={collections.featured} />
      </AnimateInView>

      <AnimateInView delay={0.05}>
        <SectionTitle
          overline="Best Sellers"
          title="Community favorites"
          description="Most-loved formulas trusted in daily hydration rituals."
        />
        <ProductGrid products={collections.bestSellers} />
      </AnimateInView>

      <AnimateInView delay={0.05}>
        <SectionTitle
          overline="New Arrivals"
          title="Fresh launches for modern skin"
          description="New textures and actives designed for calm, dewy, everyday glow."
        />
        <ProductGrid products={collections.arrivals} />
      </AnimateInView>

      <AnimateInView delay={0.05}>
        <SectionTitle
          overline="Categories"
          title="Shop by ritual"
          description="Serums, moisturizers, cleansers, and sun care — curated for your glow journey."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredCategories.map((category, index) => (
            <CategoryCard key={category.slug} category={category} index={index} />
          ))}
        </div>
      </AnimateInView>

      <AnimateInView delay={0.05}>
        <SectionTitle
          overline="Key Actives"
          title="Science-led hydration"
          description="Every formula combines clinically proven actives with restorative botanicals."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {(ingredientsQuery.data || []).map((item) => (
            <article key={item.name} className="glass-panel rounded-[20px] p-6 transition duration-500 hover:-translate-y-1">
              <h3 className="display-heading text-2xl text-navy-900">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.benefit}</p>
            </article>
          ))}
        </div>
      </AnimateInView>

      <div className="grid gap-6 lg:grid-cols-2">
        <AnimateInView className="rounded-[28px] bg-linear-to-br from-ice-100 to-white p-8 md:p-10">
          <SectionTitle
            overline="Daily Ritual"
            title="Your five-step glow routine"
            description="Cleanse, hydrate, treat, seal, protect — with calm consistency."
          />
          <ol className="space-y-4 text-sm leading-relaxed text-slate-600">
            <li>01. Cleanse with Hydra Foam Cleanser</li>
            <li>02. Prep with Calm Hydrated Mist</li>
            <li>03. Treat with Cactus Glow Serum</li>
            <li>04. Seal with Gentle Care Cream</li>
            <li>05. Protect with Good Skin SPF 40</li>
          </ol>
        </AnimateInView>
        <AnimateInView delay={0.08} className="rounded-[28px] bg-navy-900 p-8 text-white md:p-10">
          <p className="section-overline text-ice-300">Brand Promise</p>
          <h3 className="display-heading mt-3 text-4xl md:text-5xl">Trustworthy beauty, elevated.</h3>
          <p className="mt-4 text-sm leading-relaxed text-ice-100/85 md:text-base">
            Dermatologist-tested, cruelty-free formulations with transparent ingredients
            and packaging inspired by water-light clarity.
          </p>
        </AnimateInView>
      </div>

      <AnimateInView delay={0.05}>
        <SectionTitle
          overline="Customer Reviews"
          title="Loved for visible glow"
          description="Real routines. Real hydration. Real results."
        />
        <div className="relative overflow-hidden rounded-[30px] border border-gold/25 bg-linear-to-br from-cream via-sand/20 to-champagne/35 p-6 shadow-[0_28px_64px_-34px_rgba(36,52,42,0.18)] md:p-10">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-sage/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gold/16 blur-3xl" />

          {/* Desktop grid, mobile scroll-snap */}
          <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-2 scrollbar-none md:mx-0 md:grid md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:scrollbar-auto md:grid-cols-3">
            {(reviewsQuery.data || []).map((review, index) => (
              <div
                key={review.id}
                className="min-w-[280px] snap-start md:min-w-0"
                style={{ scrollSnapAlign: "start" }}
              >
                <ReviewCard review={review} index={index} />
              </div>
            ))}
          </div>
        </div>
      </AnimateInView>
    </div>
  );
}
