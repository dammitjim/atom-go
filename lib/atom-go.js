'use babel';

import Environment from './environment/environment';
import goFmt from './tools/gofmt/gofmt';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    console.log(Environment);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-go:gofmt': () => goFmt(),
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
  },

};
