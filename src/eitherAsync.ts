import { Either, left, right } from "./either"

export const leftAsync = <E, A = never>(error: E): Promise<Either<E, A>> => {
  return Promise.resolve(left(error))
}

export const rightAsync = <A, E = never>(data: A): Promise<Either<E, A>> => {
  return Promise.resolve(right(data))
}

export const eitherAsyncMap = async <E, A, B>(
  promiseEither: Promise<Either<E, A>>,
  f: (a: A) => B
): Promise<Either<E, B>> => {
  const either = await promiseEither
  return either._tag === "Right" ? right(f(either.right)) : either
}

export const eitherAsyncChain = async <E, A, B>(
  promiseEither: Promise<Either<E, A>>,
  f: (a: A) => Promise<Either<E, B>>
): Promise<Either<E, B>> => {
  const either = await promiseEither
  return await (either._tag === "Right" ? f(either.right) : Promise.resolve(either))
}

export const eitherAsyncFold = async <E, A, B1, B2>(
  promiseEither: Promise<Either<E, A>>,
  leftFn: (e: E) => B1,
  rightFn: (a: A) => B2
): Promise<B1 | B2> => {
  const either = await promiseEither
  return either._tag === "Right" ? rightFn(either.right) : leftFn(either.left)
}

export const eitherAsyncTryCatch = async <E, A>(
  f: () => Promise<A>,
  onError: (error: unknown) => E
): Promise<Either<E, A>> => {
  try {
    const result = await f()
    return right(result)
  } catch (error_1) {
    return left(onError(error_1))
  }
}
