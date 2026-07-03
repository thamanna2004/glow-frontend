import axiosClient from "./axiosClient";
import { productApi } from "../api/productApi";
import { skinCategoryGroups } from "../data/skinCategories";

const staticReviews = [
  {
    id: "1",
    name: "Sarah M.",
    rating: 5,
    text: "My skin feels hydrated all day. The serum texture is luxurious.",
  },
  {
    id: "2",
    name: "Emma L.",
    rating: 5,
    text: "Visible glow within two weeks. Gentle on sensitive skin.",
  },
  {
    id: "3",
    name: "Priya K.",
    rating: 4,
    text: "Love the clean ingredients and the premium packaging.",
  },
];

const staticIngredients = [
  { name: "Hyaluronic Acid", benefit: "Deep hydration and plump, dewy skin." },
  { name: "Vitamin C", benefit: "Brightens tone and supports even radiance." },
  { name: "Niacinamide", benefit: "Refines texture and calms visible redness." },
  { name: "Ceramides", benefit: "Strengthens the skin barrier for lasting moisture." },
];

export const productService = {
  getProducts: () => productApi.getProducts(),

  getProductById: (id) => productApi.getProductById(id),

  searchProducts: (query) => productApi.searchProducts(query),

  getCategories: async () => {
    const { data } = await axiosClient.get("/categories");
    return data;
  },

  getReviews: async () => staticReviews,

  getIngredients: async () => staticIngredients,

  getCategoryGroups: () => skinCategoryGroups,
};
