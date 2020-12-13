module.exports = {
  apps: [
    {
      name: "GraphQL-Explorer-Server",
      script: "dist/app.js",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
