"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Plus,
  Activity,
  BookOpen,
  Laptop,
  Brain,
  MoreHorizontal,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  TrendingUp,
  SearchX,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const initialActivities = [
  { id: 1, type: "Fitness", name: "Morning Run", duration: "45 min", metrics: "5.2 km", date: "Today, 6:30 AM" },
  { id: 2, type: "Learning", name: "React Components", duration: "90 min", metrics: "2 modules", date: "Yesterday, 5:00 PM" },
  { id: 3, type: "Productivity", name: "Deep Work", duration: "120 min", metrics: "4 tasks", date: "Wed, 7:00 AM" },
  { id: 4, type: "Fitness", name: "HIIT Session", duration: "45 min", metrics: "420 kcal", date: "Tue, 8:00 AM" },
  { id: 5, type: "Learning", name: "System Design", duration: "60 min", metrics: "3 chapters", date: "Mon, 6:00 PM" },
  { id: 6, type: "Mindfulness", name: "Meditation", duration: "15 min", metrics: "1 session", date: "Sun, 9:00 AM" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.04,
    },
  },
}

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.18 } },
}

export default function ActivitiesPageContent() {
  const [activities, setActivities] = useState(initialActivities)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("All")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(t)
  }, [])

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === "All" || activity.type === filterType
    return matchesSearch && matchesFilter
  })

  const getBadgeColor = (type) => {
    switch (type) {
      case "Fitness":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      case "Learning":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "Productivity":
        return "bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
      case "Mindfulness":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      default:
        return "bg-secondary text-muted-foreground border-border"
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case "Fitness":
        return <Activity className="w-5 h-5 text-emerald-500" />
      case "Learning":
        return <BookOpen className="w-5 h-5 text-blue-500" />
      case "Productivity":
        return <Laptop className="w-5 h-5 text-indigo-500" />
      case "Mindfulness":
        return <Brain className="w-5 h-5 text-purple-500" />
      default:
        return <Activity className="w-5 h-5 text-muted-foreground" />
    }
  }

  const handleDelete = (id) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id))
  }

  if (!mounted) return null

  return (
    <React.Fragment>
      <main className="flex-1 w-full overflow-y-auto overflow-x-hidden relative flex flex-col items-center pb-20">
        <div className="absolute top-[5%] right-[-10%] w-[800px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-[40%] left-[-10%] w-[600px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />

        <div className="w-full max-w-6xl p-6 md:p-10 flex flex-col gap-8 relative z-10 pt-12 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-2 font-display">
                Activity History
              </h1>
              <p className="text-muted-foreground text-sm md:text-base">Review and analyze your past activities.</p>
            </div>

            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 px-6 rounded-2xl shadow-[0_0_20px_var(--color-primary)] hover:shadow-[0_0_30px_var(--color-primary)] transition-all flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Log New Activity
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row gap-4 p-4 rounded-3xl bg-card/60 backdrop-blur-2xl border border-border/60 shadow-xl items-center sticky top-6 z-30"
          >
            <div className="relative flex-1 w-full flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-background/50 border-border/80 rounded-2xl text-base placeholder:text-muted-foreground focus-visible:ring-primary/50 focus-visible:border-primary/50 focus-visible:ring-offset-0 w-full shadow-inner"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="!w-full !h-12 bg-background/50 border-border/80 !rounded-2xl text-base focus:ring-primary/50 focus:ring-offset-0 shadow-inner px-4">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-popover/95 backdrop-blur-3xl border-border/60 rounded-2xl shadow-2xl">
                  <SelectItem value="All" className="focus:bg-secondary/80 focus:text-primary rounded-xl cursor-pointer">
                    All Types
                  </SelectItem>
                  <SelectItem value="Fitness" className="focus:bg-secondary/80 focus:text-primary rounded-xl cursor-pointer">
                    Fitness
                  </SelectItem>
                  <SelectItem value="Learning" className="focus:bg-secondary/80 focus:text-primary rounded-xl cursor-pointer">
                    Learning
                  </SelectItem>
                  <SelectItem value="Productivity" className="focus:bg-secondary/80 focus:text-primary rounded-xl cursor-pointer">
                    Productivity
                  </SelectItem>
                  <SelectItem value="Mindfulness" className="focus:bg-secondary/80 focus:text-primary rounded-xl cursor-pointer">
                    Mindfulness
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] mt-2 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-0" />

            {filteredActivities.length > 0 ? (
              <div className="overflow-x-auto relative z-10 w-full">
                <Table className="w-full min-w-[800px] overflow-hidden">
                  <TableHeader className="bg-muted/80 backdrop-blur-md sticky top-0 z-20">
                    <TableRow className="border-b border-border/50 hover:bg-transparent">
                      <TableHead className="text-muted-foreground font-medium h-14 px-6 text-xs uppercase tracking-wider w-[30%]">
                        Activity & Type
                      </TableHead>
                      <TableHead className="text-muted-foreground font-medium h-14 px-6 text-xs uppercase tracking-wider w-[20%]">
                        Date
                      </TableHead>
                      <TableHead className="text-muted-foreground font-medium h-14 px-6 text-xs uppercase tracking-wider w-[20%]">
                        Duration
                      </TableHead>
                      <TableHead className="text-muted-foreground font-medium h-14 px-6 text-xs uppercase tracking-wider w-[20%]">
                        Metrics
                      </TableHead>
                      <TableHead className="text-right text-muted-foreground font-medium h-14 px-6 text-xs uppercase tracking-wider w-[10%]" />
                    </TableRow>
                  </TableHeader>
                  <motion.tbody
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="divide-y divide-border/30 bg-transparent"
                  >
                    <AnimatePresence>
                      {filteredActivities.map((activity) => (
                        <motion.tr
                          layout
                          key={activity.id}
                          variants={rowVariants}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                          whileHover={{ scale: 1.001 }}
                          className="group transition-all duration-300 relative z-10 border-0 origin-center hover:bg-muted"
                        >
                          <TableCell className="px-6 py-5">
                            <div className="flex items-center gap-5">
                              <div className="w-12 h-12 rounded-2xl bg-background border border-border/80 flex items-center justify-center shadow-inner group-hover:border-primary/50 group-hover:shadow-[0_0_15px_var(--color-primary)] transition-all duration-300">
                                {getIcon(activity.type)}
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <span className="font-semibold text-foreground text-base tracking-tight">{activity.name}</span>
                                <Badge
                                  variant="outline"
                                  className={`w-fit text-[10px] uppercase font-bold tracking-wider px-2 py-0 rounded-md ${getBadgeColor(activity.type)}`}
                                >
                                  {activity.type}
                                </Badge>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-5">
                            <div className="flex items-center gap-2.5 text-muted-foreground font-medium text-sm">
                              <Calendar className="w-4 h-4" />
                              {activity.date}
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-5">
                            <div className="flex items-center gap-2.5 text-muted-foreground font-medium text-sm">
                              <Clock className="w-4 h-4" />
                              {activity.duration}
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-5">
                            <div className="flex items-center gap-2.5 text-muted-foreground font-medium text-sm">
                              <TrendingUp className="w-4 h-4" />
                              {activity.metrics}
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-5 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-10 w-10 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-1 focus-visible:ring-primary"
                                >
                                  <MoreHorizontal className="w-5 h-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="w-48 bg-popover/95 backdrop-blur-3xl border border-border/80 rounded-2xl shadow-2xl p-2 z-50"
                              >
                                <DropdownMenuItem className="flex items-center gap-2.5 cursor-pointer p-3 rounded-xl focus:bg-secondary/80 text-foreground transition-colors">
                                  <Edit2 className="w-4 h-4" />
                                  <span className="font-medium">Edit Activity</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-border/50 my-1" />
                                <DropdownMenuItem
                                  onClick={() => handleDelete(activity.id)}
                                  className="flex items-center gap-2.5 cursor-pointer p-3 rounded-xl focus:bg-destructive/10 text-destructive focus:text-destructive transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span className="font-medium">Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </motion.tbody>
                </Table>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col items-center justify-center py-32 px-4 text-center relative z-10"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-28 h-28 mb-8 relative"
                >
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
                  <div className="w-full h-full bg-card/60 backdrop-blur-xl border border-border/80 rounded-[2rem] flex items-center justify-center relative shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                    <SearchX className="w-12 h-12 text-primary drop-shadow-[0_0_15px_var(--color-primary)]" />
                  </div>
                </motion.div>
                <h3 className="text-3xl font-semibold text-foreground mb-3 tracking-tight font-display">No activities found</h3>
                <p className="text-muted-foreground max-w-md text-base leading-relaxed">
                  We couldn&apos;t track down any activities matching your current filters. Try adjusting your search query or
                  activity type.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setFilterType("All")
                  }}
                  className="mt-8 bg-secondary hover:bg-secondary/80 text-foreground border border-border hover:border-border/80 rounded-xl h-12 px-8 font-medium transition-all shadow-md active:scale-95"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </React.Fragment>
  )
}
