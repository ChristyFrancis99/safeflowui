import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/graph")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard/cases" });
  },
});
