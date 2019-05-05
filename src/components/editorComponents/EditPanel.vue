<template>
  <div class="editPanel">
    <div class="text-right">
      <button v-if="copyPasteEnabled" @click="copy" class="hyp-edit-panel-btn" title="Copy">
        <icon name="copy"></icon>
      </button>
      <button v-if="copyPasteEnabled" @click="paste" class="hyp-edit-panel-btn" title="Paste">
        <icon name="paste"></icon>
      </button>
      <button variant="success" @click="save" class="hyp-edit-panel-btn save" title="Save">
        <icon name="save"></icon>
      </button>
      <button @click="close" class="hyp-edit-panel-btn" title="Close">
        <icon name="times"></icon>
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
              <textarea class="form-control" v-model="extra.cssCode"></textarea>
            </TabItem>
            <TabItem name="JS">
              <textarea class="form-control" v-model="extra.jsCode"></textarea>
            </TabItem>
            <TabItem name="HTML">
              <textarea class="form-control" v-model="extra.htmlCode"></textarea>
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
      return {

      }
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

  .hyp-edit-panel-btn {
    @apply px-3 py-1 bg-white rounded shadow;

    &:hover {
      @apply bg-blue text-white;
    }

    &.save {
      @apply  bg-green text-white;
      &:hover {
        @apply bg-green-dark;
      }
    }
  }

  .editPanel {
    max-width: 350px;
    min-width: 350px;
    overflow-y: scroll;
    min-height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background: #f5f5f5;
    box-shadow: 0 0 4px 0 #ddd;
    padding: 15px;
    z-index: 6000;
    /*top edit panel bar*/
    .editPanelActionBar {
      margin-bottom: 15px;
      text-align: right;
      b-btn {
        -webkit-box-shadow: rgba(0, 0, 0, 0.12) 0 1px 4px -1px;
        box-shadow: rgba(0, 0, 0, 0.12) 0 1px 4px -1px;
        background-color: #fff;
        border-radius: 3px;
        overflow: hidden;
        margin: 0;
        padding: 5px 8px;
        display: inline-flex;
        i {
          display: inline-grid;
          vertical-align: middle;
          svg {
            width: 13px;
            height: 13px;
          }
        }
        &:hover {
          background: #007bff;
          color: #fff;
          cursor: pointer;
        }
      }

    }

    /*hyper edit panel wrap*/
    .hyp-edit-panel-wrap {
      height: 100%;
      position: relative;
      div {
        ul {
          width: 100%;
          text-align: justify;
          li {
            margin-bottom: 0;
            a {
              font-size: 14px;
              line-height: 14px;
            }
            a.nav-link {
              border: none;
              border-radius: 0;
              .active {
                border: none;
                border-radius: 0;
              }
            }
          }
          &:focus {
            outline: none;
          }
        }

      }
      .tab-content {
        fieldset {
          .form-group {
            .field-wrap {
              select.form-control {
                font-size: 14px;
                padding: 4px 10px;
                height: 30px;
                border-radius: 3px;
                width: 100%;
                border: 1px solid #ebebeb;
              }
            }
          }
        }
      }

      .vue-form-generator{
        fieldset{
          .form-group{
            padding: 12px;
            .field-wrap{
              .form-control{
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
        }
      }

      //custom html
      textarea.form-control{
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

    fieldset{
      fieldset{
        .form-group{
          label{
            span{
              font-size: 13px;
              font-weight: normal;
            }
          }
        }
      }
    }

    fieldset {
      border: 1px solid #ebebeb;
      margin: 5px 0;
      position: relative;
      display: block;
      background-color: #fff;
      border-radius: 4px;
      width: 100%;
      overflow: hidden;
      padding: 0;
      input {
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
              width: 100%;
              border: 1px solid #ebebeb;
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
      .form-group + .form-group{
        padding-top: 0 !important;
      }
    }

    fieldset.willcollapse div.form-group {
      display: none;
      transition: all 0.3s ease-in;
    }
    fieldset.willcollapse.active div.form-group {
      display: block;
      transition: all 0.3s ease-in-out;
      padding: 12px;
    }

    .ql-toolbar.ql-snow + .ql-container.ql-snow{
      position: relative;
      display: block;
      overflow: hidden;
      width: 100%;
      .ql-editor{
        max-height: 200px;
        overflow-y: scroll;
      }
    }
    .ql-snow .ql-tooltip{
      border: none;
      background: #ebebeb;
      transform: none;
      position: relative;
      left: 0 !important;
      right: 0!important;
      margin-top: 0 !important;
      top: 0 !important;
    }


  }
</style>


