<template>
    <div class="tblrWrapper">
        <b-row>
            <b-col sm='4'>
                <b-form-select v-model="value.unit" :options="['px', 'em', 'vh', 'vw']" size="sm" />
            </b-col>
            <b-col sm='8'>
                <b-row>
                    <b-col>
                        <b-form-input placeholder='Top' size="sm" v-model="value.top" type='number' />
                    </b-col>
                </b-row>

                <b-row style="margin-top:4px; margin-bottom:4px">
                    <b-col sm='6'>
                        <b-form-input placeholder='Left' size="sm" v-model="value.left" type='number' />
                    </b-col>
                    <b-col sm='6'>
                        <b-form-input placeholder='Right' size="sm" v-model="value.right" type='number' />
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <b-form-input placeholder='Bottom' size="sm" v-model="value.bottom" type='number' />
                    </b-col>
                </b-row>
            </b-col>

        </b-row>

    </div>
</template>

<script>
import { abstractField } from "vue-form-generator"
export default {
    mixins: [ abstractField ],

    created() {
        if (this.value)
            this.ml = this.value
        else
            this.value = {
                unit: 'px',
                left: null,
                top: null,
                right: null,
                bottom: null
            }
    },

}
</script>

<style lang="scss">

.tblrWrapper {
    .form-control {
        width:80px;
        margin-left: auto;
        margin-right: auto;
    }
}

</style>