"use client";

import { useMemo } from "react";
import { useAuth } from "@clerk/nextjs";
import { PatchForgeAPI } from "@/lib/api";

export function useAPI(): PatchForgeAPI {
  const { getToken } = useAuth();
  return useMemo(() => new PatchForgeAPI(getToken), [getToken]);
}
