<template>
<div :class="'hyp-row-wrap ' + hoverClass" @mouseover="onMouseEnter" @mouseout="onMouseLeave">
    <ActionBar
        class="rowActionBar"
        name="Row"
        :id="id"
        :collapseAction="onCollapse"
        :collapsed="collapsed"
        :moveBtnClass="handle"
        :createAction="createColumn"
        :cloneAction="clone"
        :removeAction="remove" />

    <draggable v-if="!collapsed" v-model="children" class="hyp-row" :options="{handle:'.cmHandle', animation:150}">
        <Column v-for="child in children" :key="child.id" :id="child.id" />
    </draggable>
</div>
</template>

<script>

import draggable from 'vuedraggable'
import { ADD_COMPONENT, REARRANGE_EDITOR, REMOVE_COMPONENT, UPDATE_COLUMN_SIZE_FOR_ALL_CHILD } from '../mutation-types'
import { cloneable, removeable, collapseable, hasHoverControl } from '../mixins/base'

export default {
    name: 'Row',
    props: ['id', 'handle'],

    mixins: [cloneable, removeable, collapseable, hasHoverControl],

    components: { draggable },

    computed: {
        children: {
            get() {
                return this.$store.getters.findComponentByID(this.id).children
            },
            set(value) {
                this.$store.commit(REARRANGE_EDITOR, { value, id:this.id, getters: this.$store.getters })
            }
        }
    },

    created: function () {
        if (this.children.length == 0) {
            this.createColumn()
        }
    },

    methods: {

        _getColumnConfig() {


            const new_columwidth = Math.floor(12 / (this.children.length + 1))
            this.$store.commit(UPDATE_COLUMN_SIZE_FOR_ALL_CHILD, {id: this.id, size: new_columwidth})
            return {
                sizeLG: 12 - (this.children.length * new_columwidth),
                sizeMD: 12 - (this.children.length * new_columwidth),
                sizeSM: 12,
                sizeXS: 12,
                offsetLG: 0,
                offsetMD: 0,
                offsetSM: 0,
                offsetXS: 0
            }

        },

        createColumn() {
            if (this.children.length < 12) {
                this.$store.commit(ADD_COMPONENT, {
                    component:{ ...this.$hyper.pm.get_default_values_for('column') ,...{settings: this._getColumnConfig()} },
                    parent_id: this.id,
                    getters: this.$store.getters
                })
            }
        }
    }
}

</script>


<style lang="scss">
.hyp-row-wrap {
    width: 100%;
    position: relative;
    transition: .2s padding ease;
    border: 1px dashed rgba(170,170,170,0.4);
    .hyp-row{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
    }
}
</style>
