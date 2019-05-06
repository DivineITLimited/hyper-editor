<template>
  <div class="hyp-bc-wrap" v-bind:class="{open:chooseBlock}" v-on:click.self="hideChooser">
    <div class="hyp-bc">
      <button type="button" class="hyp-bc-close" v-on:click="hideChooser">
        <icon name="times" size="18" title="Close"></icon>
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
    @apply relative p-4 m-auto flex-wrap block bg-grey-lighter content-around rounded w-5/6;
    .hyp-bc-content {
      @apply flex-wrap;
        grid-auto-flow: dense;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      .hyp-bc-single-wrap{
        @apply flex flex-col;
        .hyp-bc-single {
          @apply shadow rounded m-1 p-3 border border-transparent bg-white cursor-pointer;
           transition: .2s ease-out;
          .hyp-bc-single-title {
            @apply text-sm font-semibold text-grey-darkest mb-2;
          }

          .hyp-bc-single-desc {
            @apply text-xs text-grey-dark;
          }

          &:hover {
            @apply bg-blue;
            .hyp-bc-single-title {
              @apply text-white;
            }

            .hyp-bc-single-desc {
              @apply text-white;
            }
          }
        }
      }
    }
  }
  @screen sm {
    .hyp-bc{
      @apply w-3/4;
    }
  }


  .hyp-bc-close {
    @apply absolute pin-r pin-t mr-3 mt-3 text-grey-dark;
    &:hover{
      @apply text-red;
    }
  }

  .hyp-bc-heading {
    @apply bg-grey-lighter rounded-t pb-3;
  }

  .hyp-bc-title {
    @apply text-sm text-grey-dark pl-1;
  }

</style>

