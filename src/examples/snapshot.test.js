import React, { useState } from "react";
import renderer from "react-test-renderer";

// a bit overly complicated to see more stuff on the snapshot
const Link = ({ url }) => {
  const [wasClicked, setWasClicked] = useState(false);

  return (
    <span
      href={url}
      onClick={() => {
        setWasClicked(true);
      }}
    >
      {wasClicked && <p>Was clicked</p>}
    </span>
  );
};

// needs yarn add --dev react-test-renderer
// it takes a snapshot and assumes that will be the correct value.
// if value is different, run jest --updateSnapshot (jest = yarn test --updateSnapshot)
// or press u when the test fails.
// You can use i to go interactive and select failing test.

describe("snapshot suite", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Link url={"som.url"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("does not match generated values in snapshot", () => {
    const generatedValues = {
      createdAt: new Date(),
      rand: Math.random()
    };

    // Line below only works first time (.not doesn't work here).
    // expect(generatedValues).toMatchSnapshot();
  });

  it("matches generated values in snapshot using asymmetric matchers", () => {
    const generatedValues = {
      createdAt: new Date(),
      rand: Math.random()
    };

    expect(generatedValues).toMatchSnapshot({
      createdAt: expect.any(Date),
      rand: expect.any(Number)
    });
  });
});
