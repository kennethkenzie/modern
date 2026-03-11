import {
  defaultFrontendData,
  type FrontendData,
} from "@/lib/frontend-data";

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge<T>(base: T, override: unknown): T {
  if (Array.isArray(base)) {
    return (Array.isArray(override) ? override : base) as T;
  }

  if (isRecord(base) && isRecord(override)) {
    const result: JsonRecord = { ...base };
    for (const [key, value] of Object.entries(override)) {
      result[key] = key in base ? deepMerge((base as JsonRecord)[key], value) : value;
    }
    return result as T;
  }

  return (override ?? base) as T;
}

export function cloneDefaultFrontendData(): FrontendData {
  return JSON.parse(JSON.stringify(defaultFrontendData)) as FrontendData;
}

export function mergeFrontendData(data: unknown): FrontendData {
  return deepMerge(cloneDefaultFrontendData(), data);
}
