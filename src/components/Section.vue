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
      :removeAction="remove"/>
    <Nester :class="'hyp-container' + (getSelf.settings.type == 'Fluid' ? '-fluid' : '')" v-if="!collapsed"
            :id="this.id"/>

  </section>
</template>

<script>

  import Row from './Row'
  import draggable from 'vuedraggable'
  import {ADD_COMPONENT, REARRANGE_EDITOR, REMOVE_COMPONENT} from '../mutation-types'
  import {cloneable, removeable, editable, collapseable, hasHoverControl} from '../mixins/base'

  export default {
    name: 'eSection',
    props: ['id'],
    mixins: [cloneable, removeable, editable, collapseable, hasHoverControl],
    components: {Row, draggable},
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
          this.$store.commit(REARRANGE_EDITOR, {value, id: this.id, getters: this.$store.getters})
        }
      },

      getSelf() {
        return this.$store.getters.findComponentByID(this.id)
      }
    }
  }
</script>

<style lang="scss">
  .hyp-section {
    @apply block relative border border-dashed border-grey-light mx-2 bg-grey-lighter;
    min-height: 20px;
  }

  .hyp-container {
    @apply mx-2 my-1;
  }

</style>
