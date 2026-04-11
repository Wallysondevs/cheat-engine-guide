import { Link, useLocation } from "wouter";
  import { cn } from "@/lib/utils";
  import {
    BookOpen, HardDrive, LayoutDashboard, Database,
    Search, Eye, Filter, ScanSearch,
    List, Lock, Pencil,
    Cpu, Target, Network, Layers,
    Monitor, Code2, Bug, Sliders,
    Wrench, Code, Package, FileCode,
    Terminal, FileText, Keyboard, Zap,
    Table2, Gauge, Gift,
    Shield, EyeOff,
    GraduationCap, ChevronRight, X, Crosshair
  } from "lucide-react";

  const NAVIGATION = [
    {
      title: "Fundamentos",
      items: [
        { path: "/", label: "Introdução", icon: BookOpen },
        { path: "/instalacao", label: "Download e Instalação", icon: HardDrive },
        { path: "/interface", label: "Interface Geral", icon: LayoutDashboard },
        { path: "/tipos-dados", label: "Tipos de Dados", icon: Database },
      ]
    },
    {
      title: "Varredura de Memória",
      items: [
        { path: "/primeira-varredura", label: "Primeira Varredura", icon: Search },
        { path: "/valor-desconhecido", label: "Valor Desconhecido", icon: Eye },
        { path: "/tipos-varredura", label: "Tipos de Varredura", icon: ScanSearch },
        { path: "/refinando", label: "Refinando Resultados", icon: Filter },
      ]
    },
    {
      title: "Gerenciamento de Endereços",
      items: [
        { path: "/lista-enderecos", label: "Lista de Endereços", icon: List },
        { path: "/freeze", label: "Freeze de Valores", icon: Lock },
        { path: "/modificar", label: "Modificar Valores", icon: Pencil },
      ]
    },
    {
      title: "Ponteiros",
      items: [
        { path: "/ponteiros", label: "O que são Ponteiros", icon: Cpu },
        { path: "/encontrar-ponteiros", label: "Encontrar Ponteiros", icon: Target },
        { path: "/pointer-scanner", label: "Pointer Scanner", icon: Network },
        { path: "/multi-nivel", label: "Ponteiros Multinível", icon: Layers },
      ]
    },
    {
      title: "Debugger e Disassembler",
      items: [
        { path: "/memory-view", label: "Memory View", icon: Monitor },
        { path: "/disassembler", label: "Disassembler", icon: Code2 },
        { path: "/breakpoints", label: "Breakpoints", icon: Bug },
        { path: "/registradores", label: "Registradores", icon: Sliders },
      ]
    },
    {
      title: "Assembly e Injeção",
      items: [
        { path: "/assembly", label: "Assembly x86/x64", icon: Wrench },
        { path: "/auto-assemble", label: "Auto Assembler", icon: Code },
        { path: "/injecao", label: "Injeção de Código", icon: Package },
        { path: "/templates", label: "Templates de Código", icon: FileCode },
      ]
    },
    {
      title: "Lua e Scripts",
      items: [
        { path: "/lua", label: "Scripting com Lua", icon: Terminal },
        { path: "/lua-api", label: "API Lua Completa", icon: FileText },
        { path: "/scripts", label: "Scripts Avançados", icon: Zap },
        { path: "/hotkeys", label: "Hotkeys", icon: Keyboard },
      ]
    },
    {
      title: "Recursos Avançados",
      items: [
        { path: "/tabelas", label: "Tabelas de Trapaças", icon: Table2 },
        { path: "/speedhack", label: "SpeedHack", icon: Gauge },
        { path: "/trainers", label: "Criando Trainers", icon: Gift },
      ]
    },
    {
      title: "Proteção e Segurança",
      items: [
        { path: "/anti-cheat", label: "Anti-Cheat", icon: Shield },
        { path: "/evasao", label: "Técnicas de Evasão", icon: EyeOff },
      ]
    },
    {
      title: "Tutoriais",
      items: [
        { path: "/tutorial", label: "Tutorial Completo", icon: GraduationCap },
      ]
    },
  ];

  interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
  }

  export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const [location] = useLocation();

    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        <aside className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-72 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="p-6">
            <div className="flex items-center justify-between lg:justify-center mb-8">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Crosshair className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold mt-0 mb-0 pb-0 border-0 leading-tight">Cheat Engine</h2>
                  <p className="text-xs text-muted-foreground">Guia Completo</p>
                </div>
              </Link>
              <button className="lg:hidden p-2 text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-8">
              {NAVIGATION.map((section, idx) => (
                <div key={idx}>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3 mt-0 border-0 pb-0">
                    {section.title}
                  </h4>
                  <ul className="space-y-1 list-none">
                    {section.items.map((item, i) => {
                      const isActive = location === item.path;
                      const Icon = item.icon;
                      return (
                        <li key={i}>
                          <Link
                            href={item.path}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                              isActive
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "opacity-70")} />
                            {item.label}
                            {isActive && <ChevronRight className="w-3 h-3 ml-auto text-primary" />}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>
      </>
    );
  }
  