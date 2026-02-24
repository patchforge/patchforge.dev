"use client";

import useSWR from "swr";
import { useAPI } from "./useAPI";
import type { OrgResponse } from "@/lib/types";
import { ApiError } from "@/lib/api";

export function useOrg() {
  const api = useAPI();

  const { data, error, isLoading, mutate } = useSWR<OrgResponse>(
    "org",
    () => api.getOrg(),
    {
      onErrorRetry: (err, _key, _config, revalidate, { retryCount }) => {
        // Don't retry on 403 — it means "no org", not a transient error
        if (err instanceof ApiError && err.status === 403) return;
        if (retryCount >= 3) return;
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );

  const needsOnboarding = error instanceof ApiError && error.status === 403;

  return {
    org: data,
    error: needsOnboarding ? null : error,
    needsOnboarding,
    isLoading,
    mutate,
  };
}
