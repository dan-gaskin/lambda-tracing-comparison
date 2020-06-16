module.exports = {
    coverageDirectory: 'output/coverage/jest',
    rootDir: '..',
    collectCoverageFrom: [
        '**/*.ts',
        '!**/node_modules/*',
        '!test/**'
    ],
    reporters: [
        'default',
        'jest-junit'
    ],
    verbose: true,
    testEnvironment: 'node',
    preset: 'ts-jest/presets/js-with-babel' 
}