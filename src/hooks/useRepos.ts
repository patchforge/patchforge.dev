"use client";

import useSWR from "swr";
import { useAPI } from "./useAPI";
import type { ReposResponse } from "@/lib/types";

export function useRepos() {
  const api = useAPI();

  const { data, error, isLoading, mutate } = useSWR<ReposResponse>(
    "repos",
    () => api.getRepos()
  );

  return { repos: data?.repos ?? [], error, isLoading, mutate };
}
