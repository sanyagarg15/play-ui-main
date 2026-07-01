import { useCallback, useEffect, useState } from "react";
import type { HistoryEntry, HistorySource } from "@/types/history";

const STORAGE_KEY = "play-ui:history";

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as HistoryEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useCodeHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(() => loadHistory());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const save = useCallback((source: HistorySource, name: string, code: string) => {
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      source,
      name,
      code,
      savedAt: Date.now(),
    };
    setHistory((prev) => [entry, ...prev]);
    return entry;
  }, []);

  const remove = useCallback((id: string) => {
    setHistory((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const clear = useCallback(() => {
    setHistory([]);
  }, []);

  return { history, save, remove, clear };
}
