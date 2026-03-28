import { useState } from "react";
import { useHashLocation } from "wouter/use-hash-location";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Crosshair, ChevronDown, ChevronRight,
  Search, Database, Bug, Code2, Terminal, Shield, BookOpen, Zap, Cpu
} from "lucide-react";

interface NavItem {
  label: string;
  path: string;
}
interface NavSection {
  label: string;
  icon: React.ReactNode;
  items: NavItem[];
}

const sections: NavSection[] = [
  {
    label: "Fundamentos",
    icon: <BookOpen className="w-4 h-4" />,
    items: [
      { label: "Introdução", path: "/" },
      { label: "Download e Instalação", path: "/instalacao" },
      { label: "Interface Geral", path: "/interface" },
      { label: "Tipos de Dados", path: "/tipos-dados" },
    ],
  },
  {
    label: "Varredura de Memória",
    icon: <Search className="w-4 h-4" />,
    items: [
      { label: "Primeira Varredura", path: "/primeira-varredura" },
      { label: "Valor Desconhecido", path: "/valor-desconhecido" },
      { label: "Tipos de Varredura", path: "/tipos-varredura" },
      { label: "Refinando Resultados", path: "/refinando" },
    ],
  },
  {
    label: "Gerenciamento de Endereços",
    icon: <Database className="w-4 h-4" />,
    items: [
      { label: "Lista de Endereços", path: "/lista-enderecos" },
      { label: "Freeze de Valores", path: "/freeze" },
      { label: "Modificar Valores", path: "/modificar" },
    ],
  },
  {
    label: "Ponteiros",
    icon: <Cpu className="w-4 h-4" />,
    items: [
      { label: "O que são Ponteiros", path: "/ponteiros" },
      { label: "Encontrar Ponteiros", path: "/encontrar-ponteiros" },
      { label: "Pointer Scanner", path: "/pointer-scanner" },
      { label: "Ponteiros Multinível", path: "/multi-nivel" },
    ],
  },
  {
    label: "Debugger e Disassembler",
    icon: <Bug className="w-4 h-4" />,
    items: [
      { label: "Memory View", path: "/memory-view" },
      { label: "Disassembler", path: "/disassembler" },
      { label: "Breakpoints", path: "/breakpoints" },
      { label: "Registradores", path: "/registradores" },
    ],
  },
  {
    label: "Code Injection",
    icon: <Code2 className="w-4 h-4" />,
    items: [
      { label: "Fundamentos de Assembly", path: "/assembly" },
      { label: "Auto-Assemble", path: "/auto-assemble" },
      { label: "Injeção de Código", path: "/injecao" },
      { label: "Templates CE", path: "/templates" },
    ],
  },
  {
    label: "Lua Scripting",
    icon: <Terminal className="w-4 h-4" />,
    items: [
      { label: "Introdução ao Lua", path: "/lua" },
      { label: "API do Cheat Engine", path: "/lua-api" },
      { label: "Scripts Automáticos", path: "/scripts" },
      { label: "Hotkeys", path: "/hotkeys" },
    ],
  },
  {
    label: "Tabelas e Trainers",
    icon: <Zap className="w-4 h-4" />,
    items: [
      { label: "Tabelas de Trapaça", path: "/tabelas" },
      { label: "Speed Hack", path: "/speed-hack" },
      { label: "Criar Trainers", path: "/trainers" },
    ],
  },
  {
    label: "Anti-Cheat e Proteções",
    icon: <Shield className="w-4 h-4" />,
    items: [
      { label: "Proteções Anti-Cheat", path: "/anti-cheat" },
      { label: "Técnicas de Evasão", path: "/evasao" },
    ],
  },
  {
    label: "Tutorial e Prática",
    icon: <Crosshair className="w-4 h-4" />,
    items: [
      { label: "Tutorial Oficial (Passo a Passo)", path: "/tutorial" },
    ],
  },
];

interface SidebarSectionProps {
  section: NavSection;
  currentPath: string;
  onNavigate: () => void;
}

function SidebarSection({ section, currentPath, onNavigate }: SidebarSectionProps) {
  const isActive = section.items.some(item => item.path === currentPath);
  const [open, setOpen] = useState(isActive);

  return (
    <div className="mb-0.5">
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wide transition-colors",
          isActive
            ? "text-primary bg-accent/50"
            : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
        )}
      >
        <span className={cn(isActive ? "text-primary" : "text-muted-foreground/70")}>
          {section.icon}
        </span>
        <span className="flex-1 text-left">{section.label}</span>
        {open
          ? <ChevronDown className="w-3 h-3 shrink-0" />
          : <ChevronRight className="w-3 h-3 shrink-0" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="ml-2 pl-3 border-l-2 border-border/60 mt-0.5 mb-1 space-y-0.5">
              {section.items.map(item => (
                <a
                  key={item.path}
                  href={`#${item.path}`}
                  onClick={onNavigate}
                  className={cn(
                    "block px-2 py-1 rounded-md text-sm transition-colors leading-tight",
                    currentPath === item.path
                      ? "text-primary font-medium bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const [path] = useHashLocation();

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Crosshair className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-sm text-sidebar-foreground">Cheat Engine</div>
            <div className="text-xs text-muted-foreground">Guia em Português</div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-3">
        {sections.map(section => (
          <SidebarSection
            key={section.label}
            section={section}
            currentPath={path}
            onNavigate={onClose}
          />
        ))}
      </div>
      <div className="px-4 py-3 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground text-center">
          31 tópicos • Português Brasileiro
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-sidebar border-r border-sidebar-border h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed left-0 top-0 z-50 w-64 h-full bg-sidebar border-r border-sidebar-border lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
