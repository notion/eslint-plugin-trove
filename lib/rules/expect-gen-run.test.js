const rule = require('./expect-gen-run');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
  },
};

const ruleTester = new RuleTester();

ruleTester.run("expect-gen-run", rule, {
  valid: [{
    code: 
      `expectGen(effect)
        .next()
        .run();
      `,
    parserOptions,
  }],
  invalid: [{
    code: 
      `expectGen(effect)
        .next();
      `,
    parserOptions,
  }]
});
