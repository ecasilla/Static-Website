var hello = require("../../app/scripts/hello"),
	expect = require("../helpers/expect");

describe('hello', function() {
  it('should say hello', function() {
      expect(hello()).to.be('hello world');
  });
  it('should say hello to person', function() {
      expect(hello('Directv')).to.be('hello Directv');
  });
    it('should not say change your name', function() {
      expect(hello('Dtv')).to.not.be('hello Directv');
  });
});