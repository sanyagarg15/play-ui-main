import { useState } from "react";
import { Check, Copy, Save } from "lucide-react";

interface CodeBlockProps {
  code: string;
  onSave?: () => void;
}

export function CodeBlock({ code, onSave }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleSave() {
    onSave?.();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-100/60 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/60">
        <span className="text-xs font-medium text-zinc-500">Generated code</span>
        <div className="flex gap-2">
          {onSave && (
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              {saved ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Save className="h-3.5 w-3.5" />}
              {saved ? "Saved" : "Save"}
            </button>
          )}
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <pre className="max-h-96 overflow-auto p-4 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}
