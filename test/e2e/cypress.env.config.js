const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  screenshots: false,
  fixturesFolder: 'test/e2e/cypress/fixtures',
  e2e: {
    setupNodeEvents(on, config) {},
    supportFile: false,
    specPattern: 'test/e2e/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:3000/kursinfoadmin/kurs-pm-data/',
  },
})
