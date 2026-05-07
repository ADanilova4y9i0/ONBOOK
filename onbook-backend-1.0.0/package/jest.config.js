const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["./src/jest.setup.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.jest.json",
    },
  }
};
