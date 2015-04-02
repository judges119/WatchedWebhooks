# WatchedWebhooks

Polls the GitHub [User Received Events](https://developer.github.com/v3/activity/events/#list-public-events-that-a-user-has-received) endpoint of a provided username. This is matched against a set of rules loaded from rules.js (example provided in rules.js.example) when the application starts. If an event matches a rule, it fires off a POST request to a URL specified in the rule, with the event data as the body of the request.

## Use

Start the application with one argument on the command line:

1. GitHub username of your user (it will use the public data of your news feed)

For example:

`node server.js judges119`

## Technology

* [Node.js](https://nodejs.org/)
* [node-github](https://github.com/mikedeboer/node-github)

## Usable Event Types

* IssuesEvent
* PullRequestEvent
* CreateEvent
* DeleteEvent
* CommitCommentEvent
* IssueCommentEvent
* PushEvent
* GollumEvent

## To Do

* Introduce JSON schema for rules
* Test rules against schema on startup
* Ensure correct number of arguments given with script

## RoadMap

* Greater rule capability
  * More fine-grained choices
  * Boolean logic
* Customisable settings.js file for configuration
* Capability to poll different Event API endpoints
* Multiple endpoint polling
* Web interface
* Hot swapping of configuration (including rules)

## License

Copyright (c) 2015 Adam O'Grady

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.