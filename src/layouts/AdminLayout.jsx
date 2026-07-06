import { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import { useAdminOrders } from "../features/admin/hooks/useAdmin";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { data: orders = [] } = useAdminOrders();

  const pendingCount = useMemo(
    () =>
      orders.filter(
        (order) => (order.orderStatus || order.status || "").toLowerCase() === "processing"
      ).length,
    [orders]
  );

  return (
    <div id="glow-skin-botanical-theme" className="min-h-screen bg-linear-to-br from-cream via-sand/25 to-cream">
      <div className="flex">
        <div className="hidden lg:block">
          <AdminSidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed((v) => !v)} />
        </div>

        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-charcoal-deep/40 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-0 h-full w-72 shadow-2xl"
            >
              <AdminSidebar mobile onNavigate={() => setSidebarOpen(false)} />
            </motion.div>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <AdminHeader
            showMobileMenu
            onMenuOpen={() => setSidebarOpen(true)}
            notificationCount={pendingCount}
          />

          <main className="flex-1 px-4 py-6 md:px-6 md:py-8 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
