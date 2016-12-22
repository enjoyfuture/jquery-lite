import path from 'path';
import webpack from 'webpack';

export default {
  entry: {
    'jquery-lite': ['./src/index.js']
  },
  output: {
    path: path.join(__dirname, 'dist'), //打包输出目录
    filename: '[name].js', //文件名称
    library: ['jQuery'],
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js']
  },

  module: {
    loaders: [
      // https://github.com/MoOx/eslint-loader
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        // eslint 配置
        eslint: {
          emitError: true, // 验证失败，终止
          configFile: '.eslintrc'
        }
      }
    })
  ]
};

