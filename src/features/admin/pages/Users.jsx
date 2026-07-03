import { useState } from "react";
import { useAdminUsers, useUpdateAdminUser } from "../hooks/useAdmin";
import BackButton from "../../../components/admin/BackButton";
import AdminPage, { AdminPageHeader } from "../../../components/admin/AdminPage";
import DataTable from "../../../components/admin/DataTable";

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const { data: users = [], isLoading } = useAdminUsers(search);
  const updateUser = useUpdateAdminUser();

  const tableData = users.map((user) => ({
    ...user,
    id: user._id || user.id,
    status: user.isBlocked ? "Blocked" : "Active",
  }));

  const columns = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (row) => <span className="font-medium text-charcoal">{row.name}</span>,
    },
    {
      key: "email",
      header: "Email",
      sortable: true,
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      render: (row) => (
        <select
          value={row.role}
          onChange={(e) => updateUser.mutate({ id: row.id, role: e.target.value })}
          disabled={updateUser.isPending}
          className="rounded-full border border-ice-200/80 bg-ivory px-3 py-1.5 text-xs capitalize outline-none focus:border-gold/50"
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (row) => (
        <span
          className={`rounded-full px-3 py-1 text-xs ${
            row.isBlocked ? "bg-red-50 text-red-600" : "bg-beige/60 text-charcoal"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <button
          type="button"
          onClick={() => updateUser.mutate({ id: row.id, isBlocked: !row.isBlocked })}
          disabled={updateUser.isPending}
          className="rounded-full border border-ice-200/80 px-3 py-1 text-xs transition hover:bg-beige/50"
        >
          {row.isBlocked ? "Unblock" : "Block"}
        </button>
      ),
    },
  ];

  return (
    <AdminPage>
      <div className="flex items-start gap-4">
        <BackButton />
        <div className="flex-1">
          <AdminPageHeader overline="Community" title="User Management" />
        </div>
      </div>

      <div className="relative max-w-xs">
        <input
          type="search"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-ice-200/80 bg-ivory/90 px-4 py-2.5 text-sm outline-none focus:border-gold/50"
        />
      </div>

      <DataTable
        columns={columns}
        data={tableData}
        isLoading={isLoading}
        searchPlaceholder="Filter loaded users..."
        searchKeys={["name", "email", "role"]}
        filters={[
          {
            key: "role",
            label: "Role",
            options: [
              { value: "user", label: "User" },
              { value: "admin", label: "Admin" },
            ],
          },
          {
            key: "status",
            label: "Status",
            options: [
              { value: "Active", label: "Active" },
              { value: "Blocked", label: "Blocked" },
            ],
          },
        ]}
        emptyMessage="No users found."
        pageSize={10}
      />
    </AdminPage>
  );
}
