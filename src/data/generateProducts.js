import { skinCategoryGroups } from "./skinCategories";
import { getCatalogImage } from "./productImages";

/** Premium product names keyed by subcategory slug */
const productNames = {
  "face-moisturizer": "Silk Barrier Face Moisturizer",
  "day-cream": "Vitamin C Bright Day Cream",
  "night-cream": "Recovery Peptide Night Cream",
  "face-oils": "Night Repair Botanical Oil",
  "gel-moisturizers": "Aqua Dew Gel Moisturizer",
  "vitamin-c-serum": "Vitamin C Radiance Serum",
  "hydrating-serum": "Hydra Glow Hydrating Serum",
  "brightening-serum": "Pearl Brightening Serum",
  "anti-aging-serum": "Retinol Renewal Serum",
  "acne-serum": "Clear Calm Acne Serum",
  "face-wash": "Green Tea Gentle Face Wash",
  "cleansing-gel": "Cloud Foam Cleansing Gel",
  "micellar-water": "Pure Glow Micellar Water",
  "face-wipes": "Soothing Bamboo Face Wipes",
  "makeup-remover": "Melt Away Makeup Remover",
  "sheet-masks": "Hydra Infusion Sheet Mask",
  "sleeping-masks": "Overnight Glow Sleeping Mask",
  "clay-masks": "Natural Detox Clay Mask",
  "peel-masks": "Enzyme Peel Glow Mask",
  "face-packs": "Herbal Revival Face Pack",
  "face-toners": "Balance & Glow Face Toner",
  "face-mists": "Mineral Mist Face Spray",
  "rose-water": "Damask Rose Water Toner",
  "hydrating-toners": "Hyaluronic Hydrating Toner",
  "body-lotion": "Silk Touch Body Lotion",
  "body-butter": "Shea Velvet Body Butter",
  "body-wash": "Coconut Milk Body Wash",
  "body-scrub": "Sugar Glow Body Scrub",
  "bath-products": "Lavender Bath Soak",
  "acne-care": "Blemish Control Acne Gel",
  "spot-correctors": "Spot Fade Corrector",
  "pore-care": "Pore Refine Treatment",
  "exfoliators": "Gentle AHA Exfoliator",
  "peels": "Glycolic Glow Peel",
  "eye-cream": "Peptide Lift Eye Cream",
  "eye-serum": "Bright Eye Revive Serum",
  "eye-masks": "Cooling Hydra Eye Masks",
  "lip-balm": "Honey Nourish Lip Balm",
  "lip-scrub": "Sugar Kiss Lip Scrub",
  "lip-mask": "Overnight Lip Repair Mask",
  "face-sunscreen": "Invisible Shield Face SPF 50",
  "body-sunscreen": "Lightweight Body SPF 40",
  "spf-products": "Daily Defense SPF 30 Mist",
  "face-massagers": "Jade Glow Face Massager",
  "cleansing-brushes": "Sonic Soft Cleansing Brush",
  "blackhead-removers": "Pore Vacuum Blackhead Remover",
  "face-rollers": "Rose Quartz Face Roller",
};

const descriptions = {
  "face-moisturizer": "Lightweight daily moisture that strengthens the skin barrier.",
  "day-cream": "Brightening day cream with vitamin C for a luminous finish.",
  "night-cream": "Rich overnight cream that repairs and restores while you sleep.",
  "face-oils": "Nourishing botanical oil for deep overnight recovery.",
  "gel-moisturizers": "Oil-free gel hydration for a fresh, dewy complexion.",
  "vitamin-c-serum": "Potent vitamin C drops for visible radiance and even tone.",
  "hydrating-serum": "Deep hydration serum with hyaluronic acid and botanicals.",
  "brightening-serum": "Illuminating serum that fades dullness and boosts glow.",
  "anti-aging-serum": "Retinol-powered serum for smoother, firmer-looking skin.",
  "acne-serum": "Targeted serum that calms breakouts without over-drying.",
  "face-wash": "Gentle daily cleanser with green tea and calming botanicals.",
  "cleansing-gel": "Silky gel cleanser that removes impurities without stripping.",
  "micellar-water": "No-rinse micellar water for quick, gentle cleansing.",
  "face-wipes": "Biodegradable wipes for on-the-go refreshment.",
  "makeup-remover": "Dissolves makeup and sunscreen in one effortless step.",
  "sheet-masks": "Single-use sheet mask drenched in hydrating essence.",
  "sleeping-masks": "Leave-on mask that locks in moisture overnight.",
  "clay-masks": "Purifying clay mask that draws out impurities and refines pores.",
  "peel-masks": "Enzyme peel mask for smoother, brighter skin texture.",
  "face-packs": "Traditional herbal pack for a spa-like glow ritual.",
  "face-toners": "Alcohol-free toner that balances pH and preps skin.",
  "face-mists": "Fine mist that refreshes and sets makeup throughout the day.",
  "rose-water": "Pure rose water toner for calm, balanced, petal-soft skin.",
  "hydrating-toners": "Hyaluronic toner that layers hydration before serum.",
  "body-lotion": "Fast-absorbing body lotion for silky, hydrated skin.",
  "body-butter": "Rich body butter that melts in for lasting nourishment.",
  "body-wash": "Creamy body wash with a soft, clean floral scent.",
  "body-scrub": "Exfoliating scrub that polishes skin to a healthy glow.",
  "bath-products": "Relaxing bath soak with lavender and mineral salts.",
  "acne-care": "Lightweight gel that treats blemishes and prevents new ones.",
  "spot-correctors": "Concentrated corrector that fades dark spots over time.",
  "pore-care": "Treatment that minimizes the look of pores and refines texture.",
  "exfoliators": "Gentle chemical exfoliant for smoother, clearer skin.",
  "peels": "At-home glycolic peel for renewed, glowing skin.",
  "eye-cream": "Peptide eye cream that firms and brightens the eye area.",
  "eye-serum": "Lightweight serum that reduces puffiness and dark circles.",
  "eye-masks": "Cooling hydrogel eye masks for instant depuffing.",
  "lip-balm": "Nourishing balm that heals dry, chapped lips.",
  "lip-scrub": "Sugar scrub that smooths and preps lips for color.",
  "lip-mask": "Overnight lip mask for plump, soft lips by morning.",
  "face-sunscreen": "Weightless SPF 50 that leaves no white cast on face.",
  "body-sunscreen": "Broad-spectrum body sunscreen that absorbs quickly.",
  "spf-products": "Mist-format SPF for easy reapplication on the go.",
  "face-massagers": "Jade stone massager that boosts circulation and lymph flow.",
  "cleansing-brushes": "Sonic brush with ultra-soft bristles for deep cleansing.",
  "blackhead-removers": "Gentle pore vacuum tool for clearer-looking pores.",
  "face-rollers": "Rose quartz roller for de-puffing and product absorption.",
};

function assignTags(index) {
  const tags = [];
  if (index % 5 === 0) tags.push("featured");
  if (index % 4 === 0 || index % 4 === 1) tags.push("bestSeller");
  if (index % 3 === 0 || index % 3 === 1) tags.push("newArrival");
  return tags;
}

function generateProducts() {
  let index = 0;
  return skinCategoryGroups.flatMap((group) =>
    group.items.map((item) => {
      const priceBase = 499 + (index % 8) * 150;
      const product = {
        id: item.slug,
        name: productNames[item.slug] || `Glow ${item.name}`,
        category: group.name,
        groupSlug: group.slug,
        subCategorySlug: item.slug,
        rootCategory: "skin",
        image: getCatalogImage(index),
        price: priceBase,
        discount: index % 9 === 0 ? 10 : 0,
        rating: Number((4.4 + (index % 6) * 0.1).toFixed(1)),
        shortDescription:
          descriptions[item.slug] ||
          `Premium ${item.name.toLowerCase()} crafted for your glow ritual.`,
        description:
          descriptions[item.slug] ||
          `Premium ${item.name.toLowerCase()} crafted for your glow ritual.`,
        popularity: 72 + (index % 28),
        tags: assignTags(index),
      };
      index += 1;
      return product;
    })
  );
}

export const products = generateProducts();
