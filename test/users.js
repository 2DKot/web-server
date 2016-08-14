var assert = require('chai').assert

describe("pow", function() {
  it("возводит в n-ю степень", function() {
    assert.equal(Math.pow(2, 3), 8);
  });

  it("возводит в n-ю степень", function() {
    assert.equal(Math.pow(2, 2), 5);
  });
});