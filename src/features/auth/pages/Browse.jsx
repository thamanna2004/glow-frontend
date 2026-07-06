import { useNavigate } from "react-router-dom";

const Browse = () => {
  const navigate = useNavigate();

  return (
    <main className="auth-page">
      <section className="auth-form-card">
        <h2>Continue Browsing</h2>
        <p>Explore Glow Skin and come back anytime to reset your password.</p>
        <button type="button" onClick={() => navigate("/login")}>Go to Login</button>
      </section>
    </main>
  );
};

export default Browse;
