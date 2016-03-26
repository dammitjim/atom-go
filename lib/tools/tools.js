'use babel';

import * as cprocess from 'child_process';
import { after } from 'lodash';

/**
 * locate looks up the provided command line tool
 * @param  String   name     name of the tool
 * @param  Function callback(err, data)
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

/**
 * getTools locates tools for use
 * @param  Function - callback(tools) where tools is an array of objects with path and process
 */
export function getTools(callback) {
  const tools = {};

  const finished = after(3, () => callback(tools));

  locate('go', (err, data) => {
    if (err !== null) {
      // TODO handle tool not found
      atom.notifications.addError(err);
    }
    tools.GO = {};
    tools.GO.path = data;
    finished();
  });

  locate('gofmt', (err, data) => {
    if (err !== null) {
      // TODO handle tool not found
      atom.notifications.addError(err);
    }
    tools.GOFMT = {};
    tools.GOFMT.path = data;
    finished();
  });

  locate('goimports', (err, data) => {
    if (err !== null) {
      // TODO handle tool not found
      atom.notifications.addError(err);
    }
    tools.GOIMPORTS = {};
    tools.GOIMPORTS.path = data;
    finished();
  });
}
