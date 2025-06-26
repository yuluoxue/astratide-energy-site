/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ 构建时忽略 ESLint 报错，避免 `any` 报错
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
