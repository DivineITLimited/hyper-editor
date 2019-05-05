import NestableBlock from '../components/blocks/NestableBlock'

const textBlock = {

    title: 'Link',
    description: 'Make blocks linkable.',
    default_values: {
        extra: {
            searchable: true
        },
        settings: {}
    },
    settings_schema: {
        fields: [
            {
                type: "input",
                inputType: 'url',
                label: "URL",
                model: "url"
            }
        ]
    },
    config: {
        styles: [
            {id: 'default', name: 'Default'}
        ],
        vueComponent: NestableBlock,
        preview(self, callback) {
            callback(self.settings.url)
        }
    }
}

export default textBlock
