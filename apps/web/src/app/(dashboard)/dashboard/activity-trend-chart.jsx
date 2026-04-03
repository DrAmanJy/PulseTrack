"use client"

import React from "react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover/90 border border-border backdrop-blur-md p-3 rounded-xl shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
        <p className="text-muted-foreground text-xs font-medium mb-1 uppercase tracking-wider relative z-10">
          {label}
        </p>
        <p className="text-primary font-bold text-xl relative z-10">
          {payload[0].value}{" "}
          <span className="text-xs font-normal text-muted-foreground">mins</span>
        </p>
      </div>
    )
  }
  return null
}

export default function ActivityTrendChart({ chartData }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.5} />
            <stop offset="90%" stopColor="var(--color-primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="var(--color-border)"
          strokeOpacity={0.4}
        />
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "var(--color-muted-foreground)",
            fontSize: 13,
            fontWeight: 500,
          }}
          dy={15}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "var(--color-muted-foreground)",
            fontSize: 13,
            fontWeight: 500,
          }}
          dx={-15}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{
            stroke: "var(--color-muted)",
            strokeWidth: 1,
            strokeDasharray: "4 4",
          }}
        />
        <Area
          type="monotone"
          dataKey="activity"
          stroke="var(--color-primary)"
          strokeWidth={4}
          fillOpacity={1}
          fill="url(#colorActivity)"
          animationDuration={900}
          animationEasing="ease-out"
          activeDot={{
            r: 6,
            fill: "var(--color-primary)",
            stroke: "var(--color-background)",
            strokeWidth: 3,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
