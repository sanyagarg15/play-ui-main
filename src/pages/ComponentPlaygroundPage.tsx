import { ItemPlayground } from "@/components/ItemPlayground";
import { componentRegistry } from "@/lib/componentRegistry";
import type { HistorySource } from "@/types/history";

interface ComponentPlaygroundPageProps {
  onSave: (source: HistorySource, name: string, code: string) => void;
}

export function ComponentPlaygroundPage({ onSave }: ComponentPlaygroundPageProps) {
  return <ItemPlayground items={componentRegistry} source="component" onSave={onSave} />;
}
