import Block from '../components/blocks/Block'
const sliderBlock = {

    title: 'Slider',
    description: 'A simple Slider.',
    default_values: {
        extra: {},
        settings: {}
    },
    settings_schema: {
        fields: [
            {
                type: 'multipleObject',
                label: "Slides",
                model: "slides",
                object_schema: {
                    fields: [
                        {
                            type: 'input',
                            inputType: 'text',
                            label: 'Title',
                            model: 'title'
                        },
                        {
                            type: 'input',
                            inputType: 'text',
                            label: 'Sub Title',
                            model: 'subTitle'
                        },
                        {
                            type: "richtext",
                            label: "Short Description",
                            model: "shortDescription",
                            required: true,
                            placeholder: "Write your text here",
                            rows: 4,
                            html: true,
                            options: {
                                theme: 'snow'
                            }
                        },
                        {
                            type: 'imageChooser',
                            label: 'Image',
                            model: 'image'
                        },
                        {
                            type: 'input',
                            inputType: 'text',
                            label: 'Action Title',
                            model: 'actionTitle'
                        },
                        {
                            type: 'input',
                            inputType: 'text',
                            label: 'Action URL',
                            model: 'actionUrl'
                        }
                    ]
                }
            }
        ]
    },
    config: {
        vueComponent: Block,
        styles: [
            {id: 'default', name: 'Default'}
        ],
        preview(self, callback) {
            callback('Slider')
        }
    }
}

export default sliderBlock
