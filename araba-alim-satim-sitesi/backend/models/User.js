const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    ad: { type: String, required: true, trim: true },
    soyad: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      unique: true, 
      required: true, 
      lowercase: true, 
      trim: true 
    },
    password: { 
      type: String, 
      required: true,
      minlength: [6, "Şifre en az 6 karakter olmalıdır!"],
    },
    telefon: { 
      type: String, 
      unique: true, 
      sparse: true, 
      match: [/^\d{10,15}$/, "Geçerli bir telefon numarası girin!"] 
    },
    rol: { 
      type: String, 
      enum: ["user", "admin"], 
      default: "user"
    }
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


userSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id, email: this.email, rol: this.rol }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
