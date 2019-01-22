module.exports = {
    // Glueing environment, scripting files, and tests together!
    displayName: "TextNet Test Suites",
    //setupTestFrameworkScriptFile: "./server/test/config/test-framework", // used to setup or configure framework before each test -> immediately after jest is installed in environment
    //testEnvironment: "./server/test/config/mongo-environment", // Used to setup testing environment (uses in-memory mongodb aka built in RAM upon running npm test)
    testRegex: "./server/tests\/.*\.test\.js$", // Used to find test files, otherwise tries to run everything in __tests__ folder (non-existant for this project)
    // collectCoverage: true,
    // coverageDirectory: "./coverage/",
    // collectCoverageFrom: [
    //     "server/**/*.js"
    // ],
    //roots: ["./server"]
}