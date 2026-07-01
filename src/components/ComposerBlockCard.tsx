import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, GripVertical, Trash2 } from "lucide-react";
import { ControlsPanel } from "@/components/ControlsPanel";
import { cn } from "@/lib/cn";
import type { ComposerBlock } from "@/lib/compose";

interface ComposerBlockCardProps {
  block: ComposerBlock;
  expanded: boolean;
  onToggleExpanded: () => void;
  onRemove: () => void;
  onChange: (key: string, value: string | boolean) => void;
}

export function ComposerBlockCard({ block, expanded, onToggleExpanded, onRemove, onChange }: ComposerBlockCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.instanceId,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/60",
        isDragging && "opacity-50",
      )}
    >
      <div className="flex items-center gap-2 px-3 py-2">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab touch-none rounded-md p-1 text-zinc-400 hover:bg-zinc-100 active:cursor-grabbing dark:text-zinc-500 dark:hover:bg-zinc-800"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <button type="button" onClick={onToggleExpanded} className="flex flex-1 items-center gap-2 text-left">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{block.item.name}</span>
          <ChevronDown className={cn("h-4 w-4 text-zinc-500 transition-transform", expanded && "rotate-180")} />
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-red-500 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center justify-center border-t border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-950/40">
        {block.item.render(block.values)}
      </div>

      {expanded && (
        <div className="border-t border-zinc-200 p-3 dark:border-zinc-800">
          <ControlsPanel controls={block.item.controls} values={block.values} onChange={onChange} />
        </div>
      )}
    </div>
  );
}
