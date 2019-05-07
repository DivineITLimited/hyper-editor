<template>
    <div class="hyper-multiObjWrapper">
        <draggable v-model="objects" v-bind="{handle:'.itemHandle', animation:150}">
            <div class="singleObjectWrapper" v-for="(item, i) in objects" :key="`'mo-' + ${i}`">
                <div class="actions">
                    <button class="itemHandle action-btn move">
                      <icon name="move" title="Move"/>
                    </button>
                    <button @click="removeObject(i)" class="action-btn delete">
                      <icon name="delete" title="Delete"/>
                    </button>
                    <button @click="collapse(i)" class="action-btn collapse">
                        <icon v-if="item.collapsed" name="collapse-close" stroke="2" title="Expand"/>
                        <icon v-else name="collapse-open" title="Collapse"/>
                    </button>
                </div>
                <vue-form-generator :schema="schema.object_schema" :class="{'collapsed': item.collapsed}" :model="item.model"></vue-form-generator>
            </div>
        </draggable>
        <button slot="footer" class="addItemBtn" @click="newObject" size="sm" variant="outline-info">
            <icon name="plus" class="chooser-btn" title="Add New"/>
        </button>
    </div>
</template>

<script>
import { abstractField } from "vue-form-generator"
export default {
    mixins: [ abstractField ],

    created() {
        if (!this.value) this.value = []
        this.initializing = true
        this.valueToObjects()
        this.initializing = false
    },

    data () {
        return {
            objects: [],
            initializing: false
        }
    },

    methods: {

        valueToObjects() {
            this.value.forEach(element => {
                this.objects.push({
                    collapsed: true,
                    model: element
                })
            });
        },

        objectsToValue() {
            this.value = []
            this.objects.forEach(element => {
                this.value.push(element.model)
            })
        },

        newObject () {
            this.objects.push({
                collapsed: false,
                model: {}
            })
        },

        collapse(i) {
            this.objects[i].collapsed = !this.objects[i].collapsed
        },

        removeObject(i) {
            this.objects.splice(i, 1)
        }
    },

    watch: {
        objects(oldVal, newVal) {
            if(!this.initializing)
                this.objectsToValue()
        }
    }

}
</script>

<style lang="scss">
  .hyper-multiObjWrapper {
    .singleObjectWrapper {
      @apply border border-grey-light mt-1 mb-1 rounded;
      .actions {
         @apply bg-grey-light p-1;
          button{
            @apply inline-flex overflow-hidden px-1 text-blue;
            &:hover {
            @apply cursor-pointer text-blue-darkest;
          }
        }
        button:focus{
          @apply outline-none border-none;
        }
        button.action-btn.move{
          @apply cursor-move;
        }
        button.action-btn.delete{
         &:hover{
            @apply text-red;
         }
        }
        button.action-btn.collapse{
          @apply flex justify-end inline-flex m-auto float-right;
        }
      }
      .vue-form-generator{
        @apply p-3 bg-white;
        .form-group{
          @apply pb-3;
          .field-wrap{
            position: relative;
            display: block;
            .wrapper{
              input.form-control, textarea.form-control{
                @apply bg-grey-lighter;
              }
            }
          }
        }
        .form-group:last-child{
          @apply pb-0;
        }
      }
    }
    .addItemBtn {
        line-height: 0;
        i{
            display: inline-grid;
            vertical-align: middle;
            svg {
              width: 13px;
              height: 13px;
            }
        }
        i.hyper-btn{
          padding: 4px 6px !important;
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
    .collapsed {
        display: none
  }
}

</style>
