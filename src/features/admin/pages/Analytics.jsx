import { motion } from "framer-motion";
import { useAdminStats, useAdminOrders } from "../hooks/useAdmin";
import { formatPrice } from "../../../utils/helpers";
import BackButton from "../../../components/admin/BackButton";
import AdminPage, { AdminPageHeader } from "../../../components/admin/AdminPage";

export default function AdminAnalytics() {
  const { data: stats } = useAdminStats();
  const { data: orders = [] } = useAdminOrders();

  const statusCounts = orders.reduce((acc, order) => {
    const status = order.orderStatus || order.status || "Unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const maxCount = Math.max(...Object.values(statusCounts), 1);

  return (
    <AdminPage>
      <div className="flex items-start gap-4">
        <BackButton />
        <div className="flex-1">
          <AdminPageHeader overline="Insights" title="Sales Analytics" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[24px] border border-ice-200/70 bg-ivory/95 p-6 shadow-sm backdrop-blur-sm"
        >
          <h2 className="display-heading text-3xl text-charcoal">Revenue Snapshot</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-beige/40 px-4 py-3">
              <span className="text-sm text-slate-600">Total revenue</span>
              <span className="font-medium text-charcoal">
                {formatPrice(stats?.totalRevenue || 0)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-beige/40 px-4 py-3">
              <span className="text-sm text-slate-600">Average order value</span>
              <span className="font-medium text-charcoal">
                {formatPrice(
                  stats?.totalOrders
                    ? Math.round((stats.totalRevenue || 0) / stats.totalOrders)
                    : 0
                )}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-beige/40 px-4 py-3">
              <span className="text-sm text-slate-600">Total orders</span>
              <span className="font-medium text-charcoal">{stats?.totalOrders || 0}</span>
            </div>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="rounded-[24px] border border-ice-200/70 bg-ivory/95 p-6 shadow-sm backdrop-blur-sm"
        >
          <h2 className="display-heading text-3xl text-charcoal">Orders by Status</h2>
          <div className="mt-6 space-y-4">
            {Object.keys(statusCounts).length === 0 ? (
              <p className="text-sm text-slate-500">No order data yet.</p>
            ) : (
              Object.entries(statusCounts).map(([status, count]) => (
                <div key={status}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-slate-600">{status}</span>
                    <span className="font-medium text-charcoal">{count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-beige/50">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / maxCount) * 100}%` }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-linear-to-r from-gold-light to-gold"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.article>
      </div>
    </AdminPage>
  );
}
