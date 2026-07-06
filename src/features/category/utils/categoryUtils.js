import { SKIN_ROOT, skinCategoryGroups } from "../../../data/skinCategories";

export function buildCategoryPath(groupSlug, itemSlug) {
  if (groupSlug && itemSlug) {
    return `/categories/skin/${groupSlug}/${itemSlug}`;
  }
  if (groupSlug) {
    return `/categories/skin/${groupSlug}`;
  }
  return `/categories/skin`;
}

export function findGroupBySlug(groupSlug) {
  if (!groupSlug) return null;
  return skinCategoryGroups.find((group) => group.slug === groupSlug) || null;
}

export function findItemBySlug(groupSlug, itemSlug) {
  const group = findGroupBySlug(groupSlug);
  if (!group || !itemSlug) return null;
  return group.items.find((item) => item.slug === itemSlug) || null;
}

export function getGroupNames() {
  return skinCategoryGroups.map((group) => group.name);
}

export function flattenSubcategories() {
  return skinCategoryGroups.flatMap((group) =>
    group.items.map((item) => ({
      ...item,
      groupSlug: group.slug,
      groupName: group.name,
      groupId: group.id,
      rootSlug: SKIN_ROOT.slug,
      path: buildCategoryPath(group.slug, item.slug),
    }))
  );
}

export function filterProductsByCategory(products, { groupSlug, itemSlug } = {}) {
  if (itemSlug) {
    const item = findItemBySlug(groupSlug, itemSlug);
    return products.filter(
      (product) =>
        product.subCategorySlug === itemSlug ||
        product.categorySlug === itemSlug ||
        (item && product.subCategory?.toLowerCase() === item.name.toLowerCase())
    );
  }
  if (groupSlug) {
    return products.filter(
      (product) =>
        product.groupSlug === groupSlug ||
        product.category?.toLowerCase() === findGroupBySlug(groupSlug)?.name.toLowerCase()
    );
  }
  return products.filter(
    (product) => product.rootCategory === SKIN_ROOT.slug || product.rootCategory === "skin"
  );
}

export function getCategoryBreadcrumb(groupSlug, itemSlug) {
  const crumbs = [{ label: SKIN_ROOT.name, path: buildCategoryPath() }];
  const group = findGroupBySlug(groupSlug);
  if (group) {
    crumbs.push({ label: group.name, path: buildCategoryPath(group.slug) });
  }
  const item = findItemBySlug(groupSlug, itemSlug);
  if (item) {
    crumbs.push({ label: item.name, path: buildCategoryPath(groupSlug, itemSlug) });
  }
  return crumbs;
}
