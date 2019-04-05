import Vue from 'vue'
import Vuex from 'vuex'
import {
    ADD_COMPONENT, REARRANGE_EDITOR, REMOVE_COMPONENT,
    UPDATE_COLUMN_SIZE_FOR_ALL_CHILD, CLONE_COMPONENT,
    SHOW_EDITPANEL_FOR, CLOSE_EDIT_PANEL, SHOW_BLOCK_CHOOSER_FOR,
    CLOSE_BLOCK_CHOOSER, UPDATE_COMPONENT, RESET_EDITOR_STATE
} from './mutation-types'
import { unique_id, recursivelyFindByID, recursivelyDeleteByID, recursivelyCloneByID } from './helpers'
import { undoRedoPlugin } from './undoredo'
import { has } from './helpers'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [undoRedoPlugin],
    state: {
        showEditPanel: false,
        editComponentID: null,
        lastEditedComponent: null,
        chooseBlock: false,
        chooseBlockParentID: null,
        editor: []
    },
    getters: {
        findComponentByID(state) {
            return id => recursivelyFindByID(state.editor, id)
        }
    },
    mutations: {

        [RESET_EDITOR_STATE](state, value) {
            state.editor = value
        },

        [REARRANGE_EDITOR](state, { value, id, getters }) {
            if (id != false) {
                getters.findComponentByID(id).children = value
            } else {
                state.editor = value
            }
        },

        [ADD_COMPONENT](state, { component, parent_id, getters }) {
            component.id = unique_id()
            if (!parent_id) {
                state.editor.push(component)
            } else {
                let parentObj = getters.findComponentByID(parent_id)
                if (parentObj != null) {
                    parentObj.children.push(component)
                }
            }
        },

        [REMOVE_COMPONENT](state, id) {
            recursivelyDeleteByID(state.editor, id)
        },

        [CLONE_COMPONENT](state, id) {
            recursivelyCloneByID(state.editor, id)
        },

        // Column manipulation
        [UPDATE_COLUMN_SIZE_FOR_ALL_CHILD](state, { id, size }) {
            let parent = recursivelyFindByID(state.editor, id)
            for (let i = 0; i < parent.children.length; i++) {
                parent.children[i].settings.sizeMD = size
                parent.children[i].settings.sizeLG = size
            }
        },


        // Editor panel
        [SHOW_EDITPANEL_FOR](state, id) {
            state.showEditPanel = true
            state.editComponentID = id
            state.lastEditedComponent = null
        },

        [CLOSE_EDIT_PANEL](state) {
            state.showEditPanel = false
            state.lastEditedComponent = state.editComponentID
        },

        [UPDATE_COMPONENT](state, {id, value}) {
            let component = recursivelyFindByID(state.editor, id)
            for (const key in value) {
                if (has(value, key)) {
                    component[key] = value[key]
                }
            }
        },

        // Block Chooser
        [SHOW_BLOCK_CHOOSER_FOR](state, id) {
            state.chooseBlock = true
            state.chooseBlockParentID = id
        },

        [CLOSE_BLOCK_CHOOSER](state) {
            state.chooseBlock = false
        }

    }
})

export default store