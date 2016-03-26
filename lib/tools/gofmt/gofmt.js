'use babel';

import * as cprocess from 'child_process';
import { constructCmd, getEditor } from '../../utils/editor';

export default function (execPath) {
  let ex = '';
  if (!execPath) {
    ex = atom.workspace.ENVIRONMENT.tools.GOFMT.path;
  } else {
    ex = execPath;
  }

  const editor = getEditor();
  if (!editor) {
    return null;
  }

  const filepath = editor.getPath();

  // const cmd = `${ex} -e ${filepath}`;
  const cmd = constructCmd(ex, filepath, ['-e']);
  console.log(cmd);

  cprocess.exec(cmd, (err, stdout, stderr) => {
    if (err) {
      atom.notifications.addError(err);
      return null;
    }

    if (stderr !== '') {
      atom.notifications.addError(stderr);
      return null;
    }

    editor.getBuffer().setTextViaDiff(stdout);
  });

  return execPath;
}
