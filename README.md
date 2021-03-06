# Static Website Framework

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## Dependencies && Tools Used
Node  v0.10.28

Grunt

PhantomJS

CasperJS

JsHint

JsBeautify

Less

Uglify

Browserify

Testem

Istanbul

Mocha

Less

# Setup

`npm cache clean `

`sudo npm install -g phantomjs`

`sudo npm install -g grunt-cli`

`sudo npm install -g testem`

`sudo npm install -g istanbul`

`sudo npm install`


*If you get phamtonJS errors because of npm use homebrew*

**Please Dont forget to remove the .git folder once you clone**
#Folder Strcuture
Please copy the contents of this repo into a folder with your project name.


Project --root

* App
  *  fonts --Custom fonts
  *  images --images to be minified
  *  scripts --JS source
  *  styles --less
  *  vendor -- bower_components/random .js librarys
  *  views --jade templates



* Tests
  * fixtures --html fixtures
  * helpers --any test helper libs
  * intergration --casperJS and broswer testing
  * unit --all unit tests for your scripts files

## Testem
[Testem-repo](https://github.com/airportyh/testem)

In order to run the test runner for your unit test use the testem command

`testem --or`

`testem ci --continuous intergration mode`

`testem launchers --output the avaiable browsers`

All configuration for the test runner is in

`testem.json`


you can copy http://localhost:7357 url and watch your test run in any browser

## Grunt

Theres 3 grunt command you can issue

### grunt
`grunt`

This command starts up a watch task which will watch
your files for changes and compile the code to a generated folder where the final copy will live

It watch for changes on these folders
all styles/.less
all scripts/.js
all views/.jade
all fonts/
all vender/

once there's an edit on any of these folders it will run the linting service if that passed then it will compile and conact them to css js and html into a

generated/styles/.css
generated/scripts/.js
generated/views/.html

#### For vendor and fonts
It doesn't do any compliation of the files just copys them into the generated directory

This is where your static files will live

### Grunt e2e
`grunt e2e`

This task is made to run you intergration test suite using casperjs

### Grunt prod
`grunt prod`

This task does everything the dev task does exepcts it also minifys your images

**As a side not both grunt test and grunt coverage should NOT!! be used through the command line use TESTEM instead**

### Grunt test
`grunt test`

This task runs browserify in the current process or you can use testem/npm test to have testem run a sub process. 

The point of this command is to run browserify on you test dependices and output a browserified.js file which contains all your specs and src files to run your test suite against

### Grunt coverage
`grunt coverage`

This task runs the mocha_istanbul task in the grunt config..
It will output a coverage folder with all your coverage reports for the  JS files you have in your project.

## JsBeautify
`.jsbeautify`

This file takes all your .js/css files and adds some predefinded styling conventions to the src files.. He helps keep style and continuity within a project of its src file and helps create a convention on how the code should be structured 

## JsHint

`.jshintrc`

This is the file that hold a huge json configuration of all the hint options you would like to configure for the project..

See all possible options here [js-hint](http://www.jshint.com/docs/options/)



