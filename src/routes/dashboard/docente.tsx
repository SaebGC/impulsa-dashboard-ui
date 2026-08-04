import { createFileRoute } from "@tanstack/react-router";
import { DocenteDashboard } from "@/pages/dashboards/DocenteDashboard";

export const Route = createFileRoute("/dashboard/docente")({
  component: DocenteDashboard,
});
