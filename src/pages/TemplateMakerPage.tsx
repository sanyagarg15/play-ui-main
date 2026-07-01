import { ItemPlayground } from "@/components/ItemPlayground";
import { templateRegistry } from "@/lib/templateRegistry";
import type { HistorySource } from "@/types/history";

interface TemplateMakerPageProps {
  onSave: (source: HistorySource, name: string, code: string) => void;
}

export function TemplateMakerPage({ onSave }: TemplateMakerPageProps) {
  return <ItemPlayground items={templateRegistry} source="template" onSave={onSave} />;
}
