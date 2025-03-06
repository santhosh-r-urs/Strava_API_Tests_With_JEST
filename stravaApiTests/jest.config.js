export default {
  testEnvironment: "node",
  transform: {},
  setupFilesAfterEnv: ["./jest.setup.js"],
  reporters: [
    "default",
    ["jest-junit", { outputDirectory: "results/jest", outputName: "junit.xml" }],
    ["jest-html-reporters", { publicPath: "./results/jest", filename: "test-report.html", expand: true }],
  ]
};