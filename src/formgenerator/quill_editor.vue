<template>
    <quillEditor v-model="value" :options="schema.options"></quillEditor>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { abstractField } from "vue-form-generator"

export default {
    mixins: [ abstractField ],
    components: {quillEditor}
}
</script>
