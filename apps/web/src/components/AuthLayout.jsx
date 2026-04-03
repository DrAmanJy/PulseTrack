'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AuthLayout({ children }) {
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-background p-6 text-foreground transition-colors duration-300 md:p-10">
      {/* Light Mode Premium Background Image */}
      <div className="absolute inset-0 z-0 dark:hidden">
        <Image 
          src="/bg-premium-light.png" 
          alt="Abstract Light Background" 
          fill 
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-background/5" />
      </div>

      {/* Dark Mode Premium Background Image */}
      <div className="absolute inset-0 z-0 hidden dark:block">
        <Image 
          src="/bg-premium.png" 
          alt="Abstract Dark Background" 
          fill 
          priority
          className="object-cover opacity-70 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-background/10" />
      </div>

      {/* Main Content wrapper */}
      <div className="relative z-10 w-full max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="rounded-2xl border bg-background/60 shadow-2xl backdrop-blur-2xl transition-colors duration-300 dark:border-white/10 dark:bg-black/40"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
