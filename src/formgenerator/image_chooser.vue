<template>
    <div class="imageChooser">
        <b-row v-if="value" class="pb-2">
            <b-col sm='6'>
                <b-img thumbnail fluid  :src="value.url" :alt="value.title" />
            </b-col>
            <b-col sm='6'>{{ value.title}}</b-col>
        </b-row>

        <b-btn v-b-modal="modalID" size="sm" class="hyper-btn chooser-btn" variant="outline-info">Choose Image</b-btn>
        <b-btn @click="reset" size="sm" class="hyper-btn reset-btn" variant="default">Reset</b-btn>

        <!-- Modal Component -->
        <b-modal :id="modalID" size='lg' title="Choose Image" @ok="handleOk">
            <b-tabs>
                <b-tab title="Search" active>
                    <b-row class="pb-2">
                        <b-col>
                            <b-form-input v-model="q" placeholder="Filter Image By Title" />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm='2' class="mt-2" v-for="image in images" :key="image.id" @click="onSelect(image)">
                            <b-img thumbnail fluid :src="image.url" alt="Thumbnail" :class="{'selected': selected && selected.id == image.id}"  />
                        </b-col>
                    </b-row>
                    <b-pagination class="mt-2" v-if="pagination" size="sm" :total-rows="pagination.total" @change="paginate" v-model="pagination.current_page" :per-page="10" />
                </b-tab>
            </b-tabs>
        </b-modal>
    </div>
</template>

<script>
import { abstractField } from "vue-form-generator"
import { unique_id } from '../helpers'

export default {
    mixins: [ abstractField ],

    created() {
        this._getImages('', 1)
        this.selected = this.value
    },

    data() {
        return {
            modalID: unique_id('modal'),
            images: [],
            pagination: false,
            q: '',
            selected: {}
        }
    },

    methods: {
        _getImages(q, page) {
            this.$hyper.pm.get_config_for('image').getImages(this.$hyper.configs.imageSearchApi, q, page, data => {
                this.images = data.result
                this.pagination = {
                    num_pages: data.num_pages,
                    current_page: parseInt(data.current_page),
                    total: data.total
                }
            })
        },

        onSelect(image) {
            image.attr = this.attr
            this.selected = image
        },

        handleOk() {
            this.value = this.selected
            this.$forceUpdate();
        },
        reset() {
            this.value = null
        },
        paginate(val) {
            this._getImages(this.q, val)
        }

    },

    watch: {
        q (newValue, oldValue) {
            this._getImages(this.q, 1)
        }
    }
}
</script>


<style lang="scss">
.img-thumbnail.selected {
    background: #1995b6;
    border-color: #1995b6;
}
</style>
