<template>
    <b-col :class="'hyp-col ' + hoverClass" @mouseover="onMouseEnter" @mouseout="onMouseLeave"
        :md="settings.sizeMD"
        :lg="settings.sizeLG"
        :sm="settings.sizeSM"
        :offset-sm="settings.offsetSM"
        :offset-lg="settings.offsetLG"
        :offset-md="settings.offsetMD">

        <ActionBar
            class="colActionBar"
            name="Column"
            moveBtnClass="cmHandle"
            :id="id"
            :cloneAction="clone"
            :editAction="edit"
            :removeAction="remove" />

        <div class="blockWrapper">
            <Nester :id="this.id" />
        </div>
    </b-col>
</template>

<script>

import { removeable, cloneable, editable, childsortable, hasHoverControl } from '../mixins/base'
import { SHOW_BLOCK_CHOOSER_FOR, REARRANGE_EDITOR } from '../mutation-types'
import Block from './Block'
import draggable from 'vuedraggable'

export default {
    name: 'Column',
    mixins: [removeable, cloneable, editable, hasHoverControl],
    props: ['id'],
    computed: {
        columnClasses() {
            return "hyp-col"
        },
        getSelf () {
            return this.$store.getters.findComponentByID(this.id)
        },
        settings () {
            return this.getSelf.settings
        }
    }
}
</script>

<style lang="scss">
.hyp-col {
    position: relative;
    border: 1px dashed rgba(170,170,170,0.4);
    transition: .4s padding ease;
    // &:hover {
    //     padding-top: 25px;
    // }
}
</style>
