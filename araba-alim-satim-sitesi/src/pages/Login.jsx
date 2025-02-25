import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.error || "Giriş sırasında hata oluştu.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Giriş Yap</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Email adresiniz" 
            required 
          />
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            placeholder="Şifreniz" 
            required 
          />
          <button type="submit">Giriş Yap</button>
        </form>
        
        <div className="links">
          <a href="/register">Hesabınız yok mu? Kayıt olun</a>
          <a href="/forgot-password">Şifremi Unuttum</a>
        </div>
      </div>
    </div>
  );
}
