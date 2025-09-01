module.exports = {
  globals: {
    NODE_ENV: 'test',
  },
  clearMocks: true,
  notifyMode: 'failure-change',
  transformIgnorePatterns: ['node_modules/(?!(@kth|@babel|@jest|uuid)/)'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'tsx'],
  setupFilesAfterEnv: ['jest-extended/all'],
  testEnvironment: 'jsdom',
  verbose: true,
  reporters: ['default', 'jest-summary-reporter'],
}
