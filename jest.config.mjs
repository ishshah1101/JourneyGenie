import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the root directory to point to the base project folder (JourneyGenie)
const rootDir = __dirname;

// Set the correct configuration
export default {
  testEnvironment: 'jest-environment-jsdom', // Ensure jsdom is available
  moduleNameMapper: {
    '^@/service/(.*)$': `${rootDir}/src/service/$1`, // Static path for service modules
  },
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest", // Ensure babel processes jsx/tsx files
  },
  rootDir: rootDir, // Point Jest to the correct root directory
  moduleDirectories: ['node_modules', 'src'], // Include 'src' for module resolution
  testMatch: [
    '**/src/selenium-tests/**/*.test.js', // Make sure it looks for tests in the correct folder
  ],
};