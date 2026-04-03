"use client"

import React, { useState } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data7Days = [
  { day: "Mon", time: 45 },
  { day: "Tue", time: 120 },
  { day: "Wed", time: 90 },
  { day: "Thu", time: 180 },
  { day: "Fri", time: 60 },
  { day: "Sat", time: 300 },
  { day: "Sun", time: 150 },
]

const data30Days = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  time: Math.floor(Math.random() * (300 - 30) + 30),
}))

export default function StatsTrendChart() {
  const [range, setRange] = useState("7days")
  const data = range === "7days" ? data7Days : data30Days

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-end px-4 pt-4 mb-2">
        <div className="flex bg-secondary/50 rounded-lg p-1 border border-border/50">
          <button
            onClick={() => setRange("7days")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              range === "7days"
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setRange("30days")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              range === "30days"
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            30 Days
          </button>
        </div>
      </div>
      <div className="flex-1 min-h-[250px] pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 16, right: 12, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              width={40}
            />
            <Tooltip
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <div className="bg-popover/95 border border-border rounded-xl px-3 py-2 text-sm shadow-lg">
                    <p className="text-muted-foreground text-xs mb-0.5">{range === "30days" ? `Day ${label}` : label}</p>
                    <p className="font-semibold text-foreground">
                      {payload[0].value} <span className="text-muted-foreground font-normal">min</span>
                    </p>
                  </div>
                ) : null
              }
            />
            <Area
              type="monotone"
              dataKey="time"
              stroke="var(--color-primary)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorTime)"
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
