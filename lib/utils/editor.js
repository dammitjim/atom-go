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
    atom.notifications.addError('atom-go attempted to retreive a non-go editor');
    err = 'atom-go attempted to resolve a non-go source file';
  }

  if (err) {
    atom.notifications.addError(err);
    return null;
  }

  return editor;
}
