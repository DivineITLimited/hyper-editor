<template>
    <draggable v-model="children" :options="{handle:'.blHandle', animation:150, group:'moveable'}">

        <ComponentLoader v-for="child in children" :key="child.id" :name="child.type" :id="child.id" handle='blHandle' />

        <div slot="footer">
            <p  v-if="children.length <= 0" class="noBlockMessage">Add A Block Here</p>
            <div class="addBlocksButtonWrapper">
                <b-btn @click="chooseBlock" variant="addBlocksButton" title="Add Block">
                    <icon name="plus"></icon>
                </b-btn>
            </div>
        </div>
    </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import { removeable, cloneable, editable, childsortable } from '../mixins/base'
import { SHOW_BLOCK_CHOOSER_FOR, REARRANGE_EDITOR } from '../mutation-types'
import Block from './Block'

export default {
    props: ['id'],
    mixins: [childsortable],
    components: { Block, draggable },
    created () {
        // console.log('Nester with id ' + this.id)
    },
    computed: {
        getSelf () {
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


  .addBlocksButtonWrapper{
      text-align: center;
      margin-bottom: 8px;
    b-btn {
      -webkit-box-shadow: rgba(0,0,0,0.12) 0 1px 4px -1px;
      box-shadow: rgba(0,0,0,0.12) 0 1px 4px -1px;
      background-color: #fff;
      border-radius: 3px;
      overflow: hidden;
      margin: 0;
      padding: 5px 8px;
      display: inline-flex;
      i {
        display: inline-grid;
        vertical-align: middle;
        svg {
          width: 13px;
          height: 13px;
        }
      }
      &:hover {
        background: #007bff;
        color: #fff;
        cursor: pointer;
      }
    }

  }
  p.noBlockMessage {
        font-size: 11px;
        font-style: italic;
        margin-bottom: 2px;
        text-align: center;
        color: #e1e0e0;
      }
</style>
