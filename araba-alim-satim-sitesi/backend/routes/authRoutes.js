const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { ad, soyad, email, password, telefon } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Bu email zaten kayıtlı!" });

    const newUser = new User({ ad, soyad, email, password, telefon });
    await newUser.save();

    res.status(201).json({ message: "✅ Kayıt başarılı!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "⚠️ Sunucu hatası!" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ error: "⚠️ Kullanıcı bulunamadı!" });

    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) return res.status(401).json({ error: "⚠️ Geçersiz şifre!" });

    const token = user.generateJWT();
    res.json({ message: "✅ Giriş başarılı!", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "⚠️ Sunucu hatası!" });
  }
});


router.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Yetkilendirme başarısız!" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Geçersiz token!" });
  }
});

module.exports = router;
