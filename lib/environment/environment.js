'use babel';

import { NotificationManager } from 'atom';

const gp = process.env.GOPATH
const gr = process.env.GOROOT

if (!gp) {
  atom.notifications.addError("GOPATH not set in environment")
}

if (!gr) {
  atom.notifications.addError("GOROOT not set in environment")
}

atom.workspace.GOPATH = gp;
atom.workspace.GOROOT = gr;

let loadSettings = atom.getLoadSettings();
let baseDir = "";

if (loadSettings.locationsToOpen.length > 0) {
  baseDir = loadSettings.locationsToOpen[0].pathToOpen;
} else {
  atom.notifications.addError("Error finding baseDir");
}

console.log(baseDir);

export const RAWGOPATH = gp;

export function SetGOPATH(newPath) {
  GOPATH = newPath;
  atom.workspace.GOPATH = GOPATH;
}
