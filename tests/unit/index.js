/*global $:false ,window:false,APP:false */
///THIS IS A TEST SPEC TO MAKE SURE THE TEST SUIT RUNS

describe("app", function() {

  it("should be attached to the window", function() {
    expect(APP).toBeDefined();
  });
  it("should have a property called index", function() {
    expect(APP.index).toBeTruthy();
  });
  it("should add two numbers", function() {
    expect(APP.index.add(1,3)).toEqual(4);
  });

  it("should subtract two numbers", function() {
    expect(APP.index.subtract(3,1)).toEqual(2);
  });

  it("should mutiply two numbers", function() {
    expect(APP.index.multiply(2,2)).toEqual(4);
  });

  it("should divide two numbers", function() {
    expect(APP.index.divide(10,5)).toEqual(2);
  });
});

///One test so you can remember to add jquery
describe("jquery", function() {
  it("should be on the window object", function() {
    expect(window.jQuery).toBeDefined();
  });
});

describe("jasmine-jquery works", function() {
  it("should work with testem", function() {
    expect( $('body') ).toBeInDOM();
  });
});
