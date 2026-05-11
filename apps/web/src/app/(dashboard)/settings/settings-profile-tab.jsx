"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, Save } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldGroup,
  FieldContent,
} from "@/components/ui/field"

export default function SettingsProfileTab() {
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false)

  return (
    <div className="bg-card/50 backdrop-blur-2xl border border-border/50 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] hover:border-border/80 transition-colors">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-6">
          <div
            className="relative cursor-pointer rounded-full overflow-hidden border border-border shadow-md group"
            onMouseEnter={() => setIsHoveringAvatar(true)}
            onMouseLeave={() => setIsHoveringAvatar(false)}
          >
            <Avatar className="w-24 h-24 sm:w-28 sm:h-28">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-muted text-xl font-medium">JD</AvatarFallback>
            </Avatar>

            <AnimatePresence>
              {isHoveringAvatar && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
                >
                  <Camera className="w-8 h-8 text-white drop-shadow-md" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div>
            <h3 className="text-xl font-medium text-foreground mb-2 tracking-tight">Profile Picture</h3>
            <p className="text-sm text-muted-foreground max-w-sm">Supported formats: JPEG, PNG, GIF. Max size 5MB.</p>
          </div>
        </div>

        <Separator className="bg-border/40" />

        <div className="flex flex-col md:flex-row gap-8 w-full">
          <FieldGroup className="w-full">
            <Field>
              <FieldLabel className="text-foreground font-medium">Display Name</FieldLabel>
              <FieldContent>
                <Input
                  defaultValue="Aman Jy"
                  className="bg-background border-input focus-visible:ring-primary/50 focus-visible:border-primary/50 rounded-xl h-12 shadow-inner"
                />
              </FieldContent>
              <FieldDescription className="text-muted-foreground">
                This is your public display name locally on PulseTrack.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel className="text-foreground font-medium">Email Address</FieldLabel>
              <FieldContent>
                <Input
                  defaultValue="aman.jy@example.com"
                  type="email"
                  className="bg-background border-input focus-visible:ring-primary/50 focus-visible:border-primary/50 rounded-xl h-12 shadow-inner"
                />
              </FieldContent>
            </Field>
          </FieldGroup>
        </div>

        <div className="flex justify-end mt-4">
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 px-8 rounded-xl shadow-[0_0_20px_var(--color-primary)] transition-all flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
