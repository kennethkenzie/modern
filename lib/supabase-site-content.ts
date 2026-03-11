import { mergeFrontendData } from "@/lib/frontend-data-merge";
import type { FrontendData } from "@/lib/frontend-data";

const SITE_CONTENT_TABLE = "site_settings";
const FRONTEND_DATA_KEY = "frontend_data";

type SupabaseRow = {
  key: string;
  value: unknown;
};

function getSupabaseUrl() {
  return process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
}

function getReadKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

function getWriteKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY;
}

function buildHeaders(apiKey: string, extra?: HeadersInit): HeadersInit {
  return {
    apikey: apiKey,
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseUrl() && getReadKey());
}

export async function readFrontendDataFromSupabase(): Promise<FrontendData | null> {
  const url = getSupabaseUrl();
  const apiKey = getReadKey();
  if (!url || !apiKey) return null;

  const response = await fetch(
    `${url}/rest/v1/${SITE_CONTENT_TABLE}?key=eq.${FRONTEND_DATA_KEY}&select=value&limit=1`,
    {
      headers: buildHeaders(apiKey),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Supabase read failed with ${response.status}`);
  }

  const rows = (await response.json()) as SupabaseRow[];
  return rows[0] ? mergeFrontendData(rows[0].value) : null;
}

export async function writeFrontendDataToSupabase(data: FrontendData) {
  const url = getSupabaseUrl();
  const apiKey = getWriteKey();
  if (!url || !apiKey) {
    throw new Error("Supabase service role credentials are missing.");
  }

  const response = await fetch(
    `${url}/rest/v1/${SITE_CONTENT_TABLE}?on_conflict=key`,
    {
      method: "POST",
      headers: buildHeaders(apiKey, {
        Prefer: "resolution=merge-duplicates,return=representation",
      }),
      body: JSON.stringify([
        {
          key: FRONTEND_DATA_KEY,
          value: data,
          description: "Serialized storefront and admin-managed frontend content",
        },
      ]),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Supabase write failed with ${response.status}`);
  }

  const rows = (await response.json()) as SupabaseRow[];
  return rows[0] ? mergeFrontendData(rows[0].value) : data;
}
