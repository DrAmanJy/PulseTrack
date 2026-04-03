"use client"

import dynamic from "next/dynamic"

const ActivitiesPageContent = dynamic(() => import("./activities-page-content"), {
  loading: () => <ActivitiesPageSkeleton />,
})

export default function ActivitiesPage() {
  return <ActivitiesPageContent />
}

function ActivitiesPageSkeleton() {
  return (
    <main className="flex-1 w-full overflow-y-auto p-6 md:p-10 max-w-6xl mx-auto animate-pulse">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <div className="space-y-3">
          <div className="h-12 w-64 rounded-lg bg-secondary/80" />
          <div className="h-4 w-80 rounded-md bg-secondary/60" />
        </div>
        <div className="h-12 w-48 rounded-2xl bg-secondary/70" />
      </div>
      <div className="h-20 rounded-3xl bg-secondary/50 border border-border/40 mb-6" />
      <div className="min-h-[400px] rounded-3xl bg-secondary/40 border border-border/40" />
    </main>
  )
}
