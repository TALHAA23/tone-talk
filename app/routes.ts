import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("gen-alpha", "routes/gen-alpha.tsx"),
  route("sarcastic-teenager", "routes/sarcastic-teenager.tsx"),
  route("5-years-old", "routes/5-years-old.tsx"),
] satisfies RouteConfig;
