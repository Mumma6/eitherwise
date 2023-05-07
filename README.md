# eitherwise

Provides an alternative way of handling errors and unexpected cases with the use of Option and Either

eitherwise is a lightweight library providing utility functions for handling errors and optional values in a functional programming style. It includes three APIs: `Option`, `Either`, and `EitherAsync`. These APIs help you to write cleaner, more expressive, and less error-prone code, particularly when dealing with operations that might fail or return optional values.

If you are looking for more functionality you probably want to look at https://gcanti.github.io/fp-ts/ or https://effect-ts.github.io/effect/

## Table of Contents

- [Installation](#installation)
- [Examples](#examples)
- [Quick guide](#Quick-guide)
  - [Option](#option-guide)
  - [Either](#either-guide)
  - [EitherAsync](#eitherasync-guide)
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

```javascript
npm install eitherwise
```

## Examples

A example todo app showing how to use eitherwise to fetch and handle data from an API

https://github.com/Mumma6/eitherwise/tree/main/examples/todo

## Quick guide

This quick guide demonstrates how using the eitherwise library allows you to write shorter and more expressive code compared to traditional approaches that use if statements to check for null or undefined values.

### Option guide

Instead of checking for null or undefined values with if statements, you can use Option to wrap your value and handle the absence of a value in a more expressive way:
Option is a data type that represents the presence or absence of a value. It can be used to handle optional values and prevent runtime errors caused by null or undefined. This library comes with utility functions for working with optional values and safely chaining operations that might return an optional value.

```javascript
/** Option*/
// Traditional approach
const getValue = () => {
  const value = getValueFromSomewhere()
  if (value !== null && value !== undefined) {
    return value
  } else {
    return "Default value"
  }
}

// With Option
const getValueOption = () => {
  const value = getValueFromSomewhere()
  const option = getOption(value)
  return getOptionOrElse(option, "Default value")
}
```

### Either guide

Instead of checking for errors with if statements and throwing exceptions, you can use Either to wrap the result of your operation and handle errors in a more expressive way:

```javascript
// Traditional approach
const divide = (a: number, b: number) => {
  if (b === 0) {
    throw new Error("Cannot divide by zero")
  } else {
    return a / b
  }
}

// With Either
const divideEither = (a: number, b: number) => {
  return b === 0 ? left("Cannot divide by zero") : right(a / b)
}

// Get the result
const result = divideEither(10, 2)
const elseValue = getEitherOrElse(result, "Default value")
console.log(elseValue) // 5
```

### EitherAsync guide

Instead of using callbacks or promises and checking for errors with if statements, you can use EitherAsync to handle asynchronous operations and errors in a more expressive way:

```javascript
// Traditional approach with promises
const doSomethingAsync = () => {
  return new Promise((resolve, reject) => {
    doSomething((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

// With EitherAsync
const doSomethingAsyncEither = async () => {
  const result = await doSomethingAsync();
  return rightAsync(result);
}

// Handling exceptions with eitherAsyncTryCatch
const asyncOperation = async () => {
  throw new Error("An error occurred");
}

const asyncResultFromTryCatch = await eitherAsyncTryCatch(asyncOperation, (error) => `Error: ${(error as Error).message}`);

// Folding an async Either instance with eitherAsyncFold
const folded = await eitherAsyncFold(
  asyncResultFromTryCatch,
  (error) => {
    console.error(error);
    return error;
  },
  (value) => {
    console.log("Success:", value);
    return value;
  }
)();
console.log(folded); // Error: An error occurred
```

## APIs

### Option

`Option` is a data type that represents the presence or absence of a value. It can be used to handle optional values and prevent runtime errors caused by `null` or `undefined`. It comes with utility functions for working with optional values and safely chaining operations that might return an optional value.

Use `Option` when you have functions or variables that may return a value or nothing (`null` or `undefined`). By wrapping the value in an `Option`, you can safely manipulate the value and chain operations without having to check for `null` or `undefined`.

`getOption` is used to create an Option instance from a nullable value, such as a function that might return null or undefined

`getOptionOrElse` is used to get the value of an Option instance, with a default value returned if the Option instance is empty.

`optionMap` is used to apply a transformation to the value inside an Option instance, with the result being another Option instance. This allows you to safely chain operations that might return an optional value.

`optionFold` is used to fold an Option instance into a value of a different type, based on whether the Option instance is empty or contains a value. This is useful when you want to handle the case where the Option instance is empty separately from the case where it contains a value.

### Either

`Either` is a data type that represents a value of one of two possible types, typically representing the result of an operation that might fail. It is used to handle errors in a functional programming style, providing a way to chain operations that may fail and transform the values inside the `Either` instances.

Use `Either` when you have functions that might fail, and you want to handle errors in a functional way. By wrapping the result in an `Either`, you can chain operations that may fail, perform transformations on the values, and handle errors in a clean and expressive manner.

`Either` is a data type that represents a value that can be of one of two types: either a left value of type E, or a right value of type A.

`left` is a function that returns an instance of Either with a left value of type E.

`right` is a function that returns an instance of Either with a right value of type A.

`isLeft` is a type guard function that checks if an Either instance is a Left instance.

`isRight` is a type guard function that checks if an Either instance is a Right instance.

`eitherMap` is used to apply a transformation to the value inside an Either instance, with the result being another Either instance.

`eitherFlatMap` is used to apply a transformation to the value inside an Either instance, with the result being another Either instance. The difference is that the transformation function returns another Either instance, which is then returned directly, rather than wrapped inside another Either.

`eitherFold` is used to fold an Either instance into a value of a different type, based on whether the instance is a Left or Right. This is useful when you want to handle the case where the instance is a Left separately from the case where it is a Right.

`getEitherOrElse` is used to get the value of a Right instance, with a default value returned if the instance is a Left.

`getEither` is used to create an Either instance from a nullable value, such as a function that might return null or undefined.

`fromOption` is used to create an Either instance from an Option instance, where the Left value is provided by a function that is called when the Option instance is empty.

`eitherTryCatch` is used to handle exceptions in a function that might throw an error, by catching the error and returning a Left instance with the error value.

### EitherAsync

`EitherAsync` extends the `Either` API for asynchronous operations. It provides utility functions for handling asynchronous operations that might fail and allows you to chain and manipulate asynchronous results in a functional programming style.

Use `EitherAsync` when you have asynchronous functions that might fail, and you want to handle errors in a functional way. By wrapping the result in an `EitherAsync`, you can chain asynchronous operations that may fail, perform transformations on the values, and handle errors in a clean and expressive manner.

`leftAsync` Creates a Promise that resolves to a Left value of an Either instance.

`rightAsync` Creates a Promise that resolves to a Right value of an Either instance.

`eitherAsyncMap` Applies a transformation to the value inside a Promise of an Either instance, with the result being another Promise of an Either instance. This allows you to safely chain asynchronous operations that might return an optional value.

`eitherAsyncFlatMap` Similar to eitherAsyncMap, but the transformation function itself returns a Promise of an Either instance, allowing you to chain asynchronous operations that depend on the previous operation's result.

`eitherAsyncFold` Folds a Promise of an Either instance into a value of a different type, based on whether the Either instance is Left or Right. This is useful when you want to handle the error case separately from the success case.

`eitherAsyncTryCatch` Tries to execute an asynchronous function and returns an Either instance. If the function throws an error, it is caught and transformed into an error value of the specified type, wrapped in a Left instance. If the function executes successfully, the result is wrapped in a Right instance. This is useful for handling asynchronous operations that might throw an error.

## Usage

### Option usage

```javascript
import { getOption, getOptionOrElse, optionFold, optionMap } from "eitherwise"

// Example of an operation that might return a null value
const getNumber = (): number | null => {
  return Math.random() > 0.5 ? 42 : null
}

// Creating an Option from a nullable value
const numberOption = getOption(getNumber())

const elseValue = getOptionOrElse(numberOption, "Default value")
console.log(elseValue) // 42 (if the value is not null) or "Default value" (if the value is null)

// Mapping operations on Option
const doubledOption = optionMap(numberOption, (x) => x * 2)

// Folding an Option instance
const foldValue = optionFold(
  doubledOption,
  () => "Default value",
  (value) => value
)
console.log(foldValue) // 84 (if the value is not null) or "Default value" (if the value is null)

// Example using optionMap with multiple functions
const double = (x: number): number => x * 2
const addTen = (x: number): number => x + 10
const square = (x: number): number => x * x

// Creating an Option from a nullable value
const numberOption2 = getOption(getNumber())

// Applying multiple functions using optionMap
const transformedOption = optionMap(numberOption2, double, addTen, square)

// Get the result
const transformedElseValue = getOptionOrElse(transformedOption, "Default value")
console.log(transformedElseValue) // 8836 (if the value is not null) or "Default value" (if the value is null)
```

### Either usage

```javascript
import {
  left,
  right,
  isLeft,
  isRight,
  eitherMap,
  eitherFlatMap,
  eitherFold,
  getEitherOrElse,
  getEither,
  fromOption,
  eitherTryCatch,
  Either,
} from "eitherwise"

// Example of an operation that might fail
const divide = (a: number, b: number) => (b === 0 ? left("Cannot divide by zero") : right(a / b))

// Check if an Either instance is Left or Right
const eitherResult = divide(10, 2)
console.log(isLeft(eitherResult)) // false
console.log(isRight(eitherResult)) // true

// Mapping and chaining operations
const mapped = eitherMap(eitherResult, (x) => x * 2)
console.log(mapped) // {_tag: 'Right', right: 10}

// We can also map other Eithers
const flatten = eitherFlatMap(eitherResult, (x) => right(x * 2))
console.log(flatten) // {_tag: 'Right', right: 10}

// Folding an Either instance
const result = eitherFold(
  eitherResult,
  (error) => console.error("Error:", error),
  (value) => console.log("Success:", value)
)
console.log(result) // Success: 5

// Getting the value or providing a default
const valueOrDefault = getEitherOrElse(eitherResult, () => "Default value")
console.log(valueOrDefault) // // { _tag: "Right", right: "Hello World! }

// Creating an Either from a nullable value
const nullableValue = null
const eitherFromNullable = getEither("Value is null or undefined", nullableValue)
console.log(eitherFromNullable) // // {_tag: 'Left', left: 'Value is null or undefined'}

// Converting an Option to an Either
const optionValue = getOption("Hello, world!")
const eitherFromOption = fromOption(() => "Value is None", optionValue)
conole.log(eitherFromOption) // { _tag: "Right", right: "Hello World! }

const unsafeDivide = (x: number, y: number): number => {
  if (y === 0) {
    throw new Error("Cannot divide by zero")
  }
  return x / y
}

// Handling exceptions with eitherTryCatch
const divideEither = (x: number, y: number): Either<string, number> =>
  eitherTryCatch(
    () => divide(x, y),
    () => "Something went wrong"
  )
console.log(divideEither(4, 2)) // Right(2)
console.log(divideEither(4, 0)) // Left("Something went wrong")
console.log(divideEither("a", 2)) // Left("Something went wrong")
```

### EitherAsync usage

```javascript
// Example of an async operation that might fail
const asyncDivide = async (a: number, b: number): Promise<Either<string, number>> => {
  return b === 0 ? leftAsync("Cannot divide by zero") : rightAsync(a / b)
}

// Mapping and chaining async operations
const asyncResult = asyncDivide(10, 2)
const asyncMapped = await eitherAsyncMap(asyncResult, (x) => x * 2)
const asyncChained = await eitherAsyncFlatMap(asyncResult, async (x) => rightAsync(x * 2))

// Folding an async Either instance
const folded = await eitherAsyncFold(
  asyncResult,
  (error) => {
    console.error("Error:", error)
    return error
  },
  (value) => {
    console.log("Success:", value)
    return value
  }
)
console.log(folded) // Success: 5

// Handling async exceptions with eitherAsyncTryCatch
const asyncOperation = async () => {
  throw new Error("An error occurred")
}

const asyncResultFromTryCatch = await eitherAsyncTryCatch(asyncOperation, (error) => `Error: ${(error as Error).message}`)

// Now you can fold the asyncResultFromTryCatch to handle the error or success case
const asyncFoldError = await eitherAsyncFold(
  asyncResultFromTryCatch,
  (error) => {
    console.error(error)
    return error
  },
  (value) => {
    console.log("Success:", value)
    return value
  }
)()
console.log(asyncFoldError) // Error: An error occurred

// Successful async operation
const successfulAsyncOperation = async () => {
  return "Operation successful!"
}

const successfulAsyncResultFromTryCatch = await eitherAsyncTryCatch(
  successfulAsyncOperation,
  (error) => `Error: ${(error as Error).message}`
)

// Fold the successfulAsyncResultFromTryCatch to handle the error or success case
const asyncFoldSuccess = await eitherAsyncFold(
  successfulAsyncResultFromTryCatch,
  (error) => {
    console.error(error)
    return error
  },
  (value) => {
    console.log("Success:", value)
    return value
  }
)
console.log(asyncFoled) // Success: Operation successful!
```
