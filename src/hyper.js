
import Vue from 'vue'
import App from './App.vue'

import store from './store'
import VueFormGenerator from "vue-form-generator"
import { isFunction, cloneDeep, has, merge } from './helpers'
import { RESET_EDITOR_STATE } from './mutation-types'

import PluginManager from './pm'
import sectionPlugin from './plugins/section'
import rowPlugin from './plugins/row'
import columnPlugin from './plugins/column'
import textBlock from './plugins/textblock'
import imageBlock from './plugins/imageblock'
import contentbox from './plugins/contentbox'
import tabBlock from './plugins/tabblock'
import nestableItem from './plugins/nestableitem'
import linkBlock from './plugins/linkblock'
import sliderBlock from './plugins/sliderblock'
import headingBlock from './plugins/heading'

import toggleField from './formgenerator/toggle_button_group'
import quillEditorField from './formgenerator/quill_editor'
import imageChooserField from './formgenerator/image_chooser'
import tblrInput from './formgenerator/tblr_input'
import sectionedField from './formgenerator/sectioned_fields'
import defaultValueField from './formgenerator/default_value'
import multipleObjectField from './formgenerator/multiple_object'
import chooserField from './formgenerator/chooser'
import colorField from './formgenerator/colorpicker'
import schemaBuilderField from './formgenerator/schema_builder'

import ActionBar from './components/ActionBar'
import Icon from './components/Icon'
import Row from './components/Row'
import Column from './components/Column'
import Nester from './components/Nester'
import ComponentLoader from './components/ComponentLoader'
import Block from './components/Block'
import draggable from 'vuedraggable'

export default class HyperEditor {

    constructor(elem, configs = {}) {
        const defaultConfig = {
            imageSearchApi: null,
            preview: null
        }

        this.elem = elem
        this.pm = new PluginManager()
        this.configs = merge(defaultConfig, configs)

        if (has(this.configs, 'preview')) {
            this.pm.add_global_preview(this.configs.preview)
        }
    }

    __init__hyper_for_vue() {
        let Hyper = {
            install: (Vue, options) => {
                Vue.prototype.$hyper = this
            }
        }
        Vue.use(Hyper)
    }

    __init_plugin_manager() {
        // install defaults
        this.pm.register('section', sectionPlugin)
        this.pm.register('row', rowPlugin)
        this.pm.register('column', columnPlugin)
        this.pm.register('text', textBlock)
        this.pm.register('image', imageBlock)
        this.pm.register('contentbox', contentbox)
        this.pm.register('tab', tabBlock)
        this.pm.register('link', linkBlock)
        this.pm.register('nestableitem', nestableItem)
        this.pm.register('slider', sliderBlock)
        this.pm.register('heading', headingBlock)
    }

    initialize(editorState = []) {

        Vue.component('icon', Icon)
        Vue.component('draggable', draggable)
        Vue.component('ActionBar', ActionBar)

        Vue.component('Row', Row)
        Vue.component('Column', Column)
        Vue.component('Nester', Nester)
        Vue.component('Block', Block)
        Vue.component('ComponentLoader', ComponentLoader)

        // custom form fields
        Vue.component('fieldToggleButtonGroup', toggleField)
        Vue.component('fieldRichtext', quillEditorField)
        Vue.component('fieldImageChooser', imageChooserField)
        Vue.component('fieldTblrInput', tblrInput)
        Vue.component('fieldSectioned', sectionedField)
        Vue.component('fieldMultipleObject', multipleObjectField)
        Vue.component('fieldDefaultValue', defaultValueField)
        Vue.component('fieldChooser', chooserField)
        Vue.component('fieldColor', colorField)
        Vue.component('fieldSchemaBuilder', schemaBuilderField)
        Vue.use(VueFormGenerator)

        this.__init_plugin_manager()
        if (has(this.configs, 'blocks'))
            this.pm.override_block_configurations(this.configs.blocks)
        this.__init__hyper_for_vue()

        this.vueApp = new Vue({
            el: this.elem,
            store: store,
            beforeCreate() {
                this.$store.commit(RESET_EDITOR_STATE, editorState)
            },
            render: h => h(App)
        })

        this.vueApp.$store.subscribe((change) => {
            if (this.stateChangeCallback
                && isFunction(this.stateChangeCallback)) {
                let cp_state = cloneDeep(this.vueApp.$store.state.editor)
                this.stateChangeCallback(cp_state)
            }
        })
    }

    addStateChangeListener(callback) {
        this.stateChangeCallback = callback
    }

    register_block(name, block) {
        console.warn('"register_block" is deprecated and will be removed. Please use "registerBlock" instead')
        this.registerBlock(name, block)
    }

    registerBlock(name, block) {
        this.pm.register(name, block)
    }
}
