describe("\nasync test suite", () => {
  function fetchBananas(fn) {
    setTimeout(() => {
      fn("bananas");
    }, 0);
  }

  it("checks callback received bananas as argument", done => {
    function callback(data) {
      expect(data).toBe("bananas");
      done();
    }

    fetchBananas(callback);
  });

  // fetch with Promise
  function promiseBananas() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("bananas");
      }, 0);
    });
  }

  // WATCHOUT: return the promise.
  // Be sure to return the promise - if you omit this return statement,
  // your test will complete before the promise returned from promiseBananas
  // resolves and then() has a chance to execute the callback.
  it("checks promise calls resolve with bananas as argument", () => {
    return promiseBananas().then(data => {
      expect(data).toBe("bananas");
    });
  });

  // fetch error
  function promiseError() {
    return new Promise((_, reject) => {
      setTimeout(() => {
        // some error
        reject("BIG error");
      }, 0);
    });
  }

  it("checks same promise with resolves()", () => {
    return expect(promiseBananas()).resolves.toBe("bananas");
  });

  it("needs to do 2 checks (aka assertions)", () => {
    expect.assertions(2);

    expect(2).toBe(2);
    expect(2).toBe(2);
    //expect(2).toBe(2) // if you uncomment this, you have 3 assertions
  });

  it("catches an error in a promise", () => {
    expect.assertions(1);
    return promiseError().catch(e => {
      expect(e).toBe("BIG error");
    });
  });
});

/**
 * DON'T DO THIS type of callback, use the done() like above.
 * This test will complete as soon as fetchBacon completes,
 * before ever calling the callback.
 *
 */
describe("\nDON'T DO THIS", () => {
  function fetchBacon(fn) {
    setTimeout(() => {
      fn("fishies");
    }, 0);
  }

  it("it doesn't fail inside describe.", () => {
    function callback(data) {
      expect(data).toBe("bacon");
    }

    fetchBacon(callback);
  });
});
