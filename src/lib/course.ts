// Cheat Engine Guide - Course Structure
// Storage key: cheatengine-curso-progresso

export interface Lesson {
  id: string;
  title: string;
  path: string;
}

export interface Module {
  id: string;
  title: string;
  emoji: string;
  lessons: Lesson[];
}

export const COURSE_MODULES: Module[] = [
  {
    id: "introducao",
    title: "Introdução",
    emoji: "🎯",
    lessons: [
      { id: "introducao", title: "O que é Cheat Engine", path: "/" },
      { id: "instalacao", title: "Instalação", path: "/instalacao" },
      { id: "interface", title: "Interface Principal", path: "/interface" },
      { id: "tutorial", title: "Tutorial Integrado", path: "/tutorial" },
    ],
  },
  {
    id: "fundamentos",
    title: "Fundamentos",
    emoji: "📚",
    lessons: [
      { id: "tipos-dados", title: "Tipos de Dados", path: "/tipos-dados" },
      { id: "primeira-varredura", title: "Primeira Varredura", path: "/primeira-varredura" },
      { id: "valor-desconhecido", title: "Valor Desconhecido", path: "/valor-desconhecido" },
      { id: "tipos-varredura", title: "Tipos de Varredura", path: "/tipos-varredura" },
      { id: "refinando", title: "Refinando Resultados", path: "/refinando" },
    ],
  },
  {
    id: "trabalhando",
    title: "Trabalhando com Valores",
    emoji: "🔧",
    lessons: [
      { id: "lista-enderecos", title: "Lista de Endereços", path: "/lista-enderecos" },
      { id: "freeze", title: "Freeze (Congelar)", path: "/freeze" },
      { id: "modificar", title: "Modificar Valores", path: "/modificar" },
    ],
  },
  {
    id: "ponteiros",
    title: "Ponteiros",
    emoji: "🔗",
    lessons: [
      { id: "ponteiros", title: "Entendendo Ponteiros", path: "/ponteiros" },
      { id: "encontrar-ponteiros", title: "Encontrar Ponteiros", path: "/encontrar-ponteiros" },
      { id: "pointer-scanner", title: "Pointer Scanner", path: "/pointer-scanner" },
      { id: "multi-nivel", title: "Ponteiros Multi-Nível", path: "/multi-nivel" },
    ],
  },
  {
    id: "memoria",
    title: "Análise de Memória",
    emoji: "🔍",
    lessons: [
      { id: "memory-view", title: "Memory View", path: "/memory-view" },
      { id: "disassembler", title: "Disassembler", path: "/disassembler" },
      { id: "breakpoints", title: "Breakpoints", path: "/breakpoints" },
      { id: "registradores", title: "Registradores", path: "/registradores" },
    ],
  },
  {
    id: "assembly",
    title: "Assembly & Auto Assemble",
    emoji: "⚙️",
    lessons: [
      { id: "assembly", title: "Assembly Básico", path: "/assembly" },
      { id: "auto-assemble", title: "Auto Assemble", path: "/auto-assemble" },
      { id: "injecao", title: "Injeção de Código", path: "/injecao" },
      { id: "templates", title: "Templates", path: "/templates" },
    ],
  },
  {
    id: "lua",
    title: "Lua Scripting",
    emoji: "📜",
    lessons: [
      { id: "lua", title: "Introdução ao Lua", path: "/lua" },
      { id: "lua-api", title: "Lua API do CE", path: "/lua-api" },
      { id: "scripts", title: "Scripts Práticos", path: "/scripts" },
    ],
  },
  {
    id: "recursos",
    title: "Recursos Avançados",
    emoji: "🚀",
    lessons: [
      { id: "hotkeys", title: "Hotkeys", path: "/hotkeys" },
      { id: "tabelas", title: "Tabelas (CT Files)", path: "/tabelas" },
      { id: "speed-hack", title: "Speed Hack", path: "/speed-hack" },
      { id: "trainers", title: "Criar Trainers", path: "/trainers" },
    ],
  },
  {
    id: "anticheat",
    title: "Anti-Cheat & Evasão",
    emoji: "🛡️",
    lessons: [
      { id: "anti-cheat", title: "Anti-Cheat", path: "/anti-cheat" },
      { id: "evasao", title: "Técnicas de Evasão", path: "/evasao" },
    ],
  },
];

// Storage key for progress
const STORAGE_KEY = "cheatengine-curso-progresso";

// Get all lesson IDs flattened
function getAllLessonIds(): string[] {
  return COURSE_MODULES.flatMap((module) => module.lessons.map((l) => l.id));
}

// Get progress from localStorage
export function getProgress(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// Save progress to localStorage
export function saveProgress(progress: Record<string, boolean>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// Mark a lesson as complete
export function markLessonComplete(lessonId: string): void {
  const progress = getProgress();
  progress[lessonId] = true;
  saveProgress(progress);
}

// Mark a lesson as incomplete
export function markLessonIncomplete(lessonId: string): void {
  const progress = getProgress();
  delete progress[lessonId];
  saveProgress(progress);
}

// Check if a lesson is complete
export function isLessonComplete(lessonId: string): boolean {
  const progress = getProgress();
  return progress[lessonId] === true;
}

// Get completion stats
export function getCompletionStats(): {
  completed: number;
  total: number;
  percentage: number;
} {
  const allLessons = getAllLessonIds();
  const progress = getProgress();
  const completed = allLessons.filter((id) => progress[id]).length;
  const total = allLessons.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { completed, total, percentage };
}

// Get module progress
export function getModuleProgress(moduleId: string): {
  completed: number;
  total: number;
} {
  const module = COURSE_MODULES.find((m) => m.id === moduleId);
  if (!module) return { completed: 0, total: 0 };
  const progress = getProgress();
  const completed = module.lessons.filter((l) => progress[l.id]).length;
  return { completed, total: module.lessons.length };
}

// Navigate to next/previous lesson
export function getNavigation(
  currentLessonId: string
): { prev: Lesson | null; next: Lesson | null } {
  const allLessons = getAllLessonIds();
  const currentIndex = allLessons.indexOf(currentLessonId);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  let prev: Lesson | null = null;
  let next: Lesson | null = null;

  // Find previous lesson
  if (currentIndex > 0) {
    const prevId = allLessons[currentIndex - 1];
    for (const module of COURSE_MODULES) {
      const lesson = module.lessons.find((l) => l.id === prevId);
      if (lesson) {
        prev = lesson;
        break;
      }
    }
  }

  // Find next lesson
  if (currentIndex < allLessons.length - 1) {
    const nextId = allLessons[currentIndex + 1];
    for (const module of COURSE_MODULES) {
      const lesson = module.lessons.find((l) => l.id === nextId);
      if (lesson) {
        next = lesson;
        break;
      }
    }
  }

  return { prev, next };
}

// Find lesson by path
export function findLessonByPath(path: string): Lesson | null {
  for (const module of COURSE_MODULES) {
    const lesson = module.lessons.find((l) => l.path === path);
    if (lesson) return lesson;
  }
  return null;
}
