const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const generatePlugins = function (env) {
  const plugins = [];
  if (env.production) {
    plugins.push(new UglifyJsPlugin({
      sourceMap: false,
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_console: false, // Keep console for debug logging
          drop_debugger: true,
          pure_funcs: ['console.info', 'console.debug', 'console.warn'], // Remove these console methods
          passes: 2,
        },
        output: {
          comments: false,
          beautify: false,
        },
        mangle: {
          safari10: true,
        },
      },
    }));
  }
  return plugins;
};

module.exports = env => ({
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'arcads.js',
    libraryTarget: 'umd',
  },
  devtool: env.development ? 'inline-source-map' : false,
  resolve: { extensions: ['.js', '.json'] },
  module: {
    rules: [
      {
        loader: 'eslint-loader',
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        options: { configFile: '.eslintrc.js' },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                targets: {
                  browsers: ['last 2 versions', 'ie >= 11']
                },
                modules: false, // Enable tree-shaking
                loose: true, // Smaller output
              }]
            ],
            plugins: ['transform-decorators-legacy', 'transform-object-rest-spread'],
          },
        },
      },
    ],
  },
  plugins: generatePlugins(env),
});