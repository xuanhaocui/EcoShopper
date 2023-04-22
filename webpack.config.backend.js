const path = require("path");
const CWD = process.cwd();

const config = {
  name: "backend",
  entry: [path.join(CWD, "./backend/server.js")],
  target: "node",
  output: {
    path: path.join(CWD, "dev"),
    filename: "backend.generated.js",
    publicPath: "/dev/",
    libraryTarget: "commonjs2",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
};

module.exports = config;
