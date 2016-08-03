# Project: Feed Reader

## About
This is the sixth project of the Front-End Web Developer Nanodegree from Udacity.

The goal for this project was to practice and learn how to use **Jasmine** by writting a number of tests against a pre-existing application. These test the underlying business logic of the application as well as the event handling and DOM manipulation.

Following is Udacity's description for this project:

>*In this project, you will be learning about testing with Javascript. Testing is an important part of the development process and many organizations practice a standard known as "test-driven development" or TDD. This is when developers write tests first, before they ever start developing their application.*

>*You are given a web-based application that reads RSS feeds. The original developer of this application clearly saw the value in testing, they've already included Jasmine and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and we're now left with an application with an incomplete test suite. That's where you come in.*


## How to run

* Just download or clone this repository and open `index.html` in your favorite browser. You will see Jasmine output at the end of the page.

You also can play with an online version of this app by clicking [here](https://andreumasferrer.github.io/UDACITY_Front-end_Nanodegree/p6_feedreader_testing).


## Included Test Cases

Tests were added in `jasmine/spec/feedreader.js`. The following tests are included:

* RSS feeds are defined in allFeeds and are not empty.
* Each feed in allFeeds has a defined and non-empty URL.
* Each feed in allFeeds has a defined and non-empty name.
* The navigation menu is hidden by default.
* The menu toggles visibility when the menu icon is clicked.
* After initial loading, the first feed has at least one entry.
* The content changes when a new feed is selected.
