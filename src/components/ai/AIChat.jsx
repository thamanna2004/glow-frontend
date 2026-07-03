import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogoIcon } from "../Logo";
import ChatMessage, { TypingIndicator } from "./ChatMessage";
import WelcomeMessage from "./WelcomeMessage";
import AILauncher from "./AILauncher";
import ProductRecommendation from "./ProductRecommendation";
import SkinQuiz from "./SkinQuiz";
import useAiStore from "../../store/aiStore";
import { sendAiMessage } from "../../features/ai/api/aiApi";

const QUICK_PROMPTS = [
  "Recommend products for acne prone skin",
  "Build my morning routine",
  "What does Vitamin C do?",
  "Moisturizers under ₹1000",
];

export default function AIChat() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const { open, setOpen, toggle, messages, addMessage } = useAiStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const hasUserMessages = messages.some((m) => m.role === "user");

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, showQuiz]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setInput("");
    addMessage({ role: "user", content: trimmed });
    setLoading(true);

    try {
      const history = messages.slice(-8).map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const data = await sendAiMessage(trimmed, history);
      addMessage({
        role: "assistant",
        content: data.reply,
        products: data.products || [],
      });
    } catch (err) {
      addMessage({
        role: "assistant",
        content: err.message || "Sorry, I couldn't reach Glow AI. Please try again.",
        products: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  if (isAdmin) return null;

  return (
    <div id="glow-skin-ai-assistant" className="pointer-events-none fixed bottom-6 right-6 z-170">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto mb-4 flex h-[min(560px,calc(100vh-7rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[28px] border border-gold/45 bg-linear-to-b from-cream to-sand/30 shadow-[0_32px_80px_-20px_rgba(36,52,42,0.28)]"
          >
            <div className="relative border-b border-gold/30 bg-forest px-5 py-4 text-cream">
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold to-transparent" />
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gold/15">
                    <LogoIcon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="display-heading text-lg leading-none">Glow AI ✨</p>
                    <p className="text-[11px] text-cream/70">Your skincare expert</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setShowQuiz((v) => !v)}
                    className="rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-gold-light hover:bg-cream/10"
                  >
                    Skin quiz
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cream/20 text-cream/80 hover:bg-cream/10"
                    aria-label="Close chat"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                      <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {!hasUserMessages && <WelcomeMessage />}

              {showQuiz && (
                <SkinQuiz
                  onComplete={(msg) => sendMessage(msg)}
                  onClose={() => setShowQuiz(false)}
                />
              )}

              {hasUserMessages &&
                messages.map((msg, i) => (
                  <ChatMessage key={`${msg.role}-${i}`} role={msg.role} content={msg.content}>
                    {msg.role === "assistant" && msg.products?.length > 0 && (
                      <ProductRecommendation products={msg.products} />
                    )}
                  </ChatMessage>
                ))}

              {loading && <TypingIndicator />}
            </div>

            <div className="border-t border-gold/25 bg-cream/80 px-3 py-3">
              <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="shrink-0 rounded-full border border-gold/35 bg-cream px-2.5 py-1 text-[10px] text-forest transition hover:border-gold/55"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about skincare..."
                  disabled={loading}
                  className="flex-1 rounded-full border border-gold/40 bg-cream px-4 py-2.5 text-sm text-espresso outline-none placeholder:text-slate-400 focus:border-gold/65 focus:ring-2 focus:ring-gold/15"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-cream transition hover:bg-forest-deep disabled:opacity-50"
                  aria-label="Send"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AILauncher open={open} onToggle={toggle} />
    </div>
  );
}
