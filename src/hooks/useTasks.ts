"use client";

import useSWR from "swr";
import { useAPI } from "./useAPI";
import type { TasksResponse, TaskDetailResponse } from "@/lib/types";

export function useTasks(params?: {
  state?: string;
  limit?: number;
  offset?: number;
}) {
  const api = useAPI();
  const key = `tasks:${JSON.stringify(params ?? {})}`;

  const { data, error, isLoading, mutate } = useSWR<TasksResponse>(
    key,
    () => api.getTasks(params)
  );

  return { tasks: data, error, isLoading, mutate };
}

export function useTask(taskId: string | null) {
  const api = useAPI();

  const { data, error, isLoading, mutate } = useSWR<TaskDetailResponse>(
    taskId ? `task:${taskId}` : null,
    () => api.getTask(taskId!)
  );

  return { task: data, error, isLoading, mutate };
}
