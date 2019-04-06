<img height="100px" src="https://divineitlimited.github.io/hyper-editor/logo.png" />

> A backend independent visual composer for web.

### What it does?
Hyper Editor is a block based content editor. It is intended to be integrated with any Content Management System (CMS) or Framework. It is completely independent from any backend technology or platform.

Content Editing in any Framework or CMS is a hard thing to do. Every CMS have their own way
of editing contents of a Web-page. It is specially hard when working with a framework. A lot of time software teams tend to integrate a CMS with their custom application only to manage web pages or other rich contents. And contents of one CMS is not easy (sometimes impossible) to interchange with other CMS.

There are lots of great commercial and couple of open source Content Editors out there. But most of them are build for specific platform such as Wordpress, which is not usable in other great platforms like Wagtail or Django CMS.

Hyper Editor addresses this issue by being a JS only Content Editor, which supports extending it via plugins and providing a JSON output which later to be parsed via different platforms.

### Why not a WYSIWYG editor?
Even though those editors promises "What you see is what you get", it is more complicated than that. Because those editors (except few like Quill Editor) gives output as HTML which is not intended in long run. A probable better way would be to store a structured format like JSON, which will later be parsed and generate HTML for webpage or Email template or any other purpose.

### Development History
Hyper Editor has been developed as an in-house product of Divine IT Limited. We primarily an ERP based company but also have a team for Website, E-Commerce and Web Apps development. Our platform is primarily Python and Java. But all those great content editors are mostly based on Wordpress. This is why Hyper Editor has born. After completing some successful projects using this editor, we find this Block based system can help us do lots of things dynamically.

And we thought these problems must be faced by others too. So we Open Sourced this project to giving back to the Community.

### Dependencies

Hyper Editor has been developed using following awesome JS Libraries / Frameworks

- [Vue](https://vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [vue-form-generator](https://github.com/vue-generators/vue-form-generator)
- [vuedraggable](https://github.com/SortableJS/Vue.Draggable)
- [bootstrap-vue](https://bootstrap-vue.js.org/)
- [feather-icons](https://feathericons.com/)


### Contribution Guideline
We don't have any strict guideline at this moment as we are figuring out where it goes from here.

Please feel free to raise issues, send Pull Requests on github. We would love to hear your input and you are very welcome to contribute.
