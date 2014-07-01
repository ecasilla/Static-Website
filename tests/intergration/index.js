/*global casper*/

var url = 'file:///Users/502190/dev/grunt/dtvframework/app/views/index.html';

//Dump log messages
casper.on('remote.message', function(message) {
  this.echo('Log: ' + message);
});


//Dump uncaught errors
casper.on('page.error', function(msg,trace) {
  this.echo('Error ' + msg + 'ERROR' + trace);
});

//This works in async mode in order for casper to know how many
//specs its running we pass it a number as the second parameter increase
//the number as you increase the specs for this page
casper.test.begin('Server is working and showing an index page' , 1, function(test) {
  casper.start(url, function() {
    test.assertHttpStatus(200);
    test.assertTitle('index', 'Your index page title :)');
  });

//this gets called once all the specs are compelted
  casper.run(function() {
    test.done();
  });
});
