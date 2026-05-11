"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import {
  Activity,
  ArrowRight,
  BarChart2,
  ChevronRight,
  Sparkles,
  Target,
  Zap,
  Flame,
  Shield,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const fadeUp = (reduce, delay = 0) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.45,
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
      }

const features = [
  {
    icon: Activity,
    title: "Live activity",
    description: "Capture sessions in seconds with a flow that stays out of your way.",
  },
  {
    icon: Target,
    title: "Dynamic goals",
    description: "Targets, streaks, and reminders tuned to how you actually track.",
  },
  {
    icon: BarChart2,
    title: "Insight, not noise",
    description: "Trends and weekly load at a glance—no spreadsheet required.",
  },
  {
    icon: Flame,
    title: "Streak Motivation",
    description: "Build momentum with visual streaks that keep you coming back.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your health data is yours. Secure, private, and never sold.",
  },
  {
    icon: Clock,
    title: "Time-zone Smart",
    description: "Travel freely. Your logs automatically adapt to where you are.",
  },
]

export default function Home() {
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Before mount: treat as reduce=true so SSR and first client render match
  const reduce = !mounted || prefersReduced

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground selection:bg-primary/25" suppressHydrationWarning>
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <motion.div
          className="absolute -top-[20%] right-[-15%] h-[min(90vh,720px)] w-[min(90vw,900px)] rounded-full bg-primary/[0.07] blur-[120px]"
          animate={
            reduce
              ? undefined
              : {
                  opacity: [0.45, 0.75, 0.45],
                  scale: [1, 1.04, 1],
                  x: [0, -20, 0],
                }
          }
          transition={reduce ? undefined : { duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-25%] left-[-20%] h-[min(70vh,560px)] w-[min(85vw,700px)] rounded-full bg-indigo-500/[0.06] blur-[110px]"
          animate={
            reduce
              ? undefined
              : {
                  opacity: [0.35, 0.65, 0.35],
                  scale: [1.02, 1, 1.02],
                  y: [0, -30, 0],
                }
          }
          transition={reduce ? undefined : { duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,var(--color-background)_55%,var(--color-background)_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
          style={{
            backgroundImage: `radial-gradient(var(--color-border) 0.5px, transparent 0.5px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Nav */}
      <header className="relative z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 sticky top-0">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <Link href="/" className="group flex items-center gap-2.5">
            <motion.span
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary shadow-[0_0_20px_-4px_var(--color-primary)] group-hover:bg-primary/20 transition-colors"
              whileHover={reduce ? undefined : { scale: 1.05, rotate: -8 }}
              whileTap={reduce ? undefined : { scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <Zap className="h-[18px] w-[18px]" strokeWidth={2.25} />
            </motion.span>
            <span className="font-display text-lg font-semibold tracking-tight">PulseTrack</span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-all hover:-translate-y-[1px]">Features</Link>
            <Link href="#" className="hover:text-foreground transition-all hover:-translate-y-[1px]">Methodology</Link>
            <Link href="#" className="hover:text-foreground transition-all hover:-translate-y-[1px]">Pricing</Link>
          </nav>

          <div className="flex items-center gap-3">
            <motion.div whileHover={reduce ? undefined : { y: -1 }} transition={{ duration: 0.2 }}>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground" asChild>
                <Link href="/signin">Sign in</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={reduce ? undefined : { scale: 1.02 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
              <Button size="sm" className="gap-1.5  px-5 font-medium shadow-[0_4px_14px_0_var(--color-primary)] shadow-primary/20" asChild>
                <Link href="/signup">
                  Get started
                  <ChevronRight className="h-3.5 w-3.5 opacity-80" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative mx-auto max-w-6xl px-5 pb-24 pt-20 md:px-8 md:pb-32 md:pt-28">
          <motion.div
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-md md:text-[13px]"
            {...fadeUp(reduce, 0)}
          >
            <motion.span
              className="relative flex h-2 w-2"
              animate={reduce ? undefined : { scale: [1, 1.15, 1] }}
              transition={reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
            </motion.span>
            Activity tracking, simplified
            <Sparkles className="h-3.5 w-3.5 text-primary/80" />
          </motion.div>

          <div className="max-w-3xl">
            <motion.h1
              className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl md:leading-[1.06]"
              {...fadeUp(reduce, 0.06)}
            >
              Your daily rhythm,
              <span className="block bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent dark:from-white dark:via-zinc-100 dark:to-zinc-400">
                finally in sync.
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
              {...fadeUp(reduce, 0.12)}
            >
              Log activities, chase goals, and read your week at a glance—without drowning in dashboards. Built for
              people who do, not for spreadsheets.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              {...fadeUp(reduce, 0.18)}
            >
              <motion.div
                whileHover={reduce ? undefined : { y: -2, boxShadow: "0 24px 48px -16px color-mix(in oklch, var(--color-primary), transparent 55%)" }}
                whileTap={reduce ? undefined : { scale: 0.99 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
              >
                <Button
                  size="lg"
                  className="h-12 w-full rounded-2xl px-8 text-base shadow-[0_0_28px_-8px_var(--color-primary)] sm:w-auto"
                  asChild
                >
                  <Link href="/signup" className="gap-2">
                    Start free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={reduce ? undefined : { y: -1 }} whileTap={reduce ? undefined : { scale: 0.99 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 w-full rounded-2xl border-border/80 bg-card/40 px-8 text-base backdrop-blur-sm sm:w-auto"
                  asChild
                >
                  <Link href="/dashboard">Open app</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.p
              className="mt-6 text-xs text-muted-foreground/90 md:text-sm"
              {...fadeUp(reduce, 0.24)}
            >
              No credit card for the preview experience. Already have an account?{" "}
              <Link href="/signin" className="font-medium text-foreground underline-offset-4 transition-colors hover:underline">
                Sign in
              </Link>
            </motion.p>
          </div>

          {/* Preview card */}
          <motion.div
            className="relative mt-16 md:mt-20"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute -inset-px rounded-[1.35rem] bg-gradient-to-br from-primary/25 via-border/40 to-transparent opacity-70 blur-sm" />
            <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/60 p-6 shadow-2xl backdrop-blur-2xl md:p-8">
              <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Synced
              </div>
              <div className="grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-end">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">This week</p>
                  <p className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">6.4 hrs</p>
                  <p className="mt-2 text-sm text-muted-foreground">Volume up 12% vs last week</p>
                </div>
                <div className="flex h-24 min-h-0 flex-1 items-end gap-1.5 md:max-w-md md:justify-end">
                  {[40, 65, 48, 82, 55, 70, 52].map((h, i) => (
                    <div key={i} className="flex h-full min-h-0 w-full max-w-[2.25rem] flex-1 flex-col justify-end group/bar">
                      <motion.div
                        suppressHydrationWarning
                        className="w-full rounded-t-md bg-gradient-to-t from-primary/15 to-primary/60 transition-colors group-hover/bar:from-primary/30 group-hover/bar:to-primary"
                        initial={reduce ? false : { height: "0%" }}
                        whileInView={reduce ? undefined : { height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: reduce ? 0 : 0.55,
                          delay: reduce ? 0 : 0.06 + i * 0.05,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        whileHover={reduce ? undefined : { scaleY: 1.08, transformOrigin: "bottom" }}
                        style={reduce ? { height: `${h}%` } : undefined}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <motion.div
                suppressHydrationWarning
                className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={reduce ? undefined : { scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0 }}
              />
              <div className="mt-6 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <motion.span whileHover={{ y: -3, scale: 1.05 }} className="cursor-default rounded-lg border border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400 px-3 py-1.5 font-medium transition-colors">🔥 Streak: 12 days</motion.span>
                <motion.span whileHover={{ y: -3, scale: 1.05 }} className="cursor-default rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 font-medium transition-colors">✓ Goals on track</motion.span>
                <motion.span whileHover={{ y: -3, scale: 1.05 }} className="cursor-default rounded-lg border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 font-medium transition-colors">⚡ Recovery OK</motion.span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-border/40 bg-secondary/20 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <motion.div
              suppressHydrationWarning
              className="mb-12 max-w-2xl"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">Everything you need</h2>
              <p className="mt-3 text-muted-foreground md:text-lg">Polished where it counts—fast everywhere else.</p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-3">
              {features.map((f, i) => {
                const Icon = f.icon
                return (
                  <motion.article
                    suppressHydrationWarning
                    key={f.title}
                    className="group relative rounded-3xl border border-border/50 bg-card/40 p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-card/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)]"
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={reduce ? undefined : { y: -6, scale: 1.01 }}
                  >
                    <motion.div
                      className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border/60 bg-background/80 text-primary shadow-inner"
                      whileHover={reduce ? undefined : { rotate: [0, -4, 4, 0] }}
                      transition={{ duration: 0.45 }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </motion.div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                    <motion.span
                      className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100"
                      initial={false}
                    >
                      Learn more
                      <ArrowRight className="h-3 w-3" />
                    </motion.span>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="border-t border-border/40 py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
          <div className="mx-auto max-w-6xl px-5 text-center md:px-8 relative z-10">
            <motion.div
              suppressHydrationWarning
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl text-foreground">Ready when you are</h2>
              <p className="mx-auto mt-4 max-w-md text-muted-foreground md:text-lg">Create an account in a minute, or jump into the app.</p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="h-12 rounded-2xl px-8 shadow-[0_0_24px_-6px_var(--color-primary)]" asChild>
                  <Link href="/signup">Get started</Link>
                </Button>
                <Button variant="outline" size="lg" className="h-12 rounded-2xl bg-card border-border/60 hover:bg-muted font-medium" asChild>
                  <Link href="/dashboard">Explore dashboard</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Global Footer */}
        <footer className="border-t border-border/40 bg-card/60 backdrop-blur-xl py-12 md:py-16 relative z-10">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <Link href="/" className="group flex items-center gap-2.5 mb-5 inline-flex">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <Zap className="h-[16px] w-[16px]" strokeWidth={2.25} />
                  </span>
                  <span className="font-display text-lg font-semibold tracking-tight">PulseTrack</span>
                </Link>
                <p className="max-w-xs text-sm leading-relaxed text-muted-foreground/80">
                  The unified platform for tracking your activities intelligently without the clutter.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4 text-sm">Product</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Integrations</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Changelog</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4 text-sm">Resources</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Community</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">API Docs</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4 text-sm">Company</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Terms</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-16 sm:mt-20 flex flex-col md:flex-row items-center justify-between border-t border-border/40 pt-8 text-xs text-muted-foreground/60">
              <p suppressHydrationWarning>© {new Date().getFullYear()} PulseTrack Inc. All rights reserved.</p>
              <div className="flex items-center gap-6 mt-4 md:mt-0 font-medium">
                 <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
                 <Link href="#" className="hover:text-foreground transition-colors">GitHub</Link>
                 <Link href="#" className="hover:text-foreground transition-colors">Discord</Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
