/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloud.appwrite.io',
        pathname: '/v1/storage/buckets/**',
      },
      {
        protocol: 'https',
        hostname: 'fra.cloud.appwrite.io',
        pathname: '/v1/storage/buckets/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'aleoewiycaoovcxwvxuv.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      // Allow any HTTPS image host
      {
        protocol: 'https',
        hostname: '**',
        pathname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/favicon.ico',
        destination: '/logos/Black-Logo.png?v=2',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/logos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;