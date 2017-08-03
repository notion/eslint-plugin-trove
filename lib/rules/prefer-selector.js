const utils = require('../utils');

const isReactReduxImported = utils.isReactReduxImported;

const STATE_NAME = 'state';

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

        if (node.object.name !== STATE_NAME) {
          return;
        }

        context.report({
          node: node.property,
          message: 'Cannot access state property inside connect()',
        });
      },
    };
  }
};
