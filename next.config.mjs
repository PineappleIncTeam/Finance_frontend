/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        turbo: {
            rules: {
                "*.module.scss": {
                    loaders: ["sass-loader"],
                    as: "*.module.css",
                },
            },
        },
    }
};

export default nextConfig;
