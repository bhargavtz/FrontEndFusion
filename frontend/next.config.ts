import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      // Legacy static-site entry points.
      { source: "/index.html", destination: "/", permanent: true },
      {
        source: "/snippets/:slug.html",
        destination: "/snippets/:slug",
        permanent: true,
      },
      { source: "/learn/:slug", destination: "/docs/:slug", permanent: true },
      {
        source: "/resources/:slug.md",
        destination: "/docs/:slug",
        permanent: true,
      },
      {
        source: "/web-dev-learning-path/docs/:slug.md",
        destination: "/docs/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
