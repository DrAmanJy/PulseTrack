"use client"

import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import {
  Activity,
  Flame,
  Dumbbell,
  TrendingUp,
  User,
  Bell,
  Clock,
  Play,
  Pause,
  Square,
  Timer,
  BookOpen,
  Laptop,
  Brain,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



const recentActivities = [
  { id: 1, category: "Fitness", type: "HIIT Session", duration: "45 min", date: "Today, 8:00 AM", status: "Completed" },
  { id: 2, category: "Learning", type: "React Course", duration: "90 min", date: "Yesterday, 6:30 PM", status: "Completed" },
  { id: 3, category: "Productivity", type: "Deep Work", duration: "120 min", date: "Wed, 9:00 AM", status: "Completed" },
  { id: 4, category: "Mindfulness", type: "Meditation", duration: "15 min", date: "Tue, 6:00 PM", status: "Completed" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function DashboardPageContent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(t)
  }, [])

  if (!mounted) return null

  return (
    <React.Fragment>
      <main className="flex-1 p-6 md:p-8 md:pl-8 overflow-x-hidden overflow-y-auto w-full relative">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-[-10%] left-[10%] w-[600px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          className="flex justify-between items-end mb-10 mt-2"
        >
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-2 font-display">Overview</h1>
            <p className="text-muted-foreground font-medium text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
              Live activity tracking active
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <button className="relative p-3 rounded-full bg-secondary/50 text-muted-foreground hover:text-foreground border border-border/80 hover:border-border transition-all shadow-sm backdrop-blur-md">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-background" />
            </button>
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary via-indigo-500 to-purple-500 p-[2px] shadow-[0_0_20px_var(--color-primary)] cursor-pointer hover:shadow-[0_0_25px_var(--color-primary)] transition-shadow duration-300">
              <div className="w-full h-full bg-card rounded-full flex items-center justify-center overflow-hidden border border-border">
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Activities"
              value={<Counter value={124} />}
              icon={<Activity className="w-5 h-5 text-indigo-500" />}
              trend="+12% this month"
              gradient="from-indigo-500/10 to-transparent"
              borderAccent="focus-within:border-indigo-500/30 hover:border-indigo-500/40"
              shadowColor="rgba(99, 102, 241, 0.15)"
            />
            <StatCard
              title="Active Minutes"
              value={<Counter value={840} />}
              icon={<Activity className="w-5 h-5 text-primary" />}
              trend="+2.5 hrs vs last week"
              gradient="from-primary/10 to-transparent"
              borderAccent="hover:border-primary/40"
              shadowColor="var(--color-primary)"
            />
            <StatCard
              title="Current Streak"
              value={
                <>
                  <Counter value={12} />{" "}
                  <span className="text-2xl text-muted-foreground align-baseline ml-1">days</span>
                </>
              }
              icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
              trend="Personal best: 21 days"
              gradient="from-emerald-500/10 to-transparent"
              borderAccent="hover:border-emerald-500/40"
              shadowColor="rgba(16, 185, 129, 0.15)"
            />
          </div>

          <motion.div variants={itemVariants}>
            <LiveActivityTracker />
          </motion.div>

          <motion.div variants={itemVariants} className="pb-10">
            <Card className="bg-card/60 backdrop-blur-2xl border-border/50 shadow-2xl group hover:border-border/80 transition-all duration-500 rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-transparent pointer-events-none" />
              <CardHeader className="pb-5 relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-500" />
                    Recent Activities
                  </CardTitle>
                  <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors hover:underline underline-offset-4">
                    View Complete Log
                  </button>
                </div>
              </CardHeader>
              <CardContent className="p-0 sm:p-6 sm:pt-0 relative z-10 w-full">
                <div className="overflow-hidden rounded-2xl border border-border/40 bg-secondary/30 w-full">
                  <Table className="w-full">
                    <TableHeader className="bg-muted/80 backdrop-blur-md">
                      <TableRow className="border-b border-border/50 hover:bg-transparent">
                        <TableHead className="text-muted-foreground font-medium h-12 py-3 px-6 text-xs uppercase tracking-wider">
                          Activity Type
                        </TableHead>
                        <TableHead className="text-muted-foreground font-medium h-12 py-3 px-6 text-xs uppercase tracking-wider">
                          Duration
                        </TableHead>
                        <TableHead className="text-muted-foreground font-medium h-12 py-3 px-6 text-xs uppercase tracking-wider text-right">
                          Timestamp
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentActivities.map((activity, index) => (
                        <motion.tr
                          key={activity.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.01 + index * 0.045,
                            duration: 0.6,
                            ease: "easeOut",
                          }}
                          whileHover={{
                            backgroundColor: "rgba(39, 39, 42, 0.2)",
                            boxShadow: "inset 0 0 0 1px var(--color-primary)",
                          }}
                          className="border-b border-border/30 last:border-0 cursor-pointer origin-center transition-all duration-300 hover:bg-muted/30"
                        >
                          <TableCell className="font-medium text-foreground py-4 px-6 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground shadow-inner group-hover/row:border-primary transition-colors">
                              {activity.category === "Fitness" ? (
                                <Activity className="w-5 h-5 text-emerald-500" />
                              ) : activity.category === "Learning" ? (
                                <BookOpen className="w-5 h-5 text-blue-500" />
                              ) : activity.category === "Productivity" ? (
                                <Laptop className="w-5 h-5 text-indigo-500" />
                              ) : (
                                <Brain className="w-5 h-5 text-purple-500" />
                              )}
                            </div>
                            <span className="font-semibold tracking-tight">{activity.type}</span>
                          </TableCell>
                          <TableCell className="text-muted-foreground py-4 px-6 font-medium">
                            {activity.duration}
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground py-4 px-6 font-medium text-sm">
                            {activity.date}
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </React.Fragment>
  )
}

function StatCard({ title, value, icon, trend, gradient, borderAccent, shadowColor }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      whileHover={{
        y: -4,
        boxShadow: `0 20px 40px -10px ${shadowColor}`,
      }}
      className={`relative group overflow-hidden rounded-3xl bg-card/60 backdrop-blur-2xl border border-border/50 shadow-lg transition-all duration-500 ${borderAccent}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out`}
      />
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2 group-hover:bg-white/10 transition-colors duration-500" />

      <div className="p-7 relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-6">
          <p className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">{title}</p>
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="p-3 rounded-2xl bg-background border border-border/80 shadow-md backdrop-blur-md relative overflow-hidden group-hover:border-border transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            <div className="relative z-10">{icon}</div>
          </motion.div>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-foreground mb-2 tracking-tighter flex items-baseline drop-shadow-md">
            {value}
          </h3>
          <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors" />
            {trend}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function Counter({ value }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let current = 0
    const duration = 1100
    const startTime = performance.now()

    const updateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime
      if (elapsedTime < duration) {
        const progress =
          elapsedTime === duration ? 1 : 1 - Math.pow(2, (-10 * elapsedTime) / duration)
        current = Math.floor(progress * value)
        setCount(current)
        requestAnimationFrame(updateCounter)
      } else {
        setCount(value)
      }
    }

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(updateCounter)
    }, 120)

    return () => clearTimeout(timeoutId)
  }, [value])

  return <span>{count}</span>
}

function LiveActivityTracker() {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [time, setTime] = useState(0)

  useEffect(() => {
    let interval = null
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((t) => t + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, isPaused])

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(false)
  }

  const handlePauseResume = () => {
    setIsPaused(!isPaused)
  }

  const handleStop = () => {
    setIsActive(false)
    setTime(0)
  }

  const formatTime = (totalSeconds) => {
    const getSeconds = `0${totalSeconds % 60}`.slice(-2)
    const minutes = Math.floor(totalSeconds / 60)
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(totalSeconds / 3600)}`.slice(-2)
    return `${getHours}:${getMinutes}:${getSeconds}`
  }

  return (
    <Card className="bg-card/60 backdrop-blur-2xl border-border/50 shadow-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 group rounded-3xl">
      <CardHeader className="pb-4 border-b border-border/40 bg-secondary/10 relative z-10">
        <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
          <Timer className="w-5 h-5 text-emerald-500 animate-pulse" />
          Live Activity Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-10 pb-12 flex flex-col items-center justify-center relative z-10 h-[340px]">
        <div className="text-7xl md:text-[6rem] font-black tracking-tighter tabular-nums mb-10 font-display bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent drop-shadow-sm">
          {formatTime(time)}
        </div>
        <div className="flex items-center gap-6">
          {!isActive && (
            <button
              onClick={handleStart}
              className="h-16 px-10 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-lg flex items-center gap-3 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              <Play className="w-6 h-6 fill-current" />
              Start Activity
            </button>
          )}
          {isActive && (
            <>
              <button
                onClick={handlePauseResume}
                className="w-16 h-16 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center text-foreground transition-colors border border-border shadow-md"
              >
                {isPaused ? <Play className="w-7 h-7 fill-current ml-1" /> : <Pause className="w-7 h-7 fill-current" />}
              </button>
              <button
                onClick={handleStop}
                className="w-16 h-16 rounded-full bg-destructive/10 hover:bg-destructive/20 flex items-center justify-center text-destructive transition-colors border border-destructive/30 shadow-md"
              >
                <Square className="w-6 h-6 fill-current" />
              </button>
            </>
          )}
        </div>
        <p className="mt-8 text-sm text-muted-foreground font-medium">
          {isActive ? (isPaused ? "Activity Paused" : "Tracking Activity...") : "Ready to Start"}
        </p>
      </CardContent>
    </Card>
  )
}
