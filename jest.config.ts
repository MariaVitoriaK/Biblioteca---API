import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json"],
  roots: ["<rootDir>/tests"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1"
  }
};

export default config;
