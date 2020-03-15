const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "the email is required."],
      unique: [true, "the email already exist."]
    },
    hashedPassword: {
      type: String,
      required: [true, "the password is required."]
    },
    selfie: {
      type: String, // image url
      required: [true, "the selfie is required."]
    },
    role: {
      type: String,
      default: "User", // roles --> User & Admin
      required: [true]
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
