import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Crosshair, ChevronRight, Terminal, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { COURSE_MODULES, getCompletionStats, type Module } from "@/lib/course";

// LiveTerminal Animation - Cheat Engine style
function LiveTerminal() {
  const lines = [
    { text: "// Cheat Engine - Primeira varredura", delay: 0 },
    { text: "[SCAN]", delay: 400 },
    { text: "  Process: game.exe", delay: 800 },
    { text: "  Type: Exact Value = 100", delay: 1200 },
    { text: "  Scan: First Scan", delay: 1600 },
    { text: "", delay: 2000 },
    { text: "[FOUND] 847 addresses", delay: 2400 },
    { text: "", delay: 2800 },
    { text: "[REFINE]", delay: 3200 },
    { text: "  Value changed to: 250", delay: 3600 },
    { text: "  Scan: Next Scan (changed)", delay: 4000 },
    { text: "", delay: 4400 },
    { text: "[FOUND] 3 addresses", delay: 4800 },
    { text: "", delay: 5200 },
    { text: "[EDIT]", delay: 5600 },
    { text: "  Address: 0x00A3F2C8", delay: 6000 },
    { text: "  New Value: 99999", delay: 6400 },
    { text: "  Status: ✓ Frozen", delay: 6800 },
  ];

  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    lines.forEach((_, i) => {
      const timer = setTimeout(() => {
        setVisibleLines(i + 1);
      }, lines[i].delay + 100);
      timers.push(timer);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-orange-500/30 overflow-hidden shadow-2xl shadow-orange-500/10">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0d0d0d] border-b border-orange-500/20">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-orange-400/70 ml-2 font-mono">Cheat Engine 7.5</span>
      </div>
      {/* Terminal Body */}
      <div className="p-4 font-mono text-sm leading-relaxed h-[380px] overflow-hidden">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="flex">
            <span className={line.text.startsWith("[") && line.text.endsWith("]") ? "text-orange-400 font-bold" : line.text.startsWith("//") ? "text-gray-500" : line.text.includes("✓") ? "text-emerald-400" : "text-gray-400"}>
              {line.text || "\u00A0"}
            </span>
          </div>
        ))}
        {showCursor && visibleLines === lines.length && (
          <span className="text-orange-400">▌</span>
        )}
      </div>
    </div>
  );
}

// Module Card
function ModuleCard({ module, index }: { module: Module; index: number }) {
  const lessonCount = module.lessons.length;

  return (
    <Link href={module.lessons[0]?.path || "/"}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ y: -4, scale: 1.02 }}
        className="group p-5 rounded-2xl bg-card border border-border hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all cursor-pointer h-full flex flex-col"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-xl bg-orange-500/15 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            {module.emoji}
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full font-medium">
            {lessonCount} {lessonCount === 1 ? "lição" : "lições"}
          </span>
        </div>
        <h3 className="font-bold text-foreground mb-1.5 group-hover:text-orange-500 transition-colors">
          {module.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
          {module.lessons.slice(0, 3).map((l) => l.title).join(" • ")}
          {module.lessons.length > 3 && "..."}
        </p>
        <div className="flex items-center gap-1 text-xs text-orange-500 mt-3 font-medium group-hover:gap-2 transition-all">
          <span>Explorar</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </motion.div>
    </Link>
  );
}

export default function Home() {
  const stats = getCompletionStats();

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-medium mb-5">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                Guia Completo 2025 — {stats.total} Lições
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-5 leading-tight">
                <span className="text-foreground">Domine o</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                  Cheat Engine
                </span>
              </h1>

              <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
                Do básico ao avançado. Varredura de memória, ponteiros, assembly, Lua scripting, trainers, anti-cheat bypass — tudo em português.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/instalacao"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all text-center"
                >
                  Começar Agora
                </Link>
                <Link
                  href="/primeira-varredura"
                  className="px-6 py-3.5 rounded-xl bg-card border border-border text-foreground font-semibold hover:bg-muted hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <Terminal className="w-4 h-4" />
                  Primeira Varredura
                </Link>
              </div>
            </motion.div>

            {/* Right: Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <LiveTerminal />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-orange-500">{stats.total}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Lições</div>
            </div>
            <div>
              <div className="text-3xl font-black text-red-500">{COURSE_MODULES.length}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Módulos</div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-500">{stats.completed}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Concluídas</div>
            </div>
            <div>
              <div className="text-3xl font-black text-yellow-500">
                {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Progresso</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-700"
                style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Explore os Módulos</h2>
          <p className="text-muted-foreground">
            {COURSE_MODULES.length} módulos, do básico ao avançado
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {COURSE_MODULES.map((module, i) => (
            <ModuleCard key={module.id} module={module} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
