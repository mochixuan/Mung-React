const {
    override,
    fixBabelImports,
    addLessLoader,
    addBabelPlugins,
} = require("customize-cra")

module.exports = override(
    ...addBabelPlugins(
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose" : true }]
    ),
    fixBabelImports("babel-plugin-import", {
        libraryName: "antd-mobile",
        style: 'css'
    }),
    addLessLoader({
        ident: 'postcss'
    })
);
