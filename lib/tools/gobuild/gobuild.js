'use babel';

import * as cprocess from 'child_process';
import path from 'path';

import Environment from '../../environment/environment';
import { constructCmd, getEditor } from '../../utils/editor';

export default function () {
  const ex = Environment.tools.GO.path;

  const editor = getEditor();
  if (!editor) {
    return false;
  }

  const filepath = editor.getPath();
  const cwd = path.dirname(filepath);
  const cmd = constructCmd(ex, '.', ['build']);

  console.log(cmd);

  cprocess.exec(cmd, { cwd }, (err, stdout, stderr) => {
    if (stderr !== '') {
      const messages = stderr.split(/\r?\n/);
      console.log(messages);
      // build had errors
      // extract messages
      atom.notifications.addError(stderr);
      return false;
    }

    console.log(stdout);

    return true;
  });

  return true;
}
