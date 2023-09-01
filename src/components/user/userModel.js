const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    theme: {
      type: String,
      default: "light",
      enum: ["light", "dark", "pink", "orange"],
    },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
