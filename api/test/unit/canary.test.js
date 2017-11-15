import { expect } from "chai";

const add = (num1, num2) => num1 + num2;
const minus = (num1, num2) => num1 - num2;
const divide = (num1, num2) => num1 / num2;
const multiply = (num1, num2) => num1 * num2;

describe("Canary Test", () => {
  it("should pass this test", () => {
    expect(true).to.equal(true);
  });
});

describe("Calculator Test add()", () => {
  it("should return sumation of two numbers which in this case is 2", () => {
    expect(add(1, 1)).to.equal(2);
  });
});

describe("Calculator Test minus()", () => {
  it("should return fraction of two numbers which in this case is 0", () => {
    expect(minus(1, 1)).to.equal(0);
  });
});

describe("Calculator Test divide()", () => {
  it("should return division of two numbers which in this case is 5", () => {
    expect(divide(10, 2)).to.equal(5);
  });
});

describe("Calculator Test multiply()", () => {
  it("should return muliplication of two numbers which in this case is 20", () => {
    expect(multiply(10, 2)).to.equal(20);
  });
});
