import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  // Basic options
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  // Test setup - https://create-react-app.dev/docs/running-tests/#srcsetuptestsjs
  // setupFilesAfterEnv: ['./test/setup.ts'],
  // globalSetup: './test/setup.ts',
  // Coverage
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.ts',
    // Node environment files
    '!**/node_modules/**',
    // Testing files
    '!./src/**/*.test.ts',
  ],
  coverageDirectory: '.',
  coverageReporters: ['clover'],
};
// noinspection JSUnusedGlobalSymbols
export default config;
