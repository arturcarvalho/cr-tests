Based on create-react-app.

# Start
> yarn test --verbose


# Docs

## enzyme
https://jestjs.io/docs/en/tutorial-react

yarn add enzyme enzyme-adapter-react-16 --dev

## manual mocks
https://jestjs.io/docs/en/manual-mocks

## async

https://jestjs.io/docs/en/tutorial-async

## timers

https://jestjs.io/docs/en/timer-mocks

# Questions

## toBe vs ToEqual

`toBe` does === and tests identity, not value equality.
https://github.com/facebook/jest/issues/145#issuecomment-58287835

## How to see all tests description?
Use the flag **--verbose** like this:
> yarn test --verbose

## Where to put tests?
Inside files with .test.js or spec.js in their name, or inside files .js inside folders called __tests__.
Regex: "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$"

## What is `describe`?
It's a way to group tests. If you use `before` and `after` inside a `describe`, it will only apply to tests inside the describe block. 

Each describe will appear as a different Test Suite when running the tests.

## Difference between "it" and "test"?
None, `test` is an alias of `it`.

https://jestjs.io/docs/en/api.html#testname-fn-timeout