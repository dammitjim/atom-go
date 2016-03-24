'use babel';

import { getEditor } from '../../utils/editor';

export default function (execPath) {
  const editor = getEditor();
  if (!editor) {
    return null;
  }
  return execPath;
}
