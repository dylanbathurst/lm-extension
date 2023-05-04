const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    popup: path.resolve(__dirname, './src/Popup/index.tsx'),
    options: path.resolve(__dirname, './src/Options/index.tsx'),
    background: path.resolve(__dirname, './src/Background/index.ts'),
    contentScript: path.resolve(__dirname, './src/ContentScript/index.ts'),
    inpageScript: path.resolve(__dirname, './src/InpageScript/index.ts'),
  },
  output: {
    publicPath: '',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    open: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|jsx|ts|tsx)$/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: 'body',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.mjs', '.js', '.jsx', '.json'],
    alias: {
      lib: path.resolve(__dirname, './src/lib/'),
      Background: path.resolve(__dirname, './src/Background/'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: 'src/Popup/popup.html',
          chunks: ['popup'],
          filename: 'popup.html',
        },
        process.env.NODE_ENV === 'production'
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined
      )
    ),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/Options/options.html',
      chunks: ['options'],
      filename: 'options.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'static',
          force: true,
        },
      ],
    }),
  ],
}
