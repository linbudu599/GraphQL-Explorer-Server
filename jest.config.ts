export default {
  automock: false,
  bail: 5,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["./client/src/components/*.tsx"],
  // only collect coverage reports in client for now
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ["json", "text", "lcov", "clover"],
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  notify: true,
  preset: "ts-jest",
  runner: "jest-runner",
  setupFiles: ["./jest.setup.ts"],
  setupFilesAfterEnv: ["jest-enzyme", "<rootDir>jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  testEnvironmentOptions: {
    enzymeAdapter: "react16",
  },
  maxWorkers: "80%",
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    // waiting for alias configuration on Parcel & TS
    "^@/services/(.*)$": "<rootDir>/src/services/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/pages/(.*)$": "<rootDir>/src/pages/$1",
  },
  // TODO: config by env variables dynamically
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/e2e/"],
  testRunner: "jasmine2",
  timers: "real",
  transform: { "\\.tsx?$": "ts-jest" },
};
