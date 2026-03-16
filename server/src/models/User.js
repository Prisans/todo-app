const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // Don't return password by default
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      sparse: true, // Allow nulls during migration but ensure uniqueness when present
    },
    bio: {
      type: String,
      maxlength: 160,
    },
    avatar: {
      type: String, // URL to image
    },
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    following: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    streak: {
      current: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
      lastDoneDate: { type: Date }
    },
    badges: [{
      type: String,
      enum: ["Early Adopter", "Streak Starter", "Productivity Ninja", "Consistency King"]
    }]
  },
  { timestamps: true }
);

// Index for social searches
userSchema.index({ username: "text", name: "text" });

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
