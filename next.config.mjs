import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        unoptimized: true
    },
    experimental: {
        nextScriptWorkers: false
    }
};

export default withNextIntl(nextConfig);
