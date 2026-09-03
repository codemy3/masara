import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerClass?: string;
  fullWidth?: boolean;
}

export function Section({
  children,
  className,
  containerClass,
  fullWidth = false,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("w-full py-16 md:py-24 lg:py-32", className)}
      {...props}
    >
      <div
        className={cn(
          fullWidth ? "w-full px-4 md:px-8" : "container mx-auto px-4 md:px-6 lg:px-8",
          containerClass
        )}
      >
        {children}
      </div>
    </section>
  );
}
