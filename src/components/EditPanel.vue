<template>
    <div class="editPanel">
        <div class="editPanelActionBar">
            <b-btn v-if="copyPasteEnabled" variant="default" @click="copy"><icon name="copy"></icon></b-btn>
            <b-btn v-if="copyPasteEnabled" variant="default" @click="paste"><icon name="paste"></icon></b-btn>
            <b-btn variant="success" @click="save"><icon name="save"></icon></b-btn>
            <b-btn @click="close" variant="danger"><icon name="times"></icon></b-btn>
        </div>
        <b-tabs class="hyp-edit-panel-wrap">
            <b-tab title="Settings" active>
                <vue-form-generator :schema="settings_schema" :model="settings_model"></vue-form-generator>
            </b-tab>
            <b-tab title="General">
                <vue-form-generator :schema="general_schema" :model="general_model"></vue-form-generator>
            </b-tab>
            <b-tab title="Extra">
                <b-tabs class="hyp-edit-panel-wrap">
                    <b-tab title="CSS">
                        <textarea class="form-control" v-model="extra.cssCode"></textarea>
                    </b-tab>
                    <b-tab title="JS">
                        <textarea class="form-control" v-model="extra.jsCode"></textarea>
                    </b-tab>
                    <b-tab title="HTML">
                        <textarea class="form-control" v-model="extra.htmlCode"></textarea>
                    </b-tab>
                </b-tabs>
            </b-tab>

        </b-tabs>

    </div>
</template>

<script>

import { has } from '../helpers'

import { CLOSE_EDIT_PANEL, UPDATE_COMPONENT } from '../mutation-types'

export default {
    name:'editPanel',

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
                    if(legends[i] != this)
                        legends[i].parentElement.classList.remove('active')
                }
            }
        }
    },

    computed: {
        copyPasteEnabled() {
            return navigator.clipboard ? true : false
        },
        get_component () {
                const cc_id = this.$store.state.editComponentID
                if (cc_id != null)
                    return this.$store.getters.findComponentByID(cc_id)
                return null
        },
        settings_schema () {
            const component = this.get_component
            if (component != null) {
                return this.$hyper.pm.get_settings_schema_for(component.type)
            } else {
                return {}
            }
        },
        settings_model () {
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

        extra () {
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

        general_schema () {
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
                                type:"tblrInput",
                                label:'Padding',
                                model: 'padding'
                            },
                            {
                                type:"tblrInput",
                                label:'Margin',
                                model: 'margin'
                            }
                        ]
                    },
                    {
                        legend: "Background",
                        fields: [
                            {
                                type:"imageChooser",
                                label:'Background Image',
                                model: 'backgroundImage'
                            },
                            {
                                type:"color",
                                label:'Background Color',
                                model: 'backgroundColor'
                            }
                        ]
                    },
                    {
                        legend: "Foreground",
                        fields: [
                            {
                                type:"color",
                                label:'Foreground Color',
                                model: 'foregroundColor'
                            }
                        ]
                    }
                ]
            }
        }
    },

    data () {
        return {

        }
    },

    methods: {
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
                } catch(error) {
                    console.error(error)
                }
            })
        }
    }
}
</script>

<style lang="scss">
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

    .editPanelActionBar {
        margin-bottom: 15px;
        text-align: right;
        .btn {
            line-height: 0;
            padding: 5px 10px;
            svg{
              width: 12px;
              height: 12px;
            }
          &:active{
            outline: none !important;
            box-shadow: none !important;
          }
          &:focus{
            outline: none !important;
            box-shadow: none !important;
          }
        }

    }
    .hyp-edit-panel-wrap{
        height: 100%;
        div{
          ul{
            width: 100%;
            text-align: justify;
            background: #eee;
            li{
              margin-bottom: 0;
              a{
                font-size: 14px;
                line-height: 14px;
              }
              a.nav-link{
                border: none;
                border-radius: 0;
                .active{
                  border: none;
                  border-radius: 0;
                }
              }
            }
            &:focus{
              outline: none;
           }
          }

        }
        .tab-content{
          fieldset{
            .form-group{
              .field-wrap{
                select.form-control{
                  font-size: 14px;
                  padding: 4px 10px;
                  height: 30px;
                }
              }
            }
          }
        }
    }

    fieldset {
        background: #fff;
        margin: 5px 0;
        position: relative;
        overflow: hidden;
        display: block;
        box-shadow: 0 0 4px 0 rgba(0,0,0,0.08);
        input{
          .form-control{

          }
          &:active{
          box-shadow: none;
          outline: none;
          }
          &:focus{
            box-shadow: none;
            outline: none;
          }
        }
        select{
          .form-control{

          }
          &:active{
          box-shadow: none;
          outline: none;
          }
          &:focus{
            box-shadow: none;
            outline: none;
          }
        }
        legend{
          font-size: 14px;
          line-height: 14px;
          font-weight: bold;
          color: #0061cc;
          background: #eee;
          padding: 6px 10px;
          margin: 0;
          border-bottom: 1px solid #dbdbdb;

          &:hover{
            cursor: pointer;
          }
        }
        .form-group{
          padding: 0 10px;
          margin-bottom: 5px;
          label{
            font-size: 13px;
            line-height: 15px;
            margin-bottom: 4px;
          }
          .field-wrap{
            .wrapper{
              .form-control{
                padding: 4px 10px;
                height: 30px;
              }
            }
            .btn-group{
              button{
                padding: 0 6px;
              }
            }
            .imageChooser{
              button{
                &:active{
                  box-shadow: none;
                }
                &:focus{
                  box-shadow: none;
                }
              }
            }

          }
        }
    }



    fieldset.willcollapse div.form-group {
        display: none;
        transition: all 0.3s ease-in;
    }
    fieldset.willcollapse.active div.form-group {
        display: block;
        transition: all 0.3s ease-in-out;
    }

    .ql-container, .ql-editor {
        height: auto;
    }
}
</style>


