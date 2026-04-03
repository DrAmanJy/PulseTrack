'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, User, Home, BarChart2, Zap, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  const navItems = [
    { id: 'dashboard', path: '/dashboard', icon: Home },
    { id: 'activities', path: '/activities', icon: Activity },
    { id: 'goals', path: '/goals', icon: Target },
    { id: 'stats', path: '/stats', icon: BarChart2 },
    // { id: "profile", path: "/profile", icon: User },
  ];

  if (!mounted) return null;

  return (
    <div className="h-screen w-full max-w-[100vw] bg-background text-foreground flex overflow-hidden selection:bg-primary/30 font-sans [&_*::-webkit-scrollbar]:w-2 [&_*::-webkit-scrollbar-track]:bg-transparent [&_*::-webkit-scrollbar-thumb]:bg-primary/20 hover:[&_*::-webkit-scrollbar-thumb]:bg-primary/40 [&_*::-webkit-scrollbar-thumb]:rounded-full">
      <motion.nav
        initial={{ x: -24, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28, delay: 0.05 }}
        className="w-24 pl-6 py-6 flex flex-col justify-between hidden md:flex shrink-0 relative z-20"
      >
        <div className="flex flex-col items-center gap-8 h-full bg-card/40 backdrop-blur-2xl border border-border/60 rounded-3xl py-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-border/50 to-transparent pointer-events-none" />

          <motion.div
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-primary mb-6 h-12 w-12 flex items-center justify-center bg-primary/10 border border-primary/20 rounded-2xl shadow-[0_0_20px_var(--color-primary)] relative z-10 cursor-pointer"
            onClick={() => router.push('/dashboard')}
          >
            <Zap className="h-6 w-6" />
          </motion.div>

          <div className="flex flex-col gap-6 w-full items-center relative z-10">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname.startsWith(item.path) || (pathname === '/' && item.id === 'dashboard');
              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.path)}
                  className={`relative p-3 rounded-2xl transition-all duration-300 z-10 w-14 h-14 flex flex-col items-center justify-center group ${isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <motion.div
                    animate={isActive ? { scale: 1.06 } : { scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                  >
                    <Icon
                      className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </motion.div>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-secondary/60 rounded-2xl -z-10 shadow-[0_0_25px_var(--color-primary)] ring-1 ring-primary/20 backdrop-blur-md border border-border/50"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => router.push('/settings')}
            className={`mt-auto p-4 transition-colors relative z-10 hover:bg-secondary/50 rounded-2xl ${pathname.startsWith('/settings') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Settings className="w-6 h-6 group-hover:rotate-45 transition-transform" />
          </button>
        </div>
      </motion.nav>

      {children}
    </div>
  );
}
