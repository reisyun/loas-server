const path = require('path');

module.exports = nestDefaultOptions => ({
  ...nestDefaultOptions,
  resolve: {
    extensions: ['.js', '.ts', '.d.ts', '.json'],
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@infra': path.resolve(__dirname, 'src/infra'),
    },
  },
});
