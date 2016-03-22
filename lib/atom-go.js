'use babel';

import Environment from './environment/environment';

// import AtomGoView from './atom-go-view';
// import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    this.loadEnv();
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    // this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    // this.subscriptions.add(atom.commands.add('atom-workspace', {
    //   'atom-go:environment': () => this.loadEnv()
    // }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
  },

  loadEnv() {
    console.log(Environment);
  },

};
