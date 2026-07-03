const categories = [
  {
    id: "cleansers",
    name: "Gentle Cleansers",
    description: "Creamy wash and balm textures inspired by spa rituals.",
  },
  {
    id: "serums",
    name: "Active Serums",
    description: "Green-glass treatment drops for hydration and radiance.",
  },
  {
    id: "moisturizers",
    name: "Hydrate + Protect",
    description: "Velvet creams and daily mineral moisture defense.",
  },
  {
    id: "sets",
    name: "Ritual Collection",
    description: "Signature Lumie-inspired routines for glow days.",
  },
];

const products = [
  {
    id: "lumie-cactus-glow-serum",
    name: "LUMIE Cactus Glow Serum",
    shortDescription: "Dewy treatment drops with niacinamide + green tea",
    description:
      "A feather-light serum that smooths texture and delivers a dewy finish with botanical antioxidants.",
    price: 68,
    rating: 4.9,
    category: "serums",
    ingredients: ["Niacinamide", "Green Tea", "Hyaluronic Acid", "Aloe"],
    benefits: ["Boosts glow", "Refines texture", "Hydrates deeply"],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
  },
  {
    id: "lumie-gentle-care-cream",
    name: "LUMIE Gentle Care Cream",
    shortDescription: "Cloudy ceramide cream for calm hydrated skin",
    description:
      "A plush cream with ceramides and oat lipids to lock in moisture while calming sensitive skin.",
    price: 62,
    rating: 4.8,
    category: "moisturizers",
    ingredients: ["Ceramides", "Oat Lipid", "Squalane", "Shea Butter"],
    benefits: ["Repairs barrier", "Softens texture", "Seals moisture"],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
  },
  {
    id: "lumie-hydra-foam-cleanser",
    name: "LUMIE Hydra Foam Cleanser",
    shortDescription: "Gentle wash with chamomile, aloe and panthenol",
    description:
      "A non-stripping cleanser that removes SPF and makeup while preserving skin hydration.",
    price: 42,
    rating: 4.7,
    category: "cleansers",
    ingredients: ["Chamomile", "Aloe", "Panthenol"],
    benefits: ["Cleanses gently", "Calms redness", "Maintains pH"],
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: true,
  },
  {
    id: "lumie-ritual-trio",
    name: "LUMIE Ritual Trio",
    shortDescription: "Serum, essence, and cream ritual set",
    description:
      "A silky overnight oil that nourishes and leaves skin radiant by morning.",
    price: 96,
    rating: 4.9,
    category: "sets",
    ingredients: ["Rosehip", "Bakuchiol", "Camellia Seed Oil"],
    benefits: ["Complete ritual", "Boosts glow overnight", "Supports skin balance"],
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
  },
  {
    id: "lumie-good-skin-spf",
    name: "LUMIE Good Skin SPF 40",
    shortDescription: "Mineral day shield for glow and comfort",
    description:
      "A silky SPF with subtle tint for daily UV defense and breathable wear.",
    price: 54,
    rating: 4.6,
    category: "moisturizers",
    ingredients: ["Zinc Oxide", "Vitamin E", "Green Tea"],
    benefits: ["Broad spectrum SPF", "Light tint", "No white cast"],
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
  },
  {
    id: "lumie-calm-hydrated-mist",
    name: "LUMIE Calm Hydrated Mist",
    shortDescription: "Cooling face mist with cucumber and centella",
    description:
      "A refreshing toner mist that soothes heat, replenishes moisture, and preps skin for serum.",
    price: 36,
    rating: 4.8,
    category: "cleansers",
    ingredients: ["Cucumber", "Centella", "Glycerin"],
    benefits: ["Cools skin", "Hydrates instantly", "Preps for next steps"],
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
  },
];

const reviews = [
  {
    id: "r1",
    author: "Aanya S.",
    title: "Exactly the luxury campaign feel",
    rating: 5,
    text: "The Cactus Glow Serum gives that luminous glass-skin look from the campaign visuals.",
  },
  {
    id: "r2",
    author: "Nikita R.",
    title: "Hydrated, calm, and fresh",
    rating: 5,
    text: "Hydra Foam leaves my skin clean but never stripped. It feels like a spa cleanse.",
  },
  {
    id: "r3",
    author: "Mia K.",
    title: "Premium textures, elegant finish",
    rating: 4,
    text: "Gentle Care Cream feels plush and looks beautiful on my vanity.",
  },
];

const ingredients = [
  { name: "Green Tea", benefit: "Antioxidant protection and calm tone" },
  { name: "Bakuchiol", benefit: "Smoothes fine lines naturally" },
  { name: "Ceramides", benefit: "Strengthens skin moisture barrier" },
  { name: "Rosehip Oil", benefit: "Supports glow and skin renewal" },
];

export { products, categories, reviews, ingredients };
