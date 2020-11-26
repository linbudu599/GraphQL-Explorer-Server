module.exports = {
  apps: [
    {
      name: 'GraphQL-Explorer-Backend',
      script: 'server-dist/app.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
