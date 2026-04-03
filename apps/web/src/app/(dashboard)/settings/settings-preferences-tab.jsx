"use client"

import React from "react"
import { Globe, Bell } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function SettingsPreferencesTab() {
  return (
    <div className="bg-card/50 backdrop-blur-2xl border border-border/50 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] hover:border-border/80 transition-colors">
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="text-xl font-medium text-foreground mb-6 tracking-tight flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Regional & Tracking
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-5 rounded-2xl bg-secondary/30 border border-border/40">
              <div>
                <h4 className="text-foreground font-medium mb-1">Measurement System</h4>
                <p className="text-muted-foreground text-sm">Choose how distance and weight are displayed.</p>
              </div>
              <Select defaultValue="metric">
                <SelectTrigger className="w-[180px] bg-background border-input h-11 rounded-xl">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-popover backdrop-blur-xl border-border rounded-xl">
                  <SelectItem value="metric" className="focus:bg-secondary focus:text-primary rounded-lg cursor-pointer">
                    Metric (km, kg)
                  </SelectItem>
                  <SelectItem value="imperial" className="focus:bg-secondary focus:text-primary rounded-lg cursor-pointer">
                    Imperial (mi, lbs)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-5 rounded-2xl bg-secondary/30 border border-border/40">
              <div>
                <h4 className="text-foreground font-medium mb-1">Start of Week</h4>
                <p className="text-muted-foreground text-sm">Which day should your calendar start on?</p>
              </div>
              <Select defaultValue="monday">
                <SelectTrigger className="w-[180px] bg-background border-input h-11 rounded-xl">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-popover backdrop-blur-xl border-border rounded-xl">
                  <SelectItem value="monday" className="focus:bg-secondary focus:text-primary rounded-lg cursor-pointer">
                    Monday
                  </SelectItem>
                  <SelectItem value="sunday" className="focus:bg-secondary focus:text-primary rounded-lg cursor-pointer">
                    Sunday
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator className="bg-border/40" />

        <div>
          <h2 className="text-xl font-medium text-foreground mb-6 tracking-tight flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-5 rounded-2xl bg-secondary/30 border border-border/40 transition-colors hover:bg-secondary/50">
              <div>
                <h4 className="text-foreground font-medium mb-1">Email Notifications</h4>
                <p className="text-muted-foreground text-sm">Receive weekly workout summaries and goal updates.</p>
              </div>
              <Switch defaultChecked className="data-[state=checked]:bg-primary" />
            </div>
            <div className="flex justify-between items-center p-5 rounded-2xl bg-secondary/30 border border-border/40 transition-colors hover:bg-secondary/50">
              <div>
                <h4 className="text-foreground font-medium mb-1">Push Notifications</h4>
                <p className="text-muted-foreground text-sm">Get real-time alerts for incoming friend requests.</p>
              </div>
              <Switch className="data-[state=checked]:bg-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
