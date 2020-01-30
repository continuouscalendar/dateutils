module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    browsers: "> 0.5%, ie >= 11"
                },
                modules: false,
                spec: true,
                useBuiltIns: false,
                forceAllTransforms: true
            }
        ]
    ]
};
