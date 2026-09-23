import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  testMatch: [
    '<rootDir>/tests/UNIT/**/*.test.ts',
    '<rootDir>/tests/UNIT/**/*.test.tsx',
  ],

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },

  moduleNameMapper: {
    '^react$': '<rootDir>/frontend/node_modules/react',
    '^react/(.*)$': '<rootDir>/frontend/node_modules/react/$1',
    '^react-dom$': '<rootDir>/frontend/node_modules/react-dom',
    '^react-dom/(.*)$': '<rootDir>/frontend/node_modules/react-dom/$1',
  },

  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'Unit Test Report',
        outputPath: './test-results/unit-test-report.html',
        includeFailureMsg: true,
        includeSuiteFailure: true,
      },
    ],
  ],

  collectCoverageFrom: [
    'backend/src/**/*.ts',
    'frontend/app/**/*.ts',
    'frontend/app/**/*.tsx',
    '!**/*.d.ts',
  ],

  coverageDirectory: 'test-results/coverage',

  coverageReporters: [
    'text',
    'html',
  ],
};

export default config;