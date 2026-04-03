"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Settings, MapPin, Calendar, Dumbbell, Flame, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const highlights = [
  { label: "Total workouts", value: "124", icon: Dumbbell },
  { label: "Current streak", value: "12 days", icon: Flame },
  { label: "Personal records", value: "8", icon: Award },
]

export default function ProfilePageContent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(t)
  }, [])

  if (!mounted) return null

  return (
    <main className="flex-1 w-full overflow-y-auto overflow-x-hidden relative flex flex-col items-center pb-20">
      <div className="absolute top-[5%] right-[-10%] w-[800px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-3xl p-6 md:p-10 flex flex-col gap-8 relative z-10 pt-12 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-2 font-display">Profile</h1>
            <p className="text-muted-foreground text-sm md:text-base">Your public snapshot and training highlights.</p>
          </div>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-2xl border-border/80 bg-card/50 backdrop-blur-md hover:bg-secondary/80 gap-2 shrink-0"
          >
            <Link href="/settings">
              <Settings className="w-4 h-4" />
              Account settings
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="bg-card/50 backdrop-blur-2xl border-border/50 rounded-3xl shadow-xl overflow-hidden">
            <CardContent className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
              <Avatar className="w-28 h-28 md:w-32 md:h-32 border-2 border-border/80 shadow-lg">
                <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
                <AvatarFallback className="bg-muted text-2xl font-medium">AJ</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">Aman Jy</h2>
                  <p className="text-muted-foreground mt-1">@aman.run — recreational runner &amp; strength training</p>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    San Francisco, CA
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Member since Jan 2025
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                  Training for consistency over PRs. Most weeks: three runs, two lifts, and one recovery day.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {highlights.map((h, i) => {
            const Icon = h.icon
            return (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.12 + i * 0.04 }}
              >
                <Card className="bg-card/40 backdrop-blur-xl border-border/50 rounded-2xl h-full hover:border-primary/30 transition-colors">
                  <CardContent className="p-6 flex flex-col gap-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <p className="text-2xl font-bold text-foreground tracking-tight">{h.value}</p>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{h.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </main>
  )
}
