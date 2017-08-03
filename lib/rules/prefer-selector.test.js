const rule = require('./prefer-selector');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
  },
};

const ruleTester = new RuleTester();
ruleTester.run("prefer-selector", rule, {
  valid: [{
    code:
`import { connect } from 'react-redux';
const App = () => {};
connect((state) => {
  return {
    item: getItem(state),
  };
})(App);
`,
    parserOptions,
  }, {
    code:
`import { connect } from 'something-else';
const App = () => {};
connect((state) => {
  return {
    item: state.item,
  };
})(App);
`,
    parserOptions,
  }, {
    code:
`import { connect } from 'something-else';
const App = () => {};
connect((props) => {
  return {
    item: props.item,
  };
})(App);
`,
    parserOptions,
  }],
  invalid: [{
    code:
`import { connect } from 'react-redux';
const App = () => {};
connect((prop) => {
  return {
    item: prop.item,
  };
})(App);
`,
    errors: [{
      message: 'First function parameter for "connect()" must be named "state"',
      line: 3,
      column: 9,
      type: 'ArrowFunctionExpression',
    }],
    parserOptions,
  }, {
      code:
`import { connect } from 'react-redux';
const App = () => {};
connect((state) => {
  return {
    item: state.item,
  };
})(App);
`,
    errors: [{
      message: 'Cannot access state property inside connect()',
      line: 5,
      column: 17,
      type: 'Identifier',
    }],
    parserOptions,
  }, {
      code:
`import { connect } from 'react-redux';
const App = () => {};
function mapStateToProps(state) {
  return {
    item: state.item,
  };
}
connect(mapStateToProps)(App);
`,
    errors: [{
      message: 'Cannot access state property inside connect()',
      line: 5,
      column: 17,
      type: 'Identifier',
    }],
    parserOptions,
  }],
});
