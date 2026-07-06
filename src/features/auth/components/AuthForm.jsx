import React from "react";

const AuthForm = ({ children, title, description }) => (
  <div className="auth-form-container">
    <div className="auth-form-card">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {children}
    </div>
  </div>
);

export default AuthForm;
