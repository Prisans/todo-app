import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Layout, Zap, Users, Shield, ArrowRight, Github } from "lucide-react";
import Button from "../components/ui/Button";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <CheckCircle2 className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">TaskFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
          <div className="container mx-auto max-w-6xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text">
                Master your day with <br />
                <span className="text-primary">Intelligence & Speed</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                Experience the next generation of task management. Built for high-performance teams and individuals who demand excellence.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base">
                    Start Productivity Now <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center">
                        <Users className="w-3 h-3" />
                      </div>
                    ))}
                  </span>
                  <span className="ml-2">Trusted by 2,000+ achievers</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Layout className="text-primary" />}
                title="Kanban Visualization"
                description="Manage tasks with an intuitive drag-and-drop system designed for flow."
              />
              <FeatureCard 
                icon={<Zap className="text-primary" />}
                title="Optimistic Execution"
                description="Zero latency updates. Your interface stays ahead of your connection."
              />
              <FeatureCard 
                icon={<Shield className="text-primary" />}
                title="Enterprise Security"
                description="Production-grade JWT authentication with secure session persistence."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 text-center">
          <div className="container mx-auto max-w-4xl bg-primary/10 rounded-3xl p-12 lg:p-20 border border-primary/20">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to transform your workflow?</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Join the thousands who have already taken control of their productivity with TaskFlow.
            </p>
            <Link to="/signup">
              <Button size="lg" className="h-12 px-10">Get TaskFlow Free</Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>&copy; 2026 TaskFlow. Elevate every task.</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-foreground transition-colors">
              <Github className="w-4 h-4" /> Source
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 rounded-2xl bg-card border shadow-sm"
  >
    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </motion.div>
);

export default LandingPage;
