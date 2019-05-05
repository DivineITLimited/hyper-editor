import TabBlock from '../components/blocks/TabBlock'
import { unique_id } from '../helpers'
const tabBlock = {

    title: 'Tab',
    description: 'A simple tabblock.',
    default_values: {
        extra: {},
        settings: {}
    },
    settings_schema: {
        fields: [
            {
                type: 'multipleObject',
                label: "Tab Items",
                model: "tabItems",
                object_schema: {
                    fields: [
                        {
                            type: 'input',
                            inputType: 'text',
                            label: 'Title',
                            model: 'title'
                        },
                        {
                            type: 'imageChooser',
                            label: 'Image',
                            model: 'image'
                        },
                        {
                            type: 'defaultValue',
                            model: 'code',
                            default () {
                                return unique_id('tabItem')
                            }
                        }
                    ]
                }
            }
        ]
    },
    config: {
        vueComponent: TabBlock,
        styles: [
            {id: 'default', name: 'Default'}
        ],
        preview(self, callback) {
            callback('test')
        }
    }
}

export default tabBlock
