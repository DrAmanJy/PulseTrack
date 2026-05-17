"use client"

import dynamic from "next/dynamic"

const DashboardPageContent = dynamic(
  () => import("./dashboard-page-content"),
  {
    loading: () => <DashboardPageSkeleton />,
  }
)

export default function DashboardPage() {
  return <DashboardPageContent />
}

function DashboardPageSkeleton() {
  return (
    <main className="flex-1 p-6 md:p-8 md:pl-8 overflow-x-hidden overflow-y-auto w-full relative animate-pulse">
      <div className="flex justify-between items-end mb-10 mt-2">
        <div className="space-y-3">
          <div className="h-10 w-48 rounded-lg bg-secondary/80" />
          <div className="h-4 w-64 rounded-md bg-secondary/60" />
        </div>
        <div className="flex gap-4">
          <div className="h-12 w-12 rounded-full bg-secondary/80" />
          <div className="h-12 w-12 rounded-full bg-secondary/80" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 rounded-3xl bg-secondary/50 border border-border/40" />
        ))}
      </div>
      <div className="h-[340px] rounded-3xl bg-secondary/40 border border-border/40 mb-8" />
      <div className="h-72 rounded-3xl bg-secondary/40 border border-border/40" />
    </main>
  )
}
