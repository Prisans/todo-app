import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, UserPlus, Users, ArrowLeft, Productivity, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Avatar from "../components/ui/Avatar";

const SocialPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const people = [
    { id: 1, name: "Prisans Singh", username: "prisans", streak: 12, bio: "Building high-performance apps." },
    { id: 2, name: "Aarav Sharma", username: "aarav_pioneer", streak: 5, bio: "Productivity enthusiast." },
    { id: 3, name: "Isha Gupta", username: "isha_codes", streak: 24, bio: "Consistency is my superpower." },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <nav className="h-16 border-b flex items-center justify-between px-6 sticky top-0 bg-background/80 backdrop-blur-md z-20">
        <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <span className="font-bold">Community</span>
        <div className="w-20" />
      </nav>

      <main className="max-w-4xl mx-auto pt-10 px-6">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold mb-4">Discover High-Achievers</h1>
          <p className="text-muted-foreground text-lg">
            Follow others to stay motivated and see how they master their day.
          </p>
        </header>

        <section className="mb-12">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors w-5 h-5" />
            <Input 
              placeholder="Search by name or @username..." 
              className="pl-12 h-14 rounded-2xl bg-card border shadow-sm group-focus-within:ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6 text-sm font-bold uppercase tracking-widest text-muted-foreground">
            <Users className="w-4 h-4" /> Recommended for you
          </div>
          
          <div className="grid gap-4">
            {people.map((person) => (
              <motion.div 
                key={person.id}
                whileHover={{ scale: 1.01 }}
                className="bg-card border rounded-2xl p-6 flex items-center justify-between shadow-sm group hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  <Avatar name={person.name} size="lg" />
                  <div>
                    <h3 className="font-bold text-lg">{person.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-1">
                      <span>@{person.username}</span>
                      <span className="flex items-center gap-1 text-orange-500 font-bold bg-orange-500/10 px-2 py-0.5 rounded text-[10px]">
                        <Flame className="w-3 h-3" /> {person.streak} DAY STREAK
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{person.bio}</p>
                  </div>
                </div>
                
                <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-white transition-all">
                  <UserPlus className="w-4 h-4 mr-2" /> Follow
                </Button>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SocialPage;
