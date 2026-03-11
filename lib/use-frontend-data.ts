"use client";

import { useEffect, useState } from "react";
import type { FrontendData } from "@/lib/frontend-data";
import { cloneDefaultFrontendData } from "@/lib/frontend-data-merge";
import { fetchFrontendData } from "@/lib/frontend-data-store";

export function useFrontendData() {
  const [data, setData] = useState<FrontendData>(() => cloneDefaultFrontendData());

  useEffect(() => {
    let active = true;

    const sync = async () => {
      const next = await fetchFrontendData();
      if (active) setData(next);
    };

    void sync();
    window.addEventListener("frontend-data:updated", sync);
    return () => {
      active = false;
      window.removeEventListener("frontend-data:updated", sync);
    };
  }, []);

  return data;
}
