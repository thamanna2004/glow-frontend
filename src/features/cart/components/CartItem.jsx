export function CartItem({ item }) {
  return <div>{item?.name || "Cart item"}</div>;
}
