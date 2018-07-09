module.exports = function({ types }) {
  return {
    visitor: {
      ImportDeclaration: function (path, state) {
        if (path.node.source.value === '~acqua') {
          state.acquaParams = path.node.specifiers.map(s => s.imported);
          path.remove();
        }
      },
      ExportDefaultDeclaration: function (path, state) {
        if (path.node.declaration
            && path.node.declaration.type === 'ClassDeclaration'
            && path.node.declaration.superClass
            && path.node.declaration.superClass.name === 'AcquaModule') {
          const newItem = types.newExpression(path.node.declaration.id, []);
          const statement = types.blockStatement([
            path.node.declaration,
            types.returnStatement(newItem)
          ]);
          const params = state.acquaParams || [];
          const moduleName = path.node.declaration.id.name.replace(/^./, a => a.toLowerCase());

          const functionDeclaration = types.functionDeclaration(types.identifier(moduleName), params, statement);
          path.replaceWith(types.exportDefaultDeclaration(functionDeclaration));
        }
      }
    }
  }
};