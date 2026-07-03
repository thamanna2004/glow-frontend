export function ProductCard({ product }) {
  return <div>{product?.name || "Product"}</div>;
}
