<template>
    <section :class="'hyp-section ' + hoverClass" @mouseover="onMouseEnter" @mouseout="onMouseLeave">

        <ActionBar
            class="action-bar"
            name="Section"
            :id="id"
            moveBtnClass="smHandle"
            :collapseAction="onCollapse"
            :collapsed="collapsed"
            :cloneAction="clone"
            :editAction="edit"
            :removeAction="remove" />

        <!-- <draggable v-if="!collapsed" v-model="children" class="vc-container" :options="{handle:'.rmHandle', animation:150}">
            <Row v-for="child in children" :key="child.id" handle='rmHandle' :id="child.id" />
        </draggable> -->

            <Nester :class="'container' + (getSelf.settings.type == 'Fluid' ? '-fluid' : '')" v-if="!collapsed" :id="this.id" />
      

    </section>
</template>

<script>

import Row from './Row'
import draggable from 'vuedraggable'
import { ADD_COMPONENT, REARRANGE_EDITOR, REMOVE_COMPONENT } from '../mutation-types'
import { cloneable, removeable, editable, collapseable, hasHoverControl } from '../mixins/base'

export default {
    name:'eSection',
    props: ['id'],
    mixins: [cloneable, removeable, editable, collapseable, hasHoverControl],
    components: { Row, draggable },
    data() {
        return {
            collapsed: false
        }
    },
    computed: {
        children: {
            get() {
                return this.$store.getters.findComponentByID(this.id).children
            },
            set(value) {
                this.$store.commit(REARRANGE_EDITOR, { value, id:this.id, getters: this.$store.getters })
            }
        },

        getSelf () {
            return this.$store.getters.findComponentByID(this.id)
        }
    }
}
</script>

<style lang="scss">
.hyp-section {
    width: 100%;
    min-height: 20px;
    display: block !important;
    position: relative;
    border: 1px dashed rgba(170,170,170,0.9);
    .vc-container {
        width: 85%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0;
        margin-bottom: 20px;
    }
}
</style>
