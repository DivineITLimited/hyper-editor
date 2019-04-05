import { REMOVE_COMPONENT, CLONE_COMPONENT, SHOW_EDITPANEL_FOR, REARRANGE_EDITOR } from '../mutation-types'

export const hasHoverControl = {
    data () {
        return {
            hoverClass: ''
        }
    },
    methods: {
        onMouseEnter(e) {
            this.hoverClass = 'showControl'
            e.stopPropagation()
        },
        onMouseLeave(e) {
            this.hoverClass = ''
            e.stopPropagation()
        }
    }
    
}

export const removeable = {
    methods: {
        remove: function () {
            this.$store.commit(REMOVE_COMPONENT, this.id)
        }
    }
}

export const cloneable = {
    methods: {
        clone: function () {
            this.$store.commit(CLONE_COMPONENT, this.id)
        }
    }
}

export const editable = {
    methods: {
        edit: function() {
            this.$store.commit(SHOW_EDITPANEL_FOR, this.id)
        }
    }
}


export const childsortable = {
    computed: {
        children: {
            get() {
                return this.$store.getters.findComponentByID(this.id).children
            },
            set(value) {
                this.$store.commit(REARRANGE_EDITOR, { value, id:this.id, getters: this.$store.getters })
            }
        }
    }
}

export const collapseable = {
    data() {
        return {
            collapsed: false
        }
    },

    methods: {
        onCollapse() {
            this.collapsed = !this.collapsed
        }
    }
}