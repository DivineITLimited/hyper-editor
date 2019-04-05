<template>
    <div class="chooser">
        <div v-if="selected" v-html="displaySelectedItem(selected)" class="pb-2"></div>

        <b-btn v-b-modal="modalID" size="sm" variant="outline-info">{{ this.schema.chooserButtonText }}</b-btn>
        <b-btn @click="reset" size="sm" variant="default">Reset</b-btn>

        <!-- Modal Component -->
        <b-modal :id="modalID" size='lg' :title="this.schema.chooserButtonText" @ok="handleOk">
            <b-row class="pb-2">
                <b-col>
                    <b-form-input v-model="q" placeholder="Search..." />
                </b-col>
            </b-row>
            <b-row>
                <b-col sm='4'
                    :class="'mt-2 ' + ((selected && selected == item ) ?'selected' : '')"
                    v-for="(item, i) in result"
                    :key="`${modalID + i}`"
                    @click="onSelect(item)"
                    v-html="displayItem(item)">
                </b-col>
            </b-row>
            <b-pagination class="mt-2" v-if="total > 0" size="sm" :total-rows="total" @change="paginate" v-model="currentPage" :per-page="perPage" />

        </b-modal>
    </div>
</template>

<script>

// {
//     getItems (query, page),
//     displayItem(item),
//     displaySelectedItem(item),
// }
//
import { unique_id } from '../helpers'
import { abstractField } from "vue-form-generator"

export default {
    mixins: [abstractField],

    created() {
        if (this.value) this.selected = this.value
        this.getItems()
    },

    data() {
        return {
            q: '',
            currentPage: 1,
            perPage: 10,
            total: 0,
            result: [],
            modalID: unique_id('modal'),
            selected: null
        }
    },

    methods: {
        getItems() {
            this.schema.getItems(this.q, this.currentPage, this.perPage, (resp) => {
                this.result = resp.result
                this.total = resp.total
                this.currentPage = resp.currentPage
                this.perPage = resp.perPage
            })
        },

        displayItem(item) {
            return this.schema.displayItem(item)
        },

        displaySelectedItem(item) {
            return this.schema.displaySelectedItem(item)
        },

        paginate(i) {
            this.currentPage = i
            this.getItems()
        },

        onSelect(item) {
            this.selected = item
        },

        handleOk() {
            this.value = this.selected
        },

        reset() {
            this.selected = null
        }
    },

    watch: {
        q (newValue, oldValue) {
            this.getItems()
        }
    }
}
</script>


<style lang="scss">
.chooser .selected {
    color: #1995b6;
}
</style>
