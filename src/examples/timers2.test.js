// fn waits 1s, calls callback, waits 10s calls fn (recursive)
function infiniteTimeouts(callback) {
  setTimeout(() => {
    // waited 1s
    callback();

    setTimeout(() => {
      // wait 10 and recurse
      infiniteTimeouts(callback);
    }, 10000);
  }, 1000);
}

jest.useFakeTimers();

// I don't know how to clear the setTimeout calls in a file...
describe("pending timer mock suite", () => {
  const callback = jest.fn();

  it("fast-forwards one timer at a time", () => {
    infiniteTimeouts(callback);

    // setTimeout called once, callback never called
    expect(setTimeout.mock.calls.length).toBe(1);
    expect(callback.mock.calls.length).toBe(0);

    // fast-forward 1 timer
    jest.runOnlyPendingTimers();

    expect(setTimeout.mock.calls.length).toBe(2);
    expect(callback.mock.calls.length).toBe(1);

    // fast-forward 2 timers to get to the callback call.
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();

    expect(setTimeout.mock.calls.length).toBe(4);
    expect(callback.mock.calls.length).toBe(2);
  });
});
