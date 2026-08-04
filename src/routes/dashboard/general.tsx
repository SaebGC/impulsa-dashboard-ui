import { createFileRoute } from "@tanstack/react-router";
import { GeneralDashboard } from "@/pages/dashboards/GeneralDashboard";

export const Route = createFileRoute("/dashboard/general")({
  component: GeneralDashboard,
});
