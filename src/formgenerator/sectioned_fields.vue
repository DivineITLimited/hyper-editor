<template>
<div>
    <div v-for="(group, index) in schema.groups" :key="`group-${index}`">
        <b-btn block href="#" size='sm' variant="info"  v-b-toggle="`group-${index}`">{{ group.legend }}</b-btn>
        <b-collapse :id="`group-${index}`" class="mt-2">
            <vue-form-generator :schema="group.schema" v-model="$data['image']"></vue-form-generator>
        </b-collapse>
    </div>
</div>
</template>
<script>
import { abstractField } from "vue-form-generator"
export default {
    mixins: [abstractField],
    created() {
        if (!this.value) {
            this.value = {}
            for (let i = 0; i<this.schema.groups.length; i++) {
                this.value[this.schema.groups[i].model] = {}
            }
        }
    },
    data() {
        let data = {}
        for (let i = 0; i<this.schema.groups.length; i++) {
            data[this.schema.groups[i].model] = {}
        }
        return data
    }
}
</script>
