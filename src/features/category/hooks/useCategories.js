import { useQuery } from "@tanstack/react-query";
import { fetchCategories, getSkinCategoryTree } from "../api/categoryApi";

export function useCategories() {
  return useQuery({
    queryKey: ["skin-categories"],
    queryFn: fetchCategories,
    placeholderData: getSkinCategoryTree(),
  });
}

export function useSkinCategoryTree() {
  return getSkinCategoryTree();
}
