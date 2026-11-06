<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Admin server functions must use requireSupabaseAuth and verifyAdmin with the authenticated RLS client; owner-controlled role provisioning is never exposed as a first-user claim.
- Administrative inbox workflows use shared RecordList and WorkflowInbox controls, with additive workflow fields and narrow admin policies, to keep error, pagination and mutation states consistent.
- Content and course editors use ContentManager; upload pending callbacks block saving incomplete uploads and course titles stay mapped to the existing locale columns.
- Public content-image proxy uses publishable credentials with an opaque-key fetch shim; authenticated uploads use the caller's RLS client so Cloudflare deployments do not depend on privileged credentials for ordinary CMS work.
- Orders capture purchase title and unit price in an insert trigger and ordered books cannot be deleted, preserving historical orders without granting public order reads.
- Public order/enrollment server functions use a fresh sessionless publishable client with opaque-key support; never reuse the browser auth client on Workers.
- Admin submission lists fetch all database pages in stable date/id order and periodically refresh; course payment requests are shared across both course administration surfaces so no application path is hidden.
- Admin user management lives at /admin/users backed by public.profiles (email lookup, synced from auth.users trigger) and admin-only SELECT/INSERT/DELETE policies on user_roles; admins resolve accounts by email through profiles, never by querying auth.users directly, and the server function blocks self-removal.
