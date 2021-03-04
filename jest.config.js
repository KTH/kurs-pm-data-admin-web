module.exports = {
  globals: {
    NODE_ENV: 'test',
  },
  clearMocks: true,
  notifyMode: 'failure-change',
  transformIgnorePatterns: ['node_modules/(?!(@kth|@babel|@jest)/)'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['jest-extended'],
  verbose: true,
}
