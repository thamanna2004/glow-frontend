import axiosClient from "../services/axiosClient";
import { normalizeProduct, normalizeProducts } from "../utils/productNormalizer";

export const productApi = {
  getProducts: async () => {
    const { data } = await axiosClient.get("/products");
    return normalizeProducts(data);
  },

  getProductById: async (id) => {
    const { data } = await axiosClient.get(`/products/${id}`);
    return normalizeProduct(data);
  },

  searchProducts: async (query) => {
    const { data } = await axiosClient.get("/products/search", {
      params: { query },
    });
    return {
      products: normalizeProducts(data.products || []),
      count: data.count || 0,
    };
  },

  createProduct: (formData) => axiosClient.post("/products", formData),

  updateProduct: (id, formData) => axiosClient.put(`/products/${id}`, formData),

  deleteProduct: (id) => axiosClient.delete(`/products/${id}`),
};
