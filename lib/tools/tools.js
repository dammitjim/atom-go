'use babel';

import * as cprocess from 'child_process';
import { after } from 'lodash';

/**
 * locate looks up the provided command line tool
 * @param  {string}   name     name of the tool
 * @param  {Function} callback(err, data)
 */
function locate(name, callback) {
  const cmd = `which ${name}`;

  cprocess.exec(cmd, (err, stdout, stderr) => {
    if (err) {
      callback(err, null);
    }

    if (stderr !== '') {
      callback(stderr, null);
    }

    callback(null, stdout);
  });
}

export function getTools(callback) {
  const tools = {};

  const finished = after(1, () => callback(tools));

  locate('gofmt', (err, data) => {
    if (err !== null) {
      // TODO handle tool not found
      console.error(err);
    }
    tools.GOFMT = data;
    finished();
  });
}
