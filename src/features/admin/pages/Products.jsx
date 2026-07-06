import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../../../components/Button";
import ImageUpload from "../../../components/ImageUpload";
import ProductImage from "../../../components/ProductImage";
import BackButton from "../../../components/admin/BackButton";
import AdminPage, { AdminPageHeader } from "../../../components/admin/AdminPage";
import DataTable from "../../../components/admin/DataTable";
import { skinCategoryGroups } from "../../../data/skinCategories";
import { adminApi } from "../api/adminApi";
import { useAdminProducts } from "../hooks/useAdmin";
import { useAuth } from "../../auth/hooks/useAuth";
import { getProductImageUrl } from "../../../utils/productNormalizer";

const categoryOrder = skinCategoryGroups.map((group) => group.name);

function sortCategories(list = []) {
  return [...list].sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.name);
    const indexB = categoryOrder.indexOf(b.name);
    if (indexA === -1 && indexB === -1) return a.name.localeCompare(b.name);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
}

const inputClass =
  "w-full rounded-2xl border border-ice-200/80 bg-ivory/90 px-4 py-2.5 text-sm outline-none focus:border-gold/50";

function productStockStatus(stock) {
  const n = Number(stock);
  if (n <= 0) return "Out of stock";
  if (n <= 5) return "Low stock";
  return "Active";
}

const emptyForm = {
  name: "",
  description: "",
  price: "",
  discount: "0",
  countInStock: "",
  rating: "4.5",
  categoryId: "",
  subCategoryId: "",
};

const tagOptions = [
  { value: "featured", label: "Featured" },
  { value: "bestSeller", label: "Best Seller" },
  { value: "newArrival", label: "New Arrival" },
];

export default function AdminProducts() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { token, logout, isAdmin } = useAuth();
  const { data: products = [], isLoading } = useAdminProducts();
  const [form, setForm] = useState(emptyForm);
  const [selectedTags, setSelectedTags] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data: categories = [] } = useQuery({
    queryKey: ["admin", "categories-list"],
    queryFn: adminApi.getCategories,
  });

  const sortedCategories = useMemo(() => {
    const skinNames = new Set(categoryOrder);
    return sortCategories(categories.filter((cat) => skinNames.has(cat.name)));
  }, [categories]);

  const tableData = useMemo(
    () =>
      products.map((product) => {
        const stock = Number(product.countInStock ?? product.stock ?? 0);
        const categoryId = product.categoryId?._id || product.categoryId;
        const categoryName =
          product.category?.name ||
          product.categoryId?.name ||
          sortedCategories.find((cat) => cat._id === categoryId)?.name ||
          "—";
        return {
          ...product,
          id: product._id || product.id,
          categoryName,
          stock,
          status: productStockStatus(stock),
        };
      }),
    [products, sortedCategories]
  );

  const { data: subCategories = [], isLoading: subCategoriesLoading } = useQuery({
    queryKey: ["admin", "subcategories-list", form.categoryId],
    queryFn: () => adminApi.getSubCategories(form.categoryId),
    enabled: Boolean(form.categoryId),
  });

  useEffect(() => {
    if (!form.categoryId) {
      setForm((prev) => ({ ...prev, subCategoryId: "" }));
    }
  }, [form.categoryId]);

  const handleClearImage = () => {
    setImageFile(null);
    setExistingImageUrl("");
  };

  const resetForm = () => {
    setForm(emptyForm);
    setSelectedTags([]);
    setImageFile(null);
    setExistingImageUrl("");
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setSubmitting(true);

    if (!token || !isAdmin) {
      setMessage("Session expired. Please log out and sign in again as admin.");
      setSubmitting(false);
      return;
    }

    if (!form.name.trim()) {
      setMessage("Product name is required.");
      setSubmitting(false);
      return;
    }

    if (!form.categoryId || !form.subCategoryId) {
      setMessage("Please select both category and subcategory.");
      setSubmitting(false);
      return;
    }

    const payload = new FormData();
    payload.append("name", form.name);
    payload.append("description", form.description);
    payload.append("price", form.price);
    payload.append("discount", form.discount || "0");
    payload.append("countInStock", form.countInStock);
    payload.append("rating", form.rating || "4.5");
    payload.append("tags", JSON.stringify(selectedTags));
    payload.append("categoryId", form.categoryId);
    payload.append("subCategoryId", form.subCategoryId);

    if (imageFile) {
      payload.append("image", imageFile);
    }

    try {
      if (editingId) {
        if (!imageFile && !existingImageUrl) {
          setMessage("Please upload a product image.");
          setSubmitting(false);
          return;
        }
        await adminApi.updateProduct(editingId, payload);
        setMessage("Product updated successfully.");
        queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
        queryClient.invalidateQueries({ queryKey: ["products"] });
      } else {
        if (!imageFile) {
          setMessage("Please upload a product image.");
          setSubmitting(false);
          return;
        }
        await adminApi.createProduct(payload);
        setMessage("Product created successfully.");
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
        queryClient.invalidateQueries({ queryKey: ["products"] });
      }
    } catch (error) {
      const errorMessage = error.message || "Unable to save product.";
      if (errorMessage.toLowerCase().includes("session expired")) {
        logout();
      }
      setMessage(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    const id = product._id || product.id;
    setEditingId(id);
    setMessage("");
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: String(product.price || ""),
      discount: String(product.discount || 0),
      countInStock: String(product.countInStock ?? product.stock ?? 0),
      rating: String(product.rating || 4.5),
      categoryId: String(product.categoryId?._id || product.categoryId || ""),
      subCategoryId: String(product.subCategoryId?._id || product.subCategoryId || ""),
    });
    setSelectedTags(product.tags || []);
    setImageFile(null);
    setExistingImageUrl(getProductImageUrl(product) || "");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product and its image?")) return;
    try {
      await adminApi.deleteProduct(id);
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      if (editingId === id) resetForm();
    } catch (error) {
      setMessage(error.message || "Unable to delete product.");
    }
  };

  const productColumns = [
    {
      key: "name",
      header: "Product",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <ProductImage product={row} className="h-12 w-12" roundedClass="rounded-xl" />
          <span className="font-medium text-charcoal">{row.name}</span>
        </div>
      ),
    },
    {
      key: "categoryName",
      header: "Category",
      sortable: true,
    },
    {
      key: "price",
      header: "Price",
      sortable: true,
      render: (row) => `₹${row.price}`,
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
            row.status === "Active"
              ? "bg-beige/60 text-charcoal"
              : row.status === "Low stock"
                ? "bg-amber-50 text-amber-700"
                : "bg-red-50 text-red-600"
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
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleEdit(row)}
            className="rounded-full border border-ice-200/80 px-3 py-1 text-xs transition hover:bg-beige/50"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => handleDelete(row.id)}
            className="rounded-full border border-red-200/80 px-3 py-1 text-xs text-red-600 transition hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminPage>
      <div className="flex items-start gap-4">
        <BackButton />
        <div className="flex-1">
          <AdminPageHeader overline="Catalog" title="Product Management" />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-[24px] border border-ice-200/70 bg-ivory/95 p-6 shadow-sm backdrop-blur-sm"
        >
          <h2 className="text-lg font-medium text-charcoal">
            {editingId ? "Edit Product" : "Add Product"}
          </h2>

          <div className="mt-4 space-y-3">
            <ImageUpload
              value={imageFile}
              existingUrl={existingImageUrl}
              onChange={setImageFile}
              onClear={handleClearImage}
              required={!editingId}
            />

            <input
              className={inputClass}
              placeholder="Product name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
            />
            <textarea
              className={`${inputClass} min-h-24 resize-none`}
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              required
            />

            <select
              className={inputClass}
              value={form.categoryId}
              onChange={(e) =>
                setForm((p) => ({ ...p, categoryId: e.target.value, subCategoryId: "" }))
              }
              required
            >
              <option value="">Select category</option>
              {sortedCategories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              className={inputClass}
              value={form.subCategoryId}
              onChange={(e) => setForm((p) => ({ ...p, subCategoryId: e.target.value }))}
              disabled={!form.categoryId}
            >
              <option value="">
                {!form.categoryId
                  ? "Select a category first"
                  : subCategoriesLoading
                    ? "Loading subcategories..."
                    : subCategories.length === 0
                      ? "No subcategories found"
                      : "Select subcategory"}
              </option>
              {subCategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-3">
              <input
                className={inputClass}
                type="number"
                min="0"
                placeholder="Price (₹)"
                value={form.price}
                onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                required
              />
              <input
                className={inputClass}
                type="number"
                min="0"
                max="100"
                placeholder="Discount %"
                value={form.discount}
                onChange={(e) => setForm((p) => ({ ...p, discount: e.target.value }))}
              />
            </div>

            <input
              className={inputClass}
              type="number"
              min="0"
              placeholder="Stock quantity"
              value={form.countInStock}
              onChange={(e) => setForm((p) => ({ ...p, countInStock: e.target.value }))}
              required
            />

            <input
              className={inputClass}
              type="number"
              min="0"
              max="5"
              step="0.1"
              placeholder="Rating (0-5)"
              value={form.rating}
              onChange={(e) => setForm((p) => ({ ...p, rating: e.target.value }))}
            />

            <div className="space-y-2">
              <p className="text-sm font-medium text-navy-900">Collection tags</p>
              <div className="flex flex-wrap gap-2">
                {tagOptions.map((tag) => {
                  const active = selectedTags.includes(tag.value);
                  return (
                    <button
                      key={tag.value}
                      type="button"
                      onClick={() =>
                        setSelectedTags((prev) =>
                          active
                            ? prev.filter((item) => item !== tag.value)
                            : [...prev, tag.value]
                        )
                      }
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                        active
                          ? "bg-navy-900 text-white"
                          : "border border-ice-200 bg-white text-navy-900 hover:bg-ice-50"
                      }`}
                    >
                      {tag.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {message && (
            <p
              className={`mt-3 text-sm ${
                message.toLowerCase().includes("success")
                  ? "font-medium text-emerald-700"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <div className="mt-5 flex gap-2">
            <Button type="submit" disabled={submitting} loading={submitting}>
              {editingId ? "Update" : "Add Product"}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </div>
        </form>

        <DataTable
          columns={productColumns}
          data={tableData}
          isLoading={isLoading}
          searchPlaceholder="Search products..."
          searchKeys={["name", "categoryName", "status"]}
          defaultSearch={searchParams.get("search") || ""}
          filters={[
            {
              key: "status",
              label: "Status",
              options: [
                { value: "Active", label: "Active" },
                { value: "Low stock", label: "Low stock" },
                { value: "Out of stock", label: "Out of stock" },
              ],
            },
          ]}
          emptyMessage="No products found."
          pageSize={8}
        />
      </div>
    </AdminPage>
  );
}
