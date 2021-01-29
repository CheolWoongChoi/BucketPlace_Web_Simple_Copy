
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function(env, argv) {
	const devMode = env.development ? true : false;

	return {
		mode: devMode ? 'development' : 'production',
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
			alias: {
				components: path.resolve(__dirname, 'src/components'),
				store: path.resolve(__dirname, 'src/store'),
				utils: path.resolve(__dirname, 'src/utils')
			}
		},
		entry: {
			app: './index'
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'build')
		},
		devServer: {
			port: 3030,
			hot: true,
			open: true,
			historyApiFallback: true
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: [
						{ loader: 'ts-loader'},
					]
				},
				{
					test: /\.s[ac]ss$/,
					use: [
						devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 
						{
							loader: 'css-loader',
							options: { url: false, sourceMap: true } 
						},
						'sass-loader'
					]
				},
				{
					test: /\.(jpe?g|png|gif|svg)$/,
					use: [{
						loader: 'file-loader',
						options: {
							esModule: false
						}
					}]
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: './index.html',
			}),
			new MiniCssExtractPlugin({ 
				filename: '[name].css',
				chunkFilename: '[id].css'
			})
		]
	}
}