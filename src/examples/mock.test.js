function calls3x(callback) {
  callback("a");
  callback("b");
  callback("c");
}

const mockCallback = jest.fn(x => x + x);

describe("mocks suite", () => {
  calls3x(mockCallback);

  it("calls cb 3x", () => {
    expect(mockCallback.mock.calls.length).toBe(3);
  });

  it("checks second call is called with first arg = b", () => {
    expect(mockCallback.mock.calls[1][0]).toBe("b");
  });

  it("checks third call returns cc", () => {
    expect(mockCallback.mock.results[2].value).toBe("cc");
  });

  const mockFunction = jest.fn();

  const instanceA = new mockFunction();
  instanceA.name = "test";
  const instanceB = {};
  const boundedB = mockFunction.bind(instanceB);
  boundedB();

  it("created 2 mockFunction instances", () => {
    expect(mockFunction.mock.instances.length).toBe(2);
  });

  it("checks that the first instance created is instanceA", () => {
    expect(mockFunction.mock.instances[0]).toEqual(instanceA);
  });

  it("checks that instanceA has a property called name with value test", () => {
    expect(mockFunction.mock.instances[0].name).toEqual("test");
  });

  it("checks call argument is a function", () => {
    const mockFn = jest.fn();
    const f = () => true;
    mockFn(f);
    expect(mockFn.mock.calls[0][0]).toBeInstanceOf(Function);
  });

  const undefFn = jest.fn();

  it("returns undefined by default", () => {
    expect(undefFn()).toBeUndefined();
  });

  const returnMockFn = jest.fn();
  // remember that you couldn't reuse undefFn for this function.
  // the function is fully defined before starting the tests.
  returnMockFn
    .mockReturnValueOnce(10)
    .mockReturnValueOnce(20)
    .mockReturnValue("def");

  it("returns 10 20 def def", () => {
    expect(returnMockFn()).toBe(10);
    expect(returnMockFn()).toBe(20);
    expect(returnMockFn()).toBe("def");
    expect(returnMockFn()).toBe("def");
  });
});
