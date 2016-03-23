'use babel';

function updateEnv(env) {
  atom.workspace.ENVIRONMENT = env;
}

class Environment {
  constructor() {
    // If the environment is not already set
    if (!atom.workspace.ENVIRONMENT) {
      this.RAWGOPATH = process.env.GOPATH;
      this.GOPATH = process.env.GOPATH;
      if (!this.gp) {
        atom.notifications.addError(`GOPATH not set in environment, please check
          your configuration`);
      }

      const loadSettings = atom.getLoadSettings();
      if (loadSettings.locationsToOpen.length > 0) {
        this.ROOTDIR = loadSettings.locationsToOpen[0].pathToOpen;
      }

      updateEnv(this);
    } else {
      updateEnv(this);
    }
  }

  SetGOPATH(path) {
    this.GOPATH = path;
  }
}

export default new Environment();
