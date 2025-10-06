/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        unoptimized: true
    },
    experimental: {
        nextScriptWorkers: false
    }
};

export default nextConfig;
