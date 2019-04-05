<template>
    <b-button-group size="sm">
      <b-button v-for="item in buttons" @click="sync(item)" :class="{'active': value && item.value == value }" variant="outline-info" :key="item.value">
        {{ item.title }}
      </b-button>
    </b-button-group>
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

</style>