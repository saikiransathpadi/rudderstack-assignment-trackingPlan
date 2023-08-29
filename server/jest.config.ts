module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@app/(.*)$': './src/$1',
    },
    setupFiles: ['./test/setup.ts'], // Path to your test setup file
  };
  