<template>
  <div id="app">
      <b-button-toolbar key-nav>
        <b-button-group size="sm" class="mx-1 hyp-undo-redo-wrap">
          <b-button @click="createSection"><icon name="plus"></icon></b-button>
          <b-button @click="undo" variant="primary btn-sm" title="Undo"><icon name='undo'></icon></b-button>
          <b-button @click="redo" variant="danger btn-sm" title="Redo"><icon name='redo'></icon></b-button>
          <b-button @click="sourceToggle" :class="{'active': viewSource}"><icon name='code'></icon></b-button>
        </b-button-group>
      </b-button-toolbar>
      <textarea id="sourceEditor" v-if="viewSource" v-model="source"></textarea>
      <div v-else>
        <draggable v-model="editorData" v-bind="{handle:'.smHandle', animation:150}">
          <ESection v-for="item in editorData" :key="item.id" :id="item.id"></ESection>
        </draggable>

        <transition name="fade">
          <EditPanel v-if="showEditPanel" />
        </transition>

        <BlockChooser />
      </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import ESection from './components/Section'
import EditPanel from './components/EditPanel'
import BlockChooser from './components/BlockChooser'
import { ADD_COMPONENT, REARRANGE_EDITOR } from './mutation-types'
import { undoRedoHistory } from './undoredo'

export default {
  name: 'app',
  components: { ESection, EditPanel, BlockChooser, draggable },

  data() {
    return {
      viewSource: false
    }
  },

  computed: {

    showEditPanel () {
      return this.$store.state.showEditPanel
    },

    editorData: {
      get() {
        return this.$store.state.editor
      },
      set(value) {
        this.$store.commit(REARRANGE_EDITOR, { value, id:false, getters: this.$store.getters })
      }
    },

    source: {
      get () {
        return JSON.stringify(this.editorData)
      },
      set(value) {
        try {
          this.editorData = JSON.parse(value)
        } catch(error) {

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
      if(undoRedoHistory.canUndo()) {
        undoRedoHistory.undo()
      }
    },
    redo() {
      if(undoRedoHistory.canRedo()) {
        undoRedoHistory.redo()
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  margin-left: auto;
  margin-right: auto;
  .hyp-undo-redo-wrap{
    margin-top: 5px;
    margin-bottom: 5px;
    .btn{
        padding: 5px 10px;
        background: transparent;
        color: #c6c5c5;
        border: 1px solid;
        line-height: 0;
       svg{
          width: 12px;
          height: 12px;
       }
      &:active{
        outline: none;
        box-shadow: none;
      }
      &:focus{
        box-shadow: none !important;
        outline: none !important;
      }
    }
    .btn.active {
      color: #007bff
    }
    .btn-primary{
      &:hover{
        background: #007bff;
        border-color: #007bff;
        color: #fff;
      }
    }
    .btn-danger{
      &:hover{
        background: #dc3545;
        border-color: #dc3545;
        color: #fff;
      }
    }

  }
  .hyp-add-section-btn{
    margin-left: 5px;
    &:active{
        outline: none;
        box-shadow: none;
      }
      &:focus{
        box-shadow: none !important;
        outline: none !important;
      }
  }

  #sourceEditor {
    width: 100%;
    min-height: 200px;
    font-family: monospace;
    font-size: 10px;
    border: 1px solid #ddd;
  }
}
</style>
