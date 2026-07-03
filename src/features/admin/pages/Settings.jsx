import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../../../components/Button";
import BackButton from "../../../components/admin/BackButton";
import AdminPage, { AdminPageHeader } from "../../../components/admin/AdminPage";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    storeName: "Glow Skin",
    supportEmail: "hello@glowskin.com",
    currency: "INR",
    lowStockThreshold: 5,
    enableNotifications: true,
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = (event) => {
    event.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaved(true);
      setSaving(false);
      setTimeout(() => setSaved(false), 2500);
    }, 600);
  };

  const inputClass =
    "w-full rounded-2xl border border-ice-200/80 bg-ivory/90 px-4 py-2.5 text-sm outline-none focus:border-gold/50";

  return (
    <AdminPage>
      <div className="flex items-start gap-4">
        <BackButton />
        <div className="flex-1">
          <AdminPageHeader overline="Configuration" title="Settings" />
        </div>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSave}
        className="max-w-2xl space-y-5 rounded-[24px] border border-ice-200/70 bg-ivory/95 p-6 shadow-sm backdrop-blur-sm"
      >
        <label className="block space-y-2">
          <span className="text-sm text-slate-600">Store name</span>
          <input
            className={inputClass}
            value={settings.storeName}
            onChange={(e) => setSettings((p) => ({ ...p, storeName: e.target.value }))}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-slate-600">Support email</span>
          <input
            className={inputClass}
            type="email"
            value={settings.supportEmail}
            onChange={(e) => setSettings((p) => ({ ...p, supportEmail: e.target.value }))}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-slate-600">Currency</span>
          <select
            className={inputClass}
            value={settings.currency}
            onChange={(e) => setSettings((p) => ({ ...p, currency: e.target.value }))}
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-slate-600">Low stock threshold</span>
          <input
            className={inputClass}
            type="number"
            value={settings.lowStockThreshold}
            onChange={(e) =>
              setSettings((p) => ({ ...p, lowStockThreshold: Number(e.target.value) }))
            }
          />
        </label>
        <label className="flex items-center gap-3 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={settings.enableNotifications}
            onChange={(e) =>
              setSettings((p) => ({ ...p, enableNotifications: e.target.checked }))
            }
            className="h-4 w-4 rounded border-ice-300"
          />
          Enable admin email notifications
        </label>
        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" loading={saving}>
            Save Settings
          </Button>
          {saved && <span className="text-sm text-charcoal">Settings saved.</span>}
        </div>
      </motion.form>
    </AdminPage>
  );
}
