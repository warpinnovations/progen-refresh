/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["lh3.googleusercontent.com"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            }
        ]
    },
    redirects: async () => {
        return [
            {
                source: '/creativedirection',
                destination: '/blogs/creativedirection',
                permanent: true
            },
            {
                source: '/kwartodistrito',
                destination: '/blogs/kwatrodistrito',
                permanent: true
            },
            {
                source: '/beautyofthestruggle',
                destination: '/blogs/beautyofstruggle',
                permanent: true
            }
            ,
            {
                source: '/embracingchange',
                destination: '/blogs/discoveringpurpose',
                permanent: true
            }
            ,
            {
                source: '/blogs/digitalmarketing',
                destination: '/blogs/warptechnologies',
                permanent: true
            }
        ]
    }
};

export default nextConfig;
