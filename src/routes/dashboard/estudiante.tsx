import { createFileRoute } from "@tanstack/react-router";
import { EstudianteDashboard } from "@/pages/dashboards/EstudianteDashboard";

export const Route = createFileRoute("/dashboard/estudiante")({
  component: EstudianteDashboard,
});
