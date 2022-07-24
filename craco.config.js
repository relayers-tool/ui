const CracoAntDesignPlugin = require("craco-antd");
const webpack = require("webpack");

module.exports = {
  resolve: {
    alias: {
      crypto: false
    }
  },
  webpack: {
    configure: webpackConfig => {
      // other stuff with webpackConfig
      return {
        ...webpackConfig,
        ignoreWarnings: [/Failed to parse source map/],
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser"
      })
    ]
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@primary-color": "#1DA57A",
          "@link-color": "#1DA57A",
        },
      },
    },
  ],
};
