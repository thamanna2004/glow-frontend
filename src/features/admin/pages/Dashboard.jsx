import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AdminPage, { AdminPageHeader } from "../../../components/admin/AdminPage";
import StatsCard from "../../../components/admin/StatsCard";
import { useAdminStats, useAdminOrders, useAdminProducts } from "../hooks/useAdmin";
import { formatPrice } from "../../../utils/helpers";

const quickActions = [
  { to: "/admin/products", label: "Add Product" },
  { to: "/admin/orders", label: "View Orders" },
  { to: "/admin/users", label: "Manage Users" },
  { to: "/admin/categories", label: "Categories" },
];

export default function AdminDashboard() {
  const { data, isLoading } = useAdminStats();
  const { data: orders = [] } = useAdminOrders();
  const { data: products = [] } = useAdminProducts();

  const stats = data || {
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  };

  const pendingOrders = orders.filter(
    (order) => (order.orderStatus || order.status || "").toLowerCase() === "processing"
  ).length;

  const lowStockCount = products.filter(
    (product) => Number(product.countInStock ?? product.stock ?? 0) <= 5
  ).length;

  return (
    <AdminPage>
      <AdminPageHeader
        overline="Overview"
        title="Dashboard"
        description="Monitor store performance, orders, and customer activity."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatsCard
          label="Total Users"
          value={stats.totalUsers}
          hint="Registered customers"
          icon="users"
          to="/admin/users"
          index={0}
          loading={isLoading}
        />
        <StatsCard
          label="Total Products"
          value={stats.totalProducts}
          hint="Active catalog items"
          icon="products"
          to="/admin/products"
          index={1}
          loading={isLoading}
        />
        <StatsCard
          label="Total Orders"
          value={stats.totalOrders}
          hint="All-time orders"
          icon="orders"
          to="/admin/orders"
          index={2}
          loading={isLoading}
        />
        <StatsCard
          label="Total Revenue"
          value={formatPrice(stats.totalRevenue)}
          hint="Excluding cancelled"
          icon="revenue"
          to="/admin/analytics"
          index={3}
          loading={isLoading}
        />
        <StatsCard
          label="Pending Orders"
          value={pendingOrders}
          hint="Awaiting fulfillment"
          icon="pending"
          to="/admin/orders"
          index={4}
          loading={isLoading}
        />
        <StatsCard
          label="Low Stock Products"
          value={lowStockCount}
          hint="Needs replenishment"
          icon="inventory"
          to="/admin/inventory"
          index={5}
          loading={isLoading}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="rounded-[24px] border border-ice-200/70 bg-ivory/95 p-6 shadow-[0_16px_40px_-24px_rgba(44,42,38,0.15)] backdrop-blur-sm"
        >
          <h2 className="display-heading text-3xl text-charcoal">Quick Actions</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {quickActions.map((action) => (
              <Link
                key={action.to}
                to={action.to}
                className="rounded-2xl border border-ice-200/80 bg-beige/40 px-4 py-3 text-sm font-medium text-charcoal transition hover:-translate-y-0.5 hover:border-gold/30 hover:bg-ivory hover:shadow-md"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.45 }}
          className="rounded-[24px] border border-ice-200/70 bg-ivory/95 p-6 shadow-[0_16px_40px_-24px_rgba(44,42,38,0.15)] backdrop-blur-sm"
        >
          <h2 className="display-heading text-3xl text-charcoal">Store Health</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            <li className="flex items-center justify-between rounded-2xl bg-beige/40 px-4 py-3">
              <span>Inventory status</span>
              <span
                className={`font-medium ${lowStockCount > 0 ? "text-amber-700" : "text-charcoal"}`}
              >
                {lowStockCount > 0 ? `${lowStockCount} low stock` : "Healthy"}
              </span>
            </li>
            <li className="flex items-center justify-between rounded-2xl bg-beige/40 px-4 py-3">
              <span>Pending orders</span>
              <span className="font-medium text-charcoal">
                {pendingOrders > 0 ? `${pendingOrders} to review` : "All clear"}
              </span>
            </li>
            <li className="flex items-center justify-between rounded-2xl bg-beige/40 px-4 py-3">
              <span>Customer support</span>
              <span className="font-medium text-charcoal">All clear</span>
            </li>
          </ul>
        </motion.article>
      </div>
    </AdminPage>
  );
}
