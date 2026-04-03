"use client"

import dynamic from "next/dynamic"

const StatsPageContent = dynamic(() => import("./stats-page-content"), {
  loading: () => <StatsPageSkeleton />,
})

export default function StatsPage() {
  return <StatsPageContent />
}

function StatsPageSkeleton() {
  return (
    <main className="flex-1 w-full overflow-y-auto p-6 md:p-10 max-w-6xl mx-auto animate-pulse">
      <div className="h-12 w-40 rounded-lg bg-secondary/80 mb-3" />
      <div className="h-4 w-[28rem] max-w-full rounded-md bg-secondary/60 mb-10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 rounded-3xl bg-secondary/45 border border-border/40" />
        ))}
      </div>
      <div className="h-[300px] rounded-3xl bg-secondary/40 border border-border/40" />
    </main>
  )
}
