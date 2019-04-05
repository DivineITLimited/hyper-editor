<template>
    <div class="imageChooser">
        <b-row v-if="value" class="pb-2">
            <b-col sm='6'>
                <b-img thumbnail fluid  :src="value.url" :alt="value.title" />
            </b-col>
            <b-col sm='6'>{{ value.title}}</b-col>
        </b-row>

        <b-btn v-b-modal="modalID" size="sm" variant="outline-info">Choose Image</b-btn>
        <b-btn @click="reset" size="sm" variant="default">Reset</b-btn>

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
                <!-- <b-tab title="Upload" >
                    <br>I'm the second tab content
                </b-tab> -->
                <b-tab title="Attributes" v-if="selected">
                    <b-form-group id="caption"
                        label="Caption:"
                        label-for="caption">
                        <b-form-input id="caption"
                            size="sm"
                            v-model="attr.caption"
                            type="text">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="alt"
                        label="Alt Text:"
                        label-for="alt">
                        <b-form-input id="alt"
                            size="sm"
                            v-model="attr.alt"
                            type="text">
                        </b-form-input>
                    </b-form-group>
                    <b-row>
                        <b-col>
                            <b-form-group id="width"
                                label="Width:"
                                label-for="width">
                                <b-form-input id="width"
                                    size="sm"
                                    v-model="attr.width"
                                    type="number"
                                    placeholder="Width in px">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group id="height"
                                label="Height:"
                                label-for="height">
                                <b-form-input id="height"
                                    size="sm"
                                    v-model="attr.height"
                                    type="number"
                                    placeholder="Height in px">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <b-row v-if="attr.width && attr.height">
                        <b-col>
                            <b-form-group>
                                <b-form-checkbox v-if="attr.width && attr.height" v-model="attr.fill">Fill</b-form-checkbox>
                                <b-form-checkbox v-if="attr.fill" v-model="attr.crop">Crop</b-form-checkbox>
                            </b-form-group>
                        </b-col>
                        <b-col v-if="attr.crop">
                            <b-form-group id="cropNearFocustPoint"
                                label="Zoom Percent towards focus point:"
                                label-for="cropNearFocustPoint">
                                <b-form-input id="cropNearFocustPoint"
                                    size="sm"
                                    v-model="attr.cropNearFocus"
                                    type="number"
                                    min="0"
                                    max="100"
                                    placeholder="Height in px">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>

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
            selected: {},
            attr: {
                width: null,
                height: null,
                fill: false,
                crop: false,
                cropNearFocus: 60,
                caption: '',
                alt: ''
            }
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
