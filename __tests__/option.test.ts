import { getOption, getOptionOrElse, optionFold, optionMap } from "../src/index"

describe("options", () => {
  const fn1 = (x: number) => x * 2
  const fn2 = (x: number) => x + 1
  const fn3 = (x: number) => x / 2
  const fn4 = (x: number) => `The number is ${x}`
  const fn5 = () => null

  describe("getOption", () => {
    it("should return None for null or undefined values", () => {
      expect(getOption(null)).toEqual({ _tag: "None" })
      expect(getOption(undefined)).toEqual({ _tag: "None" })
    })

    it("should return Some for non-null and non-undefined values", () => {
      expect(getOption(42)).toEqual({ _tag: "Some", value: 42 })
      expect(getOption("hello")).toEqual({ _tag: "Some", value: "hello" })
    })
  })

  describe("optionFold", () => {
    it("should call onNone for None values", () => {
      const onNone = jest.fn(() => "default")
      const onSome = jest.fn()

      const option = getOption(null)
      optionFold(option, onNone, onSome)

      expect(onNone).toHaveBeenCalled()
      expect(onSome).not.toHaveBeenCalled()
    })

    it("should call onSome for Some values", () => {
      const onNone = jest.fn()
      const onSome = jest.fn((x: number) => x * 2)

      const option = getOption(42)

      optionFold(option, onNone, onSome)

      expect(onNone).not.toHaveBeenCalled()
      expect(onSome).toHaveBeenCalledWith(42)
    })

    it("should fold the value correctly", () => {
      const onNone = jest.fn()
      const onSome = jest.fn((x: number) => `The number is ${x}`)

      const option = getOption(42)
      const fold = optionFold(option, onNone, onSome)
      expect(fold).toBe("The number is 42")
    })

    it("should fold the default correctly", () => {
      const onNone = jest.fn(() => "Unknown")
      const onSome = jest.fn((x: number) => `The number is ${x}`)

      const option = getOption(null)
      const fold = optionFold(option, onNone, onSome)
      expect(fold).toBe("Unknown")
    })
  })

  describe("getOptionOrElse", () => {
    it("should return the value of Some if it exists", () => {
      const option = getOption(42)
      expect(getOptionOrElse(option, "default")).toBe(42)
    })

    it("should return the default value for None", () => {
      const option = getOption(10)
      const mappedOption = optionMap(option, fn1, fn2, fn5)
      expect(mappedOption).toEqual({ _tag: "None" })
      expect(getOptionOrElse(mappedOption, "default")).toBe("default")
    })
  })

  describe("optionMap", () => {
    it("should correctly map functions over the option values", () => {
      const option = getOption(10)

      expect(optionMap(option, fn1)).toEqual({ _tag: "Some", value: 20 })
      expect(optionMap(option, fn1, fn2)).toEqual({ _tag: "Some", value: 21 })
      expect(optionMap(option, fn1, fn2, fn3)).toEqual({ _tag: "Some", value: 10.5 })
      expect(optionMap(option, fn1, fn2, fn3, fn4)).toEqual({ _tag: "Some", value: "The number is 10.5" })
    })

    it("should return None if any of the option values evaluates to null or undefiend", () => {
      const option = getOption(10)
      expect(optionMap(option, fn1, fn2, fn5)).toEqual({ _tag: "None" })
    })
  })
})
