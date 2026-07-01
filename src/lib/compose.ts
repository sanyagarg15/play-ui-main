import { joinLines } from "@/lib/codegen";
import type { ControlValues, PlaygroundItem } from "@/types/playground";

export interface ComposerBlock {
  instanceId: string;
  item: PlaygroundItem;
  values: ControlValues;
}

export interface RegionConfig {
  header: boolean;
  leftSidebar: boolean;
  rightSidebar: boolean;
  footer: boolean;
  sidebarWidth: string;
  mainColumns: string;
}

export const DEFAULT_REGION_CONFIG: RegionConfig = {
  header: true,
  leftSidebar: true,
  rightSidebar: false,
  footer: true,
  sidebarWidth: "w-56",
  mainColumns: "2",
};

export interface ComposerState {
  config: RegionConfig;
  zones: Record<string, ComposerBlock[]>;
}

export const DEFAULT_COMPOSER_STATE: ComposerState = {
  config: DEFAULT_REGION_CONFIG,
  zones: {},
};

const GRID_COLS_CLASS: Record<string, string> = {
  "1": "grid-cols-1",
  "2": "grid-cols-2",
  "3": "grid-cols-3",
};

export function mainColumnIds(count: number): string[] {
  return Array.from({ length: count }, (_, i) => `main-${i}`);
}

export function activeZoneIds(config: RegionConfig): string[] {
  const ids: string[] = [];
  if (config.header) ids.push("header");
  if (config.leftSidebar) ids.push("leftSidebar");
  ids.push(...mainColumnIds(Number(config.mainColumns)));
  if (config.rightSidebar) ids.push("rightSidebar");
  if (config.footer) ids.push("footer");
  return ids;
}

function blockLines(blocks: ComposerBlock[], indent: string, imports: Set<string>): string[] {
  const lines: string[] = [];
  blocks.forEach((block, i) => {
    const code = block.item.generateCode(block.values);
    if (i > 0) lines.push("");
    lines.push(`${indent}{/* ${block.item.name} */}`);
    for (const line of code.split("\n")) {
      if (line.startsWith("import ")) {
        imports.add(line);
      } else if (line.trim().length > 0) {
        lines.push(`${indent}${line}`);
      }
    }
  });
  return lines;
}

export function composeLayoutCode(config: RegionConfig, zones: Record<string, ComposerBlock[]>): string {
  const hasAnyBlocks = Object.values(zones).some((list) => list.length > 0);
  if (!hasAnyBlocks) {
    return "// Add components to a region below to build your page.";
  }

  const imports = new Set<string>();
  const mainColumnCount = Number(config.mainColumns);

  const headerLines = config.header
    ? joinLines(
        `      <header className="flex flex-wrap items-center gap-4 border-b border-slate-800 px-6 py-3">`,
        ...blockLines(zones.header ?? [], "        ", imports),
        `      </header>`,
      )
    : null;

  const leftSidebarLines = config.leftSidebar
    ? joinLines(
        `        <aside className="${config.sidebarWidth} shrink-0 space-y-4 border-r border-slate-800 p-4">`,
        ...blockLines(zones.leftSidebar ?? [], "          ", imports),
        `        </aside>`,
      )
    : null;

  const rightSidebarLines = config.rightSidebar
    ? joinLines(
        `        <aside className="w-64 shrink-0 space-y-4 border-l border-slate-800 p-4">`,
        ...blockLines(zones.rightSidebar ?? [], "          ", imports),
        `        </aside>`,
      )
    : null;

  const footerLines = config.footer
    ? joinLines(
        `      <footer className="flex flex-wrap items-center gap-4 border-t border-slate-800 px-6 py-3">`,
        ...blockLines(zones.footer ?? [], "        ", imports),
        `      </footer>`,
      )
    : null;

  const columnBlocks = mainColumnIds(mainColumnCount).map((colId) =>
    joinLines(
      `            <div className="flex flex-col gap-4">`,
      ...blockLines(zones[colId] ?? [], "              ", imports),
      `            </div>`,
    ),
  );

  const mainLines = joinLines(
    `        <main className="flex-1 p-6">`,
    `          <div className="grid ${GRID_COLS_CLASS[config.mainColumns]} gap-4">`,
    columnBlocks.join("\n"),
    `          </div>`,
    `        </main>`,
  );

  return joinLines(
    imports.size > 0 ? `${[...imports].join("\n")}\n` : null,
    `export function ComposedPage() {`,
    `  return (`,
    `    <div className="flex min-h-screen flex-col bg-slate-950">`,
    headerLines,
    `      <div className="flex flex-1 flex-col lg:flex-row">`,
    leftSidebarLines,
    mainLines,
    rightSidebarLines,
    `      </div>`,
    footerLines,
    `    </div>`,
    `  );`,
    `}`,
  );
}
