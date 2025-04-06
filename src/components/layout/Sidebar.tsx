import React from "react";
import { Link } from "react-router-dom";
import { Activity, HeartPulse, AlignCenter, Smile, BookOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform border-r bg-sidebar transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <span className="font-semibold text-sidebar-foreground">
            Rural Aid Nexus AI
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="md:hidden"
          >
            <X className="h-5 w-5 text-sidebar-foreground" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="flex flex-col gap-1 p-2">
            <Link to="/" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Activity className="mr-2 h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            <Link to="/triage" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <HeartPulse className="mr-2 h-5 w-5" />
                MedAI Triage Bot
              </Button>
            </Link>
            <Link to="/posture" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <AlignCenter className="mr-2 h-5 w-5" />
                Posture AI
              </Button>
            </Link>
            <Link to="/emotion" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Smile className="mr-2 h-5 w-5" />
                Emotion Analysis
              </Button>
            </Link>
            <Link to="/training" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                MedSkill Trainer
              </Button>
            </Link>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};

export default Sidebar;
