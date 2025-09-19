"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftIcon, PanelLeftCloseIcon, SearchIcon } from "lucide-react";
import { DashboardCommand } from "./dashboard-command"; 
import { useState, useEffect } from "react";

export const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  // ✅ Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      {/* Command dialog */}
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />

      {/* Navbar */}
      <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background ">
        {/* Sidebar toggle */}
        <Button className="size-9" variant="outline" onClick={toggleSidebar}>
          {(state === "collapsed" || isMobile)
            ? <PanelLeftIcon className="size-4" />
            : <PanelLeftCloseIcon />}
        </Button>

        {/* Search toggle (this opens CommandDialog) */}
        <Button
          className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          variant="outline"
          size="sm"
          onClick={() => setCommandOpen((open) => !open)}
        >
          <SearchIcon className="mr-2 size-4" />
          Search
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1
            rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
            <span className="text-xs">&#8984;K</span>
          </kbd>
        </Button>
      </nav>
    </>
  );
};
