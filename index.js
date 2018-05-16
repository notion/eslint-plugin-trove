/* eslint-disable global-require */

const allRules = {
  'no-state-prop': require('./lib/rules/no-state-prop'),
  'module-boundary': require('./lib/rules/module-boundary'),
};

module.exports = {
  rules: allRules,
  configs: {
    all: {
      rules: {
        '@trove/trove/no-state-prop': 2,
        '@trove/trove/module-boundary': 2,
      },
    },
    recommended: {
      rules: {
        '@trove/trove/no-state-prop': 2,
        '@trove/trove/module-boundary': 2,
      },
    },
  },
};
