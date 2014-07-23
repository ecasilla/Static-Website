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
casper.test.begin('casperjs.org is up and running', 1, function(test) {
    casper.start('http://casperjs.org/', function() {
        test.assertHttpStatus(200);
    }).run(function() {
        test.done();
    });
});
//this gets called once all the specs are compelted
