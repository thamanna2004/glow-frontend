import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useLogin } from "../hooks/useAuthMutations";

const isValidEmail = (value) =>
  /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(value);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [fieldError, setFieldError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.successMessage || "";
  const { mutateAsync, isLoading, error } = useLogin();

  const emailValid = useMemo(() => isValidEmail(email), [email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFieldError("");
    setMessage("");

    if (!emailValid) {
      setFieldError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setFieldError("Please enter your password.");
      return;
    }

    try {
      await mutateAsync({ email, password });
      setMessage("Login successful.");
      navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.message || err.message || "Unable to login.");
    }
  };

  return (
    <AuthForm title="Login" description="Enter your credentials to sign in.">
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={email ? (emailValid ? "input-valid" : "input-error") : ""}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={password ? (password.length >= 8 ? "input-valid" : "input-error") : ""}
          />
        </label>
        <button type="button" className="link-button" onClick={() => navigate("/forgot-password")}>Forgot Password?</button>
        <button type="button" className="link-button" onClick={() => navigate("/browse")}>Continue Browsing</button>
        <button type="submit" disabled={isLoading}>{isLoading ? "Signing in..." : "Login"}</button>
      </form>

      {fieldError && <p className="error-message">{fieldError}</p>}
      {(message || successMessage) && (
        <p className="success-message">{message || successMessage}</p>
      )}
      {error && <p className="error-message">{error.response?.data?.message || error.message}</p>}
    </AuthForm>
  );
};

export default Login;
