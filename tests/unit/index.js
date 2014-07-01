///THIS IS A TEST SPEC TO MAKE SURE THE TEST SUIT RUNS

describe("app", function() {

  it("should be attached to the window", function() {
    expect(APP).toBeDefined();
  });
  it("should have a property called add", function() {
    expect(APP.add).toBeTruthy();
  });
  it("should add two numbers", function() {
    expect(APP.add(1,3)).toEqual(4);
  });

  it("should subtract two numbers", function() {
    expect(APP.subtract(3,1)).toEqual(2);
  });

  it("should mutiply", function() {
    expect(APP.multiply(2,2)).toEqual(4)
  });
});
