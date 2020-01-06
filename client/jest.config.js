module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ['node_modules/(?!vue-router|@babel|vuetify)'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
};
