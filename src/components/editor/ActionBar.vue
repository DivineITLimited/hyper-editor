<template>
  <div :class="'hyp-actionbar ' + (collapsed? 'forceVisible ': ' ') + (editing? 'editing': '')">
    <div class="flex flex-row items-center align-middle">
      <button v-if="moveBtnClass" :class="moveBtnClass" class="p-1 text-grey-dark" title="Move">
        <icon name="move" stroke="3"></icon>
      </button>
      <span v-if="name" class="text-xs font-bold text-grey-dark">{{ name }}</span>
    </div>
    <div class="hyp-actionbar-icon-panel">
      <button v-if="createAction" @click="createAction" title="Copy">
        <icon name="plus"></icon>
      </button>
      <button v-if="cloneAction" @click="cloneAction" title="Copy">
        <icon name="clone"></icon>
      </button>
      <button v-if="collapseAction" @click="collapseAction">
        <icon v-if="collapsed" name="collapse-open" title="Expand"></icon>
        <icon v-else name="collapse-close" title="Collapse"></icon>
      </button>
      <button v-if="editAction" @click="editAction" title="Edit">
        <icon name="settings"></icon>
      </button>
      <button v-if="removeAction" @click="removeAction" title="Delete">
        <icon name="delete"></icon>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['name', 'moveBtnClass', 'cloneAction', 'editAction', 'removeAction', 'createAction', 'collapseAction', 'collapsed', 'id'],

    computed: {
      editing() {
        return (this.$store.state.editComponentID &&
          this.$store.state.showEditPanel &&
          this.id == this.$store.state.editComponentID) ? true : false
      }
    }
  }
</script>

<style lang="scss">
  .hyp-actionbar {
    @apply hidden absolute pin-l pin-t;
  }

  .hyp-actionbar-icon-panel {
    @apply flex-wrap flex-row text-left w-32 text-xs bg-grey-light shadow px-2 hidden;

    button {
      @apply text-center py-1 my-2 flex-1;
      &:hover {
        @apply bg-white;
      }
    }
  }

  .showControl {
    @apply border border-blue;

    .hyp-actionbar {
      @apply block;
    }
  }

</style>
