import axios from "axios";

import Users from "./helpers/users";

jest.mock("axios"); // mock axios

describe("module mocking suite", () => {
  it("mocks an API call", () => {
    const users = [{ name: "Indy" }];
    const response = { data: users };
    axios.get.mockResolvedValue(response); // override the axios get

    return expect(Users.all()).resolves.toEqual(users);
  });

  //////////////////////////////////////////////////////////////////////////////

  jest.mock("./helpers/zoo"); // override zoo with a mock
  const zoo = require("./helpers/zoo");

  // sort of confusing the order is the opposite of mockReturnValue
  zoo
    .mockImplementation(() => "default")
    .mockImplementationOnce(() => "a")
    .mockImplementationOnce(() => "b");

  it("mocks zoo and return a, b, default, default", () => {
    expect(zoo()).toBe("a");
    expect(zoo()).toBe("b");
    expect(zoo()).toBe("default");
    expect(zoo()).toBe("default");
  });
});
