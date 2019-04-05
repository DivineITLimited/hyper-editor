# Hyper Editor

> A backend independent visual composer for web.

### What it does?
Hyper Editor is a block based content editor. It is intended to be integrated with any Content Management System (CMS) or Framework. It is completely independent from any backend technology or platform.

Content Editing in any Framework or CMS is a hard thing to do. Every CMS have their own way
of editing contents of a Webpage. It is specialy hard when working with a framework. A lot of time software teams tend to integrate a CMS with their custom application only to manage web pages or other rich contents. And contents of one CMS is not easy (sometimes impossible) to interchange with other CMS.

There are lots of great commercial and couple of open source Content Editors out there. But most of them are build for specific platform such as Wordpress, which is not usable in other great platforms like Wagtail or Django CMS.

Hyper Editor addresses this issue by being a JS only Content Editor, which supports extending it via plugins and providing a JSON output which later to be parsed via different platforms.

### Why not a WYSIWYG editor?
Even though those editors promises "What you see is what you get", it is more complicated than that. Because those editors (except few like Quill Editor) gives output as HTML which is not intended in long run. A probable better way would be to store a structured format like JSON, which will later be parsed and generate HTML for webpage or Email template or any other purpose.
