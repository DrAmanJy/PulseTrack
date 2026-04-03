"use client"

import dynamic from "next/dynamic"

const GoalsPageContent = dynamic(() => import("./goals-page-content"), {
  loading: () => <GoalsPageSkeleton />,
})

export default function GoalsPage() {
  return <GoalsPageContent />
}

function GoalsPageSkeleton() {
  return (
    <main className="flex-1 w-full overflow-y-auto p-6 md:p-10 max-w-6xl mx-auto animate-pulse">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-10">
        <div className="space-y-3">
          <div className="h-12 w-48 rounded-lg bg-secondary/80" />
          <div className="h-4 w-96 rounded-md bg-secondary/60" />
        </div>
        <div className="h-12 w-40 rounded-2xl bg-secondary/70" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-56 rounded-3xl bg-secondary/45 border border-border/40" />
        ))}
      </div>
    </main>
  )
}
