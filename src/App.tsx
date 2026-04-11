import { useState, useEffect } from "react";
  import { Switch, Route, Router as WouterRouter } from "wouter";
  import { useHashLocation } from "wouter/use-hash-location";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

  import { Sidebar } from "@/components/layout/Sidebar";
  import { Header } from "@/components/layout/Header";

  import Introducao from "@/pages/Introducao";
  import Instalacao from "@/pages/Instalacao";
  import Interface from "@/pages/Interface";
  import TiposDados from "@/pages/TiposDados";
  import PrimeiraVarredura from "@/pages/PrimeiraVarredura";
  import ValorDesconhecido from "@/pages/ValorDesconhecido";
  import TiposVarredura from "@/pages/TiposVarredura";
  import Refinando from "@/pages/Refinando";
  import ListaEnderecos from "@/pages/ListaEnderecos";
  import Freeze from "@/pages/Freeze";
  import Modificar from "@/pages/Modificar";
  import Ponteiros from "@/pages/Ponteiros";
  import EncontrarPonteiros from "@/pages/EncontrarPonteiros";
  import PointerScanner from "@/pages/PointerScanner";
  import MultiNivel from "@/pages/MultiNivel";
  import MemoryView from "@/pages/MemoryView";
  import Disassembler from "@/pages/Disassembler";
  import Breakpoints from "@/pages/Breakpoints";
  import Registradores from "@/pages/Registradores";
  import Assembly from "@/pages/Assembly";
  import AutoAssemble from "@/pages/AutoAssemble";
  import Injecao from "@/pages/Injecao";
  import Templates from "@/pages/Templates";
  import Lua from "@/pages/Lua";
  import LuaApi from "@/pages/LuaApi";
  import Scripts from "@/pages/Scripts";
  import Hotkeys from "@/pages/Hotkeys";
  import Tabelas from "@/pages/Tabelas";
  import SpeedHack from "@/pages/SpeedHack";
  import Trainers from "@/pages/Trainers";
  import AntiCheat from "@/pages/AntiCheat";
  import Evasao from "@/pages/Evasao";
  import Tutorial from "@/pages/Tutorial";
  import NotFound from "@/pages/not-found";

  const queryClient = new QueryClient();

  function Layout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [location] = useHashLocation();
    useEffect(() => {
      setIsSidebarOpen(false);
      window.scrollTo(0, 0);
    }, [location]);

    return (
      <div className="min-h-screen bg-background text-foreground flex">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className="flex-1 lg:pl-72 flex flex-col min-w-0 transition-all duration-300">
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    );
  }

  function Router() {
    return (
      <Layout>
        <Switch>
          <Route path="/" component={Introducao} />
          <Route path="/instalacao" component={Instalacao} />
          <Route path="/interface" component={Interface} />
          <Route path="/tipos-dados" component={TiposDados} />
          <Route path="/primeira-varredura" component={PrimeiraVarredura} />
          <Route path="/valor-desconhecido" component={ValorDesconhecido} />
          <Route path="/tipos-varredura" component={TiposVarredura} />
          <Route path="/refinando" component={Refinando} />
          <Route path="/lista-enderecos" component={ListaEnderecos} />
          <Route path="/freeze" component={Freeze} />
          <Route path="/modificar" component={Modificar} />
          <Route path="/ponteiros" component={Ponteiros} />
          <Route path="/encontrar-ponteiros" component={EncontrarPonteiros} />
          <Route path="/pointer-scanner" component={PointerScanner} />
          <Route path="/multi-nivel" component={MultiNivel} />
          <Route path="/memory-view" component={MemoryView} />
          <Route path="/disassembler" component={Disassembler} />
          <Route path="/breakpoints" component={Breakpoints} />
          <Route path="/registradores" component={Registradores} />
          <Route path="/assembly" component={Assembly} />
          <Route path="/auto-assemble" component={AutoAssemble} />
          <Route path="/injecao" component={Injecao} />
          <Route path="/templates" component={Templates} />
          <Route path="/lua" component={Lua} />
          <Route path="/lua-api" component={LuaApi} />
          <Route path="/scripts" component={Scripts} />
          <Route path="/hotkeys" component={Hotkeys} />
          <Route path="/tabelas" component={Tabelas} />
          <Route path="/speedhack" component={SpeedHack} />
          <Route path="/trainers" component={Trainers} />
          <Route path="/anti-cheat" component={AntiCheat} />
          <Route path="/evasao" component={Evasao} />
          <Route path="/tutorial" component={Tutorial} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    );
  }

  export default function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <WouterRouter hook={useHashLocation}>
          <Router />
        </WouterRouter>
      </QueryClientProvider>
    );
  }
  