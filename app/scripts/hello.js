var myvar = "ok guy";

function hello(name) {
    myvar = 'green';
    return 'hello ' + (name || 'world');
}

module.exports = hello;
