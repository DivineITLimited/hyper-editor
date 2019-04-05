import Section from '../components/Section'

const sectionPlugin = {
    view_as_block: false,
    default_values: {
        settings: {
            type: "Box"
        }
    },
    settings_schema: {
        fields: [
            {
                type: "select",
                label: "Type",
                model: "type",
                required: true,
                values: [
                    "Fluid",
                    "Box"
                ]
            }
        ]
    },
    config: {
        vueComponent: Section,
        styles: [
            {id: 'default', name: 'Default'}
        ],
    }
}

export default sectionPlugin