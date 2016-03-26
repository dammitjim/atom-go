'use babel';

import Environment from './environment/environment';
import goFmt from './tools/gofmt/gofmt';
import goImports from './tools/goimports/goimports';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-go:gofmt': () => goFmt(),
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-go:goimports': () => goImports(),
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
  },

};
