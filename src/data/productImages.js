/** Curated Unsplash skincare product images — remote URLs only, consistent minimal style */
export const skincareImagePool = [
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

export function getCatalogImage(index) {
  return {
    url: skincareImagePool[index % skincareImagePool.length],
    public_id: "",
  };
}
