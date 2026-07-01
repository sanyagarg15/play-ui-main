import { useMemo, useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { ControlsPanel } from "@/components/ControlsPanel";
import { cn } from "@/lib/cn";
import { defaultValues } from "@/types/playground";
import type { ControlValues, PlaygroundItem } from "@/types/playground";
import type { HistorySource } from "@/types/history";

interface ItemPlaygroundProps {
  items: PlaygroundItem[];
  source: HistorySource;
  onSave: (source: HistorySource, name: string, code: string) => void;
}

export function ItemPlayground({ items, source, onSave }: ItemPlaygroundProps) {
  const [selected, setSelected] = useState<PlaygroundItem>(items[0]);
  const [values, setValues] = useState<ControlValues>(() => defaultValues(items[0].controls));

  function selectItem(item: PlaygroundItem) {
    setSelected(item);
    setValues(defaultValues(item.controls));
  }

  function updateValue(key: string, value: string | boolean) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  const code = useMemo(() => selected.generateCode(values), [selected, values]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[200px_1fr]">
      <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => selectItem(item)}
            className={cn(
              "shrink-0 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
              item.id === selected.id
                ? "bg-violet-600 text-white"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800",
            )}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="min-w-0 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{selected.name}</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{selected.description}</p>
        </div>

        <div className="flex min-h-[180px] items-center justify-center overflow-x-auto rounded-xl border border-dashed border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/40">
          {selected.render(values)}
        </div>

        <ControlsPanel controls={selected.controls} values={values} onChange={updateValue} />

        <CodeBlock code={code} onSave={() => onSave(source, selected.name, code)} />
      </div>
    </div>
  );
}
