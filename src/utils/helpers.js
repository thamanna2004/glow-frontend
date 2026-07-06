export function formatPrice(value) {
  const amount = Math.round(Number(value || 0));
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function getProductUnitPrice(product) {
  return product.salePrice ?? product.discountPrice ?? product.price ?? 0;
}
