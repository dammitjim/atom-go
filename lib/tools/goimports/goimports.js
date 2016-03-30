'use babel';

import * as cprocess from 'child_process';

import Environment from '../../environment/environment';
import { constructCmd, getEditor } from '../../utils/editor';

export default function () {
  const ex = Environment.tools.GOIMPORTS.path;

  const editor = getEditor();
  if (!editor) {
    return false;
  }

  // const filepath = editor.getPath();
  const cmd = constructCmd(ex, '', []);
  const buf = editor.getBuffer();

  const output = cprocess.execSync(cmd, { input: editor.getText() });
  buf.setTextViaDiff(output.toString());

  return true;
}
