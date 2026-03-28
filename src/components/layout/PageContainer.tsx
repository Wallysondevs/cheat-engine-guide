import { cn } from "@/lib/utils";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";
import { Clock } from "lucide-react";

interface PageContainerProps {
  title: string;
  subtitle?: string;
  difficulty?: "iniciante" | "intermediário" | "avançado";
  timeToRead?: string;
  children: React.ReactNode;
}

export function PageContainer({ title, subtitle, difficulty, timeToRead, children }: PageContainerProps) {
  return (
    <main className="flex-1 min-w-0 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          {difficulty && <DifficultyBadge level={difficulty} />}
          {timeToRead && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {timeToRead}
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground text-base leading-relaxed">{subtitle}</p>
        )}
      </div>
      <div className="prose prose-sm sm:prose-base max-w-none">
        {children}
      </div>
    </main>
  );
}
