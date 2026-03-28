import { cn } from "@/lib/utils";

type Level = "iniciante" | "intermediário" | "avançado";

const styles: Record<Level, string> = {
  iniciante: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
  intermediário: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  avançado: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
};

export function DifficultyBadge({ level }: { level: Level }) {
  return (
    <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full border capitalize", styles[level])}>
      {level}
    </span>
  );
}
