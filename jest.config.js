/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = async () => {
  return {
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
    moduleFileExtensions: ['ts', 'js'],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    testMatch: ['**/tests/**/*.test.ts'],
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    verbose: true,
    coverageProvider: 'v8',
  };
};
