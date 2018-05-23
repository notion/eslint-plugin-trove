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

	let expressionStatementNode = node.parent;
	while (expressionStatementNode.type !== 'ExpressionStatement') {
	  expressionStatementNode = expressionStatementNode.parent;
	}

	const SourceCode = context.getSourceCode();
	const text = SourceCode.getText(expressionStatementNode);

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
