const rule = require('./no-state-prop');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
  },
};

const ruleTester = new RuleTester();
ruleTester.run("no-state-prop", rule, {
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
  }, {
      code:
`import { createSelector } from 'reselect';
const getItem = (state) => state.item;
const getItemOpen = createSelector(
  getItem,
  (item) => item.open
);
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
      message: 'Cannot access state property inside connect()',
      line: 5,
      column: 16,
      type: 'Identifier',
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
  }, {
      code:
`import { createSelector } from 'reselect';
const getItem = createSelector(
  (state) => state.item,
  (item) => item
);
`,
    errors: [{
      message: 'Cannot access state property inside createSelector()',
      line: 3,
      column: 20,
      type: 'Identifier',
    }],
    parserOptions,
  }],
});
