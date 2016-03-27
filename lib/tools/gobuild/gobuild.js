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

  cprocess.exec(cmd, { cwd }, (err, stdout, stderr) => {
    if (stderr !== '') {
      const messages = stderr.split(/\r?\n/);
      let output = [];
      const lintMessages = [];
      for (let i = 0; i < messages.length; i++) {
        output = messages[i].match(/([a-zA-Z./-_]+.go):([0-9]+):(.*)/);
        if (output) {
          console.log(output);
          lintMessages.push({
            type: 'Error',
            text: output[3],
            filePath: path.resolve(cwd, output[1]),
            range: [[parseInt(output[2], 10) - 1, 1], [parseInt(output[2], 10) - 1, 1]],
          });
        }
      }

      Environment.LINTER.setMessages(lintMessages);

      // build had errors
      // extract messages
      atom.notifications.addError(stderr);
      return false;
    }

    return true;
  });

  return true;
}
