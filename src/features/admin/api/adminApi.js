import axiosClient from "../../../services/axiosClient";
import { productApi } from "../../../api/productApi";
import { normalizeProducts } from "../../../utils/productNormalizer";

const mockStats = {
  totalUsers: 128,
  totalProducts: 24,
  totalOrders: 56,
  totalRevenue: 18450,
};

const mockOrders = [
  {
    _id: "1",
    customerName: "Sarah Chen",
    customerEmail: "sarah@glowskin.com",
    totalAmount: 89,
    status: "Processing",
    createdAt: new Date().toISOString(),
    items: [{ name: "Hydrating Serum", quantity: 1, price: 89 }],
  },
  {
    _id: "2",
    customerName: "Emma Wilson",
    customerEmail: "emma@glowskin.com",
    totalAmount: 156,
    status: "Shipped",
    createdAt: new Date().toISOString(),
    items: [{ name: "Glow Cleanser", quantity: 2, price: 78 }],
  },
];

async function requestOrFallback(requestFn, fallback) {
  try {
    const { data } = await requestFn();
    return data;
  } catch {
    return fallback;
  }
}

export const adminApi = {
  getStats: () => requestOrFallback(() => axiosClient.get("/admin/stats"), mockStats),

  getUsers: (search = "") =>
    requestOrFallback(
      () => axiosClient.get("/admin/users", { params: { search } }),
      []
    ),

  updateUser: (id, payload) =>
    axiosClient.patch(`/admin/users/${id}`, payload).then((res) => res.data),

  getOrders: () => requestOrFallback(() => axiosClient.get("/admin/orders"), mockOrders),

  updateOrderStatus: (id, status) =>
    axiosClient.patch(`/admin/orders/${id}/status`, { orderStatus: status }).then((res) => res.data),

  getProducts: async () => {
    const data = await requestOrFallback(() => axiosClient.get("/products"), []);
    return normalizeProducts(data);
  },

  createProduct: (formData) => productApi.createProduct(formData),

  updateProduct: (id, formData) => productApi.updateProduct(id, formData),

  deleteProduct: (id) => productApi.deleteProduct(id),

  getCategories: () => requestOrFallback(() => axiosClient.get("/categories"), []),

  getSubCategories: (categoryId) =>
    requestOrFallback(
      () =>
        axiosClient.get("/subcategories", {
          params: categoryId ? { categoryId } : undefined,
        }),
      []
    ),

  createCategory: (name) =>
    axiosClient.post("/categories", { name }).then((res) => res.data),

  updateCategory: (id, name) =>
    axiosClient.put(`/admin/categories/${id}`, { name }).then((res) => res.data),

  deleteCategory: (id) => axiosClient.delete(`/admin/categories/${id}`),
};
