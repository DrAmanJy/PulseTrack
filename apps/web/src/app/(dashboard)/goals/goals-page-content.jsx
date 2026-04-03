"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Target, Plus, Calendar, CheckCircle2, CircleDashed, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const goals = [
  {
    id: 1,
    title: "Weekly cardio",
    description: "150 active minutes per week",
    current: 118,
    target: 150,
    unit: "min",
    due: "Ends Sun",
    status: "active",
    category: "Fitness",
    streak: "3 weeks",
  },
  {
    id: 2,
    title: "Learn React",
    description: "Complete 4 modules this month",
    current: 3,
    target: 4,
    unit: "modules",
    due: "Apr 30",
    status: "active",
    category: "Learning",
    streak: "1 month",
  },
  {
    id: 3,
    title: "Deep Work Blocks",
    description: "80 hours of focused work",
    current: 42,
    target: 80,
    unit: "hrs",
    due: "Apr 30",
    status: "active",
    category: "Productivity",
    streak: "New",
  },
  {
    id: 4,
    title: "Morning Routine",
    description: "Meditate before 8 AM for 20 days",
    current: 20,
    target: 20,
    unit: "days",
    due: "Completed",
    status: "completed",
    category: "Mindfulness",
    streak: "20 days",
  },
]

function ProgressBar({ value, max }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="h-2.5 rounded-full bg-secondary/80 overflow-hidden border border-border/40">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-primary to-indigo-500"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

export default function GoalsPageContent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(t)
  }, [])

  if (!mounted) return null

  return (
    <main className="flex-1 w-full overflow-y-auto overflow-x-hidden relative flex flex-col items-center pb-20">
      <div className="absolute top-[5%] right-[-10%] w-[800px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[15%] left-[-10%] w-[600px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-6xl p-6 md:p-10 flex flex-col gap-8 relative z-10 pt-12 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-2 font-display">Goals</h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl">
              Track targets that matter. Adjust anytime as your training evolves.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 px-6 rounded-2xl shadow-[0_0_20px_var(--color-primary)] transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New goal
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {goals.map((g, i) => {
            const isDone = g.status === "completed"
            return (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.35, delay: 0.08 + i * 0.04 }}
                className="h-full"
              >
                <Card className="bg-card/50 backdrop-blur-2xl border-border/50 rounded-3xl shadow-xl overflow-hidden hover:border-primary/40 hover:shadow-primary/5 transition-all h-full flex flex-col justify-between">
                  <CardHeader className="pb-2 flex flex-row items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold tracking-tight">{g.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{g.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-[10px] uppercase tracking-wider bg-secondary/50 font-semibold px-2 py-0 border-none">
                            {g.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-orange-500" />
                            {g.streak} streak
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        isDone
                          ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/10"
                          : "border-border/60 text-muted-foreground"
                      }
                    >
                      {isDone ? "Done" : "Active"}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Progress
                        <span className="text-foreground font-medium ml-2">
                          {g.current} / {g.target} {g.unit}
                        </span>
                      </span>
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {g.due}
                      </span>
                    </div>
                    {!isDone && <ProgressBar value={g.current} max={g.target} />}
                    {isDone && (
                      <div className="flex items-center gap-2 text-emerald-500 text-sm font-medium">
                        <CircleDashed className="w-4 h-4" />
                        Streak unlocked — set a new goal to keep momentum.
                      </div>
                    )}
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
