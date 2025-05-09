"use client";

import { useState, useEffect, useRef } from "react";
import {
  SquareTerminal,
  Github,
  ChevronRight,
  ChevronLeft,
  BookText,
  Database,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiBackwardTime } from "react-icons/gi";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

type ViewType =
  | "dataExplorer"
  | "queryExplorer"
  | "ChangeLog"
  | "settingsPanel";

interface AppSidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
}

export const AppSidebar = ({
  currentView,
  setCurrentView,
}: AppSidebarProps) => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const viewOptions = [
    {
      id: "dataExplorer" as const,
      label: "Data Explorer",
      icon: Database,
    },
    {
      id: "queryExplorer" as const,
      label: "Saved Queries",
      icon: SquareTerminal,
    },
    {
      id: "ChangeLog" as const,
      label: "ChangeLog",
      icon: GiBackwardTime,
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(prevOpen => !prevOpen);
      }

      if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsExpanded(prevIsExpanded => !prevIsExpanded);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const bottomNavLinks = [
    {
      to: "https://github.com/sand-worm-sql",
      label: "GitHub",
      icon: Github,
      isNewWindow: true,
    },
    {
      to: "/",
      label: "Documentation",
      icon: BookText,
      isNewWindow: true,
    },
  ];

  return (
    <div
      ref={sidebarRef}
      className={`flex flex-col h-full dark border-r transition-all duration-300 bg-muted  ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      <div className="p-2 ml-2 mt-2 flex items-center justify-between w-full">
        {isExpanded && (
          <Button
            variant="link"
            size="icon"
            onClick={() => setIsExpanded(false)}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
          </Button>
        )}
      </div>

      <Separator className="w-full" />
      <div className="p-3" />

      <ScrollArea className="flex-grow">
        <nav className="space-y-3 p-2">
          {viewOptions.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentView(item.id)}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors w-full ${
                currentView === item.id
                  ? " border-l-4 border-orange-600 rounded-none"
                  : "hover:bg-white/15"
              }`}
            >
              <item.icon className={`h-5 w-5 ${isExpanded ? "mr-2" : ""}`} />
              {isExpanded && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </ScrollArea>

      <div className="w-full">
        <ScrollArea className="flex-grow">
          <nav className="space-y-1 p-2">
            {bottomNavLinks.map(item => (
              <Link
                key={item.to}
                href={item.to}
                target={item.isNewWindow ? "_blank" : "_self"}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.to
                    ? "bg-secondary text-secondary-foreground"
                    : "hover:bg-secondary/80"
                }`}
              >
                <item.icon className={`h-5 w-5 ${isExpanded ? "mr-2" : ""}`} />
                {isExpanded && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <Separator className="w-full mb-2" />
        <div
          className={`${isExpanded ? "flex justify-around" : "block p-2.5"}`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentView("settingsPanel")}
                >
                  <Settings className="h-6 w-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span className="text-xs">Search (Cmd/Ctrl + K)</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {!isExpanded && (
        <Button
          variant="ghost"
          size="icon"
          className="m-2"
          onClick={() => setIsExpanded(true)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
