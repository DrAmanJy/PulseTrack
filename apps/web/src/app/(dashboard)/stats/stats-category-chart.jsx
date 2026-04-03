"use client"

import React, { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const dataSessions = [
  { name: "Fitness", value: 12, color: "#10b981" },
  { name: "Learning", value: 8, color: "#3b82f6" },
  { name: "Productivity", value: 15, color: "#6366f1" },
  { name: "Mindfulness", value: 5, color: "#a855f7" },
]

const dataTime = [
  { name: "Fitness", value: 480, color: "#10b981" },
  { name: "Learning", value: 540, color: "#3b82f6" },
  { name: "Productivity", value: 1400, color: "#6366f1" },
  { name: "Mindfulness", value: 75, color: "#a855f7" },
]

export default function StatsCategoryChart() {
  const [metric, setMetric] = useState("sessions")
  const data = metric === "sessions" ? dataSessions : dataTime

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-end px-4 pt-4 pb-0">
        <div className="flex bg-secondary/50 rounded-lg p-1 border border-border/50">
          <button
            onClick={() => setMetric("sessions")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              metric === "sessions"
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Sessions
          </button>
          <button
            onClick={() => setMetric("time")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              metric === "time"
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Time
          </button>
        </div>
      </div>
      <div className="flex-1 min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              cursor={{ fill: "var(--color-secondary)", opacity: 0.35 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="bg-popover/95 border border-border rounded-xl px-3 py-2 text-sm shadow-lg">
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.color }} />
                        {data.name}
                      </p>
                      <p className="text-muted-foreground mt-1">
                        {data.value} {metric === "sessions" ? "sessions" : "min"}
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
