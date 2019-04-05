<template>
    <draggable v-model="children" :options="{handle:'.blHandle', animation:150, group:'moveable'}">

        <ComponentLoader v-for="child in children" :key="child.id" :name="child.type" :id="child.id" handle='blHandle' />

        <div slot="footer">
            <p  v-if="children.length <= 0" class="noBlockMessage">Add A Block Here</p>
            <div class="addBlocksButtonWrapper">
                <b-btn @click="chooseBlock" variant="addBlocksButton btn-info btn-sm">
                    <icon name="plus-square"></icon>
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
}
</script>

<style lang="scss">


  .addBlocksButtonWrapper{
      text-align: center;
     .btn{
        padding: 5px;
        line-height: 0;
        color: #dcdbdb;
        background-color: #f7f7f7;
        border-color: #ececec;
        svg{
          width: 15px;
          height: 15px;
        }
       &:active{
          box-shadow: none !important;
          outline: none !important;
       }
       &:focus{
         box-shadow: none !important;
          outline: none !important;
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
