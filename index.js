/* eslint-disable global-require */

const allRules = {
  'prefer-selector': require('./lib/rules/prefer-selector'),
};

module.exports = {
  rules: allRules,
  configs: {
    all: {
      rules: {
        'trove/prefer-selector': 2,
      },
    },
    recommended: {
      rules: {
        'trove/prefer-selector': 2,
      },
    },
  },
};
