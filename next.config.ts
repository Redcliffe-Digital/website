import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Produce a fully static site in ./out so it can be hosted on S3 + CloudFront
  // (or any static host) with no Node runtime. See NEXT_STEPS.md.
  output: 'export',

  // Static export cannot use the Next.js image optimisation server, so serve
  // images as-is. We only ship inline SVG, so this is a safe default.
  images: {
    unoptimized: true,
  },

  // Emit /what-we-do/index.html rather than /what-we-do.html. This is the
  // friendliest layout for raw S3 static website hosting and keeps links tidy.
  trailingSlash: true,

  // Surface mistakes early rather than at runtime.
  reactStrictMode: true,
}

export default nextConfig
