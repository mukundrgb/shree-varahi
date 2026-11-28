/** @type {import('next').NextConfig} */
const nextConfig = {
  // A self-contained server in .next/standalone, used by the Docker image (Dockerfile).
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["*.ngrok-free.app", "localhost:3000"],
}

export default nextConfig
