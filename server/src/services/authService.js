const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateTokens = (userId) => {
  if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error("Missing JWT configuration. Please check environment variables.");
  }

  const accessToken = jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  });

  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  });

  return { accessToken, refreshToken };
};

const signup = async (userData) => {
  const { email, password, name } = userData;
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  // Generate a basic username from email if not provided
  const baseUsername = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "");
  let username = baseUsername;
  
  // Check if username exists, if so append random numbers
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    username = `${baseUsername}${Math.floor(Math.random() * 1000)}`;
  }

  const user = await User.create({ email, password, name, username });
  const tokens = generateTokens(user._id);

  return { user, ...tokens };
};

const login = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");
  
  if (!user || !(await user.comparePassword(password, user.password))) {
    throw new Error("Invalid email or password");
  }

  const tokens = generateTokens(user._id);
  user.password = undefined; // Remove password from output

  return { user, ...tokens };
};

module.exports = {
  signup,
  login,
  generateTokens,
};
