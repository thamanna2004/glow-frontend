import { skinCategoryGroups } from "../data/skinCategories";
import { getFallbackProductImage, resolveProductImageUrl } from "./productImageFallback";

const BRAND_NAME = "Glow Skin";

function slugifyName(value = "") {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function resolveGroupSlug(raw) {
  if (raw.groupSlug) return raw.groupSlug;
  const categoryName = raw.category || raw.categoryId?.name || "";
  const match = skinCategoryGroups.find(
    (group) => group.name.toLowerCase() === categoryName.toLowerCase()
  );
  return match?.slug || slugifyName(categoryName);
}

function resolveSubCategorySlug(raw) {
  if (raw.subCategorySlug) return raw.subCategorySlug;
  const subName = raw.subCategory || raw.subCategoryId?.name || "";
  const groupSlug = resolveGroupSlug(raw);
  const group = skinCategoryGroups.find((item) => item.slug === groupSlug);
  const match = group?.items.find(
    (item) => item.name.toLowerCase() === subName.toLowerCase()
  );
  return match?.slug || slugifyName(subName);
}

export function getProductImageUrl(product) {
  return resolveProductImageUrl(product);
}

export function getProductImageUrls(product) {
  if (!product) return [getFallbackProductImage(null)];
  const urls = (product.images || [])
    .map((img) => (typeof img === "string" ? img : img?.url))
    .filter((url) => url && url.trim());
  if (urls.length) return urls;
  const single = resolveProductImageUrl(product);
  return single ? [single] : [getFallbackProductImage(product)];
}

export function normalizeImage(image) {
  if (!image) return { url: "", public_id: "" };
  if (typeof image === "string") return { url: image, public_id: "" };
  return {
    url: image.url || "",
    public_id: image.public_id || "",
  };
}

export function normalizeProduct(raw) {
  if (!raw) return null;

  const id = raw.id || raw._id || raw.slug;
  let image = normalizeImage(raw.image || raw.images?.[0]);
  if (!image.url?.trim()) {
    image = { url: getFallbackProductImage({ ...raw, id, groupSlug: resolveGroupSlug(raw) }), public_id: "" };
  }
  const price = Number(raw.price);
  const discount = Number(raw.discount || 0);
  const discountPrice = Number(
    raw.discountPrice ?? (discount > 0 ? Math.round(price - (price * discount) / 100) : price)
  );
  const tags = raw.tags || [];
  const groupSlug = resolveGroupSlug(raw);
  const subCategorySlug = resolveSubCategorySlug(raw);

  return {
    _id: raw._id ? String(raw._id) : undefined,
    id: String(id),
    name: raw.name,
    image,
    images: raw.images?.length ? raw.images.map(normalizeImage) : image.url ? [image] : [],
    price,
    discount,
    discountPrice,
    salePrice: discountPrice,
    category: raw.category || raw.categoryId?.name || "",
    subCategory: raw.subCategory || raw.subCategoryId?.name || "",
    categoryId: raw.categoryId?._id || raw.categoryId || "",
    subCategoryId: raw.subCategoryId?._id || raw.subCategoryId || "",
    groupSlug,
    subCategorySlug,
    rootCategory: "skin",
    description: raw.description || raw.shortDescription || "",
    shortDescription:
      raw.shortDescription ||
      raw.description ||
      `Premium ${raw.name} crafted for your glow ritual.`,
    brand: raw.brand || BRAND_NAME,
    rating: raw.rating ?? 4.5,
    popularity: raw.popularity ?? 0,
    stock: raw.stock ?? raw.countInStock ?? 0,
    countInStock: raw.countInStock ?? raw.stock ?? 0,
    tags,
    isFeatured: tags.includes("featured"),
    isBestSeller: tags.includes("bestSeller"),
    isNewArrival: tags.includes("newArrival"),
    createdAt: raw.createdAt,
  };
}

export function normalizeProducts(list = []) {
  return list.map(normalizeProduct).filter(Boolean);
}

function matchesQuery(product, query) {
  const q = query.toLowerCase();
  const fields = [
    product.name,
    product.category,
    product.subCategory,
    product.description,
    product.shortDescription,
    product.brand,
    product.groupSlug?.replace(/-/g, " "),
    product.subCategorySlug?.replace(/-/g, " "),
    ...(product.tags || []),
  ];

  return fields.some((field) => field && String(field).toLowerCase().includes(q));
}

export function searchLocalProducts(query, catalog = []) {
  const trimmed = query.trim();
  if (!trimmed) return [];

  return catalog.filter((product) => matchesQuery(normalizeProduct(product), trimmed));
}
