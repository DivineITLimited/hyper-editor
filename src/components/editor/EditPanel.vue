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
      @apply h-full bg-white;
      .tabs-details {
        @apply p-3;
        .vue-form-generator {
          fieldset {
            @apply;
            legend {
              @apply text-sm bg-grey-light px-2 py-1 w-full border-b border-grey text-grey-darker flex relative;
                &:after, &:before{
                  @apply border border-grey-darker absolute;
                  content: "";
                  top: 11px;
                  width: 6px;
                }
                &:before{
                  transform: rotateZ(45deg);
                  -webkit-transform: rotateZ(45deg);
                  right: 12px;
                }
                &:after{
                  transform: rotateZ(-45deg);
                  -webkit-transform: rotateZ(-45deg);
                  right: 8px;
                }
                &:hover {
                  cursor: pointer;
                }
              }
            .form-group {
              label{
                span{
                  @apply text-grey-darkest text-sm pb-1 block;
                }
              }
              .field-wrap {
                .form-control {
                  @apply text-sm text-grey-dark leading-tight bg-grey-lightest w-full p-2 block border rounded;
                  &:focus{
                    @apply border-blue;
                  }
                }
                select.form-control{
                  @apply text-sm p-2 ;
                  &:focus{
                    @apply border-blue;
                  }
                }
              }
            }
          }
          fieldset:first-child{
            legend{
              @apply rounded-t;
            }
          }
          fieldset:last-child{
           legend{
              @apply rounded-b-sm border-b-0;
           }
          }
          .willcollapse.active{
            @apply bg-white mb-2 rounded;
            legend{
              @apply text-blue rounded-b-none;
              &:after, &:before{
                @apply border-blue;
              }
            }
            .form-group{
              @apply px-3;
            }
          }
        }

        //inner tab
        .hyp-tab-wrap{
          .hyp-tab{
            @apply bg-transparent;
            .hyp-tab-item{
              .hyp-tab-item-link{
                @apply font-normal border py-1 px-2 text-xs;
              }
            }
          }
          .tabs-details{
            @apply p-0;

            //custom html
            textarea.hyp-form-control {
              @apply text-xs p-2 rounded-b-sm w-full h-64 border border-grey-light border-t-0 font-mono text-grey-darker;
              &:focus{
                @apply outline-none;
              }
            }
          }
        }
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

      .form-group {
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
      @apply block pt-3 pb-3;
    }
    fieldset.willcollapse.active div.form-group

    .ql-toolbar.ql-snow + .ql-container.ql-snow {
      position: relative;
      display: block;
      overflow: hidden;
      width: 100%;
      background: #fff;
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


