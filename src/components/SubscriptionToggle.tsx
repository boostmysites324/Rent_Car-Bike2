import { useState } from "react";
import { cn } from "@/lib/utils";

interface SubscriptionToggleProps {
  value: "daily" | "monthly";
  onChange: (value: "daily" | "monthly") => void;
}

export const SubscriptionToggle = ({ value, onChange }: SubscriptionToggleProps) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex bg-grey-light rounded-lg p-1 border border-grey-border">
        <button
          onClick={() => onChange("daily")}
          className={cn(
            "px-6 py-2 text-sm font-medium rounded-md transition-all duration-200",
            value === "daily"
              ? "bg-blue-primary text-white shadow-sm"
              : "text-grey-text hover:text-foreground hover:bg-white"
          )}
        >
          Daily
        </button>
        <button
          onClick={() => onChange("monthly")}
          className={cn(
            "px-6 py-2 text-sm font-medium rounded-md transition-all duration-200",
            value === "monthly"
              ? "bg-blue-primary text-white shadow-sm"
              : "text-grey-text hover:text-foreground hover:bg-white"
          )}
        >
          Monthly
        </button>
      </div>
    </div>
  );
};