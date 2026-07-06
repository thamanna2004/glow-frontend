import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../Button";
import { updateSkinProfile } from "../../features/ai/api/aiApi";
import { useAuth } from "../../features/auth/hooks/useAuth";

const SKIN_TYPES = [
  { id: "dry", label: "Dry" },
  { id: "oily", label: "Oily" },
  { id: "combination", label: "Combination" },
  { id: "sensitive", label: "Sensitive" },
];

const CONCERNS = [
  { id: "acne", label: "Acne" },
  { id: "dark spots", label: "Dark spots" },
  { id: "aging", label: "Aging" },
  { id: "dullness", label: "Dullness" },
  { id: "dryness", label: "Dryness" },
];

export default function SkinQuiz({ onComplete, onClose }) {
  const { isAuthenticated } = useAuth();
  const [skinType, setSkinType] = useState("");
  const [concerns, setConcerns] = useState([]);
  const [saving, setSaving] = useState(false);

  const toggleConcern = (id) => {
    setConcerns((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    const summary = `I have ${skinType || "combination"} skin and my concerns are: ${concerns.join(", ") || "general glow"}.`;
    if (isAuthenticated) {
      setSaving(true);
      try {
        await updateSkinProfile({ skinType, concerns });
      } catch {
        /* guest-style message still works */
      } finally {
        setSaving(false);
      }
    }
    onComplete?.(summary);
    onClose?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-gold/35 bg-sand/20 p-4"
    >
      <p className="text-sm font-medium text-forest">Quick skin profile</p>
      <p className="mt-1 text-xs text-slate-600">Help Glow AI personalize recommendations.</p>

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
        Skin type
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {SKIN_TYPES.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => setSkinType(type.id)}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              skinType === type.id
                ? "border-forest bg-forest text-cream"
                : "border-gold/40 bg-cream text-forest hover:border-gold/60"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
        Concerns
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {CONCERNS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => toggleConcern(c.id)}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              concerns.includes(c.id)
                ? "border-forest bg-forest text-cream"
                : "border-gold/40 bg-cream text-forest hover:border-gold/60"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <Button className="flex-1 text-xs" onClick={handleSubmit} disabled={saving}>
          {saving ? "Saving..." : "Get recommendations"}
        </Button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-3 text-xs text-slate-500 hover:text-forest"
          >
            Skip
          </button>
        )}
      </div>
    </motion.div>
  );
}
