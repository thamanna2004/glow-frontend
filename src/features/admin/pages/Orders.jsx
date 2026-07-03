import { useAdminOrders, useUpdateOrderStatus } from "../hooks/useAdmin";
import { formatPrice } from "../../../utils/helpers";
import BackButton from "../../../components/admin/BackButton";
import AdminPage, { AdminPageHeader } from "../../../components/admin/AdminPage";
import DataTable from "../../../components/admin/DataTable";

const statuses = ["Processing", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrders() {
  const { data: orders = [], isLoading } = useAdminOrders();
  const updateStatus = useUpdateOrderStatus();

  const tableData = orders.map((order) => {
    const id = order._id || order.id;
    return {
      ...order,
      id,
      orderLabel: `#${String(id).slice(-6)}`,
      customerName: order.customerName || order.userId?.name || "—",
      customerEmail: order.customerEmail || order.userId?.email || "",
      status: order.orderStatus || order.status || "Processing",
      date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "—",
    };
  });

  const columns = [
    {
      key: "orderLabel",
      header: "Order ID",
      sortable: true,
      render: (row) => <span className="font-medium text-charcoal">{row.orderLabel}</span>,
    },
    {
      key: "customerName",
      header: "Customer",
      sortable: true,
      render: (row) => (
        <div>
          <p>{row.customerName}</p>
          {row.customerEmail && <p className="text-xs text-slate-400">{row.customerEmail}</p>}
        </div>
      ),
    },
    {
      key: "totalAmount",
      header: "Amount",
      sortable: true,
      render: (row) => formatPrice(row.totalAmount),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (row) => (
        <select
          value={row.status}
          onChange={(e) =>
            updateStatus.mutate({ id: row.id, orderStatus: e.target.value })
          }
          disabled={updateStatus.isPending}
          className="rounded-full border border-ice-200/80 bg-ivory px-3 py-1.5 text-xs outline-none focus:border-gold/50"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      ),
    },
    {
      key: "date",
      header: "Date",
      sortable: true,
      render: (row) => <span className="text-slate-500">{row.date}</span>,
    },
  ];

  return (
    <AdminPage>
      <div className="flex items-start gap-4">
        <BackButton />
        <div className="flex-1">
          <AdminPageHeader overline="Fulfillment" title="Order Management" />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={tableData}
        isLoading={isLoading}
        searchPlaceholder="Search orders..."
        searchKeys={["orderLabel", "customerName", "customerEmail"]}
        filters={[
          {
            key: "status",
            label: "Status",
            options: statuses.map((s) => ({ value: s, label: s })),
          },
        ]}
        emptyMessage="No orders yet."
        pageSize={10}
      />
    </AdminPage>
  );
}
