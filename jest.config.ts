import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  // # Basic options
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  // # Coverage - https://create-react-app.dev/docs/running-tests/#coverage-reporting
  // `coverageDirectory` Does not work
  collectCoverage: true,
  collectCoverageFrom: [
    // All files in `src` recursive
    './src/**/*.ts',
    // NOT Node environment files
    '!**/node_modules/**',
    // NOT Testing files
    '!./src/**/*.test.ts',
  ],
  coverageReporters: ['clover'],
};
// noinspection JSUnusedGlobalSymbols
export default config;
