<template>
  <div id="app" class="hyp-app">
    <div class="hyp-topbar">
      <button class="hyp-topbar-btn" type="button" @click="createSection">
        <icon name="plus" stroke="3"></icon>
      </button>
      <button class="hyp-topbar-btn" type="button" @click="undo" variant="primary btn-sm" title="Undo">
        <icon name='undo' stroke="3"></icon>
      </button>
      <button class="hyp-topbar-btn" type="button" @click="redo" variant="danger btn-sm" title="Redo">
        <icon name='redo' stroke="3"></icon>
      </button>
      <button class="hyp-topbar-btn" type="button" @click="sourceToggle" :class="{'active': viewSource}">
        <icon name='code' stroke="3"></icon>
      </button>
    </div>
    <div>
      <textarea class="hyp-source" v-if="viewSource" v-model="source"></textarea>
      <div v-else>
        <draggable v-model="editorData" v-bind="{handle:'.smHandle', animation:150}">
          <ESection v-for="item in editorData" :key="item.id" :id="item.id"></ESection>
        </draggable>

        <transition name="fade">
          <EditPanel v-if="showEditPanel"/>
        </transition>

        <BlockChooser/>
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import ESection from './components/Section'
  import EditPanel from './components/EditPanel'
  import BlockChooser from './components/BlockChooser'
  import {ADD_COMPONENT, REARRANGE_EDITOR} from './mutation-types'
  import {undoRedoHistory} from './undoredo'

  export default {
    name: 'app',
    components: {ESection, EditPanel, BlockChooser, draggable},

    data() {
      return {
        viewSource: false
      }
    },

    computed: {

      showEditPanel() {
        return this.$store.state.showEditPanel
      },

      editorData: {
        get() {
          return this.$store.state.editor
        },
        set(value) {
          this.$store.commit(REARRANGE_EDITOR, {value, id: false, getters: this.$store.getters})
        }
      },

      source: {
        get() {
          return JSON.stringify(this.editorData, null, 2)
        },
        set(value) {
          try {
            this.editorData = JSON.parse(value)
          } catch (error) {

          }
        }
      }
    },

    created: function () {
      if (this.editorData.length == 0) {
        this.createSection()
      }
    },

    methods: {
      sourceToggle() {
        this.viewSource = !this.viewSource
      },

      createSection() {
        this.$store.commit(ADD_COMPONENT, {
          component: this.$hyper.pm.get_default_values_for('section'),
          parent_id: false,
          getters: this.$store.getters
        })
      },
      undo() {
        if (undoRedoHistory.canUndo()) {
          undoRedoHistory.undo()
        }
      },
      redo() {
        if (undoRedoHistory.canRedo()) {
          undoRedoHistory.redo()
        }
      }
    }
  }
</script>

<style lang="scss">

  .hyp-app {
    @apply font-sans;
  }

  .hyp-topbar {
    @apply bg-white my-4 inline-flex flex-row shadow ml-2;
  }

  .hyp-topbar-btn {

    @apply bg-white text-grey-darkest font-semibold py-1 px-4 border-r border-grey-light;
    transition: .2s ease;

    &:focus {
      @apply outline-none;
    }

    &:first-child {
      @apply rounded-l;
    }

    &:last-child {
      @apply rounded-r;
    }

    &:hover, &.active {
      @apply bg-blue text-white;
    }

  }

  .hyp-source {

    @apply bg-grey-lighter appearance-none border-2 border-grey-lighter
    rounded w-full py-2 px-4 text-grey-darker leading-tight text-sm h-64;

    &:focus {
      @apply outline-none bg-white border-grey-light;
    }
  }
</style>
