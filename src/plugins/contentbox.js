const contentBox = {
    title: 'Content Box',
    description: 'A simple Content Box',

    default_values: {
        settings: {
            imageOrientation: 'left'
        },
        general: {
            style: 'default'
        }
    },
    settings_schema: {
        groups: [
            {
                legend: 'Text Settings',
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
                        label: 'Subtitle',
                        model: 'subtitle'
                    },
                    {
                        type: 'richtext',
                        label: 'Description',
                        model: 'description'
                    }
                ]
            },
            {
                'legend': 'Image Settings',
                fields: [
                    {
                        type: 'select',
                        label: 'Image Orientation',
                        model: 'imageOrientation',
                        values: ['left', 'right', 'top', 'bottom'],
                        required: true
                    },
                    {
                        type: "imageChooser",
                        label: "Choose Image",
                        model: "image"
                    }
                ]
            },
            {
                'legend': 'Action Settings',
                fields: [
                    {
                        type: 'input',
                        inputType: 'text',
                        label: 'Action Title',
                        model: 'actionTitle'
                    },
                    {
                        type: 'input',
                        inputType: 'text',
                        label: 'Action Url',
                        model: 'actionUrl'
                    }
                ]
            }
        ]
    },

    config: {
        preview: function(val, callback) {
            callback('Content Box')
        },
        styles: [
            {id: 'default', name: 'Default'}
        ]
    }
}

export default contentBox