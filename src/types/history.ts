export type HistorySource = "component" | "template" | "composer";

export interface HistoryEntry {
  id: string;
  source: HistorySource;
  name: string;
  code: string;
  savedAt: number;
}
