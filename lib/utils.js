const isLibraryImported = (context, library) => {
  const imports = context.getSourceCode().ast.body
    .filter(n => n.type === 'ImportDeclaration');

  return imports.some(n => n.source.value === library);
}

const isReactReduxImported = (context) => {
  return isLibraryImported(context, 'react-redux');
};

const isReselectImported = (context) => {
  return isLibraryImported(context, 'reselect');
};

module.exports = {
  isLibraryImported,
  isReactReduxImported,
  isReselectImported,
};
