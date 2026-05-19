// src/lib/useDataFetch.ts
import { useState, useEffect } from "react";
import Papa from "papaparse";

/**
 * Fetch and parse a remote CSV file. Falls back to `fallback` on any error.
 * `cached: true` means we are showing fallback data (fetch failed or file missing).
 */
export function useCSV<T>(
  path: string,
  fallback: T[],
): { data: T[]; loading: boolean; cached: boolean } {
  const [data, setData] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);
  const [cached, setCached] = useState(false);

  useEffect(() => {
    Papa.parse<T>(path, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0 || results.data.length === 0) {
          setCached(true);
        } else {
          setData(results.data);
          setCached(false);
        }
        setLoading(false);
      },
      error: () => {
        setCached(true);
        setLoading(false);
      },
    });
  }, [path]);

  return { data, loading, cached };
}

/**
 * Fetch a JSON file. Falls back to `fallback` on any error.
 * `cached: true` means we are showing fallback data.
 */
export function useJSON<T>(
  path: string,
  fallback: T,
): { data: T; loading: boolean; cached: boolean } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [cached, setCached] = useState(false);

  useEffect(() => {
    fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then((json) => {
        setData(json);
        setCached(false);
        setLoading(false);
      })
      .catch(() => {
        setCached(true);
        setLoading(false);
      });
  }, [path]);

  return { data, loading, cached };
}

/**
 * Returns true if `lastUpdated` is within `maxAgeDays` of now.
 * Returns false if lastUpdated is null or the string is unparseable.
 */
export function isLiveData(
  lastUpdated: string | null,
  maxAgeDays = 7,
): boolean {
  if (!lastUpdated) return false;
  const ts = new Date(lastUpdated).getTime();
  if (isNaN(ts)) return false;
  return Date.now() - ts < maxAgeDays * 24 * 60 * 60 * 1000;
}

/**
 * Returns a human-readable "X ago" string from an ISO date string.
 */
export function timeSince(lastUpdated: string | null): string {
  if (!lastUpdated) return "unknown";
  const diff = Date.now() - new Date(lastUpdated).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
