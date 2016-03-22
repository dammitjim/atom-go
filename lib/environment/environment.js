'use babel';

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

      this.update();
    } else {
      this.update();
    }
  }

  SetGOPATH(path) {
    this.GOPATH = path;
  }

  update() {
    atom.workspace.ENVIRONMENT = this;
  }
}

export default new Environment();
