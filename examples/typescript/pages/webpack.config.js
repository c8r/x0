/**
 * It is necessary to add the ts-loader for .tsx files
 */
module.exports = {
    resolve: {
        extensions: [".js", "md", "mdx", "jsx", ".ts", ".tsx"],
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    }
}