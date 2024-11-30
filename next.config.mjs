/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME,
                search: '',
            },
        ],
    },
};

export default nextConfig;
