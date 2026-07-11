import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { AlyaAssistant } from "../alya/AlyaAssistant";

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-paper transition-colors duration-300 dark:bg-ink-975">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div key={location.pathname} className="mx-auto max-w-[1600px] animate-rise-in">
            <Outlet />
          </div>
        </main>
      </div>
      <AlyaAssistant />
    </div>
  );
}
