import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Flame, 
  Calendar, 
  Users, 
  UserPlus, 
  Edit3, 
  ArrowLeft,
  Award,
  Circle
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Button from "../components/ui/Button";
import Avatar from "../components/ui/Avatar";
import { cn } from "../lib/utils";

const ProfilePage = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <nav className="h-16 border-b flex items-center justify-between px-6 sticky top-0 bg-background/80 backdrop-blur-md z-20">
        <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <span className="font-bold">Profile</span>
        <div className="w-20" /> {/* Spacer */}
      </nav>

      <main className="max-w-4xl mx-auto pt-10 px-6">
        {/* Profile Card */}
        <section className="mb-12">
          <div className="bg-card border rounded-3xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <Avatar name={user?.name} size="xl" className="border-4 border-primary/10 shadow-lg" />
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h1 className="text-3xl font-extrabold">{user?.name}</h1>
                  <span className="text-muted-foreground font-medium">@{user?.username || "pioneer"}</span>
                </div>
                <p className="text-muted-foreground mb-6 max-w-md">
                  {user?.bio || "Consistency is the key to excellence. Elevating every task with TaskFlow."}
                </p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <Stat label="Followers" value={user?.followers?.length || 0} />
                  <Stat label="Following" value={user?.following?.length || 0} />
                  <Stat label="Tasks Done" value="0" /> {/* Placeholder for total tasks */}
                </div>
              </div>

              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-2">
                <Edit3 className="w-4 h-4" /> Edit Profile
              </Button>
            </div>
          </div>
        </section>

        {/* Productivity & Achievements */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Streak Section */}
          <section>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" /> Productivity Streak
            </h3>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 text-center">
              <div className="text-5xl font-black text-orange-500 mb-2">
                {user?.streak?.current || 0}
              </div>
              <p className="font-bold text-orange-950/70 dark:text-orange-200/70 uppercase tracking-widest text-xs">
                Days in a row
              </p>
              <div className="mt-6 pt-6 border-t border-orange-500/10 flex justify-between text-sm">
                <span className="text-orange-900/60 dark:text-orange-400">Best Streak</span>
                <span className="font-bold text-orange-600">{user?.streak?.max || 0} days</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground text-center italic">
              "Don't break the chain! Complete a task every day to grow your streak."
            </p>
          </section>

          {/* Badges Section */}
          <section>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" /> Achievements
            </h3>
            <div className="bg-card border rounded-2xl p-6 h-[216px] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {user?.badges?.length > 0 ? (
                  user.badges.map((badge) => (
                    <div key={badge} className="flex flex-col items-center p-3 rounded-xl bg-muted/50 border text-center">
                      <Trophy className="w-6 h-6 text-yellow-500 mb-2" />
                      <span className="text-xs font-bold leading-tight">{badge}</span>
                    </div>
                  ))
                ) : (
                    <div className="col-span-2 flex flex-col items-center justify-center py-8 text-muted-foreground">
                        <Circle className="w-8 h-8 opacity-20 mb-3" />
                        <p className="text-sm">Complete tasks to earn badges!</p>
                    </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Edit Profile Placeholder Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-card border rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
            <div className="space-y-4 mb-8 text-center py-8 border-2 border-dashed rounded-2xl">
                <p className="text-muted-foreground">Profile editing functionality coming in next module.</p>
            </div>
            <Button className="w-full" onClick={() => setIsEditing(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="flex flex-col px-4 border-r last:border-0 last:pr-0">
    <span className="text-xl font-bold">{value}</span>
    <span className="text-xs text-muted-foreground uppercase tracking-widest">{label}</span>
  </div>
);

export default ProfilePage;
