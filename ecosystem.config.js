module.exports = {
  apps: [
    {
      name: "GraphQL-Explorer-Backend",
      script: "./server/app.js",
      // instances: "max",
      // exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
