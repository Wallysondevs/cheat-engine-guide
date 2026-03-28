import { useState } from "react";
import { Moon, Sun, Menu, X, Crosshair } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onMenuToggle: () => void;
  menuOpen: boolean;
}

export function Header({ onMenuToggle, menuOpen }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 h-14 border-b border-border bg-background/90 backdrop-blur-sm flex items-center px-4 gap-3">
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-1.5 rounded-md hover:bg-muted transition-colors"
        aria-label="Toggle menu"
      >
        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div className="flex items-center gap-2 font-semibold text-foreground">
        <Crosshair className="w-5 h-5 text-primary" />
        <span className="hidden sm:inline">Cheat Engine</span>
        <span className="text-muted-foreground font-normal hidden sm:inline">— Guia Completo</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
