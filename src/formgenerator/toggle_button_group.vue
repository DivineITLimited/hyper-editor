<template>
    <div class="hyp-btn-group">
      <button v-for="item in buttons" class="group-btn" @click="sync(item)" :class="{'active': value && item.value == value }" variant="outline-info" :key="item.value">
        {{ item.title }}
      </button>
    </div>
</template>

<script>
import { abstractField } from "vue-form-generator"
export default {
    mixins: [ abstractField ],

    computed: {
        buttons: {
            get() {
                return this.regenrate_buttons()
            },
            set(value) {

            }
        }
    },

    methods: {
        regenrate_buttons() {
            let buttons = []
            for (let i = 0; i < this.schema.choices.length; i++) {
                buttons.push({
                    title: this.schema.choices[i],
                    value: this.schema.choices[i]
                })
            }
            return buttons
        },

        sync(item) {
            this.value = item.value
            this.$forceUpdate()
        }
    }
}
</script>

<style lang="scss">
  .hyp-btn-group{
    @apply inline-flex;
    .group-btn{
      @apply bg-grey-light text-grey-darker py-1 px-3 text-sm;
      &:hover{
        @apply bg-blue text-white;
      }
      &:focus{
        @apply outline-none;
      }
    }
    .group-btn.active{
      @apply bg-blue text-white;
    }
    button:first-child{
      @apply rounded-l-sm;
    }
    button:last-child{
      @apply rounded-r-sm;
    }
  }
</style>
