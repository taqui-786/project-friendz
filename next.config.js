/** @type {import('next').NextConfig} */
const nextConfig = {
   images:{
    remotePatterns: [
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
          
        },
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          
        }
      ],
   },
    
}

module.exports = nextConfig
