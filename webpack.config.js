const path = require("path");

module.exports = {
    entry: ["./src/js/main.js"],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/main.js"
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                exclude: [
                    "/test/",
                    "/node_modules/"
                ],
                use: ["babel-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".js"]
    }
}