import { ProductGridSkeleton } from "./ui/ProductCardSkeleton";

export default function ProductState({ loading, error, empty, emptyMessage = "No products found." }) {
  if (loading) {
    return <ProductGridSkeleton count={4} />;
  }

  if (error) {
    return (
      <div className="rounded-[28px] glass-panel p-12 text-center">
        <p className="text-sm font-medium text-charcoal">Unable to load products</p>
        <p className="mt-2 text-sm text-slate-500">
          {error.message || "Please check that the backend server is running."}
        </p>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="rounded-[28px] glass-panel p-12 text-center text-sm text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return null;
}
