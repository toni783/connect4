import type { InitialOptionsTsJest } from "ts-jest/dist/types";

const config: InitialOptionsTsJest = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform",
  },
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
    },
  },
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    axios: "axios/dist/node/axios.cjs",
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // added to mock styles files (https://jestjs.io/docs/en/webpack#mocking-css-modules)
  },
  transformIgnorePatterns: ["/node_modules/(?!axios).+\\.js$"],
};

export default config;
