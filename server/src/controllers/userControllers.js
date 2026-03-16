const userService = require("../services/userService");
const catchAsync = require("../utils/catchAsync");

const searchUsers = catchAsync(async (req, res) => {
  const { q } = req.query;
  const users = await userService.searchUsers(q);
  res.status(200).json({ success: true, data: users });
});

const getProfile = catchAsync(async (req, res) => {
  const { username } = req.params;
  const user = await userService.getUserProfile(username);
  res.status(200).json({ success: true, data: user });
});

const followUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userService.followUser(req.user.id, id);
  res.status(200).json({ success: true, message: "Followed successfully" });
});

const unfollowUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userService.unfollowUser(req.user.id, id);
  res.status(200).json({ success: true, message: "Unfollowed successfully" });
});

const updateProfile = catchAsync(async (req, res) => {
  const user = await userService.updateProfile(req.user.id, req.body);
  res.status(200).json({ success: true, data: user });
});

module.exports = {
  searchUsers,
  getProfile,
  followUser,
  unfollowUser,
  updateProfile
};
