import { Either, isRight, left, right } from "./either"
import { isNullOrUndefiend } from "./utils"

export const leftAsync = <E, A = never>(error: E): Promise<Either<E, A>> => {
  return Promise.resolve(left(error))
}

export const rightAsync = <A, E = never>(data: A): Promise<Either<E, A>> => {
  return Promise.resolve(right(data))
}

export function eitherAsyncMap<E, A, B>(promiseEither: Promise<Either<E, A>>, f: (a: A) => B): Promise<Either<E, B>>
export function eitherAsyncMap<E, A, B, C>(
  promiseEither: Promise<Either<E, A>>,
  f: (a: A) => B,
  g: (b: B) => C
): Promise<Either<E, C>>
export function eitherAsyncMap<E, A, B, C, D>(
  promiseEither: Promise<Either<E, A>>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D
): Promise<Either<E, D>>
export function eitherAsyncMap<E, A, B, C, D, F>(
  promiseEither: Promise<Either<E, A>>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => F
): Promise<Either<E, F>>
export function eitherAsyncMap<E, A, B, C, D, F, G>(
  promiseEither: Promise<Either<E, A>>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => F,
  j: (e: F) => G
): Promise<Either<E, G>>
export function eitherAsyncMap<E, A, B, C, D, F, G, H>(
  promiseEither: Promise<Either<E, A>>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => F,
  j: (e: F) => G,
  k: (f: G) => H
): Promise<Either<E, H>>
export function eitherAsyncMap<E, A, B, C, D, F, G, H, I>(
  promiseEither: Promise<Either<E, A>>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => F,
  j: (e: F) => G,
  k: (f: G) => H,
  l: (g: H) => I
): Promise<Either<E, I>>
export function eitherAsyncMap<E, A, B, C, D, F, G, H, I, J>(
  promiseEither: Promise<Either<E, A>>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => F,
  j: (e: F) => G,
  k: (f: G) => H,
  l: (g: H) => I,
  m: (h: I) => J
): Promise<Either<E, J>>
export async function eitherAsyncMap(
  promiseEither: Promise<Either<unknown, unknown>>,
  ...fns: ((a: unknown) => unknown)[]
): Promise<Either<unknown, unknown>> {
  return fns.reduce(async (accPromise: Promise<Either<unknown, unknown>>, fn) => {
    const acc = await accPromise
    if (isRight(acc)) {
      return right(fn(acc.right))
    }
    return acc
  }, promiseEither)
}

export const getEitherAsync = async <E, A>(e: E, a: A | null | undefined): Promise<Either<E, NonNullable<A>>> =>
  !isNullOrUndefiend(a) ? Promise.resolve(right(a as NonNullable<A>)) : Promise.resolve(left(e))

export function eitherAsyncFlatMap<E, A, B>(
  promiseEither: Promise<Either<E, A>>,
  f: (a: A) => Promise<Either<E, B>>
): Promise<Either<E, B>>
export function eitherAsyncFlatMap<E, A, B, C>(
  promiseEither: Promise<Either<E, A>>,
  f: (a: A) => Promise<Either<E, B>>,
  g: (b: B) => Promise<Either<E, C>>
): Promise<Either<E, C>>
export function eitherAsyncFlatMap<E, A, B, C, D>(
  promiseEither: Promise<Either<E, A>>,
  f: (a: A) => Promise<Either<E, B>>,
  g: (b: B) => Promise<Either<E, C>>,
  h: (c: C) => Promise<Either<E, D>>
): Promise<Either<E, D>>
export function eitherAsyncFlatMap<E, A, B, C, D, F>(
  promiseEither: Promise<Either<E, A>>,
  f: (a: A) => Promise<Either<E, B>>,
  g: (b: B) => Promise<Either<E, C>>,
  h: (c: C) => Promise<Either<E, D>>,
  i: (d: D) => Promise<Either<E, F>>
): Promise<Either<E, F>>
export function eitherAsyncFlatMap<E, A, B, C, D, F, G>(
  promiseEither: Promise<Either<E, A>>,
  f: (a: A) => Promise<Either<E, B>>,
  g: (b: B) => Promise<Either<E, C>>,
  h: (c: C) => Promise<Either<E, D>>,
  i: (d: D) => Promise<Either<E, F>>,
  j: (e: F) => Promise<Either<E, G>>
): Promise<Either<E, G>>
export function eitherAsyncFlatMap<E, A, B, C, D, F, G, H>(
  promiseEither: Promise<Either<E, A>>,
  f: (a: A) => Promise<Either<E, B>>,
  g: (b: B) => Promise<Either<E, C>>,
  h: (c: C) => Promise<Either<E, D>>,
  i: (d: D) => Promise<Either<E, F>>,
  j: (e: F) => Promise<Either<E, G>>,
  k: (f: G) => Promise<Either<E, H>>
): Promise<Either<E, H>>
export function eitherAsyncFlatMap<E, A, B, C, D, F, G, H, I>(
  promiseEither: Promise<Either<E, A>>,
  f: (a: A) => Promise<Either<E, B>>,
  g: (b: B) => Promise<Either<E, C>>,
  h: (c: C) => Promise<Either<E, D>>,
  i: (d: D) => Promise<Either<E, F>>,
  j: (e: F) => Promise<Either<E, G>>,
  k: (f: G) => Promise<Either<E, H>>,
  l: (g: H) => Promise<Either<E, I>>
): Promise<Either<E, I>>
export function eitherAsyncFlatMap<E, A, B, C, D, F, G, H, I, J>(
  promiseEither: Promise<Either<E, A>>,
  f: (a: A) => Promise<Either<E, B>>,
  g: (b: B) => Promise<Either<E, C>>,
  h: (c: C) => Promise<Either<E, D>>,
  i: (d: D) => Promise<Either<E, F>>,
  j: (e: F) => Promise<Either<E, G>>,
  k: (f: G) => Promise<Either<E, H>>,
  l: (g: H) => Promise<Either<E, I>>,
  m: (h: I) => Promise<Either<E, J>>
): Promise<Either<E, J>>
export async function eitherAsyncFlatMap(
  promiseEither: Promise<Either<unknown, unknown>>,
  ...fns: ((a: unknown) => Promise<Either<unknown, unknown>>)[]
): Promise<Either<unknown, unknown>> {
  return fns.reduce(async (accPromise: Promise<Either<unknown, unknown>>, fn) => {
    const acc = await accPromise
    if (isRight(acc)) {
      return fn(acc.right)
    }
    return acc
  }, promiseEither)
}
export const eitherAsyncFold = async <E, A, B1, B2>(
  promiseEither: Promise<Either<E, A>>,
  leftFn: (e: E) => B1,
  rightFn: (a: A) => B2
): Promise<B1 | B2> => {
  const either = await promiseEither
  return isRight(either) ? rightFn(either.right) : leftFn(either.left)
}

export const eitherAsyncTryCatch = async <E, A>(
  f: () => Promise<A>,
  onError: (error: unknown) => E
): Promise<Either<E, A>> => {
  try {
    const result = await f()
    return right(result)
  } catch (error) {
    return left(onError(error))
  }
}
