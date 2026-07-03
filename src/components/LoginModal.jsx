import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import Logo from "./Logo";
import { loginUser, registerUser } from "../features/auth/api/authApi";
import { useAuth } from "../features/auth/hooks/useAuth";
import useUiStore from "../store/uiStore";
import { showToast } from "../store/toastStore";
import { executePendingAction } from "../utils/executePendingAction";

const inputClass =
  "w-full rounded-full border border-sand/50 bg-cream px-4 py-3 text-sm text-espresso outline-none transition placeholder:text-slate-400 focus:border-forest/40 focus:ring-2 focus:ring-gold/15";

export default function LoginModal() {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();
  const authModalOpen = useUiStore((state) => state.authModalOpen);
  const authModalTab = useUiStore((state) => state.authModalTab);
  const authModalReturnPath = useUiStore((state) => state.authModalReturnPath);
  const pendingAction = useUiStore((state) => state.pendingAction);
  const closeAuthModal = useUiStore((state) => state.closeAuthModal);
  const setAuthModalTab = useUiStore((state) => state.setAuthModalTab);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && authModalOpen) {
      const action = pendingAction;
      const returnPath = authModalReturnPath;
      closeAuthModal();

      if (action) {
        executePendingAction(action);
      }

      if (returnPath) {
        navigate(returnPath);
      } else if (!action && user?.role === "admin") {
        navigate("/admin/dashboard");
      }
    }
  }, [
    isAuthenticated,
    authModalOpen,
    authModalReturnPath,
    pendingAction,
    user?.role,
    closeAuthModal,
    navigate,
  ]);

  useEffect(() => {
    if (!authModalOpen) {
      setError("");
      setSuccess("");
      setLoading(false);
    }
  }, [authModalOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape" && authModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [authModalOpen, closeAuthModal]);

  if (!authModalOpen) return null;

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const data = await loginUser({
        email: loginForm.email.trim(),
        password: loginForm.password,
      });
      login(data);
      showToast("Welcome back");
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (registerForm.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await registerUser({
        name: registerForm.name.trim(),
        email: registerForm.email.trim(),
        password: registerForm.password,
        phonenumber: 9000000000,
      });
      setSuccess("Account created! Sign in below.");
      setAuthModalTab("login");
      setLoginForm({ email: registerForm.email.trim(), password: "" });
      setRegisterForm({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[150] flex items-end justify-center p-4 sm:items-center"
      >
        <button
          type="button"
          aria-label="Close login modal"
          className="absolute inset-0 bg-forest/40 backdrop-blur-sm"
          onClick={closeAuthModal}
        />
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-sand/50 bg-linear-to-b from-cream to-sand/30 p-8 shadow-[0_40px_90px_-28px_rgba(36,52,42,0.25)]"
        >
          <button
            type="button"
            onClick={closeAuthModal}
            className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-sand/50 text-slate-500 transition hover:bg-beige/60 hover:text-espresso"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          <div className="mb-6 flex justify-center">
            <Logo size="sm" />
          </div>

          <h2 className="display-heading text-center text-3xl text-forest">
            Join Glow Skin ✨
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Login to continue your skincare journey.
          </p>

          <div className="mt-6 flex rounded-full border border-sand/40 bg-beige/30 p-1">
            <button
              type="button"
              onClick={() => {
                setAuthModalTab("login");
                setError("");
              }}
              className={`flex-1 rounded-full py-2 text-xs font-medium uppercase tracking-[0.14em] transition ${
                authModalTab === "login"
                  ? "bg-cream text-espresso shadow-sm"
                  : "text-slate-500"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthModalTab("register");
                setError("");
              }}
              className={`flex-1 rounded-full py-2 text-xs font-medium uppercase tracking-[0.14em] transition ${
                authModalTab === "register"
                  ? "bg-cream text-espresso shadow-sm"
                  : "text-slate-500"
              }`}
            >
              Create Account
            </button>
          </div>

          {authModalTab === "login" ? (
            <form onSubmit={handleLogin} className="mt-6 space-y-3">
              <input
                type="email"
                className={inputClass}
                placeholder="Email"
                value={loginForm.email}
                onChange={(e) => setLoginForm((p) => ({ ...p, email: e.target.value }))}
                required
              />
              <input
                type="password"
                className={inputClass}
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => setLoginForm((p) => ({ ...p, password: e.target.value }))}
                required
              />
              {error && (
                <p className="rounded-2xl bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
              )}
              {success && (
                <p className="rounded-2xl bg-beige px-4 py-2 text-sm text-charcoal">{success}</p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Login"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="mt-6 space-y-3">
              <input
                type="text"
                className={inputClass}
                placeholder="Full name"
                value={registerForm.name}
                onChange={(e) => setRegisterForm((p) => ({ ...p, name: e.target.value }))}
                required
              />
              <input
                type="email"
                className={inputClass}
                placeholder="Email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm((p) => ({ ...p, email: e.target.value }))}
                required
              />
              <input
                type="password"
                className={inputClass}
                placeholder="Create password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm((p) => ({ ...p, password: e.target.value }))}
                minLength={6}
                required
              />
              {error && (
                <p className="rounded-2xl bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
              )}
              <Button type="submit" variant="outline" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          )}

          <button
            type="button"
            onClick={closeAuthModal}
            className="mt-4 w-full py-2 text-center text-sm text-slate-500 transition hover:text-charcoal"
          >
            Continue Browsing
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
