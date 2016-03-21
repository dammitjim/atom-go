'use babel';

import AtomGoView from './atom-go-view';
import { CompositeDisposable } from 'atom';

export default {

  atomGoView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomGoView = new AtomGoView(state.atomGoViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomGoView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-go:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomGoView.destroy();
  },

  serialize() {
    return {
      atomGoViewState: this.atomGoView.serialize()
    };
  },

  toggle() {
    console.log('AtomGo was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
