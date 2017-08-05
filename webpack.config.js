var path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		index: './src/index.js'
	},
	module: {
		rules: [{
		  test: /\.(png|jpg)$/,
		  use: [{
		    loader: 'url-loader',
		    options: { limit: 10000 } 
		  }]
		}]
	},
	plugins: [

		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Output Management'
		})
	],
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
};