<template>
    <div>
        <div class="left-align">
            <chrome-picker v-model="color" />
        </div>
        <div class="right-align">
            <b-btn variant="default" class="hyper-btn reset-btn" @click="reset">Reset</b-btn>
        </div>
    </div>
</template>

<script>

import { abstractField } from "vue-form-generator"
import { Chrome } from 'vue-color'

export default {
    mixins: [ abstractField ],
    components: {'chrome-picker': Chrome},

    created() {
        if (this.value) {
            this.color = this.value
        }
    },

    data () {
        return {
            color: {
                rgba: { r: 0, g: 0, b: 0, a: 0 },
                a: 1
            }
        }
    },

    methods: {
        reset() {
            this.color = {
                rgba: { r: 0, g: 0, b: 0, a: 0 },
                a: 1
            }
            this.value = null
        }
    },

    watch: {
        color(oldVal, newVal) {
            if (oldVal != newVal) {
                if (this.color.rgba.a == 0) this.value = null
                else this.value = this.color.rgba
            }
        }
    }
}
</script>
