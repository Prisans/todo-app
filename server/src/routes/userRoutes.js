const express = require("express");
const { 
  searchUsers, 
  getProfile, 
  followUser, 
  unfollowUser, 
  updateProfile 
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/search", searchUsers);
router.get("/profile/:username", getProfile);
router.patch("/profile", updateProfile);
router.post("/follow/:id", followUser);
router.post("/unfollow/:id", unfollowUser);

module.exports = router;
