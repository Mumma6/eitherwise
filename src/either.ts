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

export const eitherMap = <E, A, B>(either: Either<E, A>, f: (a: A) => B): Either<E, B> =>
  isRight(either) ? right(f(either.right)) : either

export const eitherFlatMap = <E, A, B>(either: Either<E, A>, f: (a: A) => Either<E, B>): Either<E, B> =>
  isRight(either) ? f(either.right) : either

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
