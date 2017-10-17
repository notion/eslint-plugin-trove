const IMPORT_NAME = 'notion-modules';

const importRe = new RegExp(`${IMPORT_NAME}\/.+\/`);

function checkReachIntoPackage(context, node, importName) {
  if (!importName) return;
  if (importName.indexOf(IMPORT_NAME) === -1) return;
  if (!importRe.test(importName)) return;

  context.report({
    node,
    message: `Cannot reach into top-level package for "${importName}"`,
  });
}

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
        checkReachIntoPackage(context, node, importName);

      },
      ImportDeclaration: (node) => {
        const importName = node.source.value;
        checkReachIntoPackage(context, node, importName);
      }
    };
  },
};
