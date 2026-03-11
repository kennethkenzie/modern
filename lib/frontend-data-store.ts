"use client";

import type { FrontendData } from "@/lib/frontend-data";
import {
  cloneDefaultFrontendData,
  mergeFrontendData,
} from "@/lib/frontend-data-merge";

const KEY = "modern_frontend_data_v1";

function canUseStorage() {
  return typeof window !== "undefined";
}

function readLocalFrontendData(): FrontendData {
  if (!canUseStorage()) return cloneDefaultFrontendData();

  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return cloneDefaultFrontendData();
    return mergeFrontendData(JSON.parse(raw));
  } catch {
    return cloneDefaultFrontendData();
  }
}

function writeLocalFrontendData(data: FrontendData) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(KEY, JSON.stringify(data));
}

export function readFrontendData(): FrontendData {
  return readLocalFrontendData();
}

export async function fetchFrontendData(): Promise<FrontendData> {
  try {
    const response = await fetch("/api/frontend-data", {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }

    const payload = (await response.json()) as { data?: unknown };
    const data = mergeFrontendData(payload.data);
    writeLocalFrontendData(data);
    return data;
  } catch {
    return readLocalFrontendData();
  }
}

export async function writeFrontendData(data: FrontendData) {
  writeLocalFrontendData(data);

  try {
    const response = await fetch("/api/frontend-data", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const raw = await response.text();
      let message = "Failed to save frontend data.";

      if (raw) {
        try {
          const parsed = JSON.parse(raw) as { error?: string };
          message = parsed.error || message;
        } catch {
          message = raw;
        }
      }

      console.warn("Frontend data save fell back to local storage.", message);
    }
  } catch (error) {
    console.warn("Frontend data save fell back to local storage.", error);
  }

  if (canUseStorage()) {
    window.dispatchEvent(new Event("frontend-data:updated"));
  }
}

export async function resetFrontendData() {
  await writeFrontendData(cloneDefaultFrontendData());
}
