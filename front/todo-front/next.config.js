/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
require('dotenv').config({ path: '.env.local' })
module.exports = nextConfig
