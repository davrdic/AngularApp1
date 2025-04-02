const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7031';

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
    ],
    target: "https://134.122.27.167:44319",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
