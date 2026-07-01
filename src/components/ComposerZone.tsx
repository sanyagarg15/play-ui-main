import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ComposerBlockCard } from "@/components/ComposerBlockCard";
import { componentRegistry } from "@/lib/componentRegistry";
import { cn } from "@/lib/cn";
import type { ComposerBlock } from "@/lib/compose";

interface ComposerZoneProps {
  id: string;
  label: string;
  blocks: ComposerBlock[];
  expandedId: string | null;
  onToggleExpanded: (instanceId: string) => void;
  onRemove: (instanceId: string) => void;
  onChange: (instanceId: string, key: string, value: string | boolean) => void;
  onAddComponent: (zoneId: string, itemId: string) => void;
}

export function ComposerZone({
  id,
  label,
  blocks,
  expandedId,
  onToggleExpanded,
  onRemove,
  onChange,
  onAddComponent,
}: ComposerZoneProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</span>
        <select
          value=""
          onChange={(event) => {
            if (event.target.value) {
              onAddComponent(id, event.target.value);
              event.target.value = "";
            }
          }}
          className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs text-zinc-700 focus:border-violet-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
        >
          <option value="">+ Add component</option>
          {componentRegistry.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <SortableContext items={blocks.map((block) => block.instanceId)} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={cn(
            "flex min-h-[88px] flex-1 flex-col gap-2 rounded-lg border border-dashed p-2 transition-colors",
            isOver ? "border-violet-500 bg-violet-500/5" : "border-zinc-200 dark:border-zinc-800",
          )}
        >
          {blocks.length === 0 && (
            <p className="flex flex-1 items-center justify-center text-center text-xs text-zinc-400 dark:text-zinc-600">
              Drop components here
            </p>
          )}
          {blocks.map((block) => (
            <ComposerBlockCard
              key={block.instanceId}
              block={block}
              expanded={expandedId === block.instanceId}
              onToggleExpanded={() => onToggleExpanded(block.instanceId)}
              onRemove={() => onRemove(block.instanceId)}
              onChange={(key, value) => onChange(block.instanceId, key, value)}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
