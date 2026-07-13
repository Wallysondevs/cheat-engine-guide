import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Crosshair, X, ChevronDown, ChevronRight, Check, BookOpen } from "lucide-react";
import { COURSE_MODULES, getProgress, getCompletionStats, type Module } from "@/lib/course";

function ModuleSection({ module }: { module: Module }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(() => {
    return module.lessons.some((l) => l.path === location);
  });
  const progress = getProgress();

  const completedCount = module.lessons.filter((l) => progress[l.id]).length;
  const isComplete = completedCount === module.lessons.length;
  const hasActiveChild = module.lessons.some((l) => l.path === location);

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all",
          hasActiveChild ? "text-primary" : "text-foreground hover:bg-muted"
        )}
      >
        <span className="text-base">{module.emoji}</span>
        <span className="flex-1 text-left truncate">{module.title}</span>
        {isComplete ? (
          <Check className="w-3.5 h-3.5 text-emerald-500" />
        ) : completedCount > 0 ? (
          <span className="text-xs text-muted-foreground">
            {completedCount}/{module.lessons.length}
          </span>
        ) : null}
        {open ? (
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </button>
      {open && (
        <div className="mt-0.5 ml-2 border-l border-border/50 pl-2 space-y-0.5">
          {module.lessons.map((lesson) => {
            const active = location === lesson.path;
            const done = progress[lesson.id];
            return (
              <Link key={lesson.id} href={lesson.path}>
                <div
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm cursor-pointer transition-all pl-5",
                    active
                      ? "bg-primary/15 text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    done && !active && "text-emerald-600 dark:text-emerald-400"
                  )}
                >
                  {done ? (
                    <Check className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                  ) : (
                    <div className="w-3.5 h-3.5 shrink-0 rounded-full border border-muted-foreground/30" />
                  )}
                  <span className="truncate">{lesson.title}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const stats = getCompletionStats();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-72 z-50 bg-card border-r border-border flex flex-col transition-transform duration-300",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-border shrink-0">
          <Link href="/" className="flex items-center gap-2 font-black text-sm text-foreground">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <Crosshair className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold leading-tight">Cheat Engine</div>
              <div className="text-xs text-muted-foreground font-normal">Guia Completo</div>
            </div>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-muted"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>Progresso do Curso</span>
            <span className="font-semibold text-orange-500">{stats.percentage}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1 text-center">
            {stats.completed} de {stats.total} lições concluídas
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <Link href="/">
            <div
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-all mb-2",
                "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <BookOpen className="w-4 h-4 text-orange-500" />
              Início
            </div>
          </Link>
          {COURSE_MODULES.map((module) => (
            <ModuleSection key={module.id} module={module} />
          ))}
        </div>

        <div className="p-3 border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            Cheat Engine Guide 2025
          </div>
        </div>
      </aside>
    </>
  );
}
