"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const SettingsProfileTab = dynamic(() => import("./settings-profile-tab"), {
  loading: () => <TabPanelSkeleton />,
})
const SettingsSecurityTab = dynamic(() => import("./settings-security-tab"), {
  loading: () => <TabPanelSkeleton />,
})
const SettingsPreferencesTab = dynamic(() => import("./settings-preferences-tab"), {
  loading: () => <TabPanelSkeleton />,
})

const tabVariants = {
  hidden: { opacity: 0, y: 10 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.18, ease: "easeOut" },
  },
}

function TabPanelSkeleton() {
  return (
    <div className="bg-card/50 border border-border/50 rounded-3xl p-6 md:p-8 min-h-[320px] animate-pulse">
      <div className="h-8 w-48 rounded-lg bg-secondary/70 mb-6" />
      <div className="space-y-4">
        <div className="h-12 rounded-xl bg-secondary/50" />
        <div className="h-12 rounded-xl bg-secondary/50" />
        <div className="h-12 rounded-xl bg-secondary/50" />
      </div>
    </div>
  )
}

export default function SettingsPageContent() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <React.Fragment>
      <main className="flex-1 w-full overflow-y-auto overflow-x-hidden relative flex flex-col items-center pb-20">
        <div className="absolute top-[5%] right-[-10%] w-[800px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />

        <div className="w-full max-w-4xl p-6 md:p-10 flex flex-col gap-6 relative z-10 pt-12 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-3 font-display">Settings</h1>
            <p className="text-muted-foreground text-sm md:text-base mb-6">Manage your account settings and preferences.</p>
            <Separator className="bg-border" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
              <TabsList className="bg-secondary/50 backdrop-blur-md border border-border p-1 rounded-2xl h-14 mb-8">
                <TabsTrigger
                  value="profile"
                  className="rounded-xl px-6 text-muted-foreground hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md transition-all h-full font-medium"
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="rounded-xl px-6 text-muted-foreground hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md transition-all h-full font-medium"
                >
                  Security
                </TabsTrigger>
                <TabsTrigger
                  value="preferences"
                  className="rounded-xl px-6 text-muted-foreground hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md transition-all h-full font-medium"
                >
                  Preferences
                </TabsTrigger>
              </TabsList>

              <div className="relative min-h-[400px]">
                <AnimatePresence mode="wait">
                  {activeTab === "profile" && (
                    <motion.div
                      key="profile"
                      variants={tabVariants}
                      initial="hidden"
                      animate="enter"
                      exit="exit"
                    >
                      <SettingsProfileTab />
                    </motion.div>
                  )}

                  {activeTab === "security" && (
                    <motion.div
                      key="security"
                      variants={tabVariants}
                      initial="hidden"
                      animate="enter"
                      exit="exit"
                    >
                      <SettingsSecurityTab />
                    </motion.div>
                  )}

                  {activeTab === "preferences" && (
                    <motion.div
                      key="preferences"
                      variants={tabVariants}
                      initial="hidden"
                      animate="enter"
                      exit="exit"
                    >
                      <SettingsPreferencesTab />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </React.Fragment>
  )
}
