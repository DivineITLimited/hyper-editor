const headingBlock = {
  title: 'Heading',
  description: 'Add a simple heading',
  default_values: {
    settings: {
      type: 'H3'
    }
  },

  settings_schema: {
    fields: [
      {
        type: "input",
        inputType: "text",
        label: "Heading Text",
        model: "text"
      },
      {
        type: "select",
        label: "Heading Type",
        model: "type",
        values: [
          "H1",
          "H2",
          "H3",
          "H4",
          "H5",
          "H6"
        ]
      }

    ]
  },

  config: {
    preview: function (self, callback) {
      callback('Section Heading')
    },
    styles: [{id: 'default', name: 'Default'}]
  },

}
export default headingBlock

