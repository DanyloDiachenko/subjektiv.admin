/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "subjektiv-store.s3.amazonaws.com",
            'subjektiv-store-new.s3.amazonaws.com',
            "storage.subjektiv.co.uk",
        ],
    },
    experimental: {
        serverActions: true
    }
};

module.exports = nextConfig;
