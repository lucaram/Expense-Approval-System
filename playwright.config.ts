import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

export default defineConfig({
  testDir: './tests',

  testIgnore: ['**/UNIT/**'],

  fullyParallel: true,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    baseURL: process.env.FRONTEND_BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  webServer: [
{
  command:
    'cross-env DB_PATH=expenses-test.db npm --prefix backend start',
  url: `${process.env.API_BASE_URL}/api-docs`,
  reuseExistingServer: !process.env.CI,
  timeout: 120_000,
},
    {
      command: 'npm --prefix frontend run dev',
      url: process.env.FRONTEND_BASE_URL,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});