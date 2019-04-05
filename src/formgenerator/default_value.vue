<template>
    <div class="defaultValue"></div>
</template>

<script>
import { abstractField } from "vue-form-generator"
import { isFunction } from '../helpers'
export default {
    mixins: [ abstractField ],

    created() {
        if (!this.value)
            if (isFunction(this.schema.default)) this.value = this.schema.default()
            else this.value = this.schema.default
    }
}
</script>
