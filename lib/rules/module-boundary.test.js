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
`import { actionCreators } from '@trove/thread';
import _ from 'lodash';
`,
    parserOptions,
  }, {
    code:
`const thread = require('@trove/thread');
`,
    parserOptions,
  }],
  invalid: [{
    code:
`import { actionCreators } from '@trove/thread/message';
`,
    errors: [{
      message: 'Cannot reach into top-level package for "@trove/thread/message"',
      line: 1,
      column: 1,
      type: 'ImportDeclaration',
    }],
    parserOptions,
  }, {
    code:
`import _ from 'lodash/fp';
  import { SomeComponent } from '@trove/thread/component/some-component.js';
`,
    errors: [{
      message: 'Cannot reach into top-level package for "@trove/thread/component/some-component.js"',
      line: 2,
      column: 3,
      type: 'ImportDeclaration',
    }],
    parserOptions,
  }, {
    code:
`import _ from 'lodash/fp';
const message = require('@trove/thread/message');
`,
    errors: [{
      message: 'Cannot reach into top-level package for "@trove/thread/message"',
      line: 2,
      column: 17,
      type: 'CallExpression',
    }],
    parserOptions,
  }]
});
