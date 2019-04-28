const textBlock = {

    title: 'Text',
    description: 'A simple textblock.',
    default_values: {
        extra: {
            searchable: true
        },
        settings: {
            text: 'Enter something here'
        }
    },
    settings_schema: {
        fields: [
            {
                type: "richtext",
                label: "Text",
                model: "text",
                required: true,
                placeholder: "Write your text here",
                rows: 4,
                html: true,
                options: {
                    theme: 'snow'
                }
            }
        ]
    },
    config: {
        styles: [
            {id: 'default', name: 'Default'}
        ],
        preview(self, callback) {
            callback(self.settings.text)
        }
    }
}

export default textBlock
