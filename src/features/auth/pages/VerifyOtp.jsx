import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useRequestOtp, useVerifyOtp } from "../hooks/useAuthMutations";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, phone, expiresAt } = location.state || {};
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [expiryTimer, setExpiryTimer] = useState(() => {
    if (!expiresAt) return 0;
    return Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
  });
  const { mutateAsync, isLoading, error } = useVerifyOtp();
  const { mutateAsync: resendOtp, isLoading: isResending } = useRequestOtp();

  useEffect(() => {
    if (!email && !phone) {
      navigate("/forgot-password");
    }
  }, [email, phone, navigate]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const timeout = setTimeout(() => setResendTimer((time) => time - 1), 1000);
    return () => clearTimeout(timeout);
  }, [resendTimer]);

  useEffect(() => {
    if (expiryTimer <= 0) return;
    const timeout = setTimeout(() => setExpiryTimer((seconds) => Math.max(0, seconds - 1)), 1000);
    return () => clearTimeout(timeout);
  }, [expiryTimer]);

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setMessage("");

    try {
      await resendOtp(email ? { email } : { phone });
      setMessage("OTP resent. Check your email or phone.");
      setResendTimer(60);
      setExpiryTimer(5 * 60);
    } catch (err) {
      setMessage(err.response?.data?.message || err.message || "Unable to resend OTP.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      await mutateAsync({ email, phone, otp });
      navigate("/reset-password", { state: { email, phone, otp } });
    } catch (err) {
      setMessage(err.response?.data?.message || err.message || "Unable to verify OTP.");
    }
  };

  return (
    <AuthForm title="Verify OTP" description="Enter the 6-digit code we sent.">
      <form onSubmit={handleSubmit}>
        <label>
          OTP
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            required
            maxLength={6}
            inputMode="numeric"
          />
        </label>

        <button type="submit" disabled={isLoading || otp.length !== 6}>
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      <div className="resend-row">
        <button
          type="button"
          className="link-button"
          disabled={resendTimer > 0 || isResending}
          onClick={handleResend}
        >
          {resendTimer > 0
            ? `Resend OTP in ${resendTimer}s`
            : isResending
            ? "Resending..."
            : "Resend OTP"}
        </button>
      </div>

      <div className="otp-expiry">
        {expiryTimer > 0 ? (
          <p>OTP expires in {Math.floor(expiryTimer / 60)}:{String(expiryTimer % 60).padStart(2, "0")}</p>
        ) : (
          <p className="error-message">OTP has expired. Please resend to get a new code.</p>
        )}
      </div>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error.response?.data?.message || error.message}</p>}
      <button type="button" className="link-button" onClick={() => navigate("/browse")}>Continue Browsing</button>
    </AuthForm>
  );
};

export default VerifyOtp;
