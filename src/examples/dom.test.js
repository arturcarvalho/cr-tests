import React, { useState } from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const Checker = ({ labelOn, labelOff }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(prevVal => !prevVal)}
      />
      {isChecked ? labelOn : labelOff}
    </label>
  );
};

const Btn = ({ onClick }) => {
  return (
    <div className="bigbtn" onClick={onClick}>
      Button
    </div>
  );
};

const List = ({ onClick }) => {
  return (
    <div>
      <Btn onClick={onClick} />
      <Btn onClick={onClick} />
      <Btn onClick={onClick} />
    </div>
  );
};

// Don't forget yarn add --dev enzyme enzyme-adapter-react-xx
// https://airbnb.io/enzyme/docs/installation/index.html
// and the Enzyme configure.
// shallow rendering API https://airbnb.io/enzyme/docs/api/shallow.html
describe("DOM testing suite (feat. Enzyme)", () => {
  it("checks the Checker changed the label after click", () => {
    const checkbox = shallow(<Checker labelOn="on" labelOff="off" />);
    expect(checkbox.text()).toEqual("off");

    checkbox.find("input").simulate("change");
    expect(checkbox.text()).toEqual("on");
  });

  it("checks List has 3 Btns", () => {
    const list = shallow(<List />);

    expect(list.find(Btn).length).toBe(3);
  });

  it("checks Btn renders a `.bigbtn`", () => {
    const btn = shallow(<Btn />);
    expect(btn.find(".bigbtn").length).toBe(1);
  });

  it("simulates click on Btn", () => {
    const fn = jest.fn();
    const btn = shallow(<Btn onClick={fn} />);

    btn.find("div").simulate("click");
    expect(fn.mock.calls.length).toBe(1);
  });
});
