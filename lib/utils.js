const isReactReduxImported = (context) => {
  const imports = context.getSourceCode().ast.body
    .filter(n => n.type === 'ImportDeclaration');

  return imports.some(n => n.source.value === 'react-redux');
};

module.exports = {
  isReactReduxImported,
};
