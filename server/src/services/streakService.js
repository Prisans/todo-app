const User = require("../models/User");

const updateUserStreak = async (userId) => {
  const user = await User.findById(userId);
  if (!user) return;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const lastDone = user.streak.lastDoneDate ? 
    new Date(user.streak.lastDoneDate.getFullYear(), user.streak.lastDoneDate.getMonth(), user.streak.lastDoneDate.getDate()) 
    : null;

  // Already completed a task today, no need to update streak count
  if (lastDone && lastDone.getTime() === today.getTime()) {
    return user;
  }

  // Check if yesterday
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  let newStreak = 1;
  if (lastDone && lastDone.getTime() === yesterday.getTime()) {
    newStreak = user.streak.current + 1;
  }

  const maxStreak = Math.max(newStreak, user.streak.max);
  
  // Award badges
  const newBadges = [...user.badges];
  if (newStreak === 1 && !newBadges.includes("Streak Starter")) {
    newBadges.push("Streak Starter");
  }
  if (newStreak === 7 && !newBadges.includes("Consistency King")) {
    newBadges.push("Consistency King");
  }
  if (newStreak === 30 && !newBadges.includes("Productivity Ninja")) {
    newBadges.push("Productivity Ninja");
  }

  return await User.findByIdAndUpdate(userId, {
    "streak.current": newStreak,
    "streak.max": maxStreak,
    "streak.lastDoneDate": now,
    badges: newBadges
  }, { new: true });
};

module.exports = { updateUserStreak };
