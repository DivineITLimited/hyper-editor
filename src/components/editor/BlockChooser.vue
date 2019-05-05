<template>
  <div class="hyp-bc-wrap" v-bind:class="{open:chooseBlock}" v-on:click.self="hideChooser">
    <div class="hyp-bc">
      <button type="button" class="hyp-bc-close" v-on:click="hideChooser">
        <icon name="times" size="24"></icon>
      </button>
      <div class="hyp-bc-heading">
        <h2 class="hyp-bc-title">Add New Block</h2>
      </div>
      <div class="hyp-bc-content">
        <div class="hyp-bc-single-wrap" @click="addBlock(b)" v-for="b in availableBlocks" :key="b.name">
          <div class="hyp-bc-single">
            <h6 class="hyp-bc-single-title">{{ b.title }}</h6>
            <p class="hyp-bc-single-desc">{{ b.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {CLOSE_BLOCK_CHOOSER, ADD_COMPONENT} from '../../mutation-types'

  export default {
    name: 'blockChooser',
    computed: {
      chooseBlock() {
        return this.$store.state.chooseBlock
      },
      addBlockParentID() {
        return this.$store.state.chooseBlockParentID
      },
      availableBlocks() {
        return this.$hyper.pm.get_blocks()
      }
    },

    watch: {},

    methods: {
      addBlock(comp) {
        this.$store.commit(ADD_COMPONENT, {
          component: this.$hyper.pm.get_default_values_for(comp.name),
          parent_id: this.addBlockParentID,
          getters: this.$store.getters
        })
        this.hideChooser()
      },

      hideChooser() {
        this.$store.commit(CLOSE_BLOCK_CHOOSER)
      }
    }
  }
</script>


<style lang="scss">
  .hyp-bc-wrap {
    @apply fixed pin z-50 overflow-auto hidden;
    background-color: rgba(0, 0, 0, .2);

    &.open {
      @apply flex;
    }
  }

  .hyp-bc {
    @apply relative bg-white w-full max-w-md m-auto flex-col flex rounded shadow;
  }

  .hyp-bc-close {
    @apply absolute pin-r pin-t mr-3 mt-3 text-grey-dark;
  }

  .hyp-bc-heading {
    @apply bg-grey-lighter rounded-t;
  }

  .hyp-bc-title {
    @apply text-sm p-4 text-grey-dark;
  }

  .hyp-bc-content {
    @apply flex flex-row flex-wrap;
  }

  .hyp-bc-single-wrap {
    @apply w-1/3;
  }

  .hyp-bc-single {
    @apply shadow rounded m-2 p-2 border border-transparent bg-white cursor-pointer;

    .hyp-bc-single-title {
      @apply text-sm font-semibold text-grey-darker mb-2;
    }

    .hyp-bc-single-desc {
      @apply text-xs text-grey-dark;
    }

    &:hover {
      @apply border border-blue;
    }
  }
</style>

