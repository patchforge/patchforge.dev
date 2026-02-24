"use client";

import useSWR from "swr";
import { useAPI } from "./useAPI";
import type { ApiKeysResponse } from "@/lib/types";

export function useAPIKeys() {
  const api = useAPI();

  const { data, error, isLoading, mutate } = useSWR<ApiKeysResponse>(
    "api-keys",
    () => api.getApiKeys()
  );

  return { keys: data?.keys ?? [], error, isLoading, mutate };
}
