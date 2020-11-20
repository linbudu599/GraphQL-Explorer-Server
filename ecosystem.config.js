module.exports = {
  apps: [
    {
      name: "GraphQL-Explorer-Backend",
      script: "./server-dist/app.js",
      // instances: "max",
      // exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
