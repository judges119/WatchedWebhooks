# WatchedWebhooks

A web servce that aggregates data from your GitHub [News Feed](https://help.github.com/articles/news-feed/) using the [Feedparser](https://github.com/danmactough/node-feedparser) package for Node.js. You can connect to it via a web interface where it will make API calls to get all your watched repositories. If you create a new web hook you can select a or multiple watched repositories to be notified about and for which actions you'd like to receive notifications (commits, merges, new issues/pull requests). You also set a (or many) URLs that it should make POST requests too.

It regularly polls your feed until it receives a new item which matches one of the web hook rules you created. It then makes an API call to the specified repository regarding the specified action to get as much information as possible. Once that's returned, it uses the data in the payload of a POST request it makes the URL(s) attached to the web hook.

> This may actually be useful to multiple people. Probably give it more weight and importance, even though you may not get rich you may make people's lives a bit easier.

## Technology

* Node.js
* ExpressJS
* PassportJS

## TODO

* Rewrite settings.js function as an object literal
* Build a test CMS implementation
  * Save as own project
* Abstract out customisation to configuration