const path = require('path');
const nameof = require('ts-nameof');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    index: path.resolve(__dirname, 'src', 'index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers() {
                return {
                  before: [nameof],
                };
              },
            },
          },
        ],
      },
      {
        test: /\.node$/,
        use: [
          {
            loader: 'node-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.node', '.json'],
    modules: [
      path.resolve(__dirname, '.'),
      path.resolve(__dirname, 'node_modules'),
    ],
    alias: {
      src: path.resolve(__dirname, 'src'),
      'package.json': path.resolve(__dirname, 'package.json'),
    },
  },
  target: 'node',
  devtool: 'source-map',
};
