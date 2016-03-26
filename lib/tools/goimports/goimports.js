'use babel';

import * as cprocess from 'child_process';
import { constructCmd, getEditor } from '../../utils/editor';

export default function () {
  const ex = atom.workspace.ENVIRONMENT.tools.GOIMPORTS.path;

  const editor = getEditor();
  if (!editor) {
    return false;
  }

  const filepath = editor.getPath();
  const cmd = constructCmd(ex, filepath, []);

  cprocess.exec(cmd, (err, stdout, stderr) => {
    if (err) {
      atom.notifications.addError(err);
      return false;
    }

    if (stderr !== '') {
      atom.notifications.addError(stderr);
      return false;
    }

    const buf = editor.getBuffer();
    buf.setTextViaDiff(stdout);
    buf.save();

    return true;
  });

  return true;
}
