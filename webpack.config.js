var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	mode: 'development',
	performance: { hints: process.env.NODE_ENV === 'production' ? "warning" : false },
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		hot: true,
		historyApiFallback: true,
		contentBase: path.join(__dirname, 'dist')
	},
	plugins: [
	  new HtmlWebpackPlugin({
	    title: 'Zelp',
	    filename: 'index.html',
	    template: 'src/index.template.html',
	    chunksSortMode: 'none'
	  }),
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ["es2015", "react"],
					plugins: ["transform-es2015-destructuring", "transform-object-rest-spread"]
				}
			},
	      {
	        test: /\.(s*)css$/,
	        use: ['style-loader', 'css-loader', 'sass-loader']
	      },
	      {
	        test: /\.(png|jpg|gif)$/,
	        loader: 'url-loader'
	      }
		]
	}
};
