import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { useCodeHistory } from "@/hooks/useCodeHistory";
import { useTheme } from "@/hooks/ui/useTheme";
import { ComponentPlaygroundPage } from "@/pages/ComponentPlaygroundPage";
import { TemplateMakerPage } from "@/pages/TemplateMakerPage";
import { ComposerPage } from "@/pages/ComposerPage";
import { CodeExportPage } from "@/pages/CodeExportPage";
import { DEFAULT_COMPOSER_STATE } from "@/lib/compose";
import type { ComposerState } from "@/lib/compose";
import type { View } from "@/types/view";

export function App() {
  const [view, setView] = useState<View>("playground");
  const [composerState, setComposerState] = useState<ComposerState>(DEFAULT_COMPOSER_STATE);
  const { history, save, remove, clear } = useCodeHistory();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Sidebar view={view} onSelect={setView} theme={theme} onToggleTheme={toggleTheme} />
      <main className="flex-1 overflow-y-auto p-8">
        {view === "playground" && <ComponentPlaygroundPage onSave={save} />}
        {view === "templates" && <TemplateMakerPage onSave={save} />}
        {view === "composer" && <ComposerPage state={composerState} setState={setComposerState} onSave={save} />}
        {view === "export" && <CodeExportPage history={history} onRemove={remove} onClear={clear} />}
      </main>
    </div>
  );
}
