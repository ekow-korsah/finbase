/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Prevent webpack from trying to bundle native modules and pdf-parse.
      // This is needed for Pages Router API routes that use better-sqlite3 and pdf-parse.
      const existing = Array.isArray(config.externals)
        ? config.externals
        : [config.externals].filter(Boolean);
      config.externals = [...existing, 'better-sqlite3', 'pdf-parse'];
    }
    return config;
  },
};
