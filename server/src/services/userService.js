const User = require("../models/User");

const getUserProfile = async (username) => {
  const user = await User.findOne({ username })
    .populate("followers", "name username avatar")
    .populate("following", "name username avatar");
  
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const searchUsers = async (query) => {
  return await User.find({
    $or: [
      { username: { $regex: query, $options: "i" } },
      { name: { $regex: query, $options: "i" } }
    ]
  }).select("name username avatar bio streak").limit(10);
};

const followUser = async (currentUserId, targetId) => {
  if (currentUserId.toString() === targetId.toString()) {
    throw new Error("You cannot follow yourself");
  }

  const targetUser = await User.findById(targetId);
  if (!targetUser) throw new Error("User not found");

  // Add to following
  await User.findByIdAndUpdate(currentUserId, {
    $addToSet: { following: targetId }
  });

  // Add to followers
  await User.findByIdAndUpdate(targetId, {
    $addToSet: { followers: currentUserId }
  });

  return { success: true };
};

const unfollowUser = async (currentUserId, targetId) => {
  await User.findByIdAndUpdate(currentUserId, {
    $pull: { following: targetId }
  });

  await User.findByIdAndUpdate(targetId, {
    $pull: { followers: currentUserId }
  });

  return { success: true };
};

const updateProfile = async (userId, updateData) => {
    // Only allow specific fields
    const allowedFields = ["name", "bio", "avatar", "username"];
    const filteredUpdate = {};
    
    Object.keys(updateData).forEach(key => {
        if(allowedFields.includes(key)) filteredUpdate[key] = updateData[key];
    });

    if (filteredUpdate.username) {
        const existing = await User.findOne({ 
            username: filteredUpdate.username, 
            _id: { $ne: userId } 
        });
        if (existing) throw new Error("Username already taken");
    }

    return await User.findByIdAndUpdate(userId, filteredUpdate, { 
        new: true, 
        runValidators: true 
    });
};

module.exports = {
  getUserProfile,
  searchUsers,
  followUser,
  unfollowUser,
  updateProfile
};
