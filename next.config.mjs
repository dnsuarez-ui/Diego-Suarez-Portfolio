/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Default deviceSizes caps out at 3840 — too small for the case-study
    // lightbox's "-hd" assets, which are exported at 7720px wide. Without a
    // step at that width, next/image's optimizer silently downsamples the
    // hd source back down to ~3840px (or less) before serving it.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 7720],
  },
}

export default nextConfig
