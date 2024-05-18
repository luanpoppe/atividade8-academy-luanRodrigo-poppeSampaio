const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor")
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild")
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor")

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    env: {
      apiUrl: "https://raromdb-3c39614e42d4.herokuapp.com/",
      // TAGS: "@only",
    },
    baseUrl: "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/",
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      await addCucumberPreprocessorPlugin(on, config)

      on("file:preprocessor", createBundler({ plugins: [createEsbuildPlugin(config)] }))

      return config
    },
  },
})
