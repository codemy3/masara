import * as React from "react";
import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: React.ElementType;
}

export function Heading({
  className,
  level = 2,
  as,
  children,
  ...props
}: HeadingProps) {
  const Component = as || (`h${level}` as React.ElementType);

  const styles = {
    1: "text-4xl md:text-5xl lg:text-7xl tracking-tight",
    2: "text-3xl md:text-4xl lg:text-5xl tracking-tight",
    3: "text-2xl md:text-3xl lg:text-4xl tracking-tight",
    4: "text-xl md:text-2xl lg:text-3xl tracking-tight",
    5: "text-lg md:text-xl lg:text-2xl tracking-tight",
    6: "text-base md:text-lg lg:text-xl tracking-tight",
  };

  return (
    <Component
      className={cn(
        "font-serif font-normal text-ivory",
        styles[level],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Text({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "font-sans text-base md:text-lg text-ivory/80 leading-relaxed",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
