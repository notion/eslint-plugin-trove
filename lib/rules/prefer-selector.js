const walk = require('estree-walk');
const utils = require('../utils');

const isReactReduxImported = utils.isReactReduxImported;
const STATE_NAME = 'state';
const isStatePropAccessed = (node, stateName = STATE_NAME) => {
  return node.object.name === stateName;
};
const checkIfStatePropAccessed = (node, context) => {
  if (!isStatePropAccessed(node)) return;

  context.report({
    node: node.property,
    message: 'Cannot access state property inside connect()',
  });
};

module.exports = {
  meta: {
    docs: {},
    schema: [],
  },
  create: (context) => {
    return {
      [`CallExpression[callee.name=/connect/] > :function:first-child[params.0.name!=/${STATE_NAME}/]`]: (node) => {
        if (!isReactReduxImported(context)) {
          return;
        }

        context.report({
          node: node,
          message: `First function parameter for "connect()" must be named "${STATE_NAME}"`,
        });
      },
      'CallExpression[callee.name=/connect/] > :function:first-child MemberExpression': (node) => {
        if (!isReactReduxImported(context)) {
          return;
        }

        checkIfStatePropAccessed(node, context);
      },
      'CallExpression[callee.name=/connect/] > Identifier': (node) => {
        const funcMatches = context.getSourceCode().ast.body
          .filter(n => n.type.match('Function') && n.id.name === node.name);
        if (funcMatches.length === 0) return;
        const funcMatchNode = funcMatches[0];

        walk(funcMatchNode, {
          MemberExpression: (n, stop) => {
            checkIfStatePropAccessed(n, context);
          },
        });
      }
    };
  }
};
