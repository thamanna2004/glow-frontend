import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { loginUser, registerUser } from "../features/auth/api/authApi";
import { useAuth } from "../features/auth/hooks/useAuth";

const inputClass =
  "w-full rounded-full border border-ice-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-ice-300";

export default function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError("");
    setRegisterSuccess("");

    if (!loginForm.email || !loginForm.password) {
      setLoginError("Please enter your email and password.");
      return;
    }

    setLoginLoading(true);
    try {
      const data = await loginUser({
        email: loginForm.email.trim(),
        password: loginForm.password,
      });
      login(data);
      const role = data.user?.role;
      navigate(role === "admin" ? "/admin/dashboard" : "/account");
    } catch (error) {
      setLoginError(error.message || "Login failed. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");

    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      setRegisterError("Please fill in all fields.");
      return;
    }

    if (registerForm.password.length < 6) {
      setRegisterError("Password must be at least 6 characters.");
      return;
    }

    setRegisterLoading(true);
    try {
      await registerUser({
        name: registerForm.name.trim(),
        email: registerForm.email.trim(),
        password: registerForm.password,
        phonenumber: 9000000000,
      });
      setRegisterSuccess("Account created! You can sign in now.");
      setLoginForm({
        email: registerForm.email.trim(),
        password: "",
      });
      setRegisterForm({ name: "", email: "", password: "" });
    } catch (error) {
      setRegisterError(error.message || "Registration failed. Please try again.");
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-4xl pb-10">
      <div className="grid gap-6 lg:grid-cols-2">
        <form
          onSubmit={handleLogin}
          className="rounded-[26px] border border-ice-200/50 glass-panel p-6"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Welcome Back</p>
          <h1 className="display-heading mt-2 text-5xl text-navy-900">Login</h1>

          <div className="mt-6 space-y-3">
            <input
              type="email"
              className={inputClass}
              placeholder="Email"
              value={loginForm.email}
              onChange={(event) =>
                setLoginForm((prev) => ({ ...prev, email: event.target.value }))
              }
              required
            />
            <input
              type="password"
              className={inputClass}
              placeholder="Password"
              value={loginForm.password}
              onChange={(event) =>
                setLoginForm((prev) => ({ ...prev, password: event.target.value }))
              }
              required
            />
          </div>

          {loginError && (
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-2 text-sm text-red-600">
              {loginError}
            </p>
          )}
          {registerSuccess && (
            <p className="mt-4 rounded-2xl bg-ice-50 px-4 py-2 text-sm text-navy-900">
              {registerSuccess}
            </p>
          )}

          <Button type="submit" className="mt-5 w-full" disabled={loginLoading}>
            {loginLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <form
          onSubmit={handleRegister}
          className="rounded-[26px] border border-ice-200/50 glass-panel p-6"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Join Glow Skin</p>
          <h2 className="display-heading mt-2 text-5xl text-navy-900">Register</h2>

          <div className="mt-6 space-y-3">
            <input
              type="text"
              className={inputClass}
              placeholder="Full name"
              value={registerForm.name}
              onChange={(event) =>
                setRegisterForm((prev) => ({ ...prev, name: event.target.value }))
              }
              required
            />
            <input
              type="email"
              className={inputClass}
              placeholder="Email"
              value={registerForm.email}
              onChange={(event) =>
                setRegisterForm((prev) => ({ ...prev, email: event.target.value }))
              }
              required
            />
            <input
              type="password"
              className={inputClass}
              placeholder="Create password"
              value={registerForm.password}
              onChange={(event) =>
                setRegisterForm((prev) => ({ ...prev, password: event.target.value }))
              }
              minLength={6}
              required
            />
          </div>

          {registerError && (
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-2 text-sm text-red-600">
              {registerError}
            </p>
          )}

          <Button
            type="submit"
            variant="outline"
            className="mt-5 w-full"
            disabled={registerLoading}
          >
            {registerLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
      </div>
    </section>
  );
}
