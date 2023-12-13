// This file was automatically added by edgio init.
// You should commit this file to source control.
import { Router } from "@edgio/core/router";
import { nextRoutes } from "@edgio/next";

export default new Router()
  // NextRoutes automatically adds routes for all Next.js pages and their assets
  .use(nextRoutes)
  .match("/api/(.*)", {
    caching: {
      max_age: "86400s",
      stale_while_revalidate: "31536000s",
      ignore_origin_no_cache: [200],
    },
  })
  .match("/result/(.*)", {
    caching: {
      max_age: "86400s",
      stale_while_revalidate: "31536000s",
      ignore_origin_no_cache: [200],
    },
  });
