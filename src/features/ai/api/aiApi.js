import axiosClient from "../../../services/axiosClient";

export async function sendAiMessage(message, history = []) {
  const { data } = await axiosClient.post("/ai/chat", { message, history });
  return data;
}

export async function getSkinProfile() {
  const { data } = await axiosClient.get("/ai/profile");
  return data;
}

export async function updateSkinProfile(profile) {
  const { data } = await axiosClient.put("/ai/profile", profile);
  return data;
}

export async function trackAiProductClick(productId) {
  try {
    await axiosClient.post("/ai/track-click", { productId });
  } catch {
    /* ignore */
  }
}

export async function getAiAnalytics() {
  const { data } = await axiosClient.get("/ai/analytics");
  return data;
}
