/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'myadventbucket.s3.eu-north-1.amazonaws.com',
                search: '',
            },
        ],
    },
};

export default nextConfig;
