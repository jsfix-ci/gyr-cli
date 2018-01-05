module.exports = {
  apps : [{
    name        : "agent",
    script      : "./node_modules/webpack-dev-server/bin/webpack-dev-server.js",
    args        : "--hot --inline --progress --watch --colors --env 'development'"
  }]
}
