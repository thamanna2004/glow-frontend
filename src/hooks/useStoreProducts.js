import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/productService";

export function useProducts(filters = {}) {
  return useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
    select: (products) => {
      const category = filters.category || "all";
      const search = (filters.search || "").toLowerCase().trim();

      const filteredByCategory =
        category === "all"
          ? products
          : products.filter((item) => item.category === category);

      if (!search) {
        return filteredByCategory;
      }

      return filteredByCategory.filter((item) =>
        `${item.name} ${item.shortDescription} ${item.category} ${item.subCategory}`
          .toLowerCase()
          .includes(search)
      );
    },
  });
}

export function useProduct(productId) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => productService.getProductById(productId),
    enabled: Boolean(productId),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: productService.getCategories,
  });
}

export function useHomeCollections() {
  const productsQuery = useProducts();

  const collections = useMemo(() => {
    const products = productsQuery.data || [];
    return {
      featured: products.filter((item) => item.tags?.includes("featured")),
      bestSellers: products.filter((item) => item.tags?.includes("bestSeller")),
      arrivals: products.filter((item) => item.tags?.includes("newArrival")),
    };
  }, [productsQuery.data]);

  return { ...productsQuery, collections };
}
