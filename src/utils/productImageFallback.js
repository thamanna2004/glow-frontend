/** Skincare stock images — matches backend catalog pool */
const SKINCARE_IMAGE_POOL = [
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1608248543809-9f6d08d2041c?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1631729371254-42caa2f1adf4?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-157019a7476838-f322f99452df?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1598440947619-2c89a9107484?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1617897908996-01097e6a4e28?w=800&auto=format&fit=crop&q=80",
];

const CATEGORY_IMAGES = {
  serums: "https://images.unsplash.com/photo-157019a7476838-f322f99452df?w=800&auto=format&fit=crop&q=80",
  moisturizers: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&auto=format&fit=crop&q=80",
  cleansers: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
  "sun-care": "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&auto=format&fit=crop&q=80",
  "eye-care": "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&auto=format&fit=crop&q=80",
  "acne-treatment": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
  masks: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80",
  toners: "https://images.unsplash.com/photo-1608248543809-9f6d08d2041c?w=800&auto=format&fit=crop&q=80",
};

function hashString(value = "") {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getFallbackProductImage(product) {
  const slug = product?.groupSlug || product?.category?.toLowerCase().replace(/\s+/g, "-") || "";
  if (CATEGORY_IMAGES[slug]) return CATEGORY_IMAGES[slug];

  const key = product?.id || product?._id || product?.name || "glow";
  return SKINCARE_IMAGE_POOL[hashString(String(key)) % SKINCARE_IMAGE_POOL.length];
}

export function resolveProductImageUrl(product) {
  if (!product) return getFallbackProductImage(null);

  const fromImages = product.images?.find((img) => {
    const url = typeof img === "string" ? img : img?.url;
    return url && url.trim();
  });
  if (fromImages) {
    return typeof fromImages === "string" ? fromImages : fromImages.url;
  }

  if (typeof product.image === "string" && product.image.trim()) {
    return product.image.trim();
  }

  if (product.image?.url?.trim()) {
    return product.image.url.trim();
  }

  return getFallbackProductImage(product);
}
