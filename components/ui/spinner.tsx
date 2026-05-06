import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-primary/20 border-t-primary",
        {
          "w-4 h-4": size === "sm",
          "w-8 h-8": size === "md",
          "w-12 h-12": size === "lg",
        },
        className
      )}
    />
  );
}

export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Spinner size="lg" />
    </div>
  );
}
