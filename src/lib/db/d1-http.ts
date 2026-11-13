/**
 * D1 HTTP API shim — lets `npm run dev` (vite dev / Node.js) query the
 * remote Cloudflare D1 database using the REST API.
 *
 * Token resolution order:
 *   1. CLOUDFLARE_D1_TOKEN / CLOUDFLARE_API_TOKEN from .env
 *   2. wrangler's cached OAuth token (~/.wrangler/config/default.toml)
 *
 * In production the real Worker binding is used; this code path is never hit.
 */

import { readFileSync } from "fs";
import { join } from "path";

interface D1Meta {
  duration: number;
  changes_in: number;
  changes_out: number;
  last_row_id: number;
  served_by: string;
  rows_read: number;
  rows_written: number;
}

interface D1ResultLike<T = Record<string, unknown>> {
  results: T[];
  success: boolean;
  meta: D1Meta;
}

class HttpD1PreparedStatement {
  private params: unknown[] = [];
  constructor(
    private sql: string,
    private accountId: string,
    private databaseId: string,
    private apiToken: string,
  ) {}

  bind(...values: unknown[]): HttpD1PreparedStatement {
    this.params = values;
    return this;
  }

  private async execute<T = Record<string, unknown>>(): Promise<D1ResultLike<T>> {
    const url = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/d1/database/${this.databaseId}/query`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql: this.sql, params: this.params }),
    });
    const json = (await res.json()) as {
      result?: D1ResultLike<T>[];
      success: boolean;
      errors?: { message: string }[];
    };
    if (!json.success || !json.result?.length) {
      const msg = json.errors?.map((e) => e.message).join("; ") ?? "D1 HTTP query failed";
      throw new Error(msg);
    }
    return json.result[0]!;
  }

  async all<T = Record<string, unknown>>(): Promise<D1ResultLike<T>> {
    return this.execute<T>();
  }

  async first<T = Record<string, unknown>>(colName?: string): Promise<T | null> {
    const result = await this.execute<T>();
    if (!result.results.length) return null;
    if (colName) return (result.results[0] as Record<string, unknown>)[colName] as T;
    return result.results[0]!;
  }

  async run(): Promise<D1ResultLike> {
    return this.execute();
  }

  async raw<T = unknown[]>(options?: { columnNames: boolean }): Promise<T[]> {
    const result = await this.execute<Record<string, unknown>>();
    if (!result.results.length) return (options?.columnNames ? [[]] : []) as T[];
    const keys = Object.keys(result.results[0]!);
    const rows = result.results.map((r) => keys.map((k) => r[k]));
    if (options?.columnNames) return [keys, ...rows] as T[];
    return rows as T[];
  }
}

export class HttpD1Database {
  constructor(
    private accountId: string,
    private databaseId: string,
    private apiToken: string,
  ) {}

  prepare(query: string): HttpD1PreparedStatement {
    return new HttpD1PreparedStatement(query, this.accountId, this.databaseId, this.apiToken);
  }

  async batch<T = unknown>(statements: HttpD1PreparedStatement[]): Promise<D1ResultLike<T>[]> {
    const results: D1ResultLike<T>[] = [];
    for (const stmt of statements) {
      results.push(await stmt.all<T>());
    }
    return results;
  }

  async exec(query: string): Promise<D1ResultLike> {
    return this.prepare(query).run();
  }

  async dump(): Promise<ArrayBuffer> {
    throw new Error("dump() is not supported via HTTP API");
  }
}

function readWranglerOAuthToken(): string | null {
  const configPaths = [
    process.env["APPDATA"] && join(process.env["APPDATA"], "xdg.config", ".wrangler", "config", "default.toml"),
    process.env["XDG_CONFIG_HOME"] && join(process.env["XDG_CONFIG_HOME"], ".wrangler", "config", "default.toml"),
    process.env["HOME"] && join(process.env["HOME"], ".wrangler", "config", "default.toml"),
  ].filter(Boolean) as string[];

  for (const configPath of configPaths) {
    try {
      const content = readFileSync(configPath, "utf-8");
      const match = content.match(/oauth_token\s*=\s*"([^"]+)"/);
      if (match?.[1]) return match[1];
    } catch {
      // file doesn't exist at this path, try next
    }
  }
  return null;
}

export function createHttpD1(): D1Database | null {
  const accountId = process.env["CLOUDFLARE_ACCOUNT_ID"];
  const databaseId = process.env["CLOUDFLARE_D1_DATABASE_ID"];

  if (!accountId || !databaseId) return null;

  // Prefer wrangler's cached OAuth token (from `wrangler login`) because the
  // .env cfut_ token does not authenticate against the D1 REST API.
  const apiToken =
    readWranglerOAuthToken() ||
    process.env["CLOUDFLARE_D1_TOKEN"] ||
    process.env["CLOUDFLARE_API_TOKEN"];

  if (!apiToken) return null;

  return new HttpD1Database(accountId, databaseId, apiToken) as unknown as D1Database;
}
