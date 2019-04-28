<template>
  <div :class="'vc-action-bar ' + (collapsed? 'forceVisible ': ' ') + (editing? 'editing': '')">
    <div class="left-align hyp-btn-wrap">
      <b-btn v-if="moveBtnClass" :class="moveBtnClass" title="Move">
        <icon name="move"></icon>
      </b-btn>
      <b-btn v-if="createAction" @click="createAction" title="Copy">
        <icon name="plus"></icon>
      </b-btn>
      <b-btn v-if="cloneAction" @click="cloneAction" title="Copy">
        <icon name="clone"></icon>
      </b-btn>
      <span v-if="name" class="itemType">{{ name }}</span>
    </div>
    <div class="right-align hyp-btn-wrap">
      <b-btn v-if="collapseAction" @click="collapseAction">
        <icon v-if="collapsed" name="collapse-open" title="Expand"></icon>
        <icon v-else name="collapse-close" title="Collapse"></icon>
      </b-btn>
      <b-btn v-if="editAction" @click="editAction" title="Edit">
        <icon name="settings"></icon>
      </b-btn>
      <b-btn v-if="removeAction" @click="removeAction" title="Delete">
        <icon name="delete"></icon>
      </b-btn>
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
  .showControl {
    border-color: #007bff !important;
  }

  .showControl > .vc-action-bar:first-child {
    visibility: visible
  }
  .left-align{
    float: left;
  }
  .right-align{
    float: right;
  }
  .vc-action-bar {
    position: absolute;
    visibility: hidden;
    width: 200px;
    // margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #007bff;
    clear: both;
    height: 20px;
    z-index: 5000;
    .hyp-btn-wrap {
      line-height: 0;
      padding: 2px 5px;
      display: inline-flex;
    }
    b-btn {
      line-height: 0;
      background: none;
      border: none;
      margin-right: 5px;
      i {
        display: inline-grid;
        vertical-align: middle;
        svg {
          width: 13px;
          height: 13px;
          color: #fff;
        }
      }
      &:hover {
        background: #007bff;
        color: #fff;
        cursor: pointer;
      }
    }
    span.editing {
      padding: 2px;
      color: #007bff;
      svg {
        width: 12px;
        height: 12px;
      }
    }
    span.itemType {
      font-size: 12px;
      line-height: 16px;
      color: #eee
    }
  }

  .vc-action-bar.forceVisible {
    visibility: visible !important;
    background: #aaa;
  }

  .vc-action-bar.editing {
    visibility: visible !important;
    background: #007bff;
  }

</style>
