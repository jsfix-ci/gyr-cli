var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); // html模板插入代码。
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // 从bundle中提取文本到一个新的文件中
var env = 'production';

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: `"${env}"`
    }
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../src/index.html'),
    // 要把<script>标签插入到页面哪个标签里(body|true|head|false)
    inject: 'true',
    filename: path.resolve(__dirname, '../dist/index.html'),
    // hash如果为true，将添加hash到所有包含的脚本和css文件，对于解除cache很有用
    // minify用于压缩html文件，其中的removeComments:true用于移除html中的注释，collapseWhitespace:true用于删除空白符与换行符
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    }
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    // chunksSortMode: 'dependency'
    // hash:true
  }),
  new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', "window.jQuery": 'jquery'}),
  // Explicit vendor chunk
  // 单独将echarts提取出来
  new webpack.optimize.CommonsChunkPlugin({
    names: [
      'echarts', 'vendor'
    ],
    minChunks: function(module) {
      return module.context && module.context.indexOf("node_modules") !== -1 && /node_modules\/(echarts|zrender)/.test(module.context) === false;
    }
  }),
  // 引导
  new webpack.optimize.CommonsChunkPlugin({name: 'manifest', minChunks: Infinity}),
  new ExtractTextPlugin({
    filename: 'css/[name].[contenthash].css',
    //disable: false,
    allChunks: true
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true,
      drop_debugger: true
    },
    sourceMap: true
  }),
  new webpack.NoEmitOnErrorsPlugin()
];

module.exports = {
  entry: {
    app: ['babel-polyfill', path.resolve(__dirname, '../src/app')],
    echarts: ['echarts']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }, {
            loader: 'awesome-typescript-loader'
          }
        ]
      }, {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader', // 应用于当 CSS 没有被提取(也就是一个额外的 chunk，当 allChunks: false)
          use: ['css-loader?sourceMap=true', 'postcss-loader']
        })
      }, {
        test: /\.styl$/,
        include: path.resolve(__dirname, '../src'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]-[hash:base64:5]',
                sourceMap: true
              }
            }, {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            }, {
              loader: 'stylus-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }, {
        test: /\.(png|jpe?g|git)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'images/[name].[hash:7].[ext]'
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      // {
      //   test: /\.(svg)$/i,
      //   loader: 'svg-sprite-loader'
      // },
    ]
  },
  plugins: plugins,
  resolve: {
    modules: [
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '../src')
    ],
    extensions: [
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.min.js',
      '.json',
      '.styl',
      '.css'
    ],
    alias: {
      'libs': path.join(__dirname, '../libs'),
      '@': path.join(__dirname, '../src/'),
      '$root': path.join(__dirname, '../src/')
    }
  },
  devtool: ''
  // eval： 生成代码 每个模块都被eval执行，并且存在@sourceURL
  //
  // cheap-eval-source-map： 转换代码（行内） 每个模块被eval执行，并且sourcemap作为eval的一个dataurl
  //
  // cheap-module-eval-source-map： 原始代码（只有行内） 同样道理，但是更高的质量和更低的性能
  //
  // eval-source-map： 原始代码 同样道理，但是最高的质量和最低的性能
  //
  // cheap-source-map： 转换代码（行内） 生成的sourcemap没有列映射，从loaders生成的sourcemap没有被使用
  //
  // cheap-module-source-map： 原始代码（只有行内） 与上面一样除了每行特点的从loader中进行映射
  //
  // source-map： 原始代码 最好的sourcemap质量有完整的结果，但是会很慢
}
