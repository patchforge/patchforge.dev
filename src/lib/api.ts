import type {
  OrgResponse,
  CreateOrgRequest,
  CreateOrgResponse,
  UpdateOrgRequest,
  StatusResponse,
  ConnectJiraRequest,
  ConnectJiraResponse,
  ConnectGitHubRequest,
  ConnectGitHubResponse,
  ReposResponse,
  EnableRepoResponse,
  ApiKeysResponse,
  CreateApiKeyRequest,
  CreateApiKeyResponse,
  UsagePeriod,
  UsageResponse,
  TasksResponse,
  TaskDetailResponse,
} from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export class ApiError extends Error {
  status: number;
  detail: string;

  constructor(status: number, detail: string) {
    super(detail);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }
}

export class PatchForgeAPI {
  private getToken: () => Promise<string | null>;

  constructor(getToken: () => Promise<string | null>) {
    this.getToken = getToken;
  }

  private async request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      let detail = `Request failed with status ${res.status}`;
      try {
        const body = await res.json();
        if (body.detail) detail = body.detail;
      } catch {
        // response body was not JSON
      }
      throw new ApiError(res.status, detail);
    }

    // Handle 204 No Content
    if (res.status === 204) {
      return undefined as T;
    }

    return res.json() as Promise<T>;
  }

  // ---- Organization ----

  getOrg(): Promise<OrgResponse> {
    return this.request("/org");
  }

  createOrg(body: CreateOrgRequest): Promise<CreateOrgResponse> {
    return this.request("/org", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  updateOrg(body: UpdateOrgRequest): Promise<StatusResponse> {
    return this.request("/org", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  // ---- Integrations ----

  connectJira(body: ConnectJiraRequest): Promise<ConnectJiraResponse> {
    return this.request("/org/connect/jira", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  disconnectJira(): Promise<StatusResponse> {
    return this.request("/org/disconnect/jira", {
      method: "DELETE",
    });
  }

  connectGitHub(body: ConnectGitHubRequest): Promise<ConnectGitHubResponse> {
    return this.request("/org/connect/github", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  disconnectGitHub(): Promise<StatusResponse> {
    return this.request("/org/disconnect/github", {
      method: "DELETE",
    });
  }

  // ---- Repositories ----

  getRepos(): Promise<ReposResponse> {
    return this.request("/org/repos");
  }

  enableRepo(owner: string, repo: string): Promise<EnableRepoResponse> {
    return this.request(
      `/org/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/enable`,
      { method: "POST" }
    );
  }

  disableRepo(owner: string, repo: string): Promise<StatusResponse> {
    return this.request(
      `/org/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/disable`,
      { method: "DELETE" }
    );
  }

  // ---- API Keys ----

  getApiKeys(): Promise<ApiKeysResponse> {
    return this.request("/org/api-keys");
  }

  createApiKey(body: CreateApiKeyRequest): Promise<CreateApiKeyResponse> {
    return this.request("/org/api-keys", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  revokeApiKey(keyId: string): Promise<StatusResponse> {
    return this.request(`/org/api-keys/${keyId}`, {
      method: "DELETE",
    });
  }

  // ---- Usage ----

  getUsage(period: UsagePeriod = "all"): Promise<UsageResponse> {
    return this.request(`/org/usage?period=${period}`);
  }

  // ---- Tasks ----

  getTasks(params?: {
    state?: string;
    limit?: number;
    offset?: number;
  }): Promise<TasksResponse> {
    const searchParams = new URLSearchParams();
    if (params?.state) searchParams.set("state", params.state);
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.offset) searchParams.set("offset", String(params.offset));
    const qs = searchParams.toString();
    return this.request(`/org/tasks${qs ? `?${qs}` : ""}`);
  }

  getTask(taskId: string): Promise<TaskDetailResponse> {
    return this.request(`/org/tasks/${taskId}`);
  }
}
