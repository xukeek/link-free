const path = require("path");

module.exports = {
    entry: {
        backgroundPage: path.join(__dirname, "src/backgroundPage.ts"),
        contentScript: path.join(__dirname, "src/contentScript.ts"),
        zhihu: path.join(__dirname, "src/zhihu.ts"),
        jianshu: path.join(__dirname, "src/jianshu.ts"),
        weibo: path.join(__dirname, "src/weibo.ts"),
        youtube: path.join(__dirname, "src/youtube.ts"),
        popup: path.join(__dirname, "src/popup/index.tsx"),
        box: path.join(__dirname, "src/box/index.tsx"),
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].js",
    },
    module: {
        rules: [{
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: "ts-loader",
            },
            {
                exclude: /node_modules/,
                test: /\.scss$/,
                use: [{
                        loader: "style-loader", // Creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader", // Translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader", // Compiles Sass to CSS
                    },
                    {
                        loader: "postcss-loader", // Postcss
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "@src": path.resolve(__dirname, "src/"),
        },
    },
};