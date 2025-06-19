/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'localhost',
            'example.com', // Replace with your actual domain
            'api.example.com', // Replace with your actual API domain
            "images.unsplash.com"
        ],
    },
};

export default nextConfig;
