import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import BackButton from "../../../components/admin/BackButton";
import AdminPage, { AdminPageHeader } from "../../../components/admin/AdminPage";
import StatsCard from "../../../components/admin/StatsCard";
import { getAiAnalytics } from "../../ai/api/aiApi";

function BarList({ items, labelKey = "label", valueKey = "count", emptyText }) {
  const max = Math.max(...items.map((i) => i[valueKey] || 0), 1);

  if (!items.length) {
    return <p className="text-sm text-slate-500">{emptyText}</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item[labelKey] || item.id}>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="capitalize text-slate-600">{item[labelKey]}</span>
            <span className="font-medium text-charcoal">{item[valueKey]}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-beige/50">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((item[valueKey] || 0) / max) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-linear-to-r from-gold-light to-gold"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminAiAnalytics() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "ai-analytics"],
    queryFn: getAiAnalytics,
  });

  const topIntents = (data?.topIntents || []).map((i) => ({
    label: i.intent?.replace(/_/g, " ") || "general",
    count: i.count,
  }));

  const topConcerns = (data?.topConcerns || []).map((c) => ({
    label: c.concern,
    count: c.count,
  }));

  const topProducts = (data?.topProducts || []).map((p) => ({
    label: p.name,
    count: p.count,
  }));

  const recommendationClicks = (data?.recommendationClicks || []).map((p) => ({
    label: p.name,
    count: p.count,
  }));

  return (
    <AdminPage>
      <div className="flex items-start gap-4">
        <BackButton />
        <div className="flex-1">
          <AdminPageHeader
            overline="Glow AI"
            title="AI Analytics"
            description="Track customer questions, concerns, and product recommendations from the skincare assistant."
          />
        </div>
      </div>

      {error && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Unable to load AI analytics.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          label="Total AI chats"
          value={isLoading ? "…" : String(data?.totalChats ?? 0)}
          icon="orders"
        />
        <StatsCard
          label="Top intent"
          value={isLoading ? "…" : topIntents[0]?.label || "—"}
          icon="revenue"
        />
        <StatsCard
          label="Top concern"
          value={isLoading ? "…" : topConcerns[0]?.label || "—"}
          icon="users"
        />
        <StatsCard
          label="Recommendation clicks"
          value={
            isLoading
              ? "…"
              : String(recommendationClicks.reduce((sum, p) => sum + p.count, 0))
          }
          icon="products"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[24px] border border-ice-200/70 bg-ivory/95 p-6 shadow-sm backdrop-blur-sm"
        >
          <h2 className="display-heading text-2xl text-charcoal">Most asked questions</h2>
          <div className="mt-4 space-y-3">
            {isLoading ? (
              <p className="text-sm text-slate-500">Loading…</p>
            ) : !data?.recentQuestions?.length ? (
              <p className="text-sm text-slate-500">No chat data yet.</p>
            ) : (
              data.recentQuestions.map((q, i) => (
                <div
                  key={`${q.message}-${i}`}
                  className="rounded-2xl border border-gold/20 bg-cream/60 px-4 py-3"
                >
                  <p className="text-sm text-charcoal">{q.message}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-gold">
                    {q.intent?.replace(/_/g, " ")}
                  </p>
                </div>
              ))
            )}
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="rounded-[24px] border border-ice-200/70 bg-ivory/95 p-6 shadow-sm backdrop-blur-sm"
        >
          <h2 className="display-heading text-2xl text-charcoal">Customer concerns</h2>
          <div className="mt-6">
            <BarList
              items={topConcerns}
              labelKey="label"
              valueKey="count"
              emptyText="No concern data yet."
            />
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-[24px] border border-ice-200/70 bg-ivory/95 p-6 shadow-sm backdrop-blur-sm"
        >
          <h2 className="display-heading text-2xl text-charcoal">Popular AI products</h2>
          <div className="mt-6">
            <BarList
              items={topProducts}
              labelKey="label"
              valueKey="count"
              emptyText="No product recommendations yet."
            />
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="rounded-[24px] border border-ice-200/70 bg-ivory/95 p-6 shadow-sm backdrop-blur-sm"
        >
          <h2 className="display-heading text-2xl text-charcoal">Recommendation clicks</h2>
          <div className="mt-6">
            <BarList
              items={recommendationClicks}
              labelKey="label"
              valueKey="count"
              emptyText="No recommendation clicks yet."
            />
          </div>
        </motion.article>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="rounded-[24px] border border-ice-200/70 bg-ivory/95 p-6 shadow-sm backdrop-blur-sm"
      >
        <h2 className="display-heading text-2xl text-charcoal">Chat intents</h2>
        <div className="mt-6">
          <BarList
            items={topIntents}
            labelKey="label"
            valueKey="count"
            emptyText="No intent data yet."
          />
        </div>
      </motion.article>
    </AdminPage>
  );
}
