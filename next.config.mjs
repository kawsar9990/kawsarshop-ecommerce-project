/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images:{
    domains:  ["res.cloudinary.com", "lh3.googleusercontent.com"],
},
experimental: {
    scrollRestoration: true,
},
  }

export default nextConfig;