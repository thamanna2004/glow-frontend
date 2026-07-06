import axiosClient from "../../../services/axiosClient";

export async function createOrder(payload) {
  const { data } = await axiosClient.post("/orders", payload);
  return data;
}

export async function fetchOrders() {
  const { data } = await axiosClient.get("/orders");
  return data;
}
