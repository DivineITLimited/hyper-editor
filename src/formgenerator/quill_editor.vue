<template>
    <div class="editor">
        <div v-if="quillExists" ref="quillEditor"></div>
        <textarea v-else v-model="value"></textarea>
    </div>
</template>

<script>

import { abstractField } from "vue-form-generator"

export default {
    mixins: [ abstractField ],
    data() {
        return {
            quill: null
        }
    },
    computed: {
        quillExists () {
            return window.Quill
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (window.Quill) {
                this.quill = new window.Quill(this.$refs.quillEditor, this.schema.options)
                if (this.schema.html == true) {
                    if (this.value) {
                        this.quill.clipboard.dangerouslyPasteHTML(this.value)
                    }
                } else {
                    if (!this.value) {
                        this.value = []
                    }
                    this.quill.setContents(this.value)
                }
                this.quill.on('text-change', (delta, oldDelta, source) => {
                    if (this.schema.html) {
                        this.value = this.$refs.quillEditor.children[0].innerHTML
                    } else {
                        this.value = this.quill.getContents()
                    }
                });
            } else {
                console.warn('Quill editor not found')
            }
        })
    },
    beforeDestroy() {
        // quill destroies itself autometically ?
	}
}
</script>
