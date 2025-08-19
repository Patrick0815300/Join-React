module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],  // Sternchen-Muster richtig ohne Escape
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],  // Pfad richtig mit <rootDir>
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',  // Einfacher Backslash (doppelt, weil JS-String)
    },
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy'
    }
};
