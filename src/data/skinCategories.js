/**
 * Glow Skin category tree — single root "Skin" with groups and subcategories.
 * Slugs map to URL paths: /categories/skin/:groupSlug/:itemSlug
 * Backend-ready: categoryId / subCategoryId can be attached when syncing from API.
 */

export const SKIN_ROOT = {
  id: "skin",
  slug: "skin",
  name: "Skin",
  description: "Complete skincare rituals for every concern, texture, and glow goal.",
};

export const skinCategoryGroups = [
  {
    id: "moisturizers",
    slug: "moisturizers",
    name: "Moisturizers",
    items: [
      { id: "face-moisturizer", slug: "face-moisturizer", name: "Face Moisturizer" },
      { id: "day-cream", slug: "day-cream", name: "Day Cream" },
      { id: "night-cream", slug: "night-cream", name: "Night Cream" },
      { id: "face-oils", slug: "face-oils", name: "Face Oils" },
      { id: "gel-moisturizers", slug: "gel-moisturizers", name: "Gel Moisturizers" },
    ],
  },
  {
    id: "serums",
    slug: "serums",
    name: "Serums",
    items: [
      { id: "vitamin-c-serum", slug: "vitamin-c-serum", name: "Vitamin C Serum" },
      { id: "hydrating-serum", slug: "hydrating-serum", name: "Hydrating Serum" },
      { id: "brightening-serum", slug: "brightening-serum", name: "Brightening Serum" },
      { id: "anti-aging-serum", slug: "anti-aging-serum", name: "Anti Aging Serum" },
      { id: "acne-serum", slug: "acne-serum", name: "Acne Serum" },
    ],
  },
  {
    id: "cleansers",
    slug: "cleansers",
    name: "Cleansers",
    items: [
      { id: "face-wash", slug: "face-wash", name: "Face Wash" },
      { id: "cleansing-gel", slug: "cleansing-gel", name: "Cleansing Gel" },
      { id: "micellar-water", slug: "micellar-water", name: "Micellar Water" },
      { id: "face-wipes", slug: "face-wipes", name: "Face Wipes" },
      { id: "makeup-remover", slug: "makeup-remover", name: "Makeup Remover" },
    ],
  },
  {
    id: "masks",
    slug: "masks",
    name: "Masks",
    items: [
      { id: "sheet-masks", slug: "sheet-masks", name: "Sheet Masks" },
      { id: "sleeping-masks", slug: "sleeping-masks", name: "Sleeping Masks" },
      { id: "clay-masks", slug: "clay-masks", name: "Clay Masks" },
      { id: "peel-masks", slug: "peel-masks", name: "Peel Masks" },
      { id: "face-packs", slug: "face-packs", name: "Face Packs" },
    ],
  },
  {
    id: "toners",
    slug: "toners",
    name: "Toners",
    items: [
      { id: "face-toners", slug: "face-toners", name: "Face Toners" },
      { id: "face-mists", slug: "face-mists", name: "Face Mists" },
      { id: "rose-water", slug: "rose-water", name: "Rose Water" },
      { id: "hydrating-toners", slug: "hydrating-toners", name: "Hydrating Toners" },
    ],
  },
  {
    id: "body-care",
    slug: "body-care",
    name: "Body Care",
    items: [
      { id: "body-lotion", slug: "body-lotion", name: "Body Lotion" },
      { id: "body-butter", slug: "body-butter", name: "Body Butter" },
      { id: "body-wash", slug: "body-wash", name: "Body Wash" },
      { id: "body-scrub", slug: "body-scrub", name: "Body Scrub" },
      { id: "bath-products", slug: "bath-products", name: "Bath Products" },
    ],
  },
  {
    id: "acne-treatment",
    slug: "acne-treatment",
    name: "Acne & Treatment",
    items: [
      { id: "acne-care", slug: "acne-care", name: "Acne Care" },
      { id: "spot-correctors", slug: "spot-correctors", name: "Spot Correctors" },
      { id: "pore-care", slug: "pore-care", name: "Pore Care" },
      { id: "exfoliators", slug: "exfoliators", name: "Exfoliators" },
      { id: "peels", slug: "peels", name: "Peels" },
    ],
  },
  {
    id: "eye-care",
    slug: "eye-care",
    name: "Eye Care",
    items: [
      { id: "eye-cream", slug: "eye-cream", name: "Eye Cream" },
      { id: "eye-serum", slug: "eye-serum", name: "Eye Serum" },
      { id: "eye-masks", slug: "eye-masks", name: "Eye Masks" },
    ],
  },
  {
    id: "lip-care",
    slug: "lip-care",
    name: "Lip Care",
    items: [
      { id: "lip-balm", slug: "lip-balm", name: "Lip Balm" },
      { id: "lip-scrub", slug: "lip-scrub", name: "Lip Scrub" },
      { id: "lip-mask", slug: "lip-mask", name: "Lip Mask" },
    ],
  },
  {
    id: "sun-care",
    slug: "sun-care",
    name: "Sun Care",
    items: [
      { id: "face-sunscreen", slug: "face-sunscreen", name: "Face Sunscreen" },
      { id: "body-sunscreen", slug: "body-sunscreen", name: "Body Sunscreen" },
      { id: "spf-products", slug: "spf-products", name: "SPF Products" },
    ],
  },
  {
    id: "skin-tools",
    slug: "skin-tools",
    name: "Skin Tools",
    items: [
      { id: "face-massagers", slug: "face-massagers", name: "Face Massagers" },
      { id: "cleansing-brushes", slug: "cleansing-brushes", name: "Cleansing Brushes" },
      { id: "blackhead-removers", slug: "blackhead-removers", name: "Blackhead Removers" },
      { id: "face-rollers", slug: "face-rollers", name: "Face Rollers" },
    ],
  },
];

/** Full tree for API seeding / admin sync */
export const skinCategoryTree = {
  ...SKIN_ROOT,
  groups: skinCategoryGroups,
};

/** Cards shown on /categories overview — one per group */
export const skinGroupCards = skinCategoryGroups.map((group) => ({
  id: group.slug,
  slug: group.slug,
  name: group.name,
  description: `Explore ${group.name.toLowerCase()} for your glow ritual.`,
  itemCount: group.items.length,
}));
