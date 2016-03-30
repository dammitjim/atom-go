'use babel';

import Environment from './environment/environment';
import goFmt from './tools/gofmt/gofmt';
import goImports from './tools/goimports/goimports';
import goBuild from './tools/gobuild/gobuild';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,
  saveSubscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.saveSubscriptions = new CompositeDisposable();

    this.saveSubscriptions.add(atom.workspace.observeTextEditors((editor) => {
      const bufferSubscriptions = new CompositeDisposable();
      if (!editor) {
        return;
      }
      bufferSubscriptions.add(editor.getBuffer().onWillSave((filePath) => {
        goImports();
      }));
      bufferSubscriptions.add(editor.getBuffer().onDidDestroy(() => {
        bufferSubscriptions.dispose();
      }));
      this.saveSubscriptions.add(bufferSubscriptions);
    }));

    this.subscriptions.add(atom.workspace.observeTextEditors((editor) => {
      this.handleEvents(editor);
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-go:gofmt': () => goFmt(),
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-go:goimports': () => goImports(),
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-go:gobuild': () => goBuild(),
    }));
  },

  handleEvents(editor) {
    const buf = editor.getBuffer();
    buf.onDidSave(() => {
      goImports();
    });
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
  },

  goLinter(indieRegistry) {
    const goLinter = indieRegistry.register({ name: 'atom-go' });
    this.subscriptions.add(goLinter);
    Environment.setLinter(goLinter);
  },

};
