import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../features/auth/hooks/useAuth";
import { fetchOrders } from "../features/orders/api/orderApi";
import { formatPrice } from "../utils/helpers";

const statusStyles = {
  Processing: "bg-amber-50 text-amber-800",
  Shipped: "bg-sky-50 text-sky-800",
  Delivered: "bg-emerald-50 text-emerald-800",
  Cancelled: "bg-red-50 text-red-700",
};

export default function OrdersPage() {
  const { user } = useAuth();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(
    location.state?.orderSuccess ? location.state.message : ""
  );

  useEffect(() => {
    let active = true;

    fetchOrders()
      .then((data) => {
        if (active) setOrders(data);
      })
      .catch(() => {
        if (active) setOrders([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!successMessage) return undefined;
    const timer = setTimeout(() => setSuccessMessage(""), 5000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <section className="space-y-8 pb-10">
      <header className="rounded-[26px] glass-panel p-8">
        <p className="section-overline">Order History</p>
        <h1 className="display-heading mt-2 text-5xl text-navy-900 md:text-6xl">My Orders</h1>
        <p className="mt-3 text-sm text-slate-600">
          Track your Glow Skin purchases, {user?.name}.
        </p>
      </header>

      {successMessage && (
        <div className="rounded-[20px] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-800">
          {successMessage}
        </div>
      )}

      {loading ? (
        <p className="text-slate-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="rounded-[24px] border border-ice-200/60 bg-white p-10 text-center">
          <p className="text-slate-600">You have not placed any orders yet.</p>
          <Link to="/shop" className="mt-4 inline-block text-navy-900 underline">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const id = order._id || order.id;
            const status = order.orderStatus || order.status || "Processing";
            const itemNames = order.items?.map((item) => item.name).join(", ") || "Glow Skin items";

            return (
              <article
                key={id}
                className="rounded-[24px] border border-ice-200/60 bg-white p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                      Order #{String(id).slice(-6).toUpperCase()}
                    </p>
                    <p className="mt-1 font-medium text-navy-900">{itemNames}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString("en-IN")
                        : "—"}{" "}
                      · {formatPrice(order.totalAmount)} · {order.paymentMethod?.replace("_", " ")}
                    </p>
                  </div>
                  <span
                    className={`inline-flex w-fit rounded-full px-4 py-1.5 text-xs font-medium ${
                      statusStyles[status] || "bg-ice-50 text-navy-900"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <Link to="/shop">
        <Button variant="outline">Continue Shopping</Button>
      </Link>
    </section>
  );
}
