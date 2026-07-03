import { productApi } from "../api/productApi";

export async function searchProducts(query) {
  const trimmed = (query || "").trim();
  if (!trimmed) {
    return { products: [], count: 0 };
  }

  return productApi.searchProducts(trimmed);
}
