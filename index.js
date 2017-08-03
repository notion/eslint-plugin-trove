/* eslint-disable global-require */

const allRules = {
  'no-state-prop': require('./lib/rules/no-state-prop'),
};

module.exports = {
  rules: allRules,
  configs: {
    all: {
      rules: {
        'trove/no-state-prop': 2,
      },
    },
    recommended: {
      rules: {
        'trove/no-state-prop': 2,
      },
    },
  },
};
