<template>
  <b-modal v-model="showChooseBlock" size="lg hyp-block-model" ref="blockChooserRef" title="Add New Block" busy
           footer-class="invisible">
    <b-row>
      <b-col md='4 hyp-block-model-col' sm='12' v-for="b in availableBlocks" :key="b.name">
        <b-list-group align="left">
          <b-list-group-item variant="primary hyp-single-block" size="sm" @click="addBlock(b)">
            <h6>{{ b.title }}</h6>
            <p class="card-text">{{ b.description }}</p>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>

  import {CLOSE_BLOCK_CHOOSER, ADD_COMPONENT} from '../mutation-types'

  export default {
    name: 'blockChooser',
    data() {
      return {
        showChooseBlock: false
      }
    },
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

    watch: {
      chooseBlock(newValue, oldValue) {
        if (newValue != oldValue) {
          if (newValue) {
            this.$refs.blockChooserRef.show()
          } else {
            this.$refs.blockChooserRef.hide()
          }
        }
      },

      showChooseBlock(newValue, oldValue) {
        if (newValue == false) {
          this.$store.commit(CLOSE_BLOCK_CHOOSER)
        }
      }
    },

    methods: {
      addBlock(comp) {
        this.$store.commit(ADD_COMPONENT, {
          component: this.$hyper.pm.get_default_values_for(comp.name),
          parent_id: this.addBlockParentID,
          getters: this.$store.getters
        })
        this.showChooseBlock = false
      }
    }
  }
</script>


<style lang="scss">
  .hyp-block-model {
    .modal-header {
      background: #007bff;
      color: #fff;
      padding: 10px 15px;
    }
    .modal-body {
      .row{
        margin-left: 0;
        margin-right: 0;
        .hyp-block-model-col {
        padding: 0;
        margin-bottom: 10px;
        border-right: 1px solid rgba(0,0,0,0.08);
        &:last-child {
          border-right: none;
        }
      }

      .hyp-single-block {
        box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.08);
        border: none;
        background: #f5f5f5;
        border-radius: 0;
        transition: all 0.3s ease-in;
        padding: 10px 15px;
        h6{
          font-size: 16px;
          line-height: 16px;
          color: #0061cc;
          font-weight: bold;
          margin-bottom: 2px;
        }
        p{
          font-size: 13px;
          line-height: 16px;
          color: #8c8c8c;
          height: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          max-height: 16px;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        &:hover{
          cursor: pointer;
          box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.1);
        }

      }
      }
    }
    .modal-footer {
      display: none;
    }

  }


</style>

