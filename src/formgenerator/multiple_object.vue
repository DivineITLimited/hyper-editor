<template>
    <div class="hyper-multiObjWrapper">
        <draggable v-model="objects" v-bind="{handle:'.itemHandle', animation:150}">
            <div class="singleObjectWrapper" v-for="(item, i) in objects" :key="`'mo-' + ${i}`">
                <div class="actions">
                    <b-button size="sm" class="itemHandle" variant="outline-info"><icon name="move" /></b-button>
                    <b-button size="sm" @click="removeObject(i)" variant="outline-danger"><icon name="times" /></b-button>
                    <b-button size="sm" @click="collapse(i)" variant="outline-default">
                        <icon v-if="item.collapsed" name="collapse-close" />
                        <icon v-else name="collapse-open" />
                    </b-button>
                </div>
                <vue-form-generator :schema="schema.object_schema" :class="{'collapsed': item.collapsed}" :model="item.model"></vue-form-generator>
            </div>
        </draggable>
        <b-button slot="footer" class="addItemBtn" @click="newObject" size="sm" variant="outline-info">
            <icon name="plus" class="hyper-btn chooser-btn"/>
        </b-button>
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
        border: 1px solid #ebebeb;
        margin-top: 5px;
        margin-bottom: 5px;
        .actions {
            background: #f5f5f5;
            padding: 4px;
             b-button {
            -webkit-box-shadow: rgba(0,0,0,0.12) 0 1px 4px -1px;
            box-shadow: rgba(0,0,0,0.12) 0 1px 4px -1px;
            background-color: #fff;
            border-radius: 3px;
            overflow: hidden;
            margin: 0;
            padding: 5px 8px;
            display: inline-flex;
          i{
            display: inline-grid;
            vertical-align: middle;
            svg {
              width: 13px;
              height: 13px;
            }
          }

          &:hover {
            cursor: pointer;
            background: #007bff;
            border-color: #007bff;
            svg {
              color: #fff;
            }
          }
        }
        }
        fieldset{
          box-shadow: none;
          border: none;
          .field-wrap{
            position: relative;
            display: block;
            .wrapper{
              .form-control{

              }
            }
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
