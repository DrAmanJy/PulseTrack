"use client"

import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { BarChart2, Flame, Timer, TrendingUp, Activity, CheckCircle2, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const StatsTrendChart = dynamic(() => import("./stats-trend-chart"), {
  ssr: false,
  loading: () => (
    <div className="h-full min-h-[260px] flex items-center justify-center rounded-xl bg-secondary/20 border border-border/40">
      <div className="h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
    </div>
  ),
})

const StatsCategoryChart = dynamic(() => import("./stats-category-chart"), {
  ssr: false,
  loading: () => (
    <div className="h-full min-h-[200px] flex items-center justify-center rounded-xl bg-secondary/20 border border-border/40">
      <div className="h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
    </div>
  ),
})

const summary = [
  {
    label: "7-day volume",
    value: "6.4",
    unit: "hrs",
    hint: "+12% vs prior week",
    icon: Timer,
    accent: "text-primary",
  },
  {
    label: "Completion rate",
    value: "85",
    unit: "%",
    hint: "Goals met this week",
    icon: CheckCircle2,
    accent: "text-indigo-400",
  },
  {
    label: "Total logs",
    value: "24",
    unit: "activities",
    hint: "Across all categories",
    icon: Target,
    accent: "text-orange-400",
  },
  {
    label: "Consistency",
    value: "5.2",
    unit: "days/wk",
    hint: "Days with any activity",
    icon: TrendingUp,
    accent: "text-emerald-400",
  },
]

export default function StatsPageContent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(t)
  }, [])

  if (!mounted) return null

  return (
    <main className="flex-1 w-full overflow-y-auto overflow-x-hidden relative flex flex-col items-center pb-20">
      <div className="absolute top-[8%] right-[-8%] w-[700px] h-[520px] bg-primary/5 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] left-[-8%] w-[560px] h-[480px] bg-primary/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-6xl p-6 md:p-10 flex flex-col gap-8 relative z-10 pt-12 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
              <BarChart2 className="w-6 h-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground font-display">Stats</h1>
          </div>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
            Weekly activity volume and trends. Numbers update as you log activities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {summary.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.35, delay: 0.06 + i * 0.04 }}
                className="h-full"
              >
                <Card className="bg-card/50 backdrop-blur-2xl border-border/50 rounded-3xl shadow-lg h-full hover:border-primary/35 hover:shadow-primary/5 transition-all">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
                    <Icon className={`w-5 h-5 ${s.accent}`} />
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold tracking-tight text-foreground">
                      {s.value}
                      <span className="text-lg font-medium text-muted-foreground ml-1">{s.unit}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">{s.hint}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <Card className="bg-card/50 backdrop-blur-2xl border-border/50 rounded-3xl shadow-xl overflow-hidden col-span-1 lg:col-span-2 flex flex-col">
            <CardHeader className="border-b border-border/40 bg-secondary/10 pb-4">
              <CardTitle className="text-lg font-medium">Activity Volume</CardTitle>
              <p className="text-sm text-muted-foreground font-normal">Track your daily time commitment</p>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <StatsTrendChart />
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-2xl border-border/50 rounded-3xl shadow-xl overflow-hidden col-span-1 flex flex-col">
            <CardHeader className="border-b border-border/40 bg-secondary/10 pb-4">
              <CardTitle className="text-lg font-medium">Category Balance</CardTitle>
              <p className="text-sm text-muted-foreground font-normal">Distribution of efforts</p>
            </CardHeader>
            <CardContent className="flex-1 p-0 pb-4">
              <StatsCategoryChart />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="bg-card/50 backdrop-blur-2xl border-border/50 rounded-3xl shadow-lg hover:border-primary/40 hover:shadow-primary/5 transition-all p-5 col-span-1 md:col-span-2">
            <h3 className="font-semibold text-lg mb-2 tracking-tight">Activity Insights</h3>
            <p className="text-sm text-muted-foreground mb-4">Based on your recent logs, you're maintaining a great balance across categories.</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm">
                <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-500"><TrendingUp className="w-4 h-4" /></div>
                <span>You've spent <span className="font-medium text-foreground">25% more time</span> on Learning this week compared to last week.</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <div className="p-2 rounded-full bg-orange-500/10 text-orange-500"><Flame className="w-4 h-4" /></div>
                <span>Maintained a <span className="font-medium text-foreground">5-day activity streak</span>, matching your all-time best!</span>
              </li>
            </ul>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-2xl border-border/50 rounded-3xl shadow-lg hover:border-primary/40 hover:shadow-primary/5 transition-all p-5 flex flex-col justify-between">
            <h3 className="font-semibold text-lg w-full text-left tracking-tight">Energy Balance</h3>
            <div className="flex flex-col items-center justify-center flex-1">
              <div className="w-24 h-24 rounded-full border-[5px] border-secondary border-t-primary flex items-center justify-center mb-4 relative drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.2)]">
                 <span className="text-2xl font-bold tracking-tight">85%</span>
              </div>
              <p className="text-sm font-medium text-foreground">Stable</p>
              <p className="text-xs text-muted-foreground text-center mt-1">Well distributed workload</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}
