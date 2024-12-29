/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'adsterra.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'mnd-assets.mynewsdesk.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
