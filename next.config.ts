import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A self-contained server (server.js + only the node_modules it uses) for
  // talktogenie.ai on srv2; .github/workflows/deploy.yml builds and publishes it.
  output: "standalone",
  // Next otherwise writes AGENTS.md / CLAUDE.md into the repo on dev startup.
  agentRules: false,
  // The dev server treats 127.0.0.1 as cross-origin unless it is listed here,
  // which blocks hydration of client components.
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      {
        source: "/pitch",
        destination: "/investors",
        permanent: false,
      },
      {
        source: "/integrations",
        destination: "/apps",
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
