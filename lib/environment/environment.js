'use babel';

import { getTools } from '../tools/tools';

function updateEnv(env) {
  atom.workspace.ENVIRONMENT = env;
}

class Environment {
  constructor() {
    // If the environment is not already set
    if (!atom.workspace.ENVIRONMENT) {
      this.RAWGOPATH = process.env.GOPATH;
      this.GOPATH = process.env.GOPATH;
      if (!this.GOPATH) {
        atom.notifications.addError(`GOPATH not set in environment, please check
          your configuration`);
      }

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
        console.log(atom.workspace.ENVIRONMENT);
      });
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
}

export default new Environment();
