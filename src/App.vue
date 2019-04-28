<template>
  <div id="app">
    <b-button-toolbar key-nav>
      <b-button-group size="sm" class="hyp-undo-redo-wrap">
        <b-button @click="createSection" title="Add New Section">
          <icon name="plus"></icon>
        </b-button>
        <b-button @click="undo" variant="primary btn-sm" title="Undo">
          <icon name='undo'></icon>
        </b-button>
        <b-button @click="redo" variant="danger btn-sm" title="Redo">
          <icon name='redo'></icon>
        </b-button>
        <b-button @click="sourceToggle" :class="{'active': viewSource}" title="Json">
          <icon name='code'></icon>
        </b-button>
      </b-button-group>
    </b-button-toolbar>
    <textarea id="sourceEditor" v-if="viewSource" v-model="source"></textarea>
    <div v-else>
      <draggable v-model="editorData" :options="{handle:'.smHandle', animation:150}">
        <ESection v-for="item in editorData" :key="item.id" :id="item.id"></ESection>
      </draggable>

      <transition name="fade">
        <EditPanel v-if="showEditPanel"/>
      </transition>

      <BlockChooser/>
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
          return JSON.stringify(this.editorData)
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
  #app {
    height: 100%;
    position: relative;
    display: block;
    overflow: hidden;
    font-family: Helvetica,sans-serif;
    color: #444444;
    //top button toolbar
    b-button-toolbar {
      height: 38px;
      overflow: hidden;
      background-color: #f5f5f5;
      position: fixed;
      top: 0;
      z-index: 999;
      width: 100%;
      left: 0;
      padding-left: 1%;
      border-bottom: 1px solid #ddd;
      .hyp-undo-redo-wrap {
        display: block;
        padding-top: 6px;
        overflow: hidden;
        width: 100%;
        b-button {
            -webkit-box-shadow: rgba(0,0,0,0.12) 0 1px 4px -1px;
            box-shadow: rgba(0,0,0,0.12) 0 1px 4px -1px;
            background-color: #fff;
            border-radius: 3px;
            overflow: hidden;
            margin: 0;
            padding: 5px 8px;
            display: inline-flex;
          i{
            display: inline-grid;
            vertical-align: middle;
            svg {
              width: 15px;
              height: 15px;
            }
          }

          &:hover {
            cursor: pointer;
            background: #007bff;
            border-color: #007bff;
            svg {
              color: #fff;
            }
          }
        }
        .btn.active {
          color: #007bff
        }
        .btn-primary {
          &:hover {
            background: #007bff;
            border-color: #007bff;
            color: #fff;
          }
        }
        .btn-danger {
          &:hover {
            background: #dc3545;
            border-color: #dc3545;
            color: #fff;
          }
        }

      }
    }


    .hyp-add-section-btn {
      margin-left: 5px;
      &:active {
        outline: none;
        box-shadow: none;
      }
      &:focus {
        box-shadow: none !important;
        outline: none !important;
      }
    }

    #sourceEditor {
      width: 100%;
      min-height: 150px;
      font-family: monospace;
      font-size: 10px;
      border: 1px solid #ebebeb;
      margin-top:45px;
      overflow-y: scroll;
    }

    //hyper btn css
    .hyper-btn{
      padding: 5px 10px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 12px;
      border-radius: 3px;
    }

    .chooser-btn{
      background: #007bff;
      border: 1px solid #007bff;
      color: #fff;
      &:hover{
        cursor: pointer;
        border-color: #ebebeb;
        background: #ebebeb;
        color: #444444;
      }
    }
    .reset-btn{
      background: #ebebeb;
      border: 1px solid #ebebeb;
      &:hover{
        cursor: pointer;
        background: transparent;
        border-color: #007bff;
      }
    }
    .vc-chrome{
      padding-top: 5px;
      -webkit-box-shadow: rgba(0, 0, 0, 0.12) 0 1px 4px -1px;
      box-shadow: rgba(0, 0, 0, 0.12) 0 1px 4px -1px;
      .vc-chrome-body{
        background: #f5f5f5;
      }
    }

  }
</style>
