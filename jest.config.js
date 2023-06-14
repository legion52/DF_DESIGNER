module.exports = {
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "axios": "axios/dist/node/axios.cjs",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};
