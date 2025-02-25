import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({ ad: "", soyad: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.error || "Bir hata oluştu.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Kayıt Ol</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="ad" value={formData.ad} onChange={handleChange} placeholder="Adınız" required />
          <input type="text" name="soyad" value={formData.soyad} onChange={handleChange} placeholder="Soyadınız" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email adresiniz" required />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Şifreniz" required />
          <button type="submit">Kayıt Ol</button>
        </form>
      </div>
    </div>
  );
}
