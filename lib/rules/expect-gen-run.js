module.exports = {
  meta: {
    docs: {},
    schema: [],
  },
  create: function(context) {
    return {
      "Identifier": function(node) {
	if (node.name !== 'expectGen') {
	  return;
	}

	const SourceCode = context.getSourceCode();
	const text = SourceCode.getText();

	const didRun = text.includes('.run()');
	const didJson = text.includes('.toJSON()');
	if (didRun || didJson) {
	  return;
	}
 	
	context.report({
 	  node,
	  message: 'Must run expectGen',
	});
      }
    };
  }
};
