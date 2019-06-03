function after1Sec(callback) {
  setTimeout(() => {
    //console.log("1 sec has passed, call the callback!");
    callback && callback();
  }, 1000);
}

jest.useFakeTimers();

describe("timer mock suite", () => {
  it("fakes calling setTimeout", () => {
    after1Sec();
    expect(setTimeout.mock.calls.length).toBe(1);
  });

  it("checks fake time was called with args function and 1000", () => {
    after1Sec();

    expect(setTimeout.mock.calls[0][0]).toBeInstanceOf(Function);
    expect(setTimeout.mock.calls[0][1]).toBe(1000);
  });

  it("calls the callback after 1 second using all timers", () => {
    const callback = jest.fn();

    after1Sec(callback);

    // never called
    expect(callback.mock.calls.length).toBe(0);

    jest.runAllTimers(); // Fast-forward and execute all timers

    // called once
    expect(callback.mock.calls.length).toBe(1);
  });
});
