<template>
    <div :class="'hyp-block ' + hoverClass" @mouseover="onMouseEnter" @mouseout="onMouseLeave">
        <ActionBar
            :id="id"
            class="vc-action-bar"
            :name="getSelf.type"
            :collapsed="collapsed"
            :collapseAction="onCollapse"
            moveBtnClass="blHandle"
            :cloneAction="clone"
            :editAction="edit"
            :removeAction="remove" />

        <div v-if="!collapsed" class="hyp-block-wrapper">
            <div>{{ getSelf.type|capitalize }}</div>
            <Nester :id="this.id" />
        </div>
    </div>
</template>


<script>
import { cloneable, removeable, editable, collapseable, hasHoverControl } from '../../mixins/base'

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
    },
    filters: {
        capitalize (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    }
}
</script>


<style lang="scss">
</style>

