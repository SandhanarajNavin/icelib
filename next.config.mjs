/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // The hero photograph is requested at quality 90. Next 16 rejects any
    // quality not declared here with a 400 from the image optimizer.
    qualities: [75, 90],
  },
};

export default nextConfig;
