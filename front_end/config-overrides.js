const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "path": require.resolve("path-browserify"),
    "fs": false,
    "stream": require.resolve("stream-browserify"),
    "zlib": require.resolve("browserify-zlib"),
    "crypto": require.resolve("crypto-browserify"),
    "util": require.resolve("util"),
    "assert": require.resolve("assert/"),
    "os": require.resolve("os-browserify/browser"),
    "constants": require.resolve("constants-browserify")
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ];

  return config;
};