import JestBasicConfif from "./jest.config";

export default {
  ...JestBasicConfif,
  automock: false,
  // Tmp Test
  collectCoverageFrom: ["./server/utils/jwt.ts"],
  setupFilesAfterEnv: [],
  setupFiles: [],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  testPathIgnorePatterns: ["/client/"],
};
