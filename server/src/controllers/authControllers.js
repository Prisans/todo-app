const authService = require("../services/authService");
const catchAsync = require("../utils/catchAsync");

const signup = catchAsync(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.signup(req.body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(201).json({
    success: true,
    data: { user, accessToken },
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await authService.login(email, password);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    success: true,
    data: { user, accessToken },
  });
});

const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

module.exports = {
  signup,
  login,
  logout,
};
