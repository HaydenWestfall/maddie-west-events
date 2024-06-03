const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  img: path.join(__dirname, 'src/img'),
  styles: path.join(__dirname, 'src/styles'),
  build: path.join(__dirname, 'build')
}

module.exports = {
  mode: 'production',
  resolve: {
    alias: { "barba": path.resolve('node_modules', '@barba/core/dist/barba.js'), }
  },
  entry: {
    common: path.resolve(__dirname, 'src/common.js'),
    index: path.resolve(__dirname, 'src/route_home/index.js'),
    about: path.resolve(__dirname, 'src/route_about/about.js'),
    testimonies: path.resolve(__dirname, 'src/route_testimonies/testimonies.js'),
    packages: path.resolve(__dirname, 'src/route_packages/packages.js'),
    journal: path.resolve(__dirname, 'src/route_journal/journal.js'),
    contact: path.resolve(__dirname, 'src/route_contact/contact.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    assetModuleFilename: ({ filename }) => {
      var dirname = path.dirname(filename);
      dirname = dirname.replace('src/', '')
      return `${dirname}/[name][ext]`;
    },
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp|ttf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(mp4|MP4)$/,
        use: 'file-loader?name=videos/[name].[ext]',
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'index app',
      template: './src/route_home/index.html',
      filename: 'index.html',
      chunks: ['index'],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      title: 'about app',
      template: './src/route_about/about.html',
      filename: 'about.html',
      chunks: ['about'],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      title: 'testimonies',
      template: './src/route_testimonies/testimonies.html',
      filename: 'testimonies.html',
      chunks: ['testimonies'],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      title: 'packages',
      template: './src/route_packages/packages.html',
      filename: 'packages.html',
      chunks: ['packages'],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      title: 'journal',
      template: './src/route_journal/journal.html',
      filename: 'journal.html',
      chunks: ['journal'],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      title: 'contact',
      template: './src/route_contact/contact.html',
      filename: 'contact.html',
      chunks: ['contact'],
      inject: true,
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      new TerserPlugin(),
      new OptimizeCssAssetsPlugin(),
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  stats: { warnings: false },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};