# Blocks
A web page to a content area can be thought of combination of different blocks. It is not a new concept, as seen in lots of other Editors / Builders.

## Defining A Block
A Hyper Editor Block can be defined as a Javascript Object - 

```javascript
{
    title: 'Block Title',
    description: 'Small Description of a block',
    
    settings_schema: {}, // settings form 
    
    default_values: {  // default values
        settings: {}, 
        general: {}
    },
    
    config: {
        preview: function(val, callback) {}, // how the block will be previewed
        styles: [] // list of supported styles
    }
}
```

- **title:** The title of the block, will be shown in block chooser
- **description:** Description of the block, will be shown in block chooser
- **settings_schema:** JS Object / Array defining the required form fields of the block. [vue-form-generator](https://github.com/vue-generators/vue-form-generator) Schema is used here. Please see their documentation for Schema Structure.
- **default_values:**
  - **settings:** Default value for settings form. This is the model for **settings_schema**.
  - **general:** Default values for general settings (Common for all blocks)
- **config:**
  - **preview:** This function will be called by HyperEditor to show preview in-place.
  - **styles:** List of supported styles for this block

A full example of block can be seen as -

```javascript
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
```

## Registering a Block
To register a block simply call registerBlock method on HyperEditor instance -
```javascript
hyperEditor.registerBlock('contentbox', ContentBox)
```
1st Parameter of that method is important as it is the type of the block. HyperEditor will use that value on the output as Block Type.
