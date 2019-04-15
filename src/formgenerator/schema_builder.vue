<template>
    <div>
        <b-btn variant="primary" size="sm" v-b-modal="shemaModalID">Build Schema</b-btn>
        <b-btn variant="primary" size="sm" @click="newItem">Add Item</b-btn>

        <b-modal ref="editModalRef" size="lg" title="Add New Item" @ok="updated">
            <div class="form-group mb-1" v-if="editPanelItem">
                <label>Title</label>
                <b-form-input v-model="editPanelItem.title" type="text" />
            </div>
            <b-card v-if="editPanelItem" v-for="(group, i) in schemaValue.groups" :key="'group_' + i" class="mb-1">
                {{ group.title }}
                <div class="form-group" v-for="(attr, j) in group.attrs" :key="'attr_'+i+'_'+j">
                    <label :for="'attr_'+i+'_'+j">{{ attr.title }}</label>
                    <b-form-input :id="'attr_'+i+'_'+j" v-model="editPanelItem[attr.id]"
                      type="text" />
                </div>
            </b-card>
        </b-modal>

        <b-modal :id="shemaModalID" size="lg" title="Build Schema">
            <vue-form-generator :schema="schemaOfSchema" :model="schemaValue"></vue-form-generator>
        </b-modal>

        <draggable v-model="items" v-bind="{animation:150}">
            <b-card size="sm" class="mt-1" v-for="(item, i) in items" :key="'item_' + i" :title="item.title">
                <b-button size="sm" variant="default" @click="edit(i)">Edit</b-button>
            </b-card>
        </draggable>
    </div>
</template>

<script>

import { abstractField } from "vue-form-generator"
import { unique_id, has } from '../helpers'

export default {
    mixins: [ abstractField ],

    created() {
        if (!this.value) {
            this.value = {
                items: [],
                schemaValue: {
                    groups: []
                }
            }
        }
        this.items = this.value.items
        this.schemaValue = this.value.schemaValue
    },
    methods: {

        addEditHelper(selectedItem) {
            this.schemaValue.groups.forEach(item => {
                item.attrs.forEach(attr => {
                    if(!has(selectedItem, attr.id))
                        selectedItem[attr.id] = ''
                })
            })
            this.editPanelItem = selectedItem
            this.$refs.editModalRef.show()
        },

        newItem() {
            let newItem = {
                title:''
            }
            this.addEditHelper(newItem)
        },

        edit(index) {
            if (index >= this.items.length) return
            let item = this.items[index]
            this.addEditHelper(item)
        },

        updated() {
            const positionOfElement = this.items.indexOf(this.editPanelItem)
            if(positionOfElement == -1) {
                this.items.push(this.editPanelItem)
            } else {
                this.items[positionOfElement] = this.editPanelItem
            }
        }
    },
    watch: {
        items(oldVal, newVal) {
            this.value.items = this.items
        },
        schemaValue(oldVal, newVal) {
            this.value.schemaValue = this.schemaValue
        }
    },
    data() {
        return {
            items: [],
            editPanelItem: null,
            schemaValue: {
                groups: []
            },
            shemaModalID: unique_id('modal'),
            itemsModalID: unique_id('modal'),
            schemaOfSchema: {
                fields: [
                    {
                        type: 'multipleObject',
                        model: 'groups',
                        object_schema: {
                            fields: [
                                {
                                    type: 'input',
                                    inputType: 'text',
                                    model: 'title',
                                    label: 'Group Title'
                                },
                                {
                                    type: 'defaultValue',
                                    inputType: 'text',
                                    model: 'id',
                                    default() {
                                        return unique_id('g_')
                                    }
                                },
                                {
                                    type: 'multipleObject',
                                    model: 'attrs',
                                    label: 'Attributes',
                                    object_schema: {
                                        fields: [
                                            {
                                                type: 'input',
                                                inputType: 'text',
                                                label: 'Attribute Title',
                                                model: 'title'
                                            },
                                            {
                                                type: 'defaultValue',
                                                inputType: 'text',
                                                model: 'id',
                                                default() {
                                                    return unique_id('f_')
                                                }
                                            },
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    }
}
</script>
