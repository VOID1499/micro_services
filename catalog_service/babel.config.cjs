module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { node: "current" },
        modules: "commonjs",
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
        ["@babel/plugin-proposal-decorators", {
            version: "legacy"
        }],
        [
            "@babel/plugin-transform-class-properties",
            {
                loose: true
            }
        ]
    
      ]
};