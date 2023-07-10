const path = require('path');

module.exports = {
    entry: './src/app.js',  // Entry point of your application
    output: {
        path: path.resolve(__dirname, 'build'),  // Output directory
        filename: 'bundle.js',  // Output bundle filename
    },
    module: {
        rules: [
            // Add any necessary loaders for your project
            // For example, if you're using Babel to transpile JavaScript, you can add the following rule:
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
    // Add any necessary plugins or additional configuration options
};