import { createFileRoute } from "@tanstack/react-router";
import { WorkflowInbox } from "@/components/admin/WorkflowInbox";
import { adminHead } from "@/lib/admin-ui";
export const Route = createFileRoute("/_admin/messages")({ head: () => adminHead("Contact Messages"), component: () => <WorkflowInbox kind="messages"/> });
