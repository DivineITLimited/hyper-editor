<template>
  <draggable v-model="children" v-bind="{handle:'.blHandle', animation:150, group:'moveable'}">

    <ComponentLoader v-for="child in children" :key="child.id" :name="child.type" :id="child.id" handle='blHandle'/>
    <div>
      <p v-if="children.length <= 0" class="hyp-nester-desc">Add A Block Here</p>
      <div class="hyp-nester-btn-wrap">
        <button type="button" @click="chooseBlock" class="hyp-nester-add-btn" title="Add Block">
          <icon name="plus" stroke="3"></icon>
        </button>
      </div>
    </div>
  </draggable>
</template>

<script>
  import draggable from 'vuedraggable'
  import {removeable, cloneable, editable, childsortable} from '../../mixins/base'
  import {SHOW_BLOCK_CHOOSER_FOR, REARRANGE_EDITOR} from '../../mutation-types'
  import Block from '../blocks/Block'

  export default {
    props: ['id'],
    mixins: [childsortable],
    components: {Block, draggable},
    created() {
      // console.log('Nester with id ' + this.id)
    },
    computed: {
      getSelf() {
        return this.$store.getters.findComponentByID(this.id)
      }
    },
    methods: {
      chooseBlock() {
        this.$store.commit(SHOW_BLOCK_CHOOSER_FOR, this.id)
      }
    }
  };


</script>
<style lang="scss">
  .hyp-nester-desc {
    @apply text-xs text-grey text-center;
  }

  .hyp-nester-btn-wrap {
    @apply text-center mb-2;
  }

  .hyp-nester-add-btn {
    @apply px-2 rounded bg-white shadow text-grey-darkest mt-1;
    padding-top: .2rem;
    padding-bottom: .2rem;
    &:focus {
      @apply outline-none;
    }
    &:hover {
      @apply bg-blue text-white;
    }
  }
</style>
