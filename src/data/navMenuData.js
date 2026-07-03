import { skinCategoryGroups } from "./skinCategories";

export const newArrivalsMenu = {
  id: "new-arrivals",
  label: "New Arrivals",
  featured: {
    title: "Fresh Drops",
    description: "Discover the latest skincare launches curated for your glow ritual.",
    to: "/new-arrivals",
    cta: "Shop All New",
  },
  columns: [
    {
      title: "By Category",
      links: skinCategoryGroups.slice(0, 6).map((group) => ({
        label: `New ${group.name}`,
        to: `/new-arrivals/${group.slug}`,
      })),
    },
    {
      title: "Trending Now",
      links: [
        { label: "Hydrating Serums", to: "/new-arrivals/serums" },
        { label: "Sleeping Masks", to: "/new-arrivals/masks" },
        { label: "SPF Essentials", to: "/new-arrivals/sun-care" },
        { label: "Lip Care", to: "/new-arrivals/lip-care" },
      ],
    },
  ],
};

export const bestSellersMenu = {
  id: "best-sellers",
  label: "Best Sellers",
  featured: {
    title: "Customer Favorites",
    description: "Our most-loved formulas — tried, tested, and glowing.",
    to: "/best-sellers",
    cta: "Shop Best Sellers",
  },
  columns: [
    {
      title: "Top Categories",
      links: skinCategoryGroups.slice(0, 6).map((group) => ({
        label: `Best ${group.name}`,
        to: `/best-sellers/${group.slug}`,
      })),
    },
    {
      title: "Most Loved",
      links: [
        { label: "Top Serums", to: "/best-sellers/serums" },
        { label: "Top Moisturizers", to: "/best-sellers/moisturizers" },
        { label: "Top Cleansers", to: "/best-sellers/cleansers" },
        { label: "Top Sun Care", to: "/best-sellers/sun-care" },
      ],
    },
  ],
};

export const aboutMenu = {
  id: "about",
  label: "About",
  featured: {
    title: "About Glow Skin",
    description: "Clean formulations, botanical actives, and a premium skin-first philosophy.",
    to: "/about",
    cta: "Learn More",
  },
  columns: [
    {
      title: "Our Brand",
      links: [
        { label: "Our Story", to: "/about/story" },
        { label: "Our Mission", to: "/about/mission" },
        { label: "Clean Beauty", to: "/about/clean-beauty" },
        { label: "Ingredients", to: "/about/ingredients" },
      ],
    },
    {
      title: "Commitments",
      links: [
        { label: "Sustainability", to: "/about/sustainability" },
        { label: "Cruelty Free", to: "/about/cruelty-free" },
        { label: "Dermatologist Tested", to: "/about/dermatologist-tested" },
      ],
    },
  ],
};

export const contactMenu = {
  id: "contact",
  label: "Contact",
  featured: {
    title: "We're Here to Help",
    description: "Our skin concierge team is ready to assist with orders and routines.",
    to: "/contact",
    cta: "Get in Touch",
  },
  columns: [
    {
      title: "Support",
      links: [
        { label: "Contact Us", to: "/contact" },
        { label: "FAQ", to: "/contact/faq" },
        { label: "Live Chat", to: "/contact/chat" },
        { label: "Order Help", to: "/contact/orders" },
      ],
    },
    {
      title: "Information",
      links: [
        { label: "Shipping & Delivery", to: "/contact/shipping" },
        { label: "Returns & Refunds", to: "/contact/returns" },
        { label: "Store Locator", to: "/contact/stores" },
      ],
    },
  ],
};

export const navDropdownMenus = [
  newArrivalsMenu,
  bestSellersMenu,
  aboutMenu,
  contactMenu,
];
