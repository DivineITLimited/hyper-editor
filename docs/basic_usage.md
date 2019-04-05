# Basic Usage

If you haven't yet set up Hyper Editor please see Installation Guide.

Create an Element on which you want Hyper Editor to load. For Example -
```html
<div id="hyperEditor"></div>
```
Create an instance of HyperEditor -
```javascript
var hyperEditor = new HyperEditor('#hyperEditor', {})
```

Register a listener for editor state changes. Every time any value changes in editor this callback will fire.
```javascript
hyperEditor.addStateChangeListener(function(state) {
    console.log(state)
})
```

Now initialize HyperEditor -
```javascript
hyperEditor.initialize()

```

Now you should see Hyper Editor to be loaded on the provided element.
