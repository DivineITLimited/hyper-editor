import Row from '../components/Row'

const rowPlugin = {
    title: 'Row',
    description: 'A simple Row.',
    default_values: {

    },
    settings_schema: {},
    config: {
        vueComponent: Row,
        styles: [
            {id: 'default', name: 'Default'}
        ],
    }
}

export default rowPlugin