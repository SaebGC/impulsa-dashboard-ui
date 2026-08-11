import { createFileRoute } from "@tanstack/react-router";
import { InicioDashboard } from "@/pages/dashboards/InicioDashboard";

export const Route = createFileRoute("/dashboard/inicio")({
  component: InicioDashboard,
  head: () => ({
    meta: [
      { title: "Inicio · IMPULSA — Dashboard del salón" },
      {
        name: "description",
        content:
          "Panel de inicio de IMPULSA: temporada activa, actividad reciente del colegio y accesos rápidos a misiones, ranking y tu salón.",
      },
      { property: "og:title", content: "Inicio · IMPULSA — Dashboard del salón" },
      {
        property: "og:description",
        content:
          "Sigue la temporada, la actividad reciente y los accesos rápidos de tu salón en IMPULSA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
