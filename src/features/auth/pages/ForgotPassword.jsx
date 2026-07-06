import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useRequestOtp } from "../hooks/useAuthMutations";

const isValidEmail = (value) =>
  /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(value);

const isValidPhone = (value) =>
  /^\+?[0-9]{7,15}$/.test(value);

const ForgotPassword = () => {
  const [mode, setMode] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [fieldError, setFieldError] = useState("");
  const navigate = useNavigate();
  const { mutateAsync, isLoading, error } = useRequestOtp();

  const emailValid = useMemo(() => isValidEmail(email), [email]);
  const phoneValid = useMemo(() => isValidPhone(phone), [phone]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setFieldError("");

    if (mode === "email" && !emailValid) {
      setFieldError("Please enter a valid email address.");
      return;
    }

    if (mode === "phone" && !phoneValid) {
      setFieldError("Please enter a valid phone number.");
      return;
    }

    const payload = mode === "email" ? { email } : { phone };

    try {
      await mutateAsync(payload);
      setMessage("OTP sent. Check your email or phone.");
      navigate("/verify-otp", {
        state: {
          email,
          phone,
          expiresAt: Date.now() + 5 * 60 * 1000,
        },
      });
    } catch (err) {
      setMessage(err.response?.data?.message || err.message || "Unable to send OTP.");
    }
  };

  return (
    <AuthForm
      title="Forgot Password"
      description="Choose email or phone to receive a reset OTP."
    >
      <div className="toggle-row">
        <button
          type="button"
          className={mode === "email" ? "active" : ""}
          onClick={() => setMode("email")}
        >
          Reset using Email
        </button>
        <button
          type="button"
          className={mode === "phone" ? "active" : ""}
          onClick={() => setMode("phone")}
        >
          Reset using Phone
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {mode === "email" ? (
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
        ) : (
          <label>
            Phone number
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              inputMode="tel"
              className={phone ? (phoneValid ? "input-valid" : "input-error") : ""}
            />
          </label>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>

      {fieldError && <p className="error-message">{fieldError}</p>}
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error.response?.data?.message || error.message}</p>}
      <button type="button" className="link-button" onClick={() => navigate("/browse")}>Continue Browsing</button>
    </AuthForm>
  );
};

export default ForgotPassword;
