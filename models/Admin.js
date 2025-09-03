const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true } // Plaintext for now (use bcrypt in production)
});

module.exports = mongoose.model("Admin", adminSchema);