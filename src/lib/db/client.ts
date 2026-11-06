import { drizzle } from "drizzle-orm/d1";
import * as schema from "../../../drizzle/schema/index";
import { getCfEnv } from "./cf-env";

export { getCfEnv };

export function getDb() {
  const d1 = getCfEnv().DB;
  if (!d1) {
    throw new Error(
      'D1 binding "DB" not found. ' +
      'Check that wrangler.toml has [[d1_databases]] with binding = "DB" ' +
      'and that you are running via `wrangler dev` or deployed to Cloudflare Workers.'
    );
  }
  return drizzle(d1, { schema });
}

export type Db = ReturnType<typeof getDb>;
