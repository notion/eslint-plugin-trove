const IMPORT_NAME = 'notion-modules';

const importRe = new RegExp(`${IMPORT_NAME}\/.+\/`);

module.exports = {
  meta: {
    docs: {},
    schema: [],
  },
  create: (context) => {
    return {
      'CallExpression[callee.name=/require/]': (node) => {
        if (node.arguments.length === 0) return;
        const importName = node.arguments[0].value;
        if (!importName) return;
        if (importName.indexOf(IMPORT_NAME) === -1) {
          return;
        }

        if (importRe.test(importName)) {
          context.report({
            node,
            message: 'Cannot reach into top-level package',
          })
        }
      },
      ImportDeclaration: (node) => {
        const importName = node.source.value;
        if (!importName) return;
        if (importName.indexOf(IMPORT_NAME) === -1) return;

        if (importRe.test(importName)) {
          context.report({
            node,
            message: 'Cannot reach into top-level package',
          })
        }
      }
    };
  },
};
