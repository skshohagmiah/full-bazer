/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname:"utfs.io"
            },
            {
                hostname:"lh3.googleusercontent.com"
            },
            {
                hostname:'source.unsplash.com'
            }
        ]
    }
};

export default nextConfig;
