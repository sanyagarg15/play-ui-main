import { cn } from "@/lib/cn";
import type { ControlDef, ControlValues } from "@/types/playground";

interface ControlsPanelProps {
  controls: ControlDef[];
  values: ControlValues;
  onChange: (key: string, value: string | boolean) => void;
}

export function ControlsPanel({ controls, values, onChange }: ControlsPanelProps) {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40 sm:grid-cols-2">
      {controls.map((control) => (
        <label key={control.key} className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">{control.label}</span>
          {control.type === "text" && (
            <input
              value={values[control.key] as string}
              placeholder={control.placeholder}
              onChange={(event) => onChange(control.key, event.target.value)}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 focus:border-violet-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            />
          )}
          {control.type === "select" && (
            <select
              value={values[control.key] as string}
              onChange={(event) => onChange(control.key, event.target.value)}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 focus:border-violet-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            >
              {control.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
          {control.type === "boolean" && (
            <button
              type="button"
              onClick={() => onChange(control.key, !values[control.key])}
              className={cn(
                "flex h-8 w-14 items-center rounded-full px-1 transition-colors",
                values[control.key] ? "justify-end bg-violet-600" : "justify-start bg-zinc-300 dark:bg-zinc-700",
              )}
            >
              <span className="h-6 w-6 rounded-full bg-white" />
            </button>
          )}
        </label>
      ))}
    </div>
  );
}
