"use client";

import useSWR from "swr";
import { useAPI } from "./useAPI";
import type { UsagePeriod, UsageResponse } from "@/lib/types";

export function useUsage(period: UsagePeriod = "all") {
  const api = useAPI();

  const { data, error, isLoading, mutate } = useSWR<UsageResponse>(
    `usage:${period}`,
    () => api.getUsage(period)
  );

  return { usage: data, error, isLoading, mutate };
}
