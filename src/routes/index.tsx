import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Aleix Bosch Pérez — Analista de economía, empresas e instituciones" },
      { name: "description", content: "Portfolio profesional de Aleix Bosch Pérez. Economía, empresas, mercados e instituciones." },
      { property: "og:title", content: "Aleix Bosch Pérez — Analista de economía, empresas e instituciones" },
      { property: "og:description", content: "Portfolio profesional de Aleix Bosch Pérez. Economía, empresas, mercados e instituciones." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  useEffect(() => {
    window.location.replace("/index.html");
  }, []);
  return null;
}
