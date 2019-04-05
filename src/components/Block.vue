<template>
    <div :class="'hyp-block ' + hoverClass" @mouseover="onMouseEnter" @mouseout="onMouseLeave">

        <ActionBar
            class="vc-action-bar"
            :name="getSelf.type"
            :id="id"
            :collapseAction="onCollapse"
            :collapsed="collapsed"
            moveBtnClass="blHandle"
            :cloneAction="clone"
            :editAction="edit"
            :removeAction="remove" />

        <div v-if="!collapsed" class="hyp-block-wrapper">
            <div v-if="preview" v-html="preview"></div>
        </div>
    </div>
</template>


<script>
import { cloneable, removeable, editable, collapseable, hasHoverControl } from '../mixins/base'

export default {
    name:'block',
    mixins: [cloneable, removeable, editable, collapseable, hasHoverControl],
    props: ['id'],

    created() {
        if(this.getSelf.settings)
            this._get_preview()
    },

    data () {
        return {
            preview: false
        }
    },

    computed: {
        getSelf () {
            return this.$store.getters.findComponentByID(this.id)
        },
        currentEditID () {
            return this.$store.state.lastEditedComponent
        }
    },

    methods: {
        _get_preview() {
            this.$hyper.pm.preview(this.getSelf, preview => {
                this.preview = preview
            })
        }
    },

    watch: {
        currentEditID (val) {
            if (this.currentEditID == this.getSelf.id)
                this._get_preview()
        }
    }
}
</script>


<style lang="scss">
.hyp-block {
    position: relative;
    width: 100%;
    background: #f5f5f5;
    border: 1px dashed rgba(170,170,170,0.4);
    min-height: 30px;
    .hyp-block-wrapper{
      padding: 0 15px;
    }
}
</style>

