"use client"

import dynamic from "next/dynamic"

const SettingsPageContent = dynamic(() => import("./settings-page-content"), {
  loading: () => <SettingsPageSkeleton />,
})

export default function SettingsPage() {
  return <SettingsPageContent />
}

function SettingsPageSkeleton() {
  return (
    <main className="flex-1 w-full overflow-y-auto p-6 md:p-10 max-w-4xl mx-auto animate-pulse">
      <div className="h-12 w-48 rounded-lg bg-secondary/80 mb-3" />
      <div className="h-4 w-96 rounded-md bg-secondary/60 mb-6" />
      <div className="h-px bg-border/40 mb-8" />
      <div className="h-14 rounded-2xl bg-secondary/50 mb-8 max-w-md" />
      <div className="min-h-[400px] rounded-3xl bg-secondary/40 border border-border/40" />
    </main>
  )
}
