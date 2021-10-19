const path = require('path');

module.exports = {
    // Environment mode
    mode: 'production',
    entry: [
        "@babel/polyfill",
        './src/js/app.js',
        './src/sass/app.scss'
    ],
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'js/main.js'
    },
    watch: true,
    watchOptions: {
    ignored: '/node_modules/',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            }, {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { outputPath: 'css/', name: '[name].min.css'}
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, './'),
        compress: true,
        port: 3000,
        // Enable hot reloading
        hot: true,
    }
};
