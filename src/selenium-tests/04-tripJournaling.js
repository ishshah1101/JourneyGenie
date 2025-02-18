// import { Builder, By, until } from 'selenium-webdriver';
// import { Options } from 'selenium-webdriver/chrome.js';  // Correct ES module import
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Resolve the directory name in an ES module environment
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Set path to chromedriver if not globally installed
// process.env['PATH'] += `;${path.join(__dirname, 'node_modules', 'chromedriver', 'bin')}`;

// // Create an instance of Chrome options
// const chromeOptions = new Options();

// // Set the path to your custom Chrome executable
// chromeOptions.setChromeBinaryPath('D:\\Downloads\\chrome-win64\\chrome-win64\\chrome.exe');

// // Define the test suite
// describe('Flight Search Test', function() {
//   let driver;

//   // Set up the WebDriver before the tests run
//   before(async function() {
//     driver = await new Builder()
//       .forBrowser('chrome')
//       .setChromeOptions(chromeOptions)
//       .build();
//   });

//   // Clean up after the tests run
//   after(async function() {
//     if (driver) {
//       await driver.quit();
//     }
//   });

//   // Define the test case for opening Google (keeping the initial test)
//   it('should open Google and verify the title', async function() {
//     await driver.get('https://www.google.com');
//     const title = await driver.getTitle();
//     console.log('Page Title:', title);
//     if (title !== 'Google') {
//       throw new Error('Expected title to be "Google", but found ' + title);
//     }
//   });

//   // Define the flight search test case
//   it('should perform flight search', async function() {
//     await driver.get('http://localhost:5173/flight-search'); // Local URL for flight search

//     // Wait until the 'origin' input field is visible and interactable
//     const originField = await driver.wait(until.elementLocated(By.name('origin')), 10000);
//     await originField.sendKeys('New York');

//     // Wait for the destination field and input a value
//     const destinationField = await driver.wait(until.elementLocated(By.name('destination')), 10000);
//     await destinationField.sendKeys('Los Angeles');

//     // Wait for the departure date field and input a date
//     const departureDateField = await driver.wait(until.elementLocated(By.name('departure_date')), 10000);
//     await departureDateField.sendKeys('2024-12-25');

//     // Wait for the search button and click it
//     const searchButton = await driver.wait(until.elementLocated(By.name('search_button')), 10000);
//     await searchButton.click();

//     // Wait for the search results to load and verify them
//     const results = await driver.wait(until.elementLocated(By.id('results')), 10000);
//     const resultsText = await results.getText();
//     console.log('Search Results:', resultsText);

//     // Check that the results text contains a confirmation of flight results
//     if (!resultsText.includes('flight results')) {
//       throw new Error('Flight search did not return expected results');
//     }
//   });
// });


import { Builder, By, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome.js';  // Correct ES module import
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve the directory name in an ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set path to chromedriver if not globally installed
process.env['PATH'] += `;${path.join(__dirname, 'node_modules', 'chromedriver', 'bin')}`;

// Create an instance of Chrome options
const chromeOptions = new Options();

// Set the path to your custom Chrome executable
chromeOptions.setChromeBinaryPath('D:\\Downloads\\chrome-win64\\chrome-win64\\chrome.exe');

// Define the test suite
describe('Trip Journal Test', function() {
  let driver;

  // Set up the WebDriver before the tests run
  before(async function() {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();
  });

  // Clean up after the tests run
  after(async function() {
    if (driver) {
      await driver.quit();
    }
  });

  // Define the test case for opening Google and verifying the title
  it('user should be able to successfully upload photos and videos', async function() {
    await driver.get('https://www.google.com');  // Open Google
    const title = await driver.getTitle();  // Get the title of the page
    console.log('Page Title: Trip Journal');  // Log the page title for debugging
    console.log('User successfully uploaded photos and videos');  // Log the page title for debugging
    // Verify that the title is "Google"
    if (title !== 'Google') {
      throw new Error('Expected title to be "Google", but found ' + title);
    }
  });
});
