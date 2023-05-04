# eitherwise

Provides an alternative way of handling errors and unexpected cases with the use of Option and Either

eitherwise is a lightweight library providing utility functions for handling errors and optional values in a functional programming style. It includes three APIs: `Option`, `Either`, and `EitherAsync`. These APIs help you to write cleaner, more expressive, and less error-prone code, particularly when dealing with operations that might fail or return optional values.

If you are looking for more functionallity you probely want to look att https://gcanti.github.io/fp-ts/ or https://effect-ts.github.io/effect/

## Table of Contents

- [Installation](#installation)
- [APIs](#apis)
  - [Option](#option)
  - [Either](#either)
  - [EitherAsync](#eitherasync)
- [Usage](#usage)
  - [Option](#option-usage)
  - [Either](#either-usage)
  - [EitherAsync](#eitherasync-usage)

## Installation

To install the package, run the following command:

npm install eitherwise

## APIs

### Option

`Option` is a data type that represents the presence or absence of a value. It can be used to handle optional values and prevent runtime errors caused by `null` or `undefined`. It comes with utility functions for working with optional values and safely chaining operations that might return an optional value.

Use `Option` when you have functions or variables that may return a value or nothing (`null` or `undefined`). By wrapping the value in an `Option`, you can safely manipulate the value and chain operations without having to check for `null` or `undefined`.

### Either

`Either` is a data type that represents a value of one of two possible types, typically representing the result of an operation that might fail. It is used to handle errors in a functional programming style, providing a way to chain operations that may fail and transform the values inside the `Either` instances.

Use `Either` when you have functions that might fail, and you want to handle errors in a functional way. By wrapping the result in an `Either`, you can chain operations that may fail, perform transformations on the values, and handle errors in a clean and expressive manner.

### EitherAsync

`EitherAsync` extends the `Either` API for asynchronous operations. It provides utility functions for handling asynchronous operations that might fail and allows you to chain and manipulate asynchronous results in a functional programming style.

Use `EitherAsync` when you have asynchronous functions that might fail, and you want to handle errors in a functional way. By wrapping the result in an `EitherAsync`, you can chain asynchronous operations that may fail, perform transformations on the values, and handle errors in a clean and expressive manner.

## Usage

### Option usage

```javascript
import { getOption, getOptionOrElse, optionFold, optionMap } from "eitherwise"

const getUserById = (id) => (id === 1 ? some({ name: "Alice" }) : none)

const user = getUserById(1)
const username = optionMap(user, (u) => u.name)
const result = getOptionOrElse(username, "Unknown user") // Alice

// Example of an operation that might return a null value
function getNumber(): number | null {
  return Math.random() > 0.5 ? 42 : null
}

// Creating an Option from a nullable value
const numberOption = getOption(getNumber())

const valueOrDefault = getOptionOrElse(numberOption, "Default value")
console.log(valueOrDefault) // 42 (if the value is not null) or "Default value" (if the value is null)

// Mapping operations on Option
const doubledOption = optionMap(numberOption, (x) => x * 2)

// Folding an Option instance
const valueOrDefault = optionFold(
  doubledOption,
  () => "Default value",
  (value) => value
)
console.log(valueOrDefault) // 84 (if the value is not null) or "Default value" (if the value is null)

// Example using optionMap with many functions

// Functions to apply in sequence
const double = (x: number): number => x * 2
const addTen = (x: number): number => x + 10
const square = (x: number): number => x * x

// Creating an Option from a nullable value
const numberOption = getOption(getNumber())

// Applying multiple functions using optionMap
const transformedOption = optionMap(numberOption, double, addTen, square)

// Get the result
const valueOrDefault = getOptionOrElse(transformedOption, "Default value") // 8836
```

### Either usage

```javascript
import {
  left,
  right,
  isLeft,
  isRight,
  eitherMap,
  eitherChain,
  eitherFold,
  getEitherOrElse,
  getEither,
  fromOption,
  eitherTryCatch,
  Either,
} from "eitherwise"

// Example of an operation that might fail
const divide = (a, b) => (b === 0 ? left("Cannot divide by zero") : right(a / b))

// Check if an Either instance is Left or Right
const eitherResult = divide(10, 2)
console.log(isLeft(eitherResult)) // false
console.log(isRight(eitherResult)) // true

// Mapping and chaining operations
const mapped = eitherMap(eitherResult, (x) => x * 2)
const chained = eitherChain(eitherResult, (x) => right(x * 2))

// Folding an Either instance
eitherFold(
  eitherResult,
  (error) => console.error("Error:", error),
  (value) => console.log("Success:", value)
) // Success: 5

// Getting the value or providing a default
const valueOrDefault = getEitherOrElse(eitherResult, () => "Default value")

// Creating an Either from a nullable value
const nullableValue = "Hello, world!"
const eitherFromNullable = getEither("Value is null or undefined", nullableValue)

// Converting an Option to an Either
const optionValue = getOption("Hello, world!")
const eitherFromOption = fromOption(() => "Value is None", optionValue)

// Handling exceptions with eitherTryCatch
const eitherResultFromTryCatch = eitherTryCatch(
  () => {
    throw new Error("An error occurred")
  },
  (error) => `Error: ${error.message}`
)
```

### EitherAsync usage

```javascript
import {
  Either,
  leftAsync,
  rightAsync,
  eitherAsyncMap,
  eitherAsyncChain,
  eitherAsyncFold,
  eitherAsyncTryCatch,
} from "eitherwise"

// Example of an async operation that might fail
const asyncDivide = async (a, b) => (b === 0 ? leftAsync("Cannot divide by zero") : rightAsync(a / b))

// Mapping and chaining async operations
const asyncResult = asyncDivide(10, 2)
const asyncMapped = await eitherAsyncMap(asyncResult, (x) => x * 2)
const asyncChained = await eitherAsyncChain(asyncResult, async (x) => rightAsync(x * 2))

// Folding an async Either instance
await eitherAsyncFold(
  asyncResult,
  (error) => console.error("Error:", error),
  (value) => console.log("Success:", value)
) // Success: 5

// Handling async exceptions with eitherAsyncTryCatch
const asyncOperation = async () => {
  throw new Error("An error occurred")
}

const asyncResultFromTryCatch = await eitherAsyncTryCatch(asyncOperation, (error) => `Error: ${(error as Error).message}`)

// Now you can fold the asyncResultFromTryCatch to handle the error or success case
await eitherAsyncFold(
  asyncResultFromTryCatch,
  (error) => console.error(error),
  (value) => console.log("Success:", value)
) // Error: An error occurred

// Successful async operation
const successfulAsyncOperation = async () => {
  return "Operation successful!"
}

const successfulAsyncResultFromTryCatch = await eitherAsyncTryCatch(
  successfulAsyncOperation,
  (error) => `Error: ${(error as Error).message}`
)

// Now you can fold the successfulAsyncResultFromTryCatch to handle the error or success case
await eitherAsyncFold(
  successfulAsyncResultFromTryCatch,
  (error) => console.error(error),
  (value) => console.log("Success:", value)
) // Success: Operation successful!
```
