let all;
let counter = 0;
let counterInside = 0;

// https://stackoverflow.com/a/45376129
// before all tests
beforeAll(() => {
  return new Promise(resolve => {
    // Asynchronous task
    // ...
    all = "initialized";
    resolve(); // don't forget this, or it won't finish...
  });
});

// before each test in this file
// in this contrived example, the other tests will be affected by the test order
beforeEach(() => {
  return new Promise(resolve => {
    counter++;
    resolve();
  });
});

it("checks beforeEach was called once", () => {
  expect(counter).toBe(1);
});

it("checks beforeEach was called twice", () => {
  expect(counter).toBe(2);
});

it("runs after beforeAll outside describe", () => {
  expect(all).toBe("initialized");
});

describe("\nsetup suite", () => {
  // before each test in this describe
  // in this contrived example, the other tests will be affected by the test order
  beforeEach(() => {
    return new Promise(resolve => {
      counterInside++;
      resolve();
    });
  });

  it("runs after beforeAll inside describe", () => {
    expect(all).toBe("initialized");
  });

  it("checks beforeEach was called once inside describe", () => {
    expect(counterInside).toBe(2);
  });

  it("checks beforeEach was called twice inside describe", () => {
    expect(counterInside).toBe(3);
  });
});


// nice review from the docs
// beforeAll(() => console.log('1 - beforeAll'));
// afterAll(() => console.log('1 - afterAll'));
// beforeEach(() => console.log('1 - beforeEach'));
// afterEach(() => console.log('1 - afterEach'));
// test('', () => console.log('1 - test'));
// describe('Scoped / Nested block', () => {
//   beforeAll(() => console.log('2 - beforeAll'));
//   afterAll(() => console.log('2 - afterAll'));
//   beforeEach(() => console.log('2 - beforeEach'));
//   afterEach(() => console.log('2 - afterEach'));
//   test('', () => console.log('2 - test'));
// });

// // 1 - beforeAll
// // 1 - beforeEach
// // 1 - test
// // 1 - afterEach
// // 2 - beforeAll
// // 1 - beforeEach
// // 2 - beforeEach
// // 2 - test
// // 2 - afterEach
// // 1 - afterEach
// // 2 - afterAll
// // 1 - afterAll