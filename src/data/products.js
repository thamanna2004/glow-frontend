import { skinGroupCards, skinCategoryGroups } from "./skinCategories";

export { skinGroupCards as categoryCards };
export const products = [];

export const productFilters = [
  "All",
  ...skinCategoryGroups.map((group) => group.name),
];

export const sortOptions = [
  { value: "popular", label: "Popular" },
  { value: "low", label: "Price Low to High" },
  { value: "high", label: "Price High to Low" },
];
