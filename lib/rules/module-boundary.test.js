const rule = require('./module-boundary');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
  },
};

const ruleTester = new RuleTester();
ruleTester.run("module-boundary", rule, {
  valid: [{
    code:
`import { actionCreators } from 'notion-modules/thread';
import _ from 'lodash';
`,
    parserOptions,
  }, {
    code:
`const thread = require('notion-modules/thread');
`,
    parserOptions,
  }],
  invalid: [{
    code:
`import { actionCreators } from 'notion-modules/thread/message';
`,
    errors: [{
      message: 'Cannot reach into top-level package',
      line: 1,
      column: 1,
      type: 'ImportDeclaration',
    }],
    parserOptions,
  }, {
    code:
`import _ from 'lodash/fp';
  import { SomeComponent } from 'notion-modules/thread/component/some-component.js';
`,
    errors: [{
      message: 'Cannot reach into top-level package',
      line: 2,
      column: 3,
      type: 'ImportDeclaration',
    }],
    parserOptions,
  }, {
    code:
`import _ from 'lodash/fp';
const message = require('notion-modules/thread/message');
`,
    errors: [{
      message: 'Cannot reach into top-level package',
      line: 2,
      column: 17,
      type: 'CallExpression',
    }],
    parserOptions,
  }]
});
