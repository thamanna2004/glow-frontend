import axiosClient from "../../../services/axiosClient";
import { skinCategoryTree } from "../../../data/skinCategories";

export async function fetchCategories() {
  try {
    const { data } = await axiosClient.get("/categories");
    return data;
  } catch {
    return skinCategoryTree;
  }
}

/** Returns the local skin category tree — use for seeding backend Category + SubCategory documents */
export function getSkinCategoryTree() {
  return skinCategoryTree;
}
