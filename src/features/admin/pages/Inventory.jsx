import { useAdminProducts } from "../hooks/useAdmin";
import BackButton from "../../../components/admin/BackButton";
import AdminPage, { AdminPageHeader } from "../../../components/admin/AdminPage";
import StatsCard from "../../../components/admin/StatsCard";
import DataTable from "../../../components/admin/DataTable";

function stockStatus(stock) {
  if (stock <= 0) return "Out of stock";
  if (stock <= 5) return "Low stock";
  return "In stock";
}

export default function AdminInventory() {
  const { data: products = [], isLoading } = useAdminProducts();

  const tableData = products.map((product) => {
    const stock = Number(product.countInStock ?? product.stock ?? 0);
    return {
      ...product,
      id: product._id || product.id,
      stock,
      status: stockStatus(stock),
    };
  });

  const lowStock = tableData.filter((p) => p.stock <= 5);

  const columns = [
    {
      key: "name",
      header: "Product",
      sortable: true,
      render: (row) => <span className="font-medium text-charcoal">{row.name}</span>,
    },
    {
      key: "stock",
      header: "Stock",
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (row) => (
        <span
          className={`rounded-full px-3 py-1 text-xs ${
            row.stock <= 5
              ? row.stock <= 0
                ? "bg-red-50 text-red-600"
                : "bg-amber-50 text-amber-700"
              : "bg-beige/60 text-charcoal"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <AdminPage>
      <div className="flex items-start gap-4">
        <BackButton />
        <div className="flex-1">
          <AdminPageHeader
            overline="Stock Control"
            title="Inventory Management"
            description="Monitor stock levels and identify products that need replenishment."
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard
          label="Total SKUs"
          value={products.length}
          icon="products"
          index={0}
          loading={isLoading}
        />
        <StatsCard
          label="Low Stock"
          value={lowStock.length}
          hint="Tap to manage products"
          icon="inventory"
          to="/admin/products"
          index={1}
          loading={isLoading}
        />
        <StatsCard
          label="In Stock"
          value={products.length - lowStock.length}
          icon="products"
          index={2}
          loading={isLoading}
        />
      </div>

      <DataTable
        columns={columns}
        data={tableData}
        isLoading={isLoading}
        searchPlaceholder="Search inventory..."
        searchKeys={["name", "status"]}
        filters={[
          {
            key: "status",
            label: "Status",
            options: [
              { value: "In stock", label: "In stock" },
              { value: "Low stock", label: "Low stock" },
              { value: "Out of stock", label: "Out of stock" },
            ],
          },
        ]}
        emptyMessage="No products in inventory."
        pageSize={10}
      />
    </AdminPage>
  );
}
