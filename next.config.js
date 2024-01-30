// This file was automatically added by edgio init.
// You should commit this file to source control.
const { withEdgio } = require("@edgio/next/config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: () => [
    {
      source: "/docs",
      destination: "/docs/api",
      permanent: false,
    },
  ],
};

const _preEdgioExport = nextConfig;

module.exports = (phase, config) =>
  withEdgio({
    ..._preEdgioExport,
    experimental: {
      // templates included into deployment
      outputFileTracingIncludes: {
        "/": ["./templates/**/*"],
      },
    },
  });
