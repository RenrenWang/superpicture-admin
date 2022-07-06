const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

module.exports = {
  entry: {
    index: [path.resolve(__dirname, 'src/index.tsx')],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[hash].js',
    libraryTarget: 'umd',
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
    },

    extensions: ['.js', '.json', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
        ],
        include: [
          path.resolve(__dirname, './src'),
          path.resolve(__dirname, './node_modules/antd'),
          path.resolve(__dirname, './node_modules/@ant-design/'),
        ],
      },
      {
        test: /\.(less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                // css 模块化
                auto: resourcePath => {
                  //排除 antd样式
                  if (/antd/.test(resourcePath)) {
                    return false
                  }
                  return true
                },
                localIdentName: '[name]_[local]-[hash:base64:5]',
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                //主题样式配置
                modifyVars: {
                  'primary-color': '#f00',
                  'link-color': '#1DA57A',
                  'border-radius-base': '2px',
                },
                javascriptEnabled: true, // antd 报错
              },
            },
          },
        ],
        include: [
          path.resolve(__dirname, './src'),
          path.resolve(__dirname, './node_modules/antd'),
          path.resolve(__dirname, './node_modules/@ant-design/'),
        ],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: [
          // 'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-typescript', '@babel/preset-react'],
              plugins: [
                [
                  'import',
                  {
                    libraryName: 'antd',
                    customStyleName: name => {
                      //antd按需加载对应的模块（方便css-loader排除css不做模块化处理）
                      return `antd/lib/${name}/style/index.less`
                    },
                  },
                ],
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/public/index.html'),
    }),
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
    }),
  ],
}
