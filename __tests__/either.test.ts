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
} from "../src/index"
import { Some, None, getOption } from "../src/option"

describe("either", () => {
  const error = "Error"
  const value = 42
  const defaultValue = "default"

  const fn1 = (x: number) => x * 2
  const fn2 = (x: number) => x + 1

  describe("getEither", () => {
    it("should return Left for null or undefined values", () => {
      expect(getEither(error, null)).toEqual(left(error))
      expect(getEither(error, undefined)).toEqual(left(error))
    })

    it("should return Right for non-null and non-undefined values", () => {
      expect(getEither(error, value)).toEqual(right(value))
      expect(getEither(error, "hello")).toEqual(right("hello"))
    })
  })

  describe("eitherFold", () => {
    it("should call leftFn for Left values", () => {
      const leftFn = jest.fn(() => defaultValue)
      const rightFn = jest.fn()

      const either = left(error)
      eitherFold(either, leftFn, rightFn)

      expect(leftFn).toHaveBeenCalledWith(error)
      expect(rightFn).not.toHaveBeenCalled()
    })

    it("should call rightFn for Right values", () => {
      const leftFn = jest.fn()
      const rightFn = jest.fn((x: number) => x * 2)

      const either = right(value)

      eitherFold(either, leftFn, rightFn)

      expect(leftFn).not.toHaveBeenCalled()
      expect(rightFn).toHaveBeenCalledWith(value)
    })
  })

  describe("getEitherOrElse", () => {
    it("should return the value of Right if it exists", () => {
      const either = right(value)
      expect(getEitherOrElse(either, () => defaultValue)).toBe(value)
    })

    it("should return the default value for Left", () => {
      const either = left(error)
      expect(getEitherOrElse(either, () => defaultValue)).toBe(defaultValue)
    })
  })

  describe("eitherMap", () => {
    it("should correctly map functions over the Either values", () => {
      const either = right(value)

      expect(eitherMap(either, fn1)).toEqual(right(84))
      expect(eitherMap(eitherMap(either, fn1), fn2)).toEqual(right(85))
    })

    it("should return Left if the Either is Left", () => {
      const either = left(error)
      expect(eitherMap(either, fn1)).toEqual(left(error))
    })
  })

  describe("eitherFlatMap", () => {
    it("should correctly chain functions over the Either values", () => {
      const either = right(value)

      const chainedFn = (x: number) => (x % 2 === 0 ? right(x / 2) : left("Odd"))

      expect(eitherFlatMap(either, chainedFn)).toEqual(right(21))
      expect(eitherFlatMap(right(41), chainedFn)).toEqual(left("Odd"))
    })
  })

  describe("fromOption", () => {
    it("should convert Option to Either", () => {
      const someOption: Some<number> = { _tag: "Some", value: 42 }
      const noneOption: None = { _tag: "None" }

      const option = getOption(10)

      expect(fromOption(() => error, someOption)).toEqual(right(42))
      expect(fromOption(() => error, noneOption)).toEqual(left(error))
      expect(fromOption(() => error, option)).toEqual(right(10))
    })
  })

  describe("eitherTryCatch", () => {
    it("should return Right if the function doesn't throw", () => {
      const fn = () => 42
      const onError = jest.fn()

      const result = eitherTryCatch(fn, onError)

      expect(result).toEqual(right(42))
      expect(onError).not.toHaveBeenCalled()
    })

    it("should return Left if the function throws", () => {
      const error = new Error("Error")
      const fn = () => {
        throw error
      }
      const onError = jest.fn(() => "Error")

      const result = eitherTryCatch(fn, onError)

      expect(result).toEqual(left("Error"))
      expect(onError).toHaveBeenCalledWith(error)
    })
  })

  describe("isLeft and isRight", () => {
    const leftEither: Either<string, number> = left(error)
    const rightEither: Either<string, number> = right(value)

    describe("isLeft", () => {
      it("should return true for Left", () => {
        expect(isLeft(leftEither)).toBe(true)
      })

      it("should return false for Right", () => {
        expect(isLeft(rightEither)).toBe(false)
      })
    })

    describe("isRight", () => {
      it("should return false for Left", () => {
        expect(isRight(leftEither)).toBe(false)
      })

      it("should return true for Right", () => {
        expect(isRight(rightEither)).toBe(true)
      })
    })
  })
})
