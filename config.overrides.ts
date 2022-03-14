module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ['@svgr/webpack', 'url-loader'],
  });

  return config;
};
