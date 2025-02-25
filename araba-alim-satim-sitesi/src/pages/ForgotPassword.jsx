import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.error || "Bir hata oluştu.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Şifremi Unuttum</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email adresiniz" required />
          <button type="submit">Gönder</button>
        </form>
      </div>
    </div>
  );
}
