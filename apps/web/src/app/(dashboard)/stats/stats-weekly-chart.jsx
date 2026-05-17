"use client"

import React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  { day: "Mon", minutes: 42 },
  { day: "Tue", minutes: 55 },
  { day: "Wed", minutes: 38 },
  { day: "Thu", minutes: 62 },
  { day: "Fri", minutes: 48 },
  { day: "Sat", minutes: 78 },
  { day: "Sun", minutes: 35 },
]

export default function StatsWeeklyChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 16, right: 12, left: -8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" strokeOpacity={0.45} />
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--color-muted-foreground)", fontSize: 12, fontWeight: 500 }}
          dy={8}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
          width={36}
        />
        <Tooltip
          cursor={{ fill: "var(--color-secondary)", opacity: 0.35 }}
          content={({ active, payload, label }) =>
            active && payload?.length ? (
              <div className="bg-popover/95 border border-border rounded-xl px-3 py-2 text-sm shadow-lg">
                <p className="text-muted-foreground text-xs mb-0.5">{label}</p>
                <p className="font-semibold text-foreground">
                  {payload[0].value} <span className="text-muted-foreground font-normal">min</span>
                </p>
              </div>
            ) : null
          }
        />
        <Bar
          dataKey="minutes"
          fill="var(--color-primary)"
          radius={[8, 8, 0, 0]}
          maxBarSize={48}
          animationDuration={700}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
