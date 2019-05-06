<template>
  <div class="editPanel">
    <div class="edit-panel-topbar">
      <button v-if="copyPasteEnabled" @click="copy" class="hyp-edit-panel-btn" title="Copy">
        <icon name="copy" stroke="3"></icon>
      </button>
      <button v-if="copyPasteEnabled" @click="paste" class="hyp-edit-panel-btn" title="Paste">
        <icon name="paste" stroke="3"></icon>
      </button>
      <button variant="success" @click="save" class="hyp-edit-panel-btn save" title="Save">
        <icon name="save" stroke="3"></icon>
      </button>
      <button @click="close" class="hyp-edit-panel-btn close" title="Close">
        <icon name="times" stroke="3"></icon>
      </button>
    </div>
    <div class="hyp-edit-panel-wrap">
      <Tab>
        <TabItem name="Settings" :selected="true">
          <vue-form-generator :schema="settings_schema" id="setting" :model="settings_model"></vue-form-generator>
        </TabItem>
        <TabItem name="General">
          <vue-form-generator :schema="general_schema" id="general" :model="general_model"></vue-form-generator>
        </TabItem>
        <TabItem name="Extra">
          <Tab>
            <TabItem name="CSS" :selected="true">
              <textarea class="hyp-form-control" v-model="extra.cssCode"></textarea>
            </TabItem>
            <TabItem name="JS">
              <textarea class="hyp-form-control" v-model="extra.jsCode"></textarea>
            </TabItem>
            <TabItem name="HTML">
              <textarea class="hyp-form-control" v-model="extra.htmlCode"></textarea>
            </TabItem>
          </Tab>
        </TabItem>
      </Tab>
    </div>

  </div>
</template>

<script>

  import {has} from '../../helpers'
  import Tab from './Tab'
  import TabItem from './TabItem'

  import {CLOSE_EDIT_PANEL, UPDATE_COMPONENT} from '../../mutation-types'

  export default {
    name: 'editPanel',
    components: {Tab, TabItem},
    data() {
      return {}
    },

    mounted() {
      let parent = document.getElementsByClassName('editPanel')[0]
      let legends = parent.getElementsByTagName('legend')
      for (let i = 0; i < legends.length; i++) {
        legends[i].parentElement.classList.add('willcollapse')
        legends[i].onclick = function () {
          if (this.parentElement.classList.contains('active')) {
            this.parentElement.classList.toggle('active', false)
          } else {
            this.parentElement.classList.toggle('active', true)
          }
          for (let i = 0; i < legends.length; i++) {
            if (legends[i] != this)
              legends[i].parentElement.classList.remove('active')
          }
        }
      }

    },


    computed: {
      copyPasteEnabled() {
        return navigator.clipboard ? true : false
      },
      get_component() {
        const cc_id = this.$store.state.editComponentID
        if (cc_id != null)
          return this.$store.getters.findComponentByID(cc_id)
        return null
      },
      settings_schema() {
        const component = this.get_component
        if (component != null) {
          return this.$hyper.pm.get_settings_schema_for(component.type)
        } else {
          return {}
        }
      },
      settings_model() {
        const component = this.get_component
        if (has(component, 'settings')) {
          return component.settings
        } else {
          return {}
        }
      },

      general_model() {
        const component = this.get_component
        if (has(component, 'general')) {
          return component.general
        } else {
          return {}
        }
      },

      extra() {
        const component = this.get_component
        if (has(component, 'extra')) {
          return component.extra
        } else {
          return {
            cssCode: "",
            jsCode: "",
            htmlCode: ""
          }
        }
      },

      general_schema() {
        let styles = this.$hyper.pm.get_available_styles_for(this.get_component.type)
        return {
          groups: [
            {
              legend: 'Appearance',
              fields: [
                {
                  type: "select",
                  label: "Style",
                  model: "style",
                  values: styles,
                  required: true
                },
                {
                  type: "input",
                  inputType: "text",
                  label: "Custom Classes",
                  model: "classes"
                },
                {
                  type: 'toggleButtonGroup',
                  label: 'Text Align',
                  model: 'textAlignment',
                  choices: ['left', 'center', 'right']
                },
                {
                  type: "tblrInput",
                  label: 'Padding',
                  model: 'padding'
                },
                {
                  type: "tblrInput",
                  label: 'Margin',
                  model: 'margin'
                }
              ]
            },
            {
              legend: "Background",
              fields: [
                {
                  type: "imageChooser",
                  label: 'Background Image',
                  model: 'backgroundImage'
                },
                {
                  type: "color",
                  label: 'Background Color',
                  model: 'backgroundColor'
                }
              ]
            },
            {
              legend: "Foreground",
              fields: [
                {
                  type: "color",
                  label: 'Foreground Color',
                  model: 'foregroundColor'
                }
              ]
            }
          ]
        }
      }
    },

    data() {
      return {}
    },

    methods: {
      tabChange(id) {
        this.setState()
      },
      close() {
        this.$store.commit(CLOSE_EDIT_PANEL)
      },
      save() {
        const component = this.get_component
        const toSave = {
          id: component.id,
          value: {
            settings: this.settings_model,
            extra: this.extra,
            general: this.general_model
          }
        }
        this.$store.commit(UPDATE_COMPONENT, toSave)
        this.close()
      },

      copy() {
        navigator.clipboard.writeText(JSON.stringify(this.get_component))
      },

      paste() {
        navigator.clipboard.readText().then(data => {
          try {
            const dataJson = JSON.parse(data)
            if (dataJson.type == this.get_component.type) {
              dataJson.id = this.get_component.id
              this.$store.commit(UPDATE_COMPONENT, {
                id: dataJson.id,
                value: dataJson
              })
            }
          } catch (error) {
            console.error(error)
          }
        })
      }
    }
  }

</script>

<style lang="scss">

  .editPanel {
    @apply fixed z-50 border-l pin-t pin-b pin-r bg-grey-lighter;
    min-width: 320px;
    max-width: 320px;
    //edit panel topbar
    .edit-panel-topbar {
      @apply text-right p-2 border-b;
      .hyp-edit-panel-btn {
        @apply px-3 py-1 bg-white rounded shadow;

        &:hover {
          @apply bg-blue text-white;
        }

        &.save {
          @apply bg-green text-white;
          &:hover {
            @apply bg-green-dark;
          }
        }
        &.close {
          @apply bg-grey-dark text-white;
          &:hover {
            @apply bg-red-dark;
          }
        }
      }
    }
    //hyper edit panel wrap
    .hyp-edit-panel-wrap {
      @apply h-full relative bg-white;
      .tabs-details {
        @apply p-3;
        .vue-form-generator {
          fieldset {
            .form-group {
              label{
                span{
                  @apply text-grey-darker font-medium;
                }
              }
              .field-wrap {
                .form-control {
                  @apply text-sm text-grey-darker bg-grey-lightest w-full p-2 leading-tight border rounded;
                  &:focus{
                    @apply border-blue;
                  }
                }
                select.form-control{
                  @apply text-sm;
                  &:focus{
                    @apply border-blue;
                  }
                }
              }
            }
          }
        }
      }

      //custom html
      textarea.form-control {
        font-size: 14px;
        padding: 4px 10px;
        height: 32px;
        border-radius: 3px;
        width: 100%;
        border: 1px solid #ebebeb;
        background: #f9f9f9;
        color: #848484;
      }
    }
  }

  .editPanel {

    fieldset {
      input {
        &:active {
          box-shadow: none;
          outline: none;
        }
        &:focus {
          box-shadow: none;
          outline: none;
        }
      }
      select {
        .form-control {

        }
        &:active {
          box-shadow: none;
          outline: none;
        }
        &:focus {
          box-shadow: none;
          outline: none;
        }
      }
      legend {
        font-size: 14px;
        line-height: 18px;
        font-weight: bold;
        color: #0061cc;
        background: #eee;
        padding: 8px 10px;
        margin: 0;
        width: 100%;
        border-bottom: 1px solid #dbdbdb;

        &:hover {
          cursor: pointer;
        }
      }
      .form-group {
        label {
          font-size: 14px;
          font-weight: bold;
          line-height: 18px;
          margin-bottom: 5px;
          display: block;
        }
        .field-wrap {
          .wrapper {
            position: relative;
            .form-control {
              padding: 8px 10px;
              border-radius: 3px;
              box-sizing: border-box;
            }
          }
          .btn-group {
            button {
              padding: 0 6px;
            }
          }
          .imageChooser {
            button {
              &:active {
                box-shadow: none;
              }
              &:focus {
                box-shadow: none;
              }
            }
          }

        }
      }
      .form-group + .form-group {
        padding-top: 0 !important;
      }
    }

    fieldset.willcollapse div.form-group {
      @apply hidden;
    }
    fieldset.willcollapse.active div.form-group {
      @apply block pt-2 pb-2;
    }

    .ql-toolbar.ql-snow + .ql-container.ql-snow {
      position: relative;
      display: block;
      overflow: hidden;
      width: 100%;
      .ql-editor {
        max-height: 200px;
        overflow-y: scroll;
      }
    }
    .ql-snow .ql-tooltip {
      border: none;
      background: #ebebeb;
      transform: none;
      position: relative;
      left: 0 !important;
      right: 0 !important;
      margin-top: 0 !important;
      top: 0 !important;
    }

  }
</style>


