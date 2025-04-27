"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  status?: "PROGRESS" | "COMPLETED"; // Your status types
  onStatusChange?: (status: "PROGRESS" | "COMPLETED") => void;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, status, onStatusChange, ...props }, ref) => {
  const isChecked = status === "COMPLETED";
  const isIndeterminate = status === "PROGRESS";

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      checked={isChecked}
      onCheckedChange={(checked) => {
        const newStatus = checked ? "COMPLETED" : "PROGRESS";
        onStatusChange?.(newStatus);
      }}
      className={cn(
        "peer size-4 shrink-0 outline-2 outline-border ring-offset-white",
        "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black",
        "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-green-500 data-[state=checked]:text-white",
        "data-[state=indeterminate]:bg-yellow-500 data-[state=indeterminate]:text-white",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        {isChecked ? (
          <Check className="size-4" />
        ) : isIndeterminate ? (
          <div className="w-3 h-0.5 bg-white" /> // Custom progress indicator
        ) : null}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
