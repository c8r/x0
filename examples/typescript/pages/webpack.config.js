/**
 * It is necessary to add the ts-loader for .tsx files
 */
module.exports = {
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    }
}