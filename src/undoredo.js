import { cloneDeep } from './helpers'

class UndoRedoHistory {


    init(store) {
        this.history = [];
        this.currentIndex = -1;
        this.store = store;
    }

    addState(state) {
      // may be we have to remove redo steps
      if (this.currentIndex + 1 < this.history.length) {
        this.history.splice(this.currentIndex + 1);
      }
      this.history.push(state);
      this.currentIndex++;
    }

    canUndo() {
      return this.currentIndex > 0
    }

    canRedo() {
      return this.currentIndex + 1 < this.history.length
    }

    undo() {
      const prevState = this.history[this.currentIndex - 1];
      // take a copy of the history state
      // because it would be changed during store mutations
      // what would corrupt the undo-redo-history
      // (same on redo)
      this.store.replaceState(cloneDeep(prevState));
      this.currentIndex--;
    }

    redo() {
      const nextState = this.history[this.currentIndex + 1];
      this.store.replaceState(cloneDeep(nextState));
      this.currentIndex++;
    }
  }

  export const undoRedoHistory = new UndoRedoHistory();

  export const undoRedoPlugin = (store) => {
    // initialize and save the starting stage
    undoRedoHistory.init(store);
    let firstState = cloneDeep(store.state);
    undoRedoHistory.addState(firstState);

    store.subscribe((mutation, state) => {
      // is called AFTER every mutation
      undoRedoHistory.addState(cloneDeep(state));
    });
}