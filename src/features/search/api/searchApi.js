import axiosClient from "../../../services/axiosClient";

export async function searchProductsApi(query) {
  const { data } = await axiosClient.get("/products/search", {
    params: { query },
  });
  return data;
}
