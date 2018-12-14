const path = require('path')

const config = {
  entry: [
    'regenerator-runtime/runtime',
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loaders: [
          'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'
        ],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  }
}
module.exports = config