it("works outside a describe block", () => {
  expect(2 + 2).toBe(4);
});

test("'test' is an alias to 'it'", () => {
  expect(2 + 2).toBe(4);
});

describe("\nmatchers describe block", () => {
  it("checks exact equality with toBe", () => {
    expect(2 + 2).toBe(4);
  });

  it("checks if 2 not 4 by using .not", () => {
    expect(2).not.toBe(4);
  });

  it("fails when comparing equal objects with toBe (shallow compare", () => {
    const obj1 = { one: 1 };
    const obj2 = { one: 1 };
    expect(obj1).not.toBe(obj2);
  });

  it("succeeds when comparing equal objects with toEqual", () => {
    const obj1 = { one: 1 };
    const obj2 = { one: 1 };
    expect(obj1).toEqual(obj2);
  });

  it("checks null is: null, defined, not undefined, not truthy, falsy", () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });

  it("checks zero is : not null, defined, not undefined, not truthy, falsy", () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
  });

  it("checks 4 is: > 3, >= 3, < 5, <= 4.5", () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);
  });

  it("checks toBe and toEqual are equivalent for numbers", () => {
    const value = 2 + 2;
    expect(value).toBe(4);
    expect(value).toEqual(4);
  });

  it("checks floating point numbers by considering the rounding errors", () => {
    const value = 0.1 + 0.2;
    expect(value).not.toBe(0.3);
    expect(value).toBeCloseTo(0.3);
  });

  it("matches string with regular expressions with toMatch", () => {
    expect("coderanx").toMatch(/ranx$/);
  });

  it("checks element inside array with toContain", () => {
    const list = ["a", "b", "c"];
    expect(list).toContain("b");
  });

  it("checks element inside iterable with toContain", () => {
    const list = new Set(["a", "b", "c"]);
    expect(list).toContain("b");
  });

  it("catches errors with toThrow (regexp works too). don't call the function", () => {
    const flakyFunction = () => {
      throw new Error("I threw up!");
    };

    // expect(flakyFunction()).toThrow(); doesn't work like this
    expect(flakyFunction).toThrow();
    expect(flakyFunction).toThrow(Error);
    expect(flakyFunction).toThrow("I threw up!");
    expect(flakyFunction).toThrow(/I threw/);
  });
});
