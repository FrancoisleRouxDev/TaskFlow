import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-20 w-full rounded-lg border border-border-subtle bg-surface-2 px-3 py-2 text-sm text-foreground shadow-xs transition-all duration-150 outline-none placeholder:text-text-tertiary hover:border-border-strong focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:bg-surface-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }