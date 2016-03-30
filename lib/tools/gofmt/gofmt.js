'use babel';

import * as cprocess from 'child_process';
import { constructCmd, getEditor } from '../../utils/editor';

/**
 * Formats the file using gofmt with the -e flag
 * @return bool
 */
export default function () {
  const ex = atom.workspace.ENVIRONMENT.tools.GOFMT.path;

  const editor = getEditor();
  if (!editor) {
    return false;
  }

  const filepath = editor.getPath();
  const cmd = constructCmd(ex, filepath, ['-e']);

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

    return true;
  });

  return true;
}
