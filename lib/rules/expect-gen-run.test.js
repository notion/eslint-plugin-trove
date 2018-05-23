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
  }, {
    code:
      `expectGen(effect)
	.next()
	.toJSON();
      `,
    parserOptions,
  }],
  invalid: [{
    code: 
      `expectGen(effect)
        .next();
      `,
    errors: [{
      message: 'Must run expectGen',
      line: 1,
      column: 1,
      type: 'Identifier',
    }],
    parserOptions,
  }, {
    code: 
      `expectGen(effect)
        .next()
	.run();

       expectGen(effect)
	.next();
      `,
    errors: [{
      message: 'Must run expectGen',
      line: 4,
      column: 1,
      type: 'Identifier',
    }],
    parserOptions,
  }]
});
