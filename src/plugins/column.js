import Column from '../components/Column'

const AVAILABLE_SIZES = [1,2,3,4,5,6,7,8,9,10,11,12]
const AVAILABLE_OFFSETS = [0,1,2,3,4,5,6,7,8,9,10,11]
const columnPlugin = {
    view_as_block: false,
    default_values: {},
    settings_schema: {
        groups:[
            {
                legend: 'Responsive Sizes',
                fields: [
                    {
                        type: 'toggleButtonGroup',
                        label: 'Large Screen',
                        model: 'sizeLG',
                        choices: AVAILABLE_SIZES
                    },
                    {
                        type: 'toggleButtonGroup',
                        label: 'Medium Screen',
                        model: 'sizeMD',
                        choices: AVAILABLE_SIZES
                    },
                    {
                        type: 'toggleButtonGroup',
                        label: 'Small Screen',
                        model: 'sizeSM',
                        choices: AVAILABLE_SIZES
                    },
                    {
                        type: 'toggleButtonGroup',
                        label: 'Xtra Small Screen',
                        model: 'sizeXS',
                        choices: AVAILABLE_SIZES
                    }
                ]
            },
            {
                legend: 'Responsive Offset',
                fields: [
                    {
                        type: 'toggleButtonGroup',
                        label: 'Large Screen',
                        model: 'offsetLG',
                        choices: AVAILABLE_OFFSETS
                    },
                    {
                        type: 'toggleButtonGroup',
                        label: 'Medium Screen',
                        model: 'offsetMD',
                        choices: AVAILABLE_OFFSETS
                    },
                    {
                        type: 'toggleButtonGroup',
                        label: 'Small Screen',
                        model: 'offsetSM',
                        choices: AVAILABLE_OFFSETS
                    },
                    {
                        type: 'toggleButtonGroup',
                        label: 'Xtra Small Screen',
                        model: 'offsetXS',
                        choices: AVAILABLE_OFFSETS
                    }
                ]
            }
        ]

    },
    config: {
        vueComponent: Column,
        styles: [
            {id: 'default', name: 'Default'}
        ]
    }
}

export default columnPlugin