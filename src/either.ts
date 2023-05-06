import { TOption, isSome } from "./option"
import { isNullOrUndefiend } from "./utils"

interface Left<E> {
  readonly _tag: "Left"
  readonly left: E
}

interface Right<A> {
  readonly _tag: "Right"
  readonly right: A
}

export type Either<E, A> = Left<E> | Right<A>

export const left = <E, A = never>(error: E): Either<E, A> => ({
  _tag: "Left",
  left: error,
})

export const right = <A, E = never>(data: A): Either<E, A> => ({
  _tag: "Right",
  right: data,
})

export const isLeft = <E, A>(either: Either<E, A>): either is Left<E> => either._tag === "Left"

export const isRight = <E, A>(either: Either<E, A>): either is Right<A> => either._tag === "Right"

export function eitherMap<E, A, B>(either: Either<E, A>, f: (a: A) => B): Either<E, B>
export function eitherMap<E, A, B, C>(either: Either<E, A>, f: (a: A) => B, g: (b: B) => C): Either<E, C>
export function eitherMap<E, A, B, C, D>(either: Either<E, A>, f: (a: A) => B, g: (b: B) => C, h: (c: C) => D): Either<E, D>
export function eitherMap<E, A, B, C, D, F>(
  either: Either<E, A>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => F
): Either<E, F>
export function eitherMap<E, A, B, C, D, F, G>(
  either: Either<E, A>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => F,
  j: (e: F) => G
): Either<E, G>
export function eitherMap<E, A, B, C, D, F, G, H>(
  either: Either<E, A>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => F,
  j: (e: F) => G,
  k: (f: G) => H
): Either<E, H>
export function eitherMap<E, A, B, C, D, F, G, H, I>(
  either: Either<E, A>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => F,
  j: (e: F) => G,
  k: (f: G) => H,
  l: (g: H) => I
): Either<E, I>
export function eitherMap<E, A, B, C, D, F, G, H, I, J>(
  either: Either<E, A>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => F,
  j: (e: F) => G,
  k: (f: G) => H,
  l: (g: H) => I,
  m: (h: I) => J
): Either<E, J>
export function eitherMap(either: Either<unknown, unknown>, ...fns: ((a: unknown) => unknown)[]): Either<unknown, unknown> {
  return fns.reduce((acc: Either<unknown, unknown>, fn) => {
    if (isRight(acc)) {
      const result = fn(acc.right)
      return right(result)
    }
    return acc
  }, either)
}

export function eitherFlatMap<E, A, B>(either: Either<E, A>, f: (a: A) => Either<E, B>): Either<E, B>
export function eitherFlatMap<E, A, B, C>(
  either: Either<E, A>,
  f: (a: A) => Either<E, B>,
  g: (b: B) => Either<E, C>
): Either<E, C>
export function eitherFlatMap<E, A, B, C, D>(
  either: Either<E, A>,
  f: (a: A) => Either<E, B>,
  g: (b: B) => Either<E, C>,
  h: (c: C) => Either<E, D>
): Either<E, D>
export function eitherFlatMap<E, A, B, C, D, F>(
  either: Either<E, A>,
  f: (a: A) => Either<E, B>,
  g: (b: B) => Either<E, C>,
  h: (c: C) => Either<E, D>,
  i: (d: D) => Either<E, F>
): Either<E, F>
export function eitherFlatMap<E, A, B, C, D, F, G>(
  either: Either<E, A>,
  f: (a: A) => Either<E, B>,
  g: (b: B) => Either<E, C>,
  h: (c: C) => Either<E, D>,
  i: (d: D) => Either<E, F>,
  j: (e: F) => Either<E, G>
): Either<E, G>
export function eitherFlatMap<E, A, B, C, D, F, G, H>(
  either: Either<E, A>,
  f: (a: A) => Either<E, B>,
  g: (b: B) => Either<E, C>,
  h: (c: C) => Either<E, D>,
  i: (d: D) => Either<E, F>,
  j: (e: F) => Either<E, G>,
  k: (f: G) => Either<E, H>
): Either<E, H>
export function eitherFlatMap<E, A, B, C, D, F, G, H, I>(
  either: Either<E, A>,
  f: (a: A) => Either<E, B>,
  g: (b: B) => Either<E, C>,
  h: (c: C) => Either<E, D>,
  i: (d: D) => Either<E, F>,
  j: (e: F) => Either<E, G>,
  k: (f: G) => Either<E, H>,
  l: (g: H) => Either<E, I>
): Either<E, I>
export function eitherFlatMap(
  either: Either<unknown, unknown>,
  ...fns: ((a: unknown) => Either<unknown, unknown>)[]
): Either<unknown, unknown> {
  return fns.reduce((acc: Either<unknown, unknown>, fn) => {
    if (isRight(acc)) {
      return fn(acc.right)
    }
    return acc
  }, either)
}

export const eitherFold = <E, A, B>(either: Either<E, A>, leftFn: (e: E) => B, rightFn: (a: A) => B): B =>
  isRight(either) ? rightFn(either.right) : leftFn(either.left)

export const getEitherOrElse = <E, A, B>(either: Either<E, A>, f: (e: E) => B): A | B =>
  isLeft(either) ? f(either.left) : either.right

export const getEither = <E, A>(e: E, a: A | null | undefined): Either<E, NonNullable<A>> =>
  !isNullOrUndefiend(a) ? right(a as NonNullable<A>) : left(e)

export const fromOption = <E, A>(onNone: () => E, fa: TOption<A>): Either<E, A> =>
  isSome(fa) ? right(fa.value) : left(onNone())

export const eitherTryCatch = <E, A>(f: () => A, onError: (error: unknown) => E): Either<E, A> => {
  try {
    const result = f()
    return right(result)
  } catch (error) {
    return left(onError(error))
  }
}
