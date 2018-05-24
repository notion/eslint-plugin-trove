module.exports = {
  meta: {
    docs: {},
    schema: [],
  },
  create: function(context) {
    return {
      "ExpressionStatement Identifier": function(node) {
	if (node.name !== 'expectGen') {
	  return;
	}

	let expressionStatementNode = node.parent;
	while (expressionStatementNode.type !== 'ExpressionStatement') {
	  expressionStatementNode = expressionStatementNode.parent;
	}

	if (expressionStatementNode.expression.type !== 'CallExpression') {
	  return;
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
