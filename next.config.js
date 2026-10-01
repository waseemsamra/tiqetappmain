
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // `src/lib/search-index.ts` persists its corpus to
    // `join(process.cwd(), '.next', 'cache', 'search-corpus.json')`. Because that
    // path is assembled at runtime, the Vercel file tracer cannot see its scope and
    // follows it into the whole `.next/cache` tree, which pushed the `api/search`
    // function to ~385MB and failed the build against the 250MB limit.
    //
    // The corpus is written at runtime and re-created on demand, so nothing from
    // `.next/cache` needs to ship in the bundle.
    outputFileTracingExcludes: {
      '/api/search': ['./.next/cache/**'],
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
      },
      {
        protocol: 'https',
        hostname: 'yybcicbwhxujnhmmsbdy.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'aws-tiqets-cdn.imgix.net',
      },
    ],
  },
};

module.exports = nextConfig;
