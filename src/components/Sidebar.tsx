import { Blocks, History, Layers, LayoutTemplate, Moon, Sun } from "lucide-react";
import { AppLogo } from "@/components/AppLogo";
import { cn } from "@/lib/cn";
import type { Theme } from "@/hooks/ui/useTheme";
import type { View } from "@/types/view";

const NAV_ITEMS: Array<{ id: View; label: string; description: string; icon: typeof Blocks }> = [
  { id: "playground", label: "Component Playground", description: "Configure & preview UI components", icon: Blocks },
  { id: "templates", label: "Template Maker", description: "Full-page starter templates", icon: LayoutTemplate },
  { id: "composer", label: "Composer", description: "Build a page from header/sidebar/main/footer regions", icon: Layers },
  { id: "export", label: "Code Export", description: "Saved snippet history", icon: History },
];

interface SidebarProps {
  view: View;
  onSelect: (view: View) => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export function Sidebar({ view, onSelect, theme, onToggleTheme }: SidebarProps) {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-zinc-200 bg-white/60 p-4 dark:border-zinc-800 dark:bg-zinc-950/60">
      <div className="mb-6 flex items-center gap-2 px-2">
        <AppLogo className="h-8 w-8" />
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Play UI</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Component playground</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = item.id === view;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={cn(
                "flex items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                active
                  ? "bg-violet-600/10 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200",
              )}
            >
              <Icon
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  active ? "text-violet-600 dark:text-violet-400" : "text-zinc-400 dark:text-zinc-500",
                )}
              />
              <span>
                <span className="block text-sm font-medium">{item.label}</span>
                <span className="block text-xs text-zinc-500 dark:text-zinc-500">{item.description}</span>
              </span>
            </button>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={onToggleTheme}
        className="mt-auto flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </button>
    </aside>
  );
}
