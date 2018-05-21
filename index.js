/* eslint-disable global-require */

const allRules = {
  'no-state-prop': require('./lib/rules/no-state-prop'),
  'module-boundary': require('./lib/rules/module-boundary'),
  'expect-gen-run': require('./lib/rules/expect-gen-run'),
};

module.exports = {
  rules: allRules,
  configs: {
    all: {
      rules: {
        '@trove/trove/no-state-prop': 2,
        '@trove/trove/module-boundary': 2,
        '@trove/trove/expect-gen-run': 2,
      },
    },
    recommended: {
      rules: {
        '@trove/trove/no-state-prop': 2,
        '@trove/trove/module-boundary': 2,
        '@trove/trove/expect-gen-run': 2,
      },
    },
  },
};
