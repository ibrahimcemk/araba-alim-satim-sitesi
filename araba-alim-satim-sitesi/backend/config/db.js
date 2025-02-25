const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); 
    console.log("✅ [MongoDB] Veritabanına başarılı şekilde bağlanıldı!");
  } catch (error) {
    console.error("❌ [MongoDB] Bağlantı hatası:", error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
