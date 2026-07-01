import { Trash2 } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import type { HistoryEntry } from "@/types/history";

const SOURCE_LABEL: Record<HistoryEntry["source"], string> = {
  component: "Component",
  template: "Template",
  composer: "Composer",
};

interface CodeExportPageProps {
  history: HistoryEntry[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function CodeExportPage({ history, onRemove, onClear }: CodeExportPageProps) {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Code Export</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Snippets you saved from the playground, template maker and composer.
          </p>
        </div>
        {history.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Clear all
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50 p-10 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/40">
          Nothing saved yet. Hit "Save" on any generated snippet to see it here.
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((entry) => (
            <div key={entry.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{entry.name}</span>
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {SOURCE_LABEL[entry.source]}
                  </span>
                  <span className="text-xs text-zinc-400 dark:text-zinc-600">
                    {new Date(entry.savedAt).toLocaleString()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(entry.id)}
                  className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-red-500 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <CodeBlock code={entry.code} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
