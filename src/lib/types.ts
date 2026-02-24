// ============================================================
// Organization
// ============================================================

/** GET /org */
export interface OrgResponse {
  id: string;
  name: string;
  slug: string;
  plan: string;
  jira_connected: boolean;
  github_connected: boolean;
  ado_connected: boolean;
  confidence_threshold: number;
  max_concurrent_tasks: number;
  auto_merge_enabled: boolean;
  jira_patchforge_label: string;
  total_prs_opened: number;
  total_tokens_used: number;
  total_cost_usd: number;
}

/** POST /org — request body */
export interface CreateOrgRequest {
  name: string;
}

/** POST /org — response (includes one-time API key) */
export interface CreateOrgResponse {
  id: string;
  name: string;
  slug: string;
  api_key: string;
  message: string;
}

/** PATCH /org — request body (all optional) */
export interface UpdateOrgRequest {
  name?: string;
  confidence_threshold?: number;
  max_concurrent_tasks?: number;
  auto_merge_enabled?: boolean;
  jira_patchforge_label?: string;
}

/** Generic mutation response */
export interface StatusResponse {
  status: string;
}

// ============================================================
// Integrations
// ============================================================

/** POST /org/connect/jira — request body */
export interface ConnectJiraRequest {
  jira_domain: string;
  jira_email: string;
  jira_api_token: string;
}

/** POST /org/connect/jira — response */
export interface ConnectJiraResponse {
  status: string;
  jira_domain: string;
  webhook_secret: string;
}

/** POST /org/connect/github — request body */
export interface ConnectGitHubRequest {
  installation_id: number;
}

/** POST /org/connect/github — response */
export interface ConnectGitHubResponse {
  status: string;
  installation_id: number;
}

// ============================================================
// Repositories
// ============================================================

export interface Repo {
  id: string;
  github_url: string;
  default_branch: string;
  index_status: "PENDING" | "INDEXING" | "READY" | "FAILED" | "STALE";
}

/** GET /org/repos */
export interface ReposResponse {
  repos: Repo[];
}

/** POST /org/repos/{owner}/{repo}/enable — response */
export interface EnableRepoResponse {
  status: string;
  github_url: string;
}

// ============================================================
// API Keys
// ============================================================

export interface ApiKeyItem {
  id: string;
  name: string;
  key_prefix: string;
  scopes: string[];
  created_at: string | null;
  last_used_at: string | null;
}

/** GET /org/api-keys */
export interface ApiKeysResponse {
  keys: ApiKeyItem[];
}

/** POST /org/api-keys — request body */
export interface CreateApiKeyRequest {
  name: string;
  scopes?: string[];
}

/** POST /org/api-keys — response (includes one-time full key) */
export interface CreateApiKeyResponse {
  id: string;
  name: string;
  key: string;
  key_prefix: string;
  scopes: string[];
  message: string;
}

// ============================================================
// Usage
// ============================================================

export type UsagePeriod = "7d" | "30d" | "90d" | "all";

/** GET /org/usage?period= */
export interface UsageResponse {
  period: string;
  prs_opened: number;
  total_runs: number;
  tokens_used: number;
  cost_usd: number;
}

// ============================================================
// Tasks
// ============================================================

export type TaskState =
  | "ASSIGNED"
  | "ANALYZING"
  | "NEEDS_CLARIFICATION"
  | "PLANNING"
  | "CODING"
  | "TESTING"
  | "ITERATING"
  | "PR_OPENED"
  | "WAITING_FOR_REVIEW"
  | "COMPLETED"
  | "FAILED";

export type TaskPriority =
  | "P0_CRITICAL"
  | "P1_HIGH"
  | "P2_MEDIUM"
  | "P3_LOW";

export type TaskSource =
  | "AZURE_BOARDS"
  | "ERROR_TRACKING"
  | "SUPPORT_TICKET"
  | "MANUAL";

export interface TaskSummary {
  id: string;
  source: string;
  source_id: string;
  title: string;
  priority: string;
  state: string;
  pr_url: string | null;
  assigned_at: string | null;
  completed_at: string | null;
}

/** GET /org/tasks */
export interface TasksResponse {
  tasks: TaskSummary[];
  total: number;
  limit: number;
  offset: number;
}

export interface AgentRun {
  id: string;
  state_transitions: unknown[];
  llm_calls: unknown[];
  tokens_used: number;
  cost_estimate: number;
  pr_url: string | null;
  started_at: string | null;
  finished_at: string | null;
}

/** GET /org/tasks/{task_id} */
export interface TaskDetailResponse {
  id: string;
  source: string;
  source_id: string;
  title: string;
  description: string;
  priority: string;
  state: string;
  branch_name: string | null;
  pr_url: string | null;
  assigned_at: string | null;
  completed_at: string | null;
  runs: AgentRun[];
}
