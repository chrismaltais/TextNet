module.exports = {
    // Glueing environment, scripting files, and tests together!
    displayName: "TextNet Test Suites",
    // Used to find test files, otherwise tries to run everything in __tests__ folder (non-existant for this project)
    testRegex: "./server/tests\/.*\.test\.js$"
}