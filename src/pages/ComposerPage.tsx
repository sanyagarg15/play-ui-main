import { useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { CodeBlock } from "@/components/CodeBlock";
import { ControlsPanel } from "@/components/ControlsPanel";
import { ComposerZone } from "@/components/ComposerZone";
import { componentRegistry } from "@/lib/componentRegistry";
import { activeZoneIds, composeLayoutCode, mainColumnIds } from "@/lib/compose";
import type { ComposerBlock, ComposerState } from "@/lib/compose";
import { defaultValues } from "@/types/playground";
import type { ControlDef } from "@/types/playground";
import type { HistorySource } from "@/types/history";

const REGION_CONTROLS: ControlDef[] = [
  { type: "boolean", key: "header", label: "Header", default: true },
  { type: "boolean", key: "leftSidebar", label: "Left sidebar", default: true },
  { type: "boolean", key: "rightSidebar", label: "Right sidebar", default: false },
  { type: "boolean", key: "footer", label: "Footer", default: true },
  {
    type: "select",
    key: "sidebarWidth",
    label: "Sidebar width",
    default: "w-56",
    options: [
      { label: "Narrow", value: "w-48" },
      { label: "Normal", value: "w-56" },
      { label: "Wide", value: "w-72" },
    ],
  },
  {
    type: "select",
    key: "mainColumns",
    label: "Main columns",
    default: "2",
    options: [
      { label: "1 column", value: "1" },
      { label: "2 columns", value: "2" },
      { label: "3 columns", value: "3" },
    ],
  },
];

const ZONE_LABELS: Record<string, string> = {
  header: "Header",
  leftSidebar: "Left sidebar",
  rightSidebar: "Right sidebar",
  footer: "Footer",
};

function zoneLabel(zoneId: string, mainColumnCount: number): string {
  if (ZONE_LABELS[zoneId]) return ZONE_LABELS[zoneId];
  const index = mainColumnIds(mainColumnCount).indexOf(zoneId);
  return mainColumnCount > 1 ? `Main · Column ${index + 1}` : "Main";
}

interface ComposerPageProps {
  state: ComposerState;
  setState: Dispatch<SetStateAction<ComposerState>>;
  onSave: (source: HistorySource, name: string, code: string) => void;
}

export function ComposerPage({ state, setState, onSave }: ComposerPageProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  const zoneIds = useMemo(() => activeZoneIds(state.config), [state.config]);

  function findContainerOf(id: string): string | undefined {
    if (zoneIds.includes(id)) return id;
    return zoneIds.find((zoneId) => (state.zones[zoneId] ?? []).some((block) => block.instanceId === id));
  }

  function updateConfig(key: string, value: string | boolean) {
    setState((prev) => {
      const config = { ...prev.config, [key]: value };
      let zones = prev.zones;

      if (key === "mainColumns") {
        const nextCount = Number(value);
        const prevCount = Number(prev.config.mainColumns);
        if (nextCount < prevCount) {
          const survivingIds = mainColumnIds(nextCount);
          const removedIds = mainColumnIds(prevCount).slice(nextCount);
          const overflow = removedIds.flatMap((id) => prev.zones[id] ?? []);
          const lastId = survivingIds[survivingIds.length - 1];
          zones = { ...prev.zones };
          for (const id of removedIds) delete zones[id];
          zones[lastId] = [...(zones[lastId] ?? []), ...overflow];
        }
      }

      return { config: config as typeof prev.config, zones };
    });
  }

  function addBlock(zoneId: string, itemId: string) {
    const item = componentRegistry.find((component) => component.id === itemId);
    if (!item) return;
    const instanceId = crypto.randomUUID();
    const block: ComposerBlock = { instanceId, item, values: defaultValues(item.controls) };
    setState((prev) => ({
      ...prev,
      zones: { ...prev.zones, [zoneId]: [...(prev.zones[zoneId] ?? []), block] },
    }));
    setExpandedId(instanceId);
  }

  function removeBlock(instanceId: string) {
    setState((prev) => {
      const zones = { ...prev.zones };
      const zoneId = zoneIds.find((id) => (zones[id] ?? []).some((block) => block.instanceId === instanceId));
      if (zoneId) zones[zoneId] = zones[zoneId].filter((block) => block.instanceId !== instanceId);
      return { ...prev, zones };
    });
  }

  function updateBlockValue(instanceId: string, key: string, value: string | boolean) {
    setState((prev) => {
      const zones = { ...prev.zones };
      const zoneId = zoneIds.find((id) => (zones[id] ?? []).some((block) => block.instanceId === instanceId));
      if (zoneId) {
        zones[zoneId] = zones[zoneId].map((block) =>
          block.instanceId === instanceId ? { ...block, values: { ...block.values, [key]: value } } : block,
        );
      }
      return { ...prev, zones };
    });
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeContainer = findContainerOf(active.id as string);
    const overContainer = findContainerOf(over.id as string);
    if (!activeContainer || !overContainer || activeContainer === overContainer) return;

    setState((prev) => {
      const activeItems = prev.zones[activeContainer] ?? [];
      const overItems = prev.zones[overContainer] ?? [];
      const activeIndex = activeItems.findIndex((block) => block.instanceId === active.id);
      if (activeIndex < 0) return prev;
      const overIndex = overItems.findIndex((block) => block.instanceId === over.id);
      const insertAt = overIndex >= 0 ? overIndex : overItems.length;
      const movingBlock = activeItems[activeIndex];

      return {
        ...prev,
        zones: {
          ...prev.zones,
          [activeContainer]: activeItems.filter((block) => block.instanceId !== active.id),
          [overContainer]: [...overItems.slice(0, insertAt), movingBlock, ...overItems.slice(insertAt)],
        },
      };
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;
    const container = findContainerOf(active.id as string);
    if (!container) return;

    setState((prev) => {
      const items = prev.zones[container] ?? [];
      const activeIndex = items.findIndex((block) => block.instanceId === active.id);
      const overIndex = items.findIndex((block) => block.instanceId === over.id);
      if (activeIndex < 0 || overIndex < 0 || activeIndex === overIndex) return prev;
      return { ...prev, zones: { ...prev.zones, [container]: arrayMove(items, activeIndex, overIndex) } };
    });
  }

  const activeBlock = activeId
    ? Object.values(state.zones)
        .flat()
        .find((block) => block.instanceId === activeId)
    : null;

  const code = useMemo(() => composeLayoutCode(state.config, state.zones), [state]);

  const mainColumnCount = Number(state.config.mainColumns);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Composer</h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Turn on the regions you need, then add components into header, sidebars, main columns or the footer. Drag
          blocks between regions to rearrange the page.
        </p>
      </div>

      <ControlsPanel
        controls={REGION_CONTROLS}
        values={state.config as unknown as Record<string, string | boolean>}
        onChange={updateConfig}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/40">
          {state.config.header && (
            <ComposerZone
              id="header"
              label={zoneLabel("header", mainColumnCount)}
              blocks={state.zones.header ?? []}
              expandedId={expandedId}
              onToggleExpanded={(id) => setExpandedId((current) => (current === id ? null : id))}
              onRemove={removeBlock}
              onChange={updateBlockValue}
              onAddComponent={addBlock}
            />
          )}

          <div className="flex flex-col gap-3 lg:flex-row">
            {state.config.leftSidebar && (
              <div className="flex lg:w-56 lg:shrink-0">
                <ComposerZone
                  id="leftSidebar"
                  label={zoneLabel("leftSidebar", mainColumnCount)}
                  blocks={state.zones.leftSidebar ?? []}
                  expandedId={expandedId}
                  onToggleExpanded={(id) => setExpandedId((current) => (current === id ? null : id))}
                  onRemove={removeBlock}
                  onChange={updateBlockValue}
                  onAddComponent={addBlock}
                />
              </div>
            )}

            <div className="flex flex-1 flex-col gap-3 sm:flex-row">
              {mainColumnIds(mainColumnCount).map((colId) => (
                <ComposerZone
                  key={colId}
                  id={colId}
                  label={zoneLabel(colId, mainColumnCount)}
                  blocks={state.zones[colId] ?? []}
                  expandedId={expandedId}
                  onToggleExpanded={(id) => setExpandedId((current) => (current === id ? null : id))}
                  onRemove={removeBlock}
                  onChange={updateBlockValue}
                  onAddComponent={addBlock}
                />
              ))}
            </div>

            {state.config.rightSidebar && (
              <div className="flex lg:w-64 lg:shrink-0">
                <ComposerZone
                  id="rightSidebar"
                  label={zoneLabel("rightSidebar", mainColumnCount)}
                  blocks={state.zones.rightSidebar ?? []}
                  expandedId={expandedId}
                  onToggleExpanded={(id) => setExpandedId((current) => (current === id ? null : id))}
                  onRemove={removeBlock}
                  onChange={updateBlockValue}
                  onAddComponent={addBlock}
                />
              </div>
            )}
          </div>

          {state.config.footer && (
            <ComposerZone
              id="footer"
              label={zoneLabel("footer", mainColumnCount)}
              blocks={state.zones.footer ?? []}
              expandedId={expandedId}
              onToggleExpanded={(id) => setExpandedId((current) => (current === id ? null : id))}
              onRemove={removeBlock}
              onChange={updateBlockValue}
              onAddComponent={addBlock}
            />
          )}
        </div>

        <DragOverlay>
          {activeBlock ? (
            <div className="rounded-lg border border-violet-500 bg-white px-3 py-2 text-sm font-medium text-zinc-900 shadow-lg dark:bg-zinc-900 dark:text-zinc-100">
              {activeBlock.item.name}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <CodeBlock code={code} onSave={() => onSave("composer", "Composed Page", code)} />
    </div>
  );
}
