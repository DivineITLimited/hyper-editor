<template>
  <div :class="'hyp-actionbar ' + (collapsed? 'forceVisible ': ' ') + (editing? 'editing': '')">
    <div class="hyp-block-heading">
      <span v-if="name" class="hyp-block-name">{{ name }}</span>
    </div>
    <div class="hyp-actionbar-icon-panel">
      <button v-if="moveBtnClass" :class="moveBtnClass" class="p-1 text-grey-light" title="Move">
        <icon name="move" stroke="3"></icon>
      </button>
      <button v-if="createAction" @click="createAction" title="Copy">
        <icon name="plus" stroke="3"></icon>
      </button>
      <button v-if="cloneAction" @click="cloneAction" title="Copy">
        <icon name="clone" stroke="3"></icon>
      </button>
      <button v-if="collapseAction" @click="collapseAction">
        <icon v-if="collapsed" name="collapse-open" stroke="3" title="Expand"></icon>
        <icon v-else name="collapse-close" stroke="3" title="Collapse"></icon>
      </button>
      <button v-if="editAction" @click="editAction" title="Edit">
        <icon name="more-menu" stroke="3"></icon>
      </button>
      <button v-if="removeAction" @click="removeAction" title="Delete">
        <icon name="delete" stroke="3"></icon>
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
    @apply absolute pin-l text-sm;
    top: -16px;
    z-index: 999;
    visibility: hidden;
    button:focus{
      @apply outline-none;
    }
    button:hover{
      @apply cursor-move;
    }
    .hyp-block-heading{
      @apply flex flex-row;
      .hyp-block-name{
        @apply font-bold text-grey-darker capitalize;
      }
    }

  }
  .hyp-actionbar.forceVisible{
    visibility: visible !important;
  }

  .showControl > .hyp-actionbar:first-child {
    visibility: visible
  }
  .hyp-actionbar-icon-panel {
    @apply flex-wrap text-sm flex-row text-left w-auto bg-blue-lighter;
    button {
      @apply text-center flex-1 p-1 text-grey-darkest;
      &:hover {
        @apply bg-blue text-white;
      }
    }
  }

  .showControl {
    @apply border border-blue-lighter;
    .hyp-actionbar {
      @apply block;
    }
  }

</style>
