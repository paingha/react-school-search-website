var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var nodeEnv = process.env.NODE_ENV || 'development';
var isProd = nodeEnv === 'production';

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, 'public/app'),
      filename: 'bundle.js',
    },
    devtool: 'cheap-module-source-map', // inline-source-map
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          parallel: true,
          uglifyOptions: {
          beautify: false,
          comments: false,
          sourceMap: true,
          compress: {
            warnings: false,
            drop_console: true,
        },
        mangle: {
            keep_fnames: true
        },
        output: {
            comments: false,
        }
        }
      }),
      ]
    },
    plugins: [

        new CompressionPlugin({
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8
        }),

      ],
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
                presets: ["env", "stage-2", "react"]
            }
        }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true,
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    node: {
        fs: 'empty',
        net: 'empty'
      },
  };




// var path = require('path');
// var webpack = require('webpack');
//
// var nodeEnv = process.env.NODE_ENV || 'development';
// var isProd = nodeEnv === 'production';
//
// module.exports = {
//     devtool: isProd ? 'source-map': 'cheap-module-eval-source-map',
//
//     entry: './index',
//     output: {
//         path: path.join(__dirname, 'static'),
//         filename: '[name].bundle.js',
//         publicPath: '/static/'
//     },
//     resolve: {
//         extensions: ['', '.js', '.jsx']
//     },
//     plugins: [],
//         new webpack.optimize.OccurenceOrderPlugin(),
//         new webpack.NoErrorsPlugin(),
//         new webpack.optimize.UglifyJsPlugin({
//             minimize: isProd,
//             mangle: {
//                 except: ['$super', '$', 'exports', 'require']
//             },
//             compress: {
//                 warnings: false
//             },
//             sourceMap: !isProd
//         }),
//         new webpack.DefinePlugin({
//             'process.env': {NODE_ENV: JSON.stringify(nodeEnv)}
//         })
//     ],
//     module: {
//         loaders: [{
//             test: /\.(jsx|js)?$/,
//             exclude: /node_modules/,
//             loader: 'babel'
//         }, {
//             test: /globalize/,
//             loader: 'imports?define=>false'
//         }]
//     }
// };
