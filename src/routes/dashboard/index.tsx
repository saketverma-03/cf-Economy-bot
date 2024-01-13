import Base from "@/views/components/Base";
import Dashboard from "@/views/pages/Dashboard";
import { Elysia } from "elysia";


export const dashboardRoute = new Elysia().get("/dashboard", (ctx) => {
  const { headers } = ctx;
  if (headers["HX-Boosted"]) {
    return <Dashboard />;
  }
  return (
    <Base>
      <Dashboard />
    </Base>
  );
});
