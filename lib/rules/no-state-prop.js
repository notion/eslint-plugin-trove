const walk = require('estree-walk');
const utils = require('../utils');

const isReactReduxImported = utils.isReactReduxImported;
const isReselectImported = utils.isReselectImported;
const isStatePropAccessed = (node, stateName) => {
  if (!node || !node.object) return false;
  return node.object.name === stateName;
};
const checkIfStatePropAccessed = (node, stateName, context) => {
  if (!isStatePropAccessed(node, stateName)) return;

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
      'CallExpression[callee.name=/connect/] > :function:first-child': (node) => {
        if (!isReactReduxImported(context)) {
          return;
        }

        if (node.params.length === 0) return;
        const stateName = node.params[0].name;

        walk(node, {
          MemberExpression: (n) => {
            checkIfStatePropAccessed(n, stateName, context);
          }
        })
      },
      'CallExpression[callee.name=/connect/] > Identifier': (node) => {
        if (!isReactReduxImported(context)) {
          return;
        }

        const funcMatches = context.getSourceCode().ast.body
          .filter(n => n.type.match('Function') && n.id.name === node.name);
        if (funcMatches.length === 0) return;
        const funcMatchNode = funcMatches[0];
        if (funcMatchNode.params.length === 0) return;
        const stateName = funcMatchNode.params[0].name;

        if (!funcMatchNode) return;

        walk(funcMatchNode, {
          MemberExpression: (n) => {
            checkIfStatePropAccessed(n, stateName, context);
          },
        });
      },
      'CallExpression[callee.name=/createSelector/] > :function:not(:last-child)': (node) => {
        if (!isReselectImported(context)) {
          return;
        }

        if (node.params.length === 0) return;
        const stateName = node.params[0].name;

        walk(node, {
          MemberExpression: (n) => {
            if (!isStatePropAccessed(n, stateName)) return;

            context.report({
              node: n.property,
              message: 'Cannot access state property inside createSelector()',
            });
          },
          // find lodash.get property accessors
          CallExpression: (n) => {
            if (n.callee.name !== 'get') return;
            if (n.arguments[0].name !== stateName) return;

            context.report({
              node: n.callee,
              message: 'Cannot access state property inside createSelector()',
            });
          },
        })
      },
    };
  }
};
