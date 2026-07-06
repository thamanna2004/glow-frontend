import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useResetPassword } from "../hooks/useAuthMutations";

const getPasswordStrength = (value) => {
  const tests = [
    /[A-Z]/,
    /[a-z]/,
    /[0-9]/,
    /[^A-Za-z0-9]/,
    /^.{10,}$/,
  ];
  return tests.reduce((score, test) => score + Number(test.test(value)), 0);
};

const strengthLabel = (score) => {
  if (score <= 2) return "Weak";
  if (score === 3) return "Fair";
  if (score === 4) return "Strong";
  return "Very Strong";
};

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, phone, otp } = location.state || {};
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [fieldError, setFieldError] = useState("");
  const { mutateAsync, isLoading, error } = useResetPassword();

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  if (!email && !phone && !otp) {
    navigate("/forgot-password");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFieldError("");
    setMessage("");

    if (password.length < 8) {
      setFieldError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setFieldError("Passwords do not match.");
      return;
    }

    if (strength <= 2) {
      setFieldError("Please choose a stronger password.");
      return;
    }

    try {
      await mutateAsync({ email, phone, otp, password, confirmPassword });
      navigate("/login", { state: { successMessage: "Password changed successfully." } });
    } catch (err) {
      setMessage(err.response?.data?.message || err.message || "Unable to reset password.");
    }
  };

  return (
    <AuthForm
      title="Reset Password"
      description="Enter a new password to secure your account."
    >
      <form onSubmit={handleSubmit}>
        <label>
          New Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={password ? (strength > 2 ? "input-valid" : "input-error") : ""}
          />
        </label>
        <div className="password-strength">
          <span>Password strength:</span>
          <strong>{strengthLabel(strength)}</strong>
        </div>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={confirmPassword ? (confirmPassword === password ? "input-valid" : "input-error") : ""}
          />
        </label>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Reset Password"}
        </button>
      </form>

      {fieldError && <p className="error-message">{fieldError}</p>}
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error.response?.data?.message || error.message}</p>}
      <button type="button" className="link-button" onClick={() => navigate("/browse")}>Continue Browsing</button>
    </AuthForm>
  );
};

export default ResetPassword;
