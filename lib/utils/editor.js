'use babel';

export function getEditor() {
  let err = false;
  if (!atom || !atom.workspace) {
    err = 'No atom or workspace instance found';
  }

  const editor = atom.workspace.getActiveTextEditor();
  if (!editor || !editor.getGrammar()) {
    err = 'No editor or grammar found';
  }

  if (editor.getGrammar().scopeName !== 'source.go') {
    err = 'atom-go attempted to resolve a non-go source file';
  }

  if (err) {
    atom.notifications.addError(err);
    return null;
  }

  return editor;
}

export function constructCmd(tool, path, args) {
  const cmd = `${tool} ${args.join(' ')} ${path}`;
  return cmd.replace(/(\r\n|\n|\r)/gm, '');
}
