import NestableItem from '../components/editorComponents/NestableItem'
const nestableItem = {
    view_as_block: false,
    title: 'NestableItem',
    description: 'A Simple NestableItem.',
    default_values: {
        extra: {},
        settings: {}
    },
    settings_schema: {},
    config: {
        styles: [
            {id: 'default', name: 'Default'}
        ],
        preview(self, callback) {
            callback('NestableItem')
        },
        vueComponent: NestableItem
    }
}

export default nestableItem
