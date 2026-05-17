"use client"

import dynamic from "next/dynamic"

const ProfilePageContent = dynamic(() => import("./profile-page-content"), {
  loading: () => <ProfilePageSkeleton />,
})

export default function ProfilePage() {
  return <ProfilePageContent />
}

function ProfilePageSkeleton() {
  return (
    <main className="flex-1 w-full overflow-y-auto p-6 md:p-10 max-w-3xl mx-auto animate-pulse">
      <div className="flex justify-between gap-4 mb-10">
        <div className="space-y-3">
          <div className="h-12 w-44 rounded-lg bg-secondary/80" />
          <div className="h-4 w-72 rounded-md bg-secondary/60" />
        </div>
        <div className="h-12 w-44 rounded-2xl bg-secondary/70 shrink-0" />
      </div>
      <div className="h-56 rounded-3xl bg-secondary/45 border border-border/40 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-secondary/40 border border-border/40" />
        ))}
      </div>
    </main>
  )
}
