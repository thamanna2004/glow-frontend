import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Button from "../../../components/Button";
import BackButton from "../../../components/admin/BackButton";
import AdminPage, { AdminPageHeader } from "../../../components/admin/AdminPage";
import { adminApi } from "../api/adminApi";
import { useAdminCategories } from "../hooks/useAdmin";

const inputClass =
  "w-full rounded-full border border-ice-200/80 bg-ivory/90 px-4 py-2.5 text-sm outline-none focus:border-gold/50";

export default function AdminCategories() {
  const queryClient = useQueryClient();
  const { data: categories = [], isLoading } = useAdminCategories();
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
    queryClient.invalidateQueries({ queryKey: ["categories"] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setSaving(true);
    try {
      if (editingId) {
        await adminApi.updateCategory(editingId, name);
        setMessage("Category updated.");
      } else {
        await adminApi.createCategory(name);
        setMessage("Category created.");
      }
      setName("");
      setEditingId(null);
      invalidate();
    } catch (error) {
      setMessage(error.message || "Unable to save category.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await adminApi.deleteCategory(id);
      invalidate();
    } catch (error) {
      setMessage(error.message || "Unable to delete category.");
    }
  };

  return (
    <AdminPage>
      <div className="flex items-start gap-4">
        <BackButton />
        <div className="flex-1">
          <AdminPageHeader overline="Catalog" title="Category Management" />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex max-w-xl flex-col gap-3 rounded-[24px] border border-ice-200/70 bg-ivory/95 p-6 shadow-sm backdrop-blur-sm sm:flex-row"
      >
        <input
          className={inputClass}
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Button type="submit" loading={saving}>
          {editingId ? "Update" : "Create"}
        </Button>
      </form>
      {message && <p className="text-sm text-slate-600">{message}</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <p className="text-slate-500">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-slate-500">No categories yet.</p>
        ) : (
          categories.map((category, index) => {
            const id = category._id || category.id;
            return (
              <motion.article
                key={id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                whileHover={{ y: -2 }}
                className="flex items-center justify-between rounded-[20px] border border-ice-200/70 bg-ivory/95 px-5 py-4 shadow-sm transition hover:border-gold/30 hover:shadow-md"
              >
                <p className="font-medium text-charcoal">{category.name}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(id);
                      setName(category.name);
                    }}
                    className="rounded-full border border-ice-200/80 px-3 py-1 text-xs transition hover:bg-beige/50"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(id)}
                    className="rounded-full border border-red-200/80 px-3 py-1 text-xs text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </motion.article>
            );
          })
        )}
      </div>
    </AdminPage>
  );
}
