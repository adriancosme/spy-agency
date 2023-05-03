module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  env: {
    API_URL: process.env.BASE_URL,
  }
};
