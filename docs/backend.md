# Backend Integration

Hyper Editor itself has no opinion on Backend Platform. Hyper Editor produces a structured JSON document that to be parsed by a parser to generate HTML.

## Integrations

- [Django Hyper Editor](https://github.com/DivineITLimited/django-hyper-editor) (Supports wagtail too)


## Output format

Every Block has following Structure

```javascript
{
    "type":"block_type",
    "children":[], 
    "settings":{}, // values given in settings schema form
    "id":"unique_id"
 }
```

A detail example -

```javascript
[
   {
      "type":"section",
      "children":[
         {
            "type":"row",
            "children":[
               {
                  "type":"column",
                  "children":[
                     {
                        "type":"text",
                        "children":[],
                        "extra":{
                           "searchable":true
                        },
                        "settings":{
                           "text":"Enter something here"
                        },
                        "id":"i1554456678_6"
                     }
                  ],
                  "settings":{
                     "sizeLG":6,
                     "sizeMD":6,
                     "sizeSM":12,
                     "sizeXS":12,
                     "offsetLG":0,
                     "offsetMD":0,
                     "offsetSM":0,
                     "offsetXS":0
                  },
                  "id":"i1554456672_4"
               },
            ],
            "id":"i1554456672_3"
         }
      ],
      "settings":{
         "type":"Box"
      },
      "id":"i1554456665_1"
   }
]
```

In this Structure contains following elements -

**Section -> Row -> Column -> Text**

