import {
  eitherAsyncFlatMap,
  eitherAsyncFold,
  eitherAsyncMap,
  eitherAsyncTryCatch,
  leftAsync,
  rightAsync,
} from "../src/eitherAsync"

describe("eitherAsync", () => {
  const error = "An error occurred"
  const value = 42

  describe("eitherAsyncMap", () => {
    it("should correctly map a function over a Promise<Either>", async () => {
      const promiseEither = Promise.resolve(rightAsync(value))
      const mappedPromiseEither = await eitherAsyncMap(promiseEither, (v) => v * 2)
      expect(mappedPromiseEither).toEqual(await rightAsync(84))
    })

    it("should not apply the function on a Left value", async () => {
      const promiseEither = Promise.resolve(leftAsync(error))
      const mappedPromiseEither = await eitherAsyncMap(promiseEither, (v) => v * 2)
      expect(mappedPromiseEither).toEqual(await leftAsync(error))
    })
  })

  describe("eitherAsyncFlatMap", () => {
    it("should correctly chain a Promise<Either> with an async function", async () => {
      const promiseEither = Promise.resolve(rightAsync(value))
      const chainedPromiseEither = await eitherAsyncFlatMap(promiseEither, async (v) => rightAsync(v * 2))
      expect(chainedPromiseEither).toEqual(await rightAsync(84))
    })

    it("should not apply the function on a Left value", async () => {
      const promiseEither = Promise.resolve(leftAsync(error))
      const chainedPromiseEither = await eitherAsyncFlatMap(promiseEither, async (v) => rightAsync(v * 2))
      expect(chainedPromiseEither).toEqual(await leftAsync(error))
    })
  })

  describe("eitherAsyncFold", () => {
    it("should correctly fold a Promise<Either> by applying the right function", async () => {
      const promiseEither = Promise.resolve(rightAsync(value))
      const result = await eitherAsyncFold(
        promiseEither,
        (e) => e,
        (v) => v * 2
      )
      expect(result).toEqual(84)
    })

    it("should correctly fold a Promise<Either> by applying the left function", async () => {
      const promiseEither = Promise.resolve(leftAsync(error))
      const result = await eitherAsyncFold(
        promiseEither,
        (e) => e,
        (v) => v * 2
      )
      expect(result).toEqual(error)
    })
  })

  describe("eitherAsyncTryCatch", () => {
    it("should return a Right with the result on success", async () => {
      const f = async () => value
      const onError = () => "Error"
      const eitherResult = await eitherAsyncTryCatch(f, onError)
      expect(eitherResult).toEqual(await rightAsync(value))
    })

    it("should return a Left with the error on failure", async () => {
      const f = async () => {
        throw new Error(error)
      }
      const onError = (error: unknown) => (error as Error).message
      const eitherResult = await eitherAsyncTryCatch(f, onError)
      expect(eitherResult).toEqual(await leftAsync(error))
    })
  })
})
