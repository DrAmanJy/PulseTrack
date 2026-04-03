"use client"

import React from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Lock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldContent,
} from "@/components/ui/field"

export default function SettingsSecurityTab() {
  return (
    <div className="bg-card/50 backdrop-blur-2xl border border-border/50 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] hover:border-border/80 transition-colors">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-medium text-foreground mb-2 tracking-tight">Security Settings</h2>
          <p className="text-sm text-muted-foreground">Update your password and secure your account.</p>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-4 shadow-sm backdrop-blur-md">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-amber-500 font-medium text-sm mb-1">Strong Password Required</h4>
            <p className="text-amber-400/80 text-xs leading-relaxed">
              Your password must be at least 8 characters long, contain an uppercase letter, a number, and a special character
              to ensure maximum security.
            </p>
          </div>
        </div>

        <FieldGroup className="w-full max-w-lg mt-2">
          <Field>
            <FieldLabel className="text-foreground font-medium">Current Password</FieldLabel>
            <FieldContent>
              <Input
                type="password"
                placeholder="••••••••"
                className="bg-background border-input focus-visible:ring-primary/50 focus-visible:border-primary/50 rounded-xl h-12 shadow-inner"
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel className="text-foreground font-medium">New Password</FieldLabel>
            <FieldContent>
              <Input
                type="password"
                placeholder="••••••••"
                className="bg-background border-input focus-visible:ring-primary/50 focus-visible:border-primary/50 rounded-xl h-12 shadow-inner"
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel className="text-foreground font-medium">Confirm New Password</FieldLabel>
            <FieldContent>
              <Input
                type="password"
                placeholder="••••••••"
                className="bg-background border-input focus-visible:ring-primary/50 focus-visible:border-primary/50 rounded-xl h-12 shadow-inner"
              />
            </FieldContent>
          </Field>
        </FieldGroup>

        <div className="flex justify-start mt-4">
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 px-8 rounded-xl shadow-[0_0_20px_var(--color-primary)] transition-all flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Update Password
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
