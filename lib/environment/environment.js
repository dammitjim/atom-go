'use babel';

import { getTools } from '../tools/tools';

function updateEnv(env) {
  atom.workspace.ENVIRONMENT = env;
}

class Environment {
  constructor() {
    // If the environment is not already set
    if (!atom.workspace.ENVIRONMENT) {
      // Store original gopath seperately
      this.RAWGOPATH = process.env.GOPATH;
      this.GOPATH = process.env.GOPATH;

      if (this.GOPATH) {
        const loadSettings = atom.getLoadSettings();
        if (loadSettings.locationsToOpen.length > 0) {
          this.ROOTDIR = loadSettings.locationsToOpen[0].pathToOpen;
        }

        this.TOOLSLOADED = false;
        updateEnv(this);

        getTools((tools) => {
          this.tools = tools;
          this.TOOLSLOADED = true;
          updateEnv(this);
          atom.notifications.addInfo(`Loaded tools: ${JSON.stringify(tools)}`);
        });
      } else {
        atom.notifications.addError(`GOPATH not set in environment, please check
          your configuration`);
      }
    } else {
      // Load environment variables in from window
      for (const key in atom.workspace.ENVIRONMENT) {
        if ({}.hasOwnProperty.call(atom.workspace.ENVIRONMENT, key)) {
          this[key] = atom.workspace.ENVIRONMENT[key];
        }
      }
    }
  }

  SetGOPATH(path) {
    this.GOPATH = path;
  }

  setLinter(linter) {
    this.LINTER = linter;
    updateEnv(this);
  }
}

export default new Environment();
