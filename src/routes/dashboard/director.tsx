import { createFileRoute } from "@tanstack/react-router";
import { DirectorDashboard } from "@/pages/dashboards/DirectorDashboard";

export const Route = createFileRoute("/dashboard/director")({
  component: DirectorDashboard,
});
